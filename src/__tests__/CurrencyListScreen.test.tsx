import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import CurrencyListScreen from "../screens/CurrencyListScreen";
import { CurrencyInfo } from "../types/CurrencyInfo";

jest.mock("@react-native-async-storage/async-storage", () => ({
  __esModule: true,
  default: {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve()),
    removeItem: jest.fn(() => Promise.resolve()),
    clear: jest.fn(() => Promise.resolve()),
  },
}));

describe("CurrencyListScreen UI", () => {
  const mockCurrencyList: CurrencyInfo[] = [
    {
      id: "1",
      name: "Bitcoin",
      symbol: "BTC",
    },
    {
      id: "2",
      name: "Ethereum",
      symbol: "ETH",
    },
    {
      id: "3",
      name: "US Dollar",
      symbol: "USD",
    },
    {
      id: "4",
      name: "Ripple",
      symbol: "XRP",
    },
    {
      id: "5",
      name: "Bitcoin Cash",
      symbol: "BCH",
    },
    {
      id: "6",
      name: "Litecoin",
      symbol: "LTC",
    },
    {
      id: "7",
      name: "Cardano",
      symbol: "ADA",
    },
    {
      id: "8",
      name: "Polkadot",
      symbol: "DOT",
    },
  ];

  it("should render without crashing", () => {
    // This test verifies that the CurrencyListScreen component can be rendered
    // without throwing any errors, which validates the basic UI structure
    expect(() => {
      render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Test Currency List"
        />
      );
    }).not.toThrow();
  });

  it("should display the title and search input", () => {
    const { getByText, getByPlaceholderText } = render(
      <CurrencyListScreen
        currencyList={mockCurrencyList}
        title="Crypto Currencies"
      />
    );

    // Check if the title is displayed
    expect(getByText("Crypto Currencies")).toBeTruthy();

    // Check if the search input is present
    expect(getByPlaceholderText("Search currencies...")).toBeTruthy();
  });

  it("should display currency items", () => {
    const { getByText } = render(
      <CurrencyListScreen
        currencyList={mockCurrencyList}
        title="Currency List"
      />
    );

    // Check if currency items are displayed
    expect(getByText("Bitcoin")).toBeTruthy();
    expect(getByText("BTC")).toBeTruthy();
    expect(getByText("Ethereum")).toBeTruthy();
    expect(getByText("ETH")).toBeTruthy();
    expect(getByText("US Dollar")).toBeTruthy();
    expect(getByText("USD")).toBeTruthy();
  });

  it("should show empty state when no currencies provided", () => {
    const { getByText } = render(
      <CurrencyListScreen currencyList={[]} title="Empty List" />
    );

    // Check if empty state is displayed
    expect(getByText("No currencies found")).toBeTruthy();
    expect(getByText("No data available")).toBeTruthy();
  });

  // Search functionality tests
  describe("Search functionality", () => {
    it("should filter currencies by name starting with search term", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for "bit" - should match "Bitcoin" and "Bitcoin Cash"
      act(() => {
        fireEvent.changeText(searchInput, "bit");
      });

      // Should show Bitcoin and Bitcoin Cash
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("Bitcoin Cash")).toBeTruthy();

      // Should not show other currencies
      expect(queryByText("Ethereum")).toBeFalsy();
      expect(queryByText("Ripple")).toBeFalsy();
    });

    it("should filter currencies by symbol starting with search term", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for "bt" - should match "BTC"
      act(() => {
        fireEvent.changeText(searchInput, "bt");
      });

      // Should show Bitcoin (BTC)
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("BTC")).toBeTruthy();

      // Should not show other currencies
      expect(queryByText("Ethereum")).toBeFalsy();
      expect(queryByText("Litecoin")).toBeFalsy();
    });

    it("should filter currencies by partial name match with space prefix", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for "cash" - should match "Bitcoin Cash"
      act(() => {
        fireEvent.changeText(searchInput, "cash");
      });

      // Should show Bitcoin Cash
      expect(getByText("Bitcoin Cash")).toBeTruthy();

      // Should not show other currencies
      expect(queryByText("Bitcoin")).toBeFalsy();
      expect(queryByText("Ethereum")).toBeFalsy();
    });

    it("should be case insensitive", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for "BITCOIN" in uppercase
      act(() => {
        fireEvent.changeText(searchInput, "BITCOIN");
      });

      // Should still match Bitcoin
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(queryByText("Ethereum")).toBeFalsy();
    });

    it("should show all currencies when search is cleared", () => {
      const { getByPlaceholderText, getByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // First search for something
      act(() => {
        fireEvent.changeText(searchInput, "bitcoin");
      });

      // Then clear the search
      act(() => {
        fireEvent.changeText(searchInput, "");
      });

      // Should show all currencies again
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("Ethereum")).toBeTruthy();
      expect(getByText("Ripple")).toBeTruthy();
      expect(getByText("Litecoin")).toBeTruthy();
    });

    it("should show empty state with search message when no results found", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for something that doesn't exist
      act(() => {
        fireEvent.changeText(searchInput, "nonexistent");
      });

      // Should show empty state with search message
      expect(getByText("No currencies found")).toBeTruthy();
      expect(getByText("Try a different search term")).toBeTruthy();

      // Should not show any currencies
      expect(queryByText("Bitcoin")).toBeFalsy();
      expect(queryByText("Ethereum")).toBeFalsy();
    });

    it("should show clear button when search is active", () => {
      const { getByPlaceholderText, getByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Focus on search input
      act(() => {
        fireEvent(searchInput, "focus");
      });

      // Should show clear button (✕)
      expect(getByText("✕")).toBeTruthy();
    });

    it("should show clear button when there is search text", () => {
      const { getByPlaceholderText, getByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Type in search input
      act(() => {
        fireEvent.changeText(searchInput, "bitcoin");
      });

      // Should show clear button (✕)
      expect(getByText("✕")).toBeTruthy();
    });

    it("should clear search when clear button is pressed", () => {
      const { getByPlaceholderText, getByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Type in search input
      act(() => {
        fireEvent.changeText(searchInput, "bitcoin");
      });

      // Press clear button
      const clearButton = getByText("✕");
      act(() => {
        fireEvent.press(clearButton);
      });

      // Should show all currencies again
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("Ethereum")).toBeTruthy();
      expect(getByText("Ripple")).toBeTruthy();
    });

    it("should handle whitespace in search terms", () => {
      const { getByPlaceholderText, getByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search with only spaces (should show empty state after trim)
      act(() => {
        fireEvent.changeText(searchInput, "   ");
      });

      // Should show all currencies (empty trimmed string shows all)
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("Ethereum")).toBeTruthy();
    });

    it("should handle special characters in search", () => {
      const { getByPlaceholderText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search with special characters
      act(() => {
        fireEvent.changeText(searchInput, "!@#$%");
      });

      // Should show no currencies
      expect(queryByText("Bitcoin")).toBeFalsy();
      expect(queryByText("Ethereum")).toBeFalsy();
    });

    it("should match multiple currencies with same starting letter", () => {
      const { getByPlaceholderText, getByText, queryByText } = render(
        <CurrencyListScreen
          currencyList={mockCurrencyList}
          title="Currency List"
        />
      );

      const searchInput = getByPlaceholderText("Search currencies...");

      // Search for "b" - should match Bitcoin and Bitcoin Cash
      act(() => {
        fireEvent.changeText(searchInput, "b");
      });

      // Should show both Bitcoin currencies
      expect(getByText("Bitcoin")).toBeTruthy();
      expect(getByText("Bitcoin Cash")).toBeTruthy();

      // Should not show others
      expect(queryByText("Ethereum")).toBeFalsy();
      expect(queryByText("Litecoin")).toBeFalsy();
    });
  });
});
