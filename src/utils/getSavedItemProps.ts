function getSavedItemProps(classid: string) {
  const storageProps = localStorage.getItem(`${classid}`);

  if (storageProps) return JSON.parse(storageProps);

  return 0.03;
}


export default getSavedItemProps;
