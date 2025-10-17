import React, { useState, useEffect } from "react";
import { FlatList, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { CurrencyInfo } from "../types/CurrencyInfo";

interface CurrencyListScreenProps {
  currencyList: CurrencyInfo[];
  title: string;
}

export default function CurrencyListScreen({
  currencyList,
  title,
}: CurrencyListScreenProps) {
  const [filteredList, setFilteredList] =
    useState<CurrencyInfo[]>(currencyList);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    setFilteredList(currencyList);
  }, [currencyList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredList(currencyList);
    } else {
      const searchTerm = query.toLowerCase();
      const filtered = currencyList.filter((currency) => {
        const coinName = currency.name.toLowerCase();
        const coinSymbol = currency.symbol.toLowerCase();

        // Criteria 1: Coin's name starts with the search term
        const nameStartsWithQuery = coinName.startsWith(searchTerm);

        // Criteria 2: Coin's name contains partial match with space prefix
        const nameContainsWithSpace = coinName.includes(` ${searchTerm}`);

        // Criteria 3: Coin's symbol starts with the search term
        const symbolStartsWithQuery = coinSymbol.startsWith(searchTerm);

        return (
          nameStartsWithQuery || nameContainsWithSpace || symbolStartsWithQuery
        );
      });
      setFilteredList(filtered);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredList(currencyList);
    setIsSearchActive(false);
  };

  const renderCurrencyItem = ({ item }: { item: CurrencyInfo }) => (
    <CurrencyItem>
      <CurrencyContent>
        <CurrencyName>{item.name}</CurrencyName>
        <CurrencySymbol>{item.symbol}</CurrencySymbol>
      </CurrencyContent>
    </CurrencyItem>
  );

  const renderEmptyView = () => (
    <EmptyContainer>
      <EmptyText>No currencies found</EmptyText>
      <EmptySubText>
        {searchQuery ? "Try a different search term" : "No data available"}
      </EmptySubText>
    </EmptyContainer>
  );

  return (
    <Container>
      <Header>
        <Title>{title}</Title>
        <SearchContainer>
          <SearchInput
            placeholder="Search currencies..."
            value={searchQuery}
            onChangeText={handleSearch}
            onFocus={() => setIsSearchActive(true)}
          />
          {(isSearchActive || searchQuery) && (
            <ClearButton onPress={clearSearch}>
              <ClearButtonText>✕</ClearButtonText>
            </ClearButton>
          )}
        </SearchContainer>
      </Header>

      <FlatList
        data={filteredList}
        renderItem={renderCurrencyItem}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={renderEmptyView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

const Header = styled.View`
  background-color: white;
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #e0e0e0;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const SearchContainer = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 16px;
`;

const ClearButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  padding: 5px;
`;

const ClearButtonText = styled.Text`
  color: #666;
  font-size: 18px;
`;

const CurrencyItem = styled.View`
  background-color: white;
  margin: 8px 16px;
  border-radius: 12px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 3;
`;

const CurrencyContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const CurrencyName = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  flex: 1;
`;

const CurrencySymbol = styled.Text`
  font-size: 14px;
  color: #666;
  background-color: #f0f0f0;
  padding: 4px 8px;
  border-radius: 4px;
  margin: 0 8px;
`;

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const EmptyText = styled.Text`
  font-size: 20px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`;

const EmptySubText = styled.Text`
  font-size: 16px;
  color: #999;
  text-align: center;
`;
