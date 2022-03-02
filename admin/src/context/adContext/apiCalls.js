import axios from "axios";
import {
  createAdFailure,
  createAdStart,
  createAdSuccess,
  deleteAdFailure,
  deleteAdStart,
  deleteAdSuccess,
  getAdsFailure,
  getAdsStart,
  getAdsSuccess,
} from "./AdActions";


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getAds = async (dispatch) => {
  dispatch(getAdsStart());
  try {
    const res = await axiosInstance.get("/ads", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getAdsSuccess(res.data));
  } catch (err) {
    dispatch(getAdsFailure());
  }
};

//create
export const createAd = async (ad, dispatch) => {
  dispatch(createAdStart());
  try {
    const res = await axiosInstance.post("/ads", ad, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createAdSuccess(res.data));
  } catch (err) {
    dispatch(createAdFailure());
  }
};

//delete
export const deleteAd = async (id, dispatch) => {
  dispatch(deleteAdStart());
  try {
    await axiosInstance.delete("/ads/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteAdSuccess(id));
  } catch (err) {
    dispatch(deleteAdFailure());
  }
};