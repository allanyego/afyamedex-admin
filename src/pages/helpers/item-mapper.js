export default function itemMapper(itemKey, data) {
  return (item) => {
    if (item._id === itemKey || item.id === itemKey) {
      return {
        ...item,
        ...data,
      };
    }

    return item;
  };
}
