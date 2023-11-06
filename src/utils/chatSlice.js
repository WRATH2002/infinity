import { createSlice } from "@reduxjs/toolkit";
// import { messageges } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    FlagOneMessage: [],
    FlagTwoMessage: [],
    FriendList: [],
    SearchFriendList: [],
    ActiveUser: "",
    SendFlag: true,
    LastId: 1,
    signingMode: 1,
    // chatSegment: [{ chatId: "hello" }],
    // signingMode: 1,
    // darkMode: 1,
  },
  reducers: {
    // addChatSegment: (state, action) => {
    //   state.chatSegment.push(action.payload);
    //   console.log(state.chatSegment);
    // },
    // clearChatSegment: (state, action) => {
    //   state.chatSegment = [];
    // },
    toggleSendFlag: (state, action) => {
      state.SendFlag = action.payload;
      // console.log(state.messages);
    },
    addFlagOneMessage: (state, action) => {
      state.FlagOneMessage = [];
      state.FlagOneMessage.push(action.payload);
      // console.log(state.messages);
    },
    pushFlagOneMessage: (state, action) => {
      state.FlagOneMessage.push(action.payload);
      // console.log(state.messages);
    },
    clearFlagOneMessage: (state, action) => {
      state.FlagOneMessage = [];
      // console.log(state.messages);
    },
    addFlagTwoMessage: (state, action) => {
      state.FlagTwoMessage = [];
      state.FlagTwoMessage.push(action.payload);
      // console.log(state.messages);
    },
    pushFlagTwoMessage: (state, action) => {
      state.FlagTwoMessage.push(action.payload);
      // console.log(state.messages);
    },
    clearFlagTwoMessage: (state, action) => {
      state.FlagTwoMessage = [];
      // console.log(state.messages);
    },
    addFriendList: (state, action) => {
      state.FriendList.push(action.payload);
      // console.log(state.messages);
    },
    addSearchFriendList: (state, action) => {
      state.SearchFriendList.push(action.payload);
      // console.log(state.messages);
    },
    clearSearchFriendList: (state, action) => {
      state.SearchFriendList = [];
      // console.log(state.messages);
    },
    clearFriendList: (state, action) => {
      state.FriendList = [];
      // console.log(state.messages);
    },
    addActiveUser: (state, action) => {
      state.ActiveUser = "";
      state.ActiveUser = action.payload;
    },
    addLastId: (state, action) => {
      state.LastId = action.payload;
    },
    toggleStateMode: (state, action) => {
      state.signingMode = action.payload;
      console.log(state.signingMode);
    },
    // addMessageNew: (state, action) => {
    //   state.messages = [];
    // },
    // addAnswer: (state, action) => {
    //   const temp = action.payload;
    //   console.log(temp);
    //   const idToInsert = temp.id;
    //   const message = temp.result;
    //   state.messages.forEach((info) => {
    //     if (info.id === idToInsert) {
    //       info.assistant = message;
    //     }
    //   });
    // },
    // toggleStateMode: (state, action) => {
    //   state.signingMode = action.payload;
    //   console.log(state.signingMode);
    // },
    // toggleDarkMode: (state, action) => {
    //   state.darkMode = action.payload;
    //   console.log("slice");
    //   console.log(state.darkMode);
    // },
  },
});

export const {
  addFlagOneMessage,
  addFlagTwoMessage,
  addFriendList,
  clearFriendList,
  addActiveUser,
  clearFlagOneMessage,
  clearFlagTwoMessage,
  toggleSendFlag,
  pushFlagOneMessage,
  pushFlagTwoMessage,
  addSearchFriendList,
  clearSearchFriendList,
  addLastId,
  toggleStateMode,
} = chatSlice.actions;

export default chatSlice.reducer;
