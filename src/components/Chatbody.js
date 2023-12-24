import { useEffect, useState } from "react";
import MessageBody from "./MessageBody";
import UserInfo from "./UserInfo";
import UserInfoSidebar from "./UserInfoSidebar";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addFlagOneMessage,
  addFlagTwoMessage,
  toggleSendFlag,
} from "../utils/chatSlice";

const Chatbody = () => {
  const [userInfoSidebar, setUserInfoSidebar] = useState(false);
  const [chatMessage, setChatMessage] = useState([]);
  const [Messages, setMessages] = useState("");
  const [flagTwoUser, setFlagTwoUser] = useState("");
  const [chatUserName, setChatUserName] = useState("");

  const temp1 = useSelector((store) => store.chat.FlagOneMessage);
  const temp2 = useSelector((store) => store.chat.FlagTwoMessage);

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ChatOne = useSelector((store) => store.chat.FlagOneMessage);
  const ChatTwo = useSelector((store) => store.chat.FlagTwoMessage);

  // console.log("temp1");
  // console.log(temp1);
  // console.log("temp2");
  // console.log(temp2);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // fetchChatUserInfo();
  //   // fetchChatHistoryUserOne();
  //   if (ActiveChatUser.length !== 0) {
  //     sendMessage();
  //   }

  // }, [ChatOne, ChatTwo]);

  // function fetchChatUserInfo() {
  //   const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
  //   userDoc.get().then((data) => setChatUserName(data.data().Name));
  // }

  function toggleUserInfoSidebar() {
    setUserInfoSidebar(!userInfoSidebar);
    // console.log(userInfoSidebar);
  }

  function fetchChatHistoryUserOne() {
    // const user = firebase.auth().currentUser;
    // const userOneDoc = db
    //   .collection("Chat Record")
    //   .doc(user?.uid)
    //   .collection("Chat Friends");
    // userOneDoc.get().then((snapshot) =>
    //   snapshot?.forEach((doc) => {
    //     console.log(doc.id);
    //     const Doc = db
    //       .collection("Chat Record")
    //       .doc(user.uid)
    //       .collection("Chat Friends")
    //       .doc(doc.id);
    //     Doc.get().then((doc) => console.log(doc.data().ChatHistory));
    //     // setChatMessage(doc.data().ChatHistory);
    //     doc.data().ChatHistory?.forEach((chats) => {
    //       // dispatch(
    //       //   addFlagOneMessage({
    //       //     id: chats.id,
    //       //     Message: chats.Message,
    //       //     Flag: chats.Flag,
    //       //   })
    //       // );
    //     });
    //   })
    // );
  }

  function fetchChatHistoryUserTwo() {
    // const user = firebase.auth().currentUser;
    // console.log(flagTwoUser);
    // const userTwoDoc = db
    //   .collection("Chat Record")
    //   .doc(flagTwoUser)
    //   .collection("Chat Friends");
    // userTwoDoc.get().then((snapshot) =>
    //   snapshot?.forEach((doc) => {
    //     console.log(doc.id);
    //     const Doc = db
    //       .collection("Chat Record")
    //       .doc(flagTwoUser)
    //       .collection("Chat Friends")
    //       .doc(doc.id);
    //     Doc.get().then((doc) => console.log(doc.data().ChatHistory));
    //     // setChatMessage(doc.data().ChatHistory);
    //     doc.data().ChatHistory?.forEach((chats) => {
    //       dispatch(
    //         addFlagTwoMessage({
    //           id: chats.id,
    //           Message: chats.Message,
    //           Flag: chats.Flag,
    //         })
    //       );
    //     });
    //   })
    // );
  }

  function sendMessage() {
    // console.log("Clicked");
    if (ActiveChatUser.length !== 0) {
      const user = firebase.auth().currentUser;
      const userDoc = db
        .collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser);

      userDoc.get().then((doc) => {
        if (doc.exists) {
          // console.log("Document available");
          userDoc.set({
            ChatHistory: ChatOne,
          });
        } else {
          db.collection("Chat Record")
            .doc(user.uid)
            .collection("Chat Friends")
            .doc(ActiveChatUser)
            .set({
              ChatHistory: ChatOne,
            });
          // console.log("No such document");
        }
      });

      // -------------------------------------------

      const MyDoc = db
        .collection("Chat Record")
        .doc(ActiveChatUser)
        .collection("Chat Friends")
        .doc(user.uid);

      MyDoc.get().then((doc) => {
        if (doc.exists) {
          // console.log("Document available");
          MyDoc.set({
            ChatHistory: ChatTwo,
          });
        } else {
          db.collection("Chat Record")
            .doc(ActiveChatUser)
            .collection("Chat Friends")
            .doc(user.uid)
            .set({
              ChatHistory: ChatTwo,
            });
          // console.log("No such document");
        }
      });
    }
  }

  return (
    <>
      <div className="font-bold w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[100svh] bg-white flex flex-col justify-center items-center">
        {/* Chatbody */}
        {userInfoSidebar === false ? (
          <>
            <div
              className="w-full h-[100svh] flex justify-between items-center bg-[#d9e1e4]"
              style={{ transition: ".5s" }}
            >
              <div className="w-full h-[100svh]">
                <div className="w-full  ">
                  <UserInfo />
                </div>
                <MessageBody />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-[100svh] flex justify-between items-center bg-[#d9e1e4]">
              <div
                className="w-full lg:w-[calc(100%-350px)] md:w-[calc(100%-350px)] h-[100svh] "
                style={{ transition: ".5s" }}
              >
                <div className="w-full cursor-pointer">
                  <UserInfo />
                </div>
                <MessageBody />
              </div>

              {/* <div
                className="w-full lg:w-[350px] md:w-[350px] bg-[#f8fafc] h-full fixed lg:flex md:flex"
                style={{ transition: ".5s" }}
              >
                <span>hello</span>
              </div> */}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbody;
