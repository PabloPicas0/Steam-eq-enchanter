function getSavedItemProps(classid: string) {
  const storage = localStorage.getItem("prices");

  if (!storage) return 0.03;

  const prices = JSON.parse(storage) as { [key: string]: number | undefined };
  const price = prices[classid];

  if (!price) return 0.03;

  return price;
}

export default getSavedItemProps;
