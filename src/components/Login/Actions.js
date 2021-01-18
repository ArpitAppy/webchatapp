import {
    SUBMIT_NEWUSER_DETAILS,
  } from "./ActionTypes";
  
  export const setNewUserDetails = (user) => {
    return {
      type: SUBMIT_NEWUSER_DETAILS,
      payload: {
        user: user,
      },
    };
  };
  
  
  