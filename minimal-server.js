const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

console.log("🚀 Starting minimal Currency API Server...");

// File Paths
const FILE_PATHS = {
  CURRENCY_LIST_A: "assets/data/currencyListA.json",
  CURRENCY_LIST_B: "assets/data/currencyListB.json",
};

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read JSON files
const readJsonFile = (filePath) => {
  try {
    const fullPath = path.join(__dirname, filePath);
    console.log(`Reading file: ${fullPath}`);
    const data = fs.readFileSync(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
};

// Test file access
console.log("Testing file access...");
const testCrypto = readJsonFile(FILE_PATHS.CURRENCY_LIST_A);
const testFiat = readJsonFile(FILE_PATHS.CURRENCY_LIST_B);
console.log("Currency List A:", testCrypto ? "loaded" : "failed");
console.log("Currency List B:", testFiat ? "loaded" : "failed");

// Basic routes without parameters first
app.get("/", (req, res) => {
  res.json({
    message: "Currency API Server - Minimal Version",
    version: "1.0.0",
    status: "running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/currencies/crypto", (req, res) => {
  const data = readJsonFile(FILE_PATHS.CURRENCY_LIST_A);
  if (data) {
    res.json({
      success: true,
      message: "Crypto currencies retrieved successfully",
      data: data.data || data,
      count: data.data
        ? data.data.length
        : Array.isArray(data)
        ? data.length
        : 0,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to load crypto currencies",
      data: [],
    });
  }
});

app.get("/api/currencies/fiat", (req, res) => {
  const data = readJsonFile(FILE_PATHS.CURRENCY_LIST_B);
  if (data) {
    res.json({
      success: true,
      message: "Fiat currencies retrieved successfully",
      data: data.data || data,
      count: data.data
        ? data.data.length
        : Array.isArray(data)
        ? data.length
        : 0,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to load fiat currencies",
      data: [],
    });
  }
});

app.get("/api/currencies/all", (req, res) => {
  const cryptoData = readJsonFile(FILE_PATHS.CURRENCY_LIST_A);
  const fiatData = readJsonFile(FILE_PATHS.CURRENCY_LIST_B);

  if (cryptoData && fiatData) {
    const allCurrencies = {
      crypto: cryptoData.data || cryptoData || [],
      fiat: fiatData.data || fiatData || [],
    };

    res.json({
      success: true,
      message: "All currencies retrieved successfully",
      data: allCurrencies,
      count: (cryptoData?.data?.length ?? 0) + (fiatData?.data?.length ?? 0),
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Failed to load currencies",
      data: [],
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Currency API Server is running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET / - Server info`);
  console.log(`   GET /api/health - Health check`);
  console.log(`   GET /api/currencies/crypto - Get crypto currencies`);
  console.log(`   GET /api/currencies/fiat - Get fiat currencies`);
  console.log(`   GET /api/currencies/all - Get all currencies`);
  console.log(`\n🔍 Test with:`);
  console.log(`   curl http://localhost:${PORT}/api/health`);
  console.log(`   curl http://localhost:${PORT}/api/currencies/all`);
});
