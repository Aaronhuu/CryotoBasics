import { AllCurrencyInfo, CurrencyInfo } from "../types/CurrencyInfo";
import { API_CONFIG, API_ENDPOINTS } from "../constants";

const API_BASE_URL = API_CONFIG.BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  count?: number;
  error?: string;
}

class ApiService {
  private static instance: ApiService;

  private constructor() {}

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "API request failed");
      }

      return data.data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Get crypto currencies (Currency List A)
  public async getCryptoCurrencies(): Promise<CurrencyInfo[]> {
    return this.makeRequest<CurrencyInfo[]>(API_ENDPOINTS.CURRENCIES.CRYPTO);
  }

  // Get fiat currencies (Currency List B)
  public async getFiatCurrencies(): Promise<CurrencyInfo[]> {
    return this.makeRequest<CurrencyInfo[]>(API_ENDPOINTS.CURRENCIES.FIAT);
  }

  // Get all currencies
  public async getAllCurrencies(): Promise<AllCurrencyInfo> {
    return this.makeRequest<AllCurrencyInfo>(API_ENDPOINTS.CURRENCIES.ALL);
  }

  // Search currencies by term
  public async searchCurrencies(searchTerm: string): Promise<CurrencyInfo[]> {
    if (!searchTerm.trim()) {
      return [];
    }
    return this.makeRequest<CurrencyInfo[]>(
      API_ENDPOINTS.CURRENCIES.SEARCH(searchTerm)
    );
  }

  // Get currency by ID
  public async getCurrencyById(id: string): Promise<CurrencyInfo | null> {
    try {
      return await this.makeRequest<CurrencyInfo>(
        API_ENDPOINTS.CURRENCIES.BY_ID(id)
      );
    } catch (error) {
      // Return null if currency not found
      return null;
    }
  }

  // Health check
  public async healthCheck(): Promise<any> {
    return this.makeRequest<any>(API_ENDPOINTS.HEALTH);
  }

  // Check if server is running
  public async isServerRunning(): Promise<boolean> {
    try {
      await this.healthCheck();
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default ApiService;
