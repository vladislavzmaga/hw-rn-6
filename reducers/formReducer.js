const formReducer = (state, action) => {
  switch (action.type) {
    case "add input":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "input focus":
      return {
        ...state,
        [action.field]: action.payload,
      };
    case "refresh user data":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default formReducer;
