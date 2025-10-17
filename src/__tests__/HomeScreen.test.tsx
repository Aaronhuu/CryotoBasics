import React from "react";
import { act, render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../screens/HomeScreen";
import { UI_TEXT, BUTTON_LABELS } from "../constants";
import { Alert } from "react-native";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

// Mock the services
const mockClearAll = jest.fn().mockResolvedValue(undefined);
const mockGetDataCount = jest.fn().mockReturnValue(0);
const mockInsertAll = jest.fn().mockResolvedValue(10);
const mockGetCryptoList = jest.fn().mockResolvedValue([]);
const mockGetFiatList = jest.fn().mockResolvedValue([]);
const mockGetAllList = jest.fn().mockResolvedValue([]);

jest.mock("../services/LocalDatabase", () => ({
  __esModule: true,
  default: {
    getInstance: jest.fn(() => ({
      getDataCount: mockGetDataCount,
      clearAll: mockClearAll,
      insertAll: mockInsertAll,
      getCryptoList: mockGetCryptoList,
      getFiatList: mockGetFiatList,
      getAllList: mockGetAllList,
    })),
  },
}));

jest.mock("../services/ApiService", () => ({
  __esModule: true,
  default: {
    getInstance: jest.fn(() => ({
      isServerRunning: jest.fn().mockResolvedValue(true),
    })),
  },
}));

describe("HomeScreen UI", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});
  });

  it("should render without crashing", () => {
    // This test verifies that the HomeScreen component can be rendered
    // without throwing any errors, which validates the basic UI structure
    const { toJSON, getByText } = render(<HomeScreen />);
    expect(toJSON()).toMatchSnapshot();

    expect(getByText(UI_TEXT.APP_TITLE)).toBeTruthy();
    expect(getByText(BUTTON_LABELS.CLEAR_DATABASE)).toBeTruthy();
    expect(getByText(BUTTON_LABELS.INSERT_DATA)).toBeTruthy();
    expect(getByText(BUTTON_LABELS.SHOW_CRYPTO_LIST)).toBeTruthy();
    expect(getByText(BUTTON_LABELS.SHOW_FIAT_LIST)).toBeTruthy();
    expect(getByText(BUTTON_LABELS.SHOW_PURCHASABLE)).toBeTruthy();
  });

  it("should handle clear button press", async () => {
    const { getByTestId } = render(<HomeScreen />);
    const clearButton = getByTestId("clear-database-button");

    // Press the clear button
    await act(async () => {
      fireEvent.press(clearButton);
    });

    // Verify that the clearAll method was called
    expect(mockClearAll).toHaveBeenCalledTimes(1);

    // Verify that getDataCount was called to update the count
    expect(mockGetDataCount).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      "Database Cleared",
      "All data has been removed from the local database."
    );
  });

  it("should handle insert data button press", async () => {
    const { getByTestId } = render(<HomeScreen />);
    const insertButton = getByTestId("insert-data-button");

    // Press the insert data button
    await act(async () => {
      fireEvent.press(insertButton);
    });

    // Verify that the insertAll method was called
    expect(mockInsertAll).toHaveBeenCalledTimes(1);
    expect(mockGetDataCount).toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      "Data Inserted",
      "10 currency records have been inserted into the local database."
    );
  });

  it("should handle show crypto list button press", async () => {
    // Set database count to 1 so the button works
    mockGetDataCount.mockReturnValue(1);

    const { getByTestId } = render(<HomeScreen />);
    const cryptoButton = getByTestId("show-crypto-list-button");

    // Press the crypto list button
    await act(async () => {
      fireEvent.press(cryptoButton);
    });

    // Verify that getCryptoList was called
    expect(mockGetCryptoList).toHaveBeenCalledTimes(1);
  });

  it("should handle show fiat list button press", async () => {
    // Set database count to 1 so the button works
    mockGetDataCount.mockReturnValue(1);

    const { getByTestId } = render(<HomeScreen />);
    const fiatButton = getByTestId("show-fiat-list-button");

    // Press the fiat list button
    await act(async () => {
      fireEvent.press(fiatButton);
    });

    // Verify that getFiatList was called
    expect(mockGetFiatList).toHaveBeenCalledTimes(1);
  });

  it("should handle show purchasable list button press", async () => {
    // Set database count to 1 so the button works
    mockGetDataCount.mockReturnValue(1);

    const { getByTestId } = render(<HomeScreen />);
    const purchasableButton = getByTestId("show-purchasable-list-button");

    // Press the purchasable list button
    await act(async () => {
      fireEvent.press(purchasableButton);
    });

    // Verify that getAllList was called
    expect(mockGetAllList).toHaveBeenCalledTimes(1);
  });

  it("should show alert when trying to show lists with empty database", async () => {
    // Ensure database count is 0
    mockGetDataCount.mockReturnValue(0);

    const { getByTestId } = render(<HomeScreen />);
    const cryptoButton = getByTestId("show-crypto-list-button");

    // Press the crypto list button
    await act(async () => {
      fireEvent.press(cryptoButton);
    });

    // Should show no data alert instead of calling getCryptoList
    expect(mockGetCryptoList).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith(
      "No Data",
      "Please insert data first using the 'Insert Data' button."
    );
  });

  it("should handle database clear error", async () => {
    // Mock clearAll to reject
    mockClearAll.mockRejectedValueOnce(new Error("Clear failed"));

    const { getByTestId } = render(<HomeScreen />);
    const clearButton = getByTestId("clear-database-button");

    // Press the clear button
    await act(async () => {
      fireEvent.press(clearButton);
    });

    // Should show error alert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to clear database."
    );
  });

  it("should handle insert data error", async () => {
    // Mock insertAll to reject
    mockInsertAll.mockRejectedValueOnce(new Error("Insert failed"));

    const { getByTestId } = render(<HomeScreen />);
    const insertButton = getByTestId("insert-data-button");

    // Press the insert button
    await act(async () => {
      fireEvent.press(insertButton);
    });

    // Should show error alert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to insert data. Make sure the server is running."
    );
  });

  it("should handle crypto list loading error", async () => {
    // Set database count to 1 and mock getCryptoList to reject
    mockGetDataCount.mockReturnValue(1);
    mockGetCryptoList.mockRejectedValueOnce(new Error("Load failed"));

    const { getByTestId } = render(<HomeScreen />);
    const cryptoButton = getByTestId("show-crypto-list-button");

    // Press the crypto list button
    await act(async () => {
      fireEvent.press(cryptoButton);
    });

    // Should show error alert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to load crypto currencies."
    );
  });

  it("should handle fiat list loading error", async () => {
    // Set database count to 1 and mock getFiatList to reject
    mockGetDataCount.mockReturnValue(1);
    mockGetFiatList.mockRejectedValueOnce(new Error("Load failed"));

    const { getByTestId } = render(<HomeScreen />);
    const fiatButton = getByTestId("show-fiat-list-button");

    // Press the fiat list button
    await act(async () => {
      fireEvent.press(fiatButton);
    });

    // Should show error alert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to load fiat currencies."
    );
  });

  it("should handle purchasable list loading error", async () => {
    // Set database count to 1 and mock getAllList to reject
    mockGetDataCount.mockReturnValue(1);
    mockGetAllList.mockRejectedValueOnce(new Error("Load failed"));

    const { getByTestId } = render(<HomeScreen />);
    const purchasableButton = getByTestId("show-purchasable-list-button");

    // Press the purchasable list button
    await act(async () => {
      fireEvent.press(purchasableButton);
    });

    // Should show error alert
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Failed to load purchasable currencies."
    );
  });

  it("should display correct database status text", () => {
    mockGetDataCount.mockReturnValue(5);

    const { getByText } = render(<HomeScreen />);

    // Check that database status is displayed correctly
    expect(getByText(/Database: 5 records \| Server: checking/)).toBeTruthy();
  });

  it("should disable buttons when loading", async () => {
    const { getByTestId, getAllByText } = render(<HomeScreen />);
    const clearButton = getByTestId("clear-database-button");

    // Start an operation that sets loading state
    act(() => {
      fireEvent.press(clearButton);
    });

    // Check that the button text changes to "Loading..."
    expect(getAllByText("Loading...")).toBeTruthy();
  });
});
