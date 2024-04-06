export type UserInvenotryType = {
  assets: {
    appid: number;
    contextid: string;
    assetid: string;
    classid: string;
    instanceid: string;
    amount: string;
    market_name: string;
    icon_url: string;
  }[];
  descriptions: {
    appid: number;
    classid: string;
    instanceid: string;
    currency: number;
    background_color: string;
    icon_url: string;
    descriptions: {
      type: string;
      value: string;
    }[];
    tradable: number;
    actions: {
      link: string;
      name: string;
    }[];

    name: string;
    name_color: string;
    type: string;
    market_name: string;
    market_hash_name: string;
    market_actions: {
      link: string;
      name: string;
    }[];

    commodity: number;
    market_tradable_restriction: number;
    marketable: number;
    tags: {
      category: string;
      internal_name: string;
      localized_category_name: string;
      localized_tag_name: string;
    }[];
  }[];
  rwgrsn: number;
  success: number;
  total_inventory_count: number;
};
