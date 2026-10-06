import { mockPick, mockText } from "@/utils/mockData";

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

const MOCK_TRADES: CartonTrade[] = [
  {
    manufacturer: "Apple",
    model: "iPhone 16 Pro Max",
    modelCode: "A3084",
    storage: "256GB",
    carrier: "VZW",
    itemNumber: "688654342",
    imei: "353912105260185",
    tradeInDate: "7/11/26",
    canceled: "",
    shortage: "",
    part: "",
  },
  {
    manufacturer: "Samsung",
    model: "Galaxy S24 Ultra",
    modelCode: "SM-S928U",
    storage: "512GB",
    carrier: "ATT",
    itemNumber: "736387129",
    imei: "356938031590830",
    tradeInDate: "7/14/26",
    canceled: "",
    shortage: "",
    part: "",
  },
  {
    manufacturer: "Apple",
    model: "iPhone 14",
    modelCode: "A2882",
    storage: "128GB",
    carrier: "TMO",
    itemNumber: "666882258",
    imei: "490154200166132",
    tradeInDate: "7/18/26",
    canceled: "Yes",
    shortage: "",
    part: "",
  },
  {
    manufacturer: "Google",
    model: "Pixel 8 Pro",
    modelCode: "GC3VE",
    storage: "128GB",
    carrier: "VZW",
    itemNumber: "215857618",
    imei: "358476111860912",
    tradeInDate: "8/2/26",
    canceled: "",
    shortage: "",
    part: "",
  },
  {
    manufacturer: "Apple",
    model: "iPhone 15 Pro",
    modelCode: "A3101",
    storage: "256GB",
    carrier: "ATT",
    itemNumber: "632814534",
    imei: "352897093909961",
    tradeInDate: "8/9/26",
    canceled: "",
    shortage: "",
    part: "Battery",
  },
  {
    manufacturer: "Samsung",
    model: "Galaxy S23",
    modelCode: "SM-S911U",
    storage: "256GB",
    carrier: "TMO",
    itemNumber: "778238795",
    imei: "864120050308247",
    tradeInDate: "8/21/26",
    canceled: "",
    shortage: "Yes",
    part: "",
  },
  {
    manufacturer: "Apple",
    model: "iPhone 13",
    modelCode: "A2482",
    storage: "128GB",
    carrier: "OTH",
    itemNumber: "845120367",
    imei: "354679116281943",
    tradeInDate: "9/3/26",
    canceled: "",
    shortage: "",
    part: "",
  },
  {
    manufacturer: "Motorola",
    model: "Moto G Power 5G",
    modelCode: "XT2415V",
    storage: "128GB",
    carrier: "OTH",
    itemNumber: "317906482",
    imei: "350973128219932",
    tradeInDate: "9/15/26",
    canceled: "",
    shortage: "",
    part: "",
  },
];

const MIN_TRADES_PER_CARTON = 3;
const EXTRA_TRADE_COUNTS = 3;

/** Finds the carton of a tracking number. Replace with the real API call. */
export function findCarton(trackingNumber: string): Carton {
  const extraTrades = Number(mockText(`${trackingNumber}-size`, 1)) % EXTRA_TRADE_COUNTS;

  return {
    id: mockText(`${trackingNumber}-carton`, 10),
    trades: mockPick(MOCK_TRADES, trackingNumber, MIN_TRADES_PER_CARTON + extraTrades),
  };
}
