import {
    SUBMIT_NEWUSER_DETAILS,
    SUBMIT_NEW_CHATROOM
  } from "./actionTypes";
  
  export const setNewUserDetails = (user) => {
    return {
      type: SUBMIT_NEWUSER_DETAILS,
      payload: {
        user: user,
      },
    };
  };

  export const setNewChatRoom = (name) => {
      return {
          type: SUBMIT_NEW_CHATROOM,
          payload: {
              name
          }
      }
  }