

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Papa = require("papaparse");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const SHEET_URL = process.env.SHEET_URL;

/* ======================================
   DATE HELPERS
====================================== */

function formatDateKey(value) {
  if (!value) return null;

  value = String(value).trim();

  // YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // Excel Serial Date
  if (/^\d+(\.\d+)?$/.test(value)) {
    const serial = Number(value);
    const excelEpoch = Date.UTC(1899, 11, 30);
    const date = new Date(excelEpoch + serial * 86400000);

    return (
      date.getUTCFullYear() +
      "-" +
      String(date.getUTCMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getUTCDate()).padStart(2, "0")
    );
  }

  // DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [d, m, y] = value.split("-");
    return `${y}-${m}-${d}`;
  }

  // DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    const [d, m, y] = value.split("/");
    return `${y}-${m}-${d}`;
  }

  return null;
}

function normalizeRange(from, to) {
  let fromKey = formatDateKey(from);
  let toKey = formatDateKey(to);

  if (fromKey && !toKey) toKey = fromKey;
  if (!fromKey && toKey) fromKey = toKey;

  return {
    fromKey,
    toKey,
  };
}

function inRange(dateKey, fromKey, toKey) {
  if (!dateKey) return false;

  if (fromKey && dateKey < fromKey) return false;
  if (toKey && dateKey > toKey) return false;

  return true;
}

/* ======================================
   ROOT
====================================== */

app.get("/", (req, res) => {
  res.send("Leaderboard Backend Running");
});

/* ======================================
   API
====================================== */

app.get("/api/leaderboard", async (req, res) => {

  try {

    const selectedMonth = String(
      req.query.month || "all"
    )
      .trim()
      .toLowerCase();

    const { fromKey, toKey } = normalizeRange(
      req.query.fromDate,
      req.query.toDate
    );

    const hasDateFilter = Boolean(fromKey || toKey);

    console.log("MONTH :", selectedMonth);
    console.log("FROM :", fromKey || "ALL");
    console.log("TO :", toKey || "ALL");

    const response = await axios.get(SHEET_URL);

    const rows = Papa.parse(response.data, {
      skipEmptyLines: true
    }).data;

    const freshMap = {};
    const repeatMap = {};

    let matchedRows = 0;

    let minDate = null;
    let maxDate = null;

    rows.slice(1).forEach((row) => {

      const caseDate = formatDateKey(row[14]);

      if (caseDate) {

        if (!minDate || caseDate < minDate)
          minDate = caseDate;

        if (!maxDate || caseDate > maxDate)
          maxDate = caseDate;
      }

      // DATE FILTER

      if (hasDateFilter) {

        if (!inRange(caseDate, fromKey, toKey))
          return;

      }

      // MONTH FILTER

      const rowMonth = String(row[16] || "")
        .trim()
        .toLowerCase();

      if (!hasDateFilter && selectedMonth !== "all") {

        const m1 = selectedMonth.replace(/['\s-]/g, "");
        const m2 = rowMonth.replace(/['\s-]/g, "");

        if (!m2.startsWith(m1))
          return;
      }

      const amount =
        Number(
          String(row[4] || "")
            .replace(/[^0-9.]/g, "")
        ) || 0;

      const repayAmount =
        Number(
          String(row[13] || "")
            .replace(/[^0-9.]/g, "")
        ) || 0;

      const receivedAmount =
        Number(
          String(row[21] || "")
            .replace(/[^0-9.]/g, "")
        ) || 0;

      const type =
        String(row[27] || "")
          .trim()
          .toLowerCase();

      const executive =
        String(row[28] || "")
          .trim();

      if (!executive)
        return;

      const key = executive.toLowerCase();

      const isFresh =
        type.includes("fresh") ||
        type.includes("new");

      const isRepeat =
        type.includes("repeat");

      const target =
        isFresh
          ? freshMap
          : isRepeat
          ? repeatMap
          : null;

      if (!target)
        return;

      matchedRows++;

      if (!target[key]) {

        target[key] = {

          name: executive,
          cases: 0,
          amount: 0,
          repayAmount: 0,
          receivedAmount: 0

        };

      }

      target[key].cases++;
      target[key].amount += amount;
      target[key].repayAmount += repayAmount;
      target[key].receivedAmount += receivedAmount;

    });

    const fresh = Object.values(freshMap)
    .map((item) => ({
      ...item,
      receivePercent:
        item.repayAmount > 0
          ? Number(
              (
                (item.receivedAmount / item.repayAmount) *
                100
              ).toFixed(2)
            )
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const repeat = Object.values(repeatMap)
    .map((item) => ({
      ...item,
      receivePercent:
        item.repayAmount > 0
          ? Number(
              (
                (item.receivedAmount / item.repayAmount) *
                100
              ).toFixed(2)
            )
          : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  console.log("Matched Rows :", matchedRows);

  res.json({
    success: true,

    filters: {
      month: selectedMonth,
      fromDate: fromKey,
      toDate: toKey,
    },

    sheetRange: {
      min: minDate,
      max: maxDate,
    },

    summary: {
      freshExecutives: fresh.length,
      repeatExecutives: repeat.length,
      matchedRows,
    },

    fresh,
    repeat,
  });

} catch (err) {

  console.error("SERVER ERROR =>", err);

  res.status(500).json({
    success: false,
    message: err.message,
  });

}

});

app.listen(PORT, () => {

console.log(`Server Running On ${PORT}`);

});
