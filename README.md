# CryptoBasics - React Native Currency App

A React Native application built with Expo that provides cryptocurrency and fiat currency management with a local Express.js API server.

## 🚀 Features

- **5 Interactive Buttons**: Clear database, insert data, view crypto list, view fiat list, and view purchasable currencies
- **Local API Server**: Express.js server serving currency data from JSON files
- **Currency Lists**: Manage and display cryptocurrency and fiat currency information
- **Search Functionality**: Advanced search with multiple criteria matching
- **Modal Navigation**: View currency lists in full-screen modals
- **Server Status Monitoring**: Real-time server connectivity status
- **Database Simulation**: Local storage simulation with AsyncStorage patterns
- **Constants-Driven Architecture**: Centralized configuration for all strings and settings

## 📱 Tech Stack

### Frontend

- **React Native** with Expo (~54.0.13)
- **TypeScript** for type safety
- **styled-components** for CSS-in-JS styling
- **React Navigation** for modal management

### Backend

- **Express.js** (v5.1.0) REST API server
- **CORS** middleware for cross-origin requests
- **JSON file-based data storage**

### Testing

- **Jest** with React Native Testing Library
- **Comprehensive UI component testing** for both screens
- **Service mocking** for LocalDatabase and ApiService
- **Error scenario testing** and edge case coverage
- **Search functionality validation** with multiple test cases

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- yarn (package manager)
- Expo CLI (optional, for mobile development)

### Clone Repository

```bash
git clone <repository-url>
cd CryptoBasics
```

### Install Dependencies

```bash
yarn install
```

## 🏃‍♂️ Running the Application

#### 1. Start the Express Server

```bash
# Standard server
yarn server

# Development server with auto-reload
yarn server:dev

# Minimal server (fallback if routing issues)
node minimal-server.js
```

The server will start on **http://localhost:3001**

#### 2. Start the React Native App

```bash
yarn start
```

#### 3. Run on Specific Platforms

```bash
# iOS Simulator
yarn ios

# Android Emulator
yarn android

# Web Browser
yarn web
```

## 🌐 API Endpoints

The Express server provides the following REST API endpoints:

### Base URL: `http://localhost:3001`

| Endpoint                 | Method | Description                        |
| ------------------------ | ------ | ---------------------------------- |
| `/`                      | GET    | Server information and status      |
| `/api/health`            | GET    | Health check endpoint              |
| `/api/currencies/crypto` | GET    | Get cryptocurrency list            |
| `/api/currencies/fiat`   | GET    | Get fiat currency list             |
| `/api/currencies/all`    | GET    | Get all currencies (crypto + fiat) |

### Example API Calls

```bash
# Health check
curl http://localhost:3001/api/health

# Get all currencies
curl http://localhost:3001/api/currencies/all

# Get crypto currencies only
curl http://localhost:3001/api/currencies/crypto
```

## 📊 Data Structure

### Currency Data Format

```typescript
interface CurrencyInfo {
  id: string;
  name: string;
  symbol: string;
  code?: string;
}
```

### Data Files

- `assets/data/currencyListA.json` - Cryptocurrency data
- `assets/data/currencyListB.json` - Fiat currency data

## 🧪 Testing

The project includes comprehensive unit tests for both UI components and business logic.

### Run All Tests

```bash
yarn test
```

### Run Specific Test Files

```bash
# HomeScreen component tests (5 buttons + error handling)
yarn test -- HomeScreen.test.tsx

# CurrencyListScreen component tests (search functionality)
yarn test -- CurrencyListScreen.test.tsx
```

### Run Tests with Coverage

```bash
yarn test --coverage
```

### Test Structure

#### HomeScreen Tests (`src/__tests__/HomeScreen.test.tsx`)

- **Button Functionality**: Tests all 5 core buttons with proper service method calls
- **Error Handling**: Comprehensive error scenarios for each operation
- **Edge Cases**: Empty database validation, server offline scenarios
- **UI States**: Loading states, button text changes, database count updates
- **Integration**: Service mocking and Alert verification

#### CurrencyListScreen Tests (`src/__tests__/CurrencyListScreen.test.tsx`)

- **Search Logic**: Multiple search criteria (name, symbol, partial matches)
- **Case Sensitivity**: Case-insensitive search validation
- **UI Interactions**: Search input focus, clear button functionality
- **Edge Cases**: Empty results, special characters, whitespace handling
- **State Management**: Filter updates, search clearing, list restoration

### Test Configuration

The project uses Jest with React Native Testing Library:

- `jest.config.js` - Jest configuration with React Native presets
- `setup.ts` - Test environment setup and global mocks
- Mock services for LocalDatabase and ApiService
- AsyncStorage mocking for local data simulation

### Test Coverage

- ✅ **HomeScreen Tests**: 13 comprehensive tests covering all 5 buttons
  - Basic rendering and UI elements
  - Button press functionality and service calls
  - Error handling for all operations
  - Edge cases (empty database, server offline)
  - Loading states and user feedback
- ✅ **CurrencyListScreen Tests**: 16 comprehensive tests covering search functionality
  - Basic rendering and currency display
  - Search filtering by name, symbol, and partial matches
  - Case-insensitive search
  - Clear search functionality
  - Empty states and edge cases
  - UI interactions (focus, clear button)

## 🏗️ Project Structure

```
cryptobasics/
├── App.tsx                     # Main app component
├── assets/
│   └── data/
│       ├── currencyListA.json  # Crypto currency data
│       └── currencyListB.json  # Fiat currency data
├── src/
│   ├── constants.ts            # App-wide constants
│   ├── screens/
│   │   ├── HomeScreen.tsx      # Main screen with 5 buttons
│   │   └── CurrencyListScreen.tsx # Currency list with search
│   ├── services/
│   │   ├── ApiService.ts       # HTTP client service
│   │   └── LocalDatabase.ts    # Database simulation
│   ├── styles/
│   │   └── styles.ts           # Styled components
│   ├── types/
│   │   └── CurrencyInfo.ts     # TypeScript interfaces
│   └── __tests__/              # Unit tests
│       ├── HomeScreen.test.tsx # 5 buttons + error handling tests
│       └── CurrencyListScreen.test.tsx # Search functionality tests
├── server.js                   # Express server (with routing)
├── minimal-server.js           # Simplified Express server
├── package.json
├── jest.config.js             # Jest testing configuration
├── setup.ts                   # Test environment setup
└── tsconfig.json              # TypeScript configuration
```

## 🎯 App Functionality

### The 5 Core Buttons

1. **Clear Database**

   - Clears all stored currency data
   - Updates database count display
   - Shows success confirmation

2. **Insert Data**

   - Fetches currency data from local API server
   - Inserts data into local database simulation
   - Requires server to be running
   - Shows inserted record count

3. **Show Crypto List**

   - Displays cryptocurrency list in modal
   - Requires data to be inserted first
   - Includes search functionality

4. **Show Fiat List**

   - Displays fiat currency list in modal
   - Requires data to be inserted first
   - Includes search functionality

5. **Show Purchasable**
   - Displays all currencies (crypto + fiat) in modal
   - Requires data to be inserted first
   - Combined list of all purchasable currencies

### Search Functionality

The CurrencyListScreen includes advanced search with multiple matching criteria:

- **Name starts with search term**: Exact prefix matching (e.g., "bit" matches "Bitcoin")
- **Name contains partial match with space prefix**: Multi-word support (e.g., "cash" matches "Bitcoin Cash")
- **Symbol starts with search term**: Currency symbol prefix matching (e.g., "BT" matches "BTC")
- **Case insensitive**: Search works regardless of case ("BITCOIN" matches "Bitcoin")
- **Real-time filtering**: Results update as you type
- **Clear functionality**: X button to clear search and restore full list
- **Empty state handling**: Shows appropriate messages for no results

### Search Test Coverage

The search functionality includes 12 dedicated tests covering:

- All three search criteria types
- Case sensitivity handling
- Clear button functionality
- Empty states and edge cases
- Special characters and whitespace
- Multiple result matching

## 🔧 Configuration

### Constants File (`src/constants.ts`)

All app strings, colors, and endpoints are centralized:

- UI text and button labels
- Alert messages and modal titles
- API endpoints and server configuration
- Color palette and theme settings

### Environment Setup

- **Development**: Uses local server on port 3001
- **API Base URL**: `http://localhost:3001/api`
- **Database**: Simulated with AsyncStorage patterns

## 🚨 Troubleshooting

### Server Issues

1. **Port 3001 already in use**:

   ```bash
   lsof -i :3001
   kill -9 <PID>
   ```

2. **path-to-regexp errors**: Use minimal server

   ```bash
   node minimal-server.js
   ```

3. **CORS issues**: Server includes CORS middleware

### App Issues

1. **Metro bundler cache**: Clear cache

   ```bash
   npx expo start --clear
   ```

2. **Node modules**: Reinstall dependencies
   ```bash
   rm -rf node_modules yarn.lock
   yarn install
   ```

## 🔮 Development

### Available Scripts

```json
{
  "start": "expo start",
  "android": "expo start --android",
  "ios": "expo start --ios",
  "web": "expo start --web",
  "server": "node server.js",
  "server:dev": "nodemon server.js",
  "dev": "concurrently \"npm run server\" \"npm start\"",
  "test": "jest",
  "test:watch": "jest --watch"
}
```

### Code Style

- TypeScript for type safety
- Functional React components with hooks
- Styled-components with transient props
- Constants-driven architecture
- Singleton patterns for services
- Comprehensive error handling

## 📝 License

This project is licensed under the **0BSD License** - see the package.json for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

---

## 🎉 Quick Start Summary

```bash
# 1. Install dependencies
yarn install

# 2. Start both server and app
yarn dev

# 3. Test the functionality
yarn test

# 4. View test results
# - HomeScreen: 13 tests (buttons + error handling)
# - CurrencyListScreen: 16 tests (search functionality)

# 5. Access the app
# - Expo dev tools: http://localhost:8081
# - API server: http://localhost:3001
```

**Happy coding! 🚀**
