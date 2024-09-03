import { Quality } from "../models/ItemQualityModel.js";
import { UserInvenotryType } from "../models/UserInventoryModel.js";

function addItemDescriptions(userInventory: UserInvenotryType) {
  for (let i = 0; i < userInventory.assets.length; ++i) {
    const item = userInventory.assets[i];

    for (let j = 0; j < userInventory.descriptions.length; ++j) {
      const description = userInventory.descriptions[j];

      if (item.classid === description.classid) {
        const color = description.tags.find((tag) => tag.color).color;
        const qualityTag = description.tags.find((tag) => tag.category === "Rarity").localized_tag_name;

        item.name = description.name;
        item.market_name = description.market_name;
        item.icon_url = description.icon_url;
        item.type = description.type;
        item.color = color;
        item.quality = Quality[qualityTag];
        break;
      }
    }
  }
}

export default addItemDescriptions;
