const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_PROJECT':
      return {
        ...state,
        projectInfo: action.payload
      };
    case 'SET_FLOWDATA':
      return {
        ...state,
        flowData: action.payload
      };
    case 'SET_STATUS':
      return {
        ...state,
        projectStatus: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };


    default:
      return state;
  }
};

export default Reducer;
