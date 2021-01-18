import { combineReducers } from "redux";
import { newChatRoomReducer, newUserInfoReducer } from "./userDetails";
const rootReducer = combineReducers({
  userDetails: newUserInfoReducer,
  chatroomDetails: newChatRoomReducer,
});
export default rootReducer;
