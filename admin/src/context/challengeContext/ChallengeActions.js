export const getChallengesStart = () => ({
    type: "GET_CHALLENGES_START",
  });
  
  export const getChallengesSuccess = (challenges) => ({
    type: "GET_CHALLENGES_SUCCESS",
    payload: challenges,
  });
  
  export const getChallengesFailure = () => ({
    type: "GET_CHALLENGES_FAILURE",
  });
  
  export const createChallengeStart = () => ({
    type: "CREATE_CHALLENGE_START",
  });
  
  export const createChallengeSuccess = (challenge) => ({
    type: "CREATE_CHALLENGE_SUCCESS",
    payload: challenge,
  });
  
  export const createChallengeFailure = () => ({
    type: "CREATE_CHALLENGE_FAILURE",
  });
  
  export const updateChallengeStart = () => ({
    type: "UPDATE_CHALLENGE_START",
  });
  
  export const updateChallengeSuccess = (challenge) => ({
    type: "UPDATE_CHALLENGE_SUCCESS",
    payload: challenge,
  });
  
  export const updateChallengeFailure = () => ({
    type: "UPDATE_CHALLENGE_FAILURE",
  });
  
  export const deleteChallengeStart = () => ({
    type: "DELETE_CHALLENGE_START",
  });
  
  export const deleteChallengeSuccess = (id) => ({
    type: "DELETE_CHALLENGE_SUCCESS",
    payload: id,
  });
  
  export const deleteChallengeFailure = () => ({
    type: "DELETE_CHALLENGE_FAILURE",
  });