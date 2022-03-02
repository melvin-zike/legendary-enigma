const AdReducer = (state, action) => {
    switch (action.type) {
      case "GET_ADS_START":
        return {
          ads: [],
          isFetching: true,
          error: false,
        };
      case "GET_ADS_SUCCESS":
        return {
          ads: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_ADS_FAILURE":
        return {
          ads: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_AD_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_AD_SUCCESS":
        return {
          ads: [...state.ads, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_AD_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPLOAD_AD_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPLOAD_AD_SUCCESS":
        return {
          ads: state.ads.map(
            (ad) => ad._id === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPLOAD_AD_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_AD_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_AD_SUCCESS":
        return {
          ads: state.ads.filter((ad) => ad._id !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_AD_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default AdReducer;