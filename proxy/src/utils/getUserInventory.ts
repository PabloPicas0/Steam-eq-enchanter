async function getUserInventory(id: string) {
  const inventory = await fetch(
    `http://steamcommunity.com/inventory/${id}/730/2?l=english&count=5000`
  );
  const inventoryData = await inventory.json();

  return inventoryData;
}

export default getUserInventory
