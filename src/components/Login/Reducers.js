const { SUBMIT_NEWUSER_DETAILS } = require("./ActionTypes");
  
  const initailState = {
    fullName: "",
    emailAddress: "",
    mobileNumber: "",
    password: "",
  };
  
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
  