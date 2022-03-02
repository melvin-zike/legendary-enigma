import axios from "axios";
import {
  createChallengeFailure,
  createChallengeStart,
  createChallengeSuccess,
  deleteChallengeFailure,
  deleteChallengeStart,
  deleteChallengeSuccess,
  getChallengesFailure,
  getChallengesStart,
  getChallengesSuccess,
} from "./ChallengeActions";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export const getChallenges = async (dispatch) => {
  dispatch(getChallengesStart());
  try {
    const res = await axiosInstance.get("/challenges", {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(getChallengesSuccess(res.data));
  } catch (err) {
    dispatch(getChallengesFailure());
  }
};

//create
export const createChallenge = async (challenge, dispatch) => {
  dispatch(createChallengeStart());
  try {
    const res = await axiosInstance.post("/challenges", challenge, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(createChallengeSuccess(res.data));
  } catch (err) {
    dispatch(createChallengeFailure());
  }
};

//delete
export const deleteChallenge = async (id, dispatch) => {
  dispatch(deleteChallengeStart());
  try {
    await axiosInstance.delete("/challenges/" + id, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(deleteChallengeSuccess(id));
  } catch (err) {
    dispatch(deleteChallengeFailure());
  }
};