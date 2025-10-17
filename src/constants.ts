// API Configuration
export const API_CONFIG = {
  BASE_URL: "http://localhost:3001/api",
  PORT: 3001,
} as const;

// Server Status
export const SERVER_STATUS = {
  CHECKING: "checking",
  ONLINE: "online",
  OFFLINE: "offline",
} as const;

// UI Text
export const UI_TEXT = {
  APP_TITLE: "Crypto Basics Demo",
  DATABASE_RECORDS: (count: number) => `Database: ${count} records`,
  SERVER_STATUS: (status: string) => `Server: ${status}`,
  DATABASE_STATUS: (count: number, status: string) =>
    `Database: ${count} records | Server: ${status}`,
  LOADING: "Loading...",
  BACK: "← Back",
} as const;

// Button Labels
export const BUTTON_LABELS = {
  CLEAR_DATABASE: "Clear Database",
  INSERT_DATA: "Insert Data",
  SHOW_CRYPTO_LIST: "Show Crypto List",
  SHOW_FIAT_LIST: "Show Fiat List",
  SHOW_PURCHASABLE: "Show Purchasable",
} as const;

// Modal Titles
export const MODAL_TITLES = {
  CRYPTO_LIST: "Currency List A - Crypto",
  FIAT_LIST: "Currency List B - Fiat",
  PURCHASABLE_LIST: "Purchasable Currencies (A & B)",
} as const;

// Alert Messages
export const ALERT_MESSAGES = {
  DATABASE_CLEARED: {
    title: "Database Cleared",
    message: "All data has been removed from the local database.",
  },
  DATA_INSERTED: {
    title: "Data Inserted",
    message: (count: number) =>
      `${count} currency records have been inserted into the local database.`,
  },
  SERVER_OFFLINE: {
    title: "Server Offline",
    message: "Please start the server first using 'npm run server'",
  },
  NO_DATA: {
    title: "No Data",
    message: "Please insert data first using the 'Insert Data' button.",
  },
  ERRORS: {
    CLEAR_DATABASE: {
      title: "Error",
      message: "Failed to clear database.",
    },
    INSERT_DATA: {
      title: "Error",
      message: "Failed to insert data. Make sure the server is running.",
    },
    LOAD_CRYPTO: {
      title: "Error",
      message: "Failed to load crypto currencies.",
    },
    LOAD_FIAT: {
      title: "Error",
      message: "Failed to load fiat currencies.",
    },
    LOAD_PURCHASABLE: {
      title: "Error",
      message: "Failed to load purchasable currencies.",
    },
  },
} as const;

// Currency Types
export const CURRENCY_TYPES = {
  CRYPTO: "crypto",
  FIAT: "fiat",
} as const;

// API Messages
export const API_MESSAGES = {
  CRYPTO_SUCCESS: "Crypto currencies retrieved successfully",
  FIAT_SUCCESS: "Fiat currencies retrieved successfully",
  ALL_SUCCESS: "All currencies retrieved successfully",
  SEARCH_RESULTS: (term: string) => `Search results for "${term}"`,
  CURRENCY_FOUND: (id: string) => `Currency ${id} found`,
  CURRENCY_NOT_FOUND: (id: string) => `Currency ${id} not found`,
  SERVER_RUNNING: "Server is running",
  FILE_READ_ERROR: "File read error",
  LOAD_FAILED: {
    CRYPTO: "Failed to load crypto currencies",
    FIAT: "Failed to load fiat currencies",
    ALL: "Failed to load currencies",
    SEARCH: "Failed to search currencies",
  },
} as const;

// Search Placeholders
export const SEARCH_TEXT = {
  PLACEHOLDER: "Search currencies...",
  NO_RESULTS: "No currencies found",
  TRY_DIFFERENT: "Try a different search term",
  NO_DATA_AVAILABLE: "No data available",
  CLEAR_SYMBOL: "✕",
} as const;

// Colors
export const COLORS = {
  BUTTONS: {
    CLEAR: "#f44336",
    INSERT: "#4caf50",
    CRYPTO: "#2196f3",
    FIAT: "#ff9800",
    PURCHASABLE: "#9c27b0",
    DISABLED: "#cccccc",
    DEFAULT: "#007aff",
  },
  BACKGROUND: {
    PRIMARY: "#f5f5f5",
    WHITE: "#fff",
    MODAL: "#f5f5f5",
  },
  TEXT: {
    PRIMARY: "#333",
    SECONDARY: "#666",
    WHITE: "white",
    LINK: "#007aff",
  },
  CURRENCY_TYPE: {
    CRYPTO_BG: "#e3f2fd",
    CRYPTO_TEXT: "#1976d2",
    FIAT_BG: "#fff3e0",
    FIAT_TEXT: "#f57c00",
  },
  STATUS: {
    SUCCESS: "#4caf50",
    ERROR: "#f44336",
    WARNING: "#ff9800",
  },
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  HEALTH: "/health",
  CURRENCIES: {
    CRYPTO: "/currencies/crypto",
    FIAT: "/currencies/fiat",
    ALL: "/currencies/all",
    SEARCH: (term: string) => `/currencies/search/${encodeURIComponent(term)}`,
    BY_ID: (id: string) => `/currencies/${encodeURIComponent(id)}`,
  },
} as const;
