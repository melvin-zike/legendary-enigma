export const loginStart = () => ({
    type: "LOGIN_START",
});
export const loginSuccess =(user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const loginFailure =(err) => ({
    type: "LOGIN_FAILURE",
    message: err,
});

 //Logout
 export const logout = () => ({
    type: "LOGOUT",
});

export const Follow = (userId) => ({
    type: "FOLLOW",
    payload: userId,
  });
  
  export const Unfollow = (userId) => ({
    type: "UNFOLLOW",
    payload: userId,
  });
