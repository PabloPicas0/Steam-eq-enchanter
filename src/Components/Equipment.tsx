type PropTypes = {
  items: {
    assets: {
      appid: number;
      contextid: string;
      assetid: string;
      classid: string;
      instanceid: string;
      amount: string;
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
};

function Equipment(props: PropTypes) {
  const { items } = props;
  
  return (
    <section className="equipment-container">
      {items.descriptions.slice(0, 54).map((item, idx) => {
        return (
          <div key={idx} style={{ color: "#fafafa" }}>
            <img
              src={` http://cdn.steamcommunity.com/economy/image/${item.icon_url}`}
              width={50}
              height={50}
            />
            <p>{item.market_name}</p>
          </div>
        );
      })}
    </section>
  );
}

export default Equipment;
