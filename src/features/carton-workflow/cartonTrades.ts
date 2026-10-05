export interface CartonTrade {
  manufacturer: string;
  model: string;
  modelCode: string;
  storage: string;
  carrier: string;
  itemNumber: string;
  imei: string;
  tradeInDate: string;
  canceled: string;
  shortage: string;
  part: string;
}

export interface Carton {
  id: string;
  trades: CartonTrade[];
}

const SAMPLE_TRADE_DETAILS = {
  modelCode: "A2484",
  storage: "128GB",
  carrier: "OTH",
  itemNumber: "123456789",
  imei: "123456789123456",
  tradeInDate: "7/11/26",
  canceled: "",
  shortage: "",
  part: "",
};

const MOCK_TRADES: CartonTrade[] = [
  { manufacturer: "Apple", model: "iPhone 16 Pro Max", ...SAMPLE_TRADE_DETAILS },
  { manufacturer: "Samsung", model: "Galaxy S24", ...SAMPLE_TRADE_DETAILS },
  { manufacturer: "Apple", model: "iPhone 14", ...SAMPLE_TRADE_DETAILS },
  { manufacturer: "Google", model: "Pixel 8", ...SAMPLE_TRADE_DETAILS },
  { manufacturer: "Apple", model: "iPhone 15 Pro", ...SAMPLE_TRADE_DETAILS },
];

/** Sample data used until the real carton lookup is connected. */
export const MOCK_CARTON: Carton = { id: "5038044829", trades: MOCK_TRADES };
