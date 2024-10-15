import { PriceHistoryModel } from "./PriceHistoryModel";

export type AdditionalItemModel = {
  success: boolean;
  start: number;
  pagesize: number;
  total_count: number;
  searchdata: {
    query: string;
    search_descriptions: boolean;
    total_count: number;
    pagesize: number;
    prefix: string;
    class_prefix: string;
  };
  results: {
    name: string;
    hash_name: string;
    sell_listings: number;
    sell_price: number;
    sell_price_text: string;
    app_icon: string;
    app_name: string;
    asset_description: {
      appid: number;
      classid: string;
      instanceid: string;
      background_color: string;
      icon_url: string;
      tradable: number;
      name: string;
      name_color: string;
      type: string;
      market_name: string;
      market_hash_name: string;
      commodity: number;
    };
    price_history?: PriceHistoryModel;
    sale_price_text: string;
  }[];
};
