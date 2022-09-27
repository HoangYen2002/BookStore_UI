export const quantityCart = (data) => {
  console.log(data);
  return {
    type: "quantityCart",
    payload: data.quantityCartt,
  };
};

export const RemoveQuantityAllCart = (data) => {
  return {
    type: "RemoveQuantityAllCart",
    payload: data.quantityCartt - 1,
  };
};
