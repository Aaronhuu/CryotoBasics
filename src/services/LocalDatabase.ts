import { AllCurrencyInfo, CurrencyInfo, FiatInfo } from "../types/CurrencyInfo";
import ApiService from "./ApiService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataBaseKey = "all_data";

class LocalDatabase {
  private static instance: LocalDatabase;
  private data: AllCurrencyInfo | undefined;
  private apiService: ApiService;

  private constructor() {
    this.apiService = ApiService.getInstance();
  }

  public static getInstance(): LocalDatabase {
    if (!LocalDatabase.instance) {
      LocalDatabase.instance = new LocalDatabase();
    }
    return LocalDatabase.instance;
  }

  // Simulate async database operations (off UI thread)
  public async clearAll(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        this.data = undefined;
        AsyncStorage.removeItem(dataBaseKey);
        resolve();
      }, 100);
    });
  }

  public async insertAll(): Promise<number> {
    const currencies: AllCurrencyInfo =
      await this.apiService.getAllCurrencies();

    try {
      await AsyncStorage.setItem(
        "all_data",
        currencies ? JSON.stringify(currencies) : ""
      );

      this.data = currencies;
      return this.getDataCount();
    } catch (e) {
      return 0;
    }
  }

  public async getCryptoList(): Promise<CurrencyInfo[]> {
    return new Promise(async (resolve) => {
      // Simulate async operation
      const data: string | null = await AsyncStorage.getItem(dataBaseKey);
      const storedData: AllCurrencyInfo = data
        ? JSON.parse(data)
        : { crypto: [], fiat: [] };
      setTimeout(() => {
        resolve(storedData.crypto ?? (this.data?.crypto || []));
      }, 100);
    });
  }

  public async getFiatList(): Promise<CurrencyInfo[]> {
    return new Promise(async (resolve) => {
      // Simulate async operation
      const data: string | null = await AsyncStorage.getItem(dataBaseKey);
      const storedData: AllCurrencyInfo = data
        ? JSON.parse(data)
        : { crypto: [], fiat: [] };
      setTimeout(() => {
        resolve(storedData.fiat ?? (this.data?.fiat || []));
      }, 100);
    });
  }

  public async getAllList(): Promise<(CurrencyInfo | FiatInfo)[]> {
    return new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        if (!this.data) {
          resolve([]);
          return;
        }
        resolve(this.data.crypto.concat(this.data?.fiat || []));
      }, 100);
    });
  }

  public getDataCount(): number {
    return (this.data?.crypto.length || 0) + (this.data?.fiat.length || 0);
  }
}

export default LocalDatabase;
