function getSavedItemProps(classid: string) {
  const storagePrice = localStorage.getItem(`${classid}`);

  if (storagePrice) return parseFloat(storagePrice);

  return 0.03;
}

export default getSavedItemProps;
