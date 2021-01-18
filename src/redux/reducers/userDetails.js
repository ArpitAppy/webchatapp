const { SUBMIT_NEWUSER_DETAILS, SUBMIT_NEW_CHATROOM } = require("../actions/actionTypes");

  const initailState = {
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
  };

  const chatroomState = {
      name : ''
  }
  
  export const newUserInfoReducer = (state = initailState, action) => {
    switch (action.type) {
      case SUBMIT_NEWUSER_DETAILS:
        return {
          ...state,
          fullName: action.payload ? action.payload.user.fullName : "",
          emailAddress: action.payload ? action.payload.user.emailAddress : "",
          mobileNumber: action.payload ? action.payload.user.mobileNumber : "",
          password: action.payload.user.password,
        };
      default:
        return state;
    }
  };

  export const newChatRoomReducer = (state = chatroomState, action) => {
    switch (action.type) {
        case SUBMIT_NEW_CHATROOM:
            return {
                name: action.payload ? action.payload.name : ''
            };
      default:
        return state;
    }
  };
  