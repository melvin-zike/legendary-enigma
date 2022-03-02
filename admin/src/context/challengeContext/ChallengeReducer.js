const ChallengeReducer = (state, action) => {
    switch (action.type) {
      case "GET_CHALLENGES_START":
        return {
          challenges: [],
          isFetching: true,
          error: false,
        };
      case "GET_CHALLENGES_SUCCESS":
        return {
          challenges: action.payload,
          isFetching: false,
          error: false,
        };
      case "GET_CHALLENGES_FAILURE":
        return {
          challenges: [],
          isFetching: false,
          error: true,
        };
      case "CREATE_CHALLENGE_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "CREATE_CHALLENGE_SUCCESS":
        return {
          challenges: [...state.challenges, action.payload],
          isFetching: false,
          error: false,
        };
      case "CREATE_CHALLENGE_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "UPLOAD_CHALLENGE_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "UPLOAD_CHALLENGE_SUCCESS":
        return {
          challenges: state.challenges.map(
            (challenge) => challenge._challenge === action.payload._id && action.payload
          ),
          isFetching: false,
          error: false,
        };
      case "UPLOAD_CHALLENGE_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      case "DELETE_CHALLENGE_START":
        return {
          ...state,
          isFetching: true,
          error: false,
        };
      case "DELETE_CHALLENGE_SUCCESS":
        return {
          challenges: state.challenges.filter((challenge) => challenge._challenge !== action.payload),
          isFetching: false,
          error: false,
        };
      case "DELETE_CHALLENGE_FAILURE":
        return {
          ...state,
          isFetching: false,
          error: true,
        };
      default:
        return { ...state };
    }
  };
  
  export default ChallengeReducer;