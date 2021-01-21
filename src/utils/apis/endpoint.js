import { URL } from "../../config";

const version = "/api/v1";

export const APIS = {
  _login: URL + version + "/loginUser",
  _registration: URL + version + "/registerUser",
  _getAllUsers: URL + version + '/getAllUsers',
  _getUserDetails: URL + version + '/getUserDetails',
  _getMessages: URL + version + '/getMessages',
  _newMessage: URL + version + '/newMessage',
  _createChatRoom: URL + version + '/createChatRoom',
  _getChatRoom: URL + version + '/getChatRoom',
  _getMessagesForChatroom: URL + version + '/getMessagesForChatroom',
  _updateReadStatus: URL + version + '/updateReadStatus',
};
