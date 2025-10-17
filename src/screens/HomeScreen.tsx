import React, { useState, useEffect } from "react";
import { Alert, Modal } from "react-native";
import { JSX } from "react";
import { CurrencyInfo } from "../types/CurrencyInfo";
import CurrencyListScreen from "../screens/CurrencyListScreen";
import LocalDatabase from "../services/LocalDatabase";
import ApiService from "../services/ApiService";
import {
  UI_TEXT,
  BUTTON_LABELS,
  MODAL_TITLES,
  ALERT_MESSAGES,
  SERVER_STATUS,
  COLORS,
} from "../constants";
import {
  ButtonContainer,
  ButtonText,
  CloseButton,
  CloseButtonText,
  Container,
  ModalContainer,
  ModalHeader,
  StyledButton,
  Subtitle,
  Title,
} from "../styles/styles";

export default function HomeScreen(): JSX.Element {
  const [databaseCount, setDatabaseCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState<CurrencyInfo[]>([]);
  const [modalTitle, setModalTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [serverStatus, setServerStatus] = useState<
    (typeof SERVER_STATUS)[keyof typeof SERVER_STATUS]
  >(SERVER_STATUS.CHECKING);

  const database = LocalDatabase.getInstance();
  const apiService = ApiService.getInstance();

  useEffect(() => {
    updateDatabaseCount();
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    setServerStatus(SERVER_STATUS.CHECKING);
    try {
      const isRunning = await apiService.isServerRunning();
      setServerStatus(isRunning ? SERVER_STATUS.ONLINE : SERVER_STATUS.OFFLINE);
    } catch (error) {
      setServerStatus(SERVER_STATUS.OFFLINE);
    }
  };

  const updateDatabaseCount = () => {
    setDatabaseCount(database.getDataCount());
  };

  // Button 1: Clear data from local database
  const clearDatabase = async () => {
    setIsLoading(true);
    try {
      await database.clearAll();
      updateDatabaseCount();
      Alert.alert(
        ALERT_MESSAGES.DATABASE_CLEARED.title,
        ALERT_MESSAGES.DATABASE_CLEARED.message
      );
    } catch (error) {
      Alert.alert(
        ALERT_MESSAGES.ERRORS.CLEAR_DATABASE.title,
        ALERT_MESSAGES.ERRORS.CLEAR_DATABASE.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Button 2: Insert data into local database
  const insertData = async () => {
    if (serverStatus === SERVER_STATUS.OFFLINE) {
      Alert.alert(
        ALERT_MESSAGES.SERVER_OFFLINE.title,
        ALERT_MESSAGES.SERVER_OFFLINE.message
      );
      return;
    }

    setIsLoading(true);
    try {
      const size = await database.insertAll();
      updateDatabaseCount();
      Alert.alert(
        ALERT_MESSAGES.DATA_INSERTED.title,
        ALERT_MESSAGES.DATA_INSERTED.message(size)
      );
    } catch (error) {
      Alert.alert(
        ALERT_MESSAGES.ERRORS.INSERT_DATA.title,
        ALERT_MESSAGES.ERRORS.INSERT_DATA.message
      );
      console.error("Insert data error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Button 3: Show Currency List A - Crypto
  const showCryptoList = async () => {
    if (databaseCount === 0) {
      Alert.alert(ALERT_MESSAGES.NO_DATA.title, ALERT_MESSAGES.NO_DATA.message);
      return;
    }
    setIsLoading(true);
    try {
      const cryptoList = await database.getCryptoList();
      setCurrentList(cryptoList);
      setModalTitle(MODAL_TITLES.CRYPTO_LIST);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        ALERT_MESSAGES.ERRORS.LOAD_CRYPTO.title,
        ALERT_MESSAGES.ERRORS.LOAD_CRYPTO.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Button 4: Show Currency List B - Fiat
  const showFiatList = async () => {
    if (databaseCount === 0) {
      Alert.alert(ALERT_MESSAGES.NO_DATA.title, ALERT_MESSAGES.NO_DATA.message);
      return;
    }
    setIsLoading(true);
    try {
      const fiatList = await database.getFiatList();
      setCurrentList(fiatList);
      setModalTitle(MODAL_TITLES.FIAT_LIST);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        ALERT_MESSAGES.ERRORS.LOAD_FIAT.title,
        ALERT_MESSAGES.ERRORS.LOAD_FIAT.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Button 5: Show all purchasable currencies
  const showPurchasableCurrencies = async () => {
    if (databaseCount === 0) {
      Alert.alert(ALERT_MESSAGES.NO_DATA.title, ALERT_MESSAGES.NO_DATA.message);
      return;
    }
    setIsLoading(true);
    try {
      const purchasableList = await database.getAllList();
      setCurrentList(purchasableList);
      setModalTitle(MODAL_TITLES.PURCHASABLE_LIST);
      setModalVisible(true);
    } catch (error) {
      Alert.alert(
        ALERT_MESSAGES.ERRORS.LOAD_PURCHASABLE.title,
        ALERT_MESSAGES.ERRORS.LOAD_PURCHASABLE.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>{UI_TEXT.APP_TITLE}</Title>
      <Subtitle>
        {UI_TEXT.DATABASE_STATUS(databaseCount, serverStatus)}
      </Subtitle>

      <ButtonContainer>
        <StyledButton
          testID="clear-database-button"
          onPress={clearDatabase}
          $color={COLORS.BUTTONS.CLEAR}
          $disabled={isLoading}
        >
          <ButtonText>
            {isLoading ? UI_TEXT.LOADING : BUTTON_LABELS.CLEAR_DATABASE}
          </ButtonText>
        </StyledButton>

        <StyledButton
          testID="insert-data-button"
          onPress={insertData}
          $color={COLORS.BUTTONS.INSERT}
          $disabled={isLoading}
        >
          <ButtonText>
            {isLoading ? UI_TEXT.LOADING : BUTTON_LABELS.INSERT_DATA}
          </ButtonText>
        </StyledButton>

        <StyledButton
          testID="show-crypto-list-button"
          onPress={showCryptoList}
          $color={COLORS.BUTTONS.CRYPTO}
          $disabled={isLoading}
        >
          <ButtonText>
            {isLoading ? UI_TEXT.LOADING : BUTTON_LABELS.SHOW_CRYPTO_LIST}
          </ButtonText>
        </StyledButton>

        <StyledButton
          testID="show-fiat-list-button"
          onPress={showFiatList}
          $color={COLORS.BUTTONS.FIAT}
          $disabled={isLoading}
        >
          <ButtonText>
            {isLoading ? UI_TEXT.LOADING : BUTTON_LABELS.SHOW_FIAT_LIST}
          </ButtonText>
        </StyledButton>

        <StyledButton
          testID="show-purchasable-list-button"
          onPress={showPurchasableCurrencies}
          $color={COLORS.BUTTONS.PURCHASABLE}
          $disabled={isLoading}
        >
          <ButtonText>
            {isLoading ? UI_TEXT.LOADING : BUTTON_LABELS.SHOW_PURCHASABLE}
          </ButtonText>
        </StyledButton>
      </ButtonContainer>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalContainer>
          <ModalHeader>
            <CloseButton onPress={() => setModalVisible(false)}>
              <CloseButtonText>{UI_TEXT.BACK}</CloseButtonText>
            </CloseButton>
          </ModalHeader>
          <CurrencyListScreen currencyList={currentList} title={modalTitle} />
        </ModalContainer>
      </Modal>
    </Container>
  );
}
