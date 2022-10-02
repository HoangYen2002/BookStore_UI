const rootReducers = (state = 0, action) => {
  switch (action.type) {
    case "quantityCart":
      return {
        quantityCartt: (state = action.payload),
      };
    case "RemoveQuantityAllCart":
      return {
        quantityCartt: (state = action.payload),
      };

    default:
      return state;
  }
};

export default rootReducers;
