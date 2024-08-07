import { createSlice } from "@reduxjs/toolkit";
// import { messageges } from "./constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    FlagOneMessage: [],
    FlagTwoMessage: [],
    FriendList: [],
    AllFriendList: [],
    SearchFriendList: [],
    allGroup: [],
    totalGroup: [],
    allGroupMembers: [],
    ActiveUser: "",
    SendFlag: true,
    LastId: 1,
    signingMode: 1,
    imageMediaLink: [],
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
    addImageMediaLink: (state, action) => {
      state.imageMediaLink.push(action.payload);
      // console.log(state.messages);
    },
    clearImageMediaLink: (state, action) => {
      state.imageMediaLink = [];
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
    addAllFriendList: (state, action) => {
      state.AllFriendList.push(action.payload);
      // console.log(state.messages);
    },
    clearAllFriendList: (state, action) => {
      state.AllFriendList = [];
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
      // console.log(state.signingMode);
    },

    addAllGroup: (state, action) => {
      state.allGroup.push(action.payload);
      // console.log(state.messages);
    },
    clearAllGroup: (state, action) => {
      state.allGroup = [];
      // console.log(state.messages);
    },
    addTotalGroup: (state, action) => {
      state.totalGroup.push(action.payload);
      // console.log(state.messages);
    },
    clearTotalGroup: (state, action) => {
      state.totalGroup = [];
      // console.log(state.messages);
    },
    addAllGroupMembers: (state, action) => {
      state.allGroupMembers.push(action.payload);
      // console.log(state.messages);
    },
    clearAllGroupMembers: (state, action) => {
      state.allGroupMembers = [];
      // console.log(state.messages);
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
  addAllFriendList,
  clearAllFriendList,
  addImageMediaLink,
  clearImageMediaLink,
  addAllGroup,
  clearAllGroup,
  addAllGroupMembers,
  clearAllGroupMembers,
  addTotalGroup,
  clearTotalGroup,
} = chatSlice.actions;

export default chatSlice.reducer;
