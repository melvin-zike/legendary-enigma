export const getAdsStart = () => ({
    type: "GET_ADS_START",
  });
  
  export const getAdsSuccess = (ads) => ({
    type: "GET_ADS_SUCCESS",
    payload: ads,
  });
  
  export const getAdsFailure = () => ({
    type: "GET_ADS_FAILURE",
  });
  
  export const createAdStart = () => ({
    type: "CREATE_AD_START",
  });
  
  export const createAdSuccess = (ad) => ({
    type: "CREATE_AD_SUCCESS",
    payload: ad,
  });
  
  export const createAdFailure = () => ({
    type: "CREATE_AD_FAILURE",
  });
  
  export const updateAdStart = () => ({
    type: "UPDATE_AD_START",
  });
  
  export const updateAdSuccess = (ad) => ({
    type: "UPDATE_AD_SUCCESS",
    payload: ad,
  });
  
  export const updateAdFailure = () => ({
    type: "UPDATE_AD_FAILURE",
  });
  
  export const deleteAdStart = () => ({
    type: "DELETE_AD_START",
  });
  
  export const deleteAdSuccess = (id) => ({
    type: "DELETE_AD_SUCCESS",
    payload: id,
  });
  
  export const deleteAdFailure = () => ({
    type: "DELETE_AD_FAILURE",
  });