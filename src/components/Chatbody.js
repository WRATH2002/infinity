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
      <div className="font-bold w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-full bg-white flex flex-col justify-center items-center">
        {/* Chatbody */}
        {userInfoSidebar === false ? (
          <>
            <div
              className="w-full h-full flex justify-between items-center"
              style={{ transition: ".5s" }}
            >
              <div className="w-full h-full">
                <div
                  className="w-full cursor-pointer "
                  // onClick={() => {
                  //   toggleUserInfoSidebar();
                  // }}
                >
                  <UserInfo />
                </div>
                <MessageBody />
                {/* <div className="w-full h-[100px] px-[20px] flex justify-center items-center">
                  <div className="w-full h-full flex justify-center items-center ">
                    <input
                      onKeyDown={(e) => {
                        if (e.nativeEvent.key === "Enter") {
                          dispatch(
                            addFlagOneMessage({
                              id: 10,
                              Message: Messages,
                              Flag: 1,
                            })
                          );
                          dispatch(
                            addFlagTwoMessage({
                              id: 10,
                              Message: Messages,
                              Flag: 2,
                            })
                          );
                          setMessages("");
                          sendMessage(Messages);
                          // dispatch(toggleSendFlag(true));
                        }
                      }}
                      onChange={(e) => setMessages(e.target.value)}
                      value={Messages}
                      placeholder="Write Something .."
                      className="bg-[#f8fafc] w-full px-[14px] h-[50px] outline-none font-normal rounded-lg"
                    ></input>
                    <button
                      onClick={() => {
                        dispatch(
                          addFlagOneMessage({
                            id: 10,
                            Message: Messages,
                            Flag: 1,
                          })
                        );
                        dispatch(
                          addFlagTwoMessage({
                            id: 10,
                            Message: Messages,
                            Flag: 2,
                          })
                        );
                        setMessages("");
                        sendMessage(Messages);
                        // dispatch(toggleSendFlag(true));
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div> */}
              </div>
              {/* <div className="w-0 h-full" style={{ transition: ".5s" }}>
                <UserInfoSidebar data={true} />
              </div> */}
              <div
                className="w-0  bg-[#f8fafc] h-full fixed lg:flex md:flex overflow-hidden"
                style={{ transition: ".5s" }}
              >
                hello
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full h-full flex justify-between items-center">
              <div
                className="w-full lg:w-[calc(100%-350px)] md:w-[calc(100%-350px)] h-full overflow-y-scroll"
                style={{ transition: ".5s" }}
              >
                <div
                  className="w-full cursor-pointer"
                  // onClick={() => {
                  //   toggleUserInfoSidebar();
                  // }}
                >
                  <UserInfo />
                </div>
                <MessageBody />
                {/* <div className="w-full h-[100px] px-[20px] flex justify-center items-center">
                  <div className="w-full h-full flex justify-center items-center ">
                    <input
                      onKeyDown={(e) => {
                        if (e.nativeEvent.key === "Enter") {
                          setMessages("");
                          sendMessage("GqC1MfHsLVZU4DsD52cObQClai32", Messages);
                        }
                      }}
                      onChange={(e) => setMessages(e.target.value)}
                      value={Messages}
                      placeholder="Write Something .."
                      className="bg-[#f8fafc] w-full px-[14px] h-[50px] outline-none font-normal rounded-lg"
                    ></input>
                    <button
                      onClick={() => {
                        setMessages("");
                        sendMessage("GqC1MfHsLVZU4DsD52cObQClai32", Messages);
                      }}
                    >
                      Send
                    </button>
                  </div>
                </div> */}
              </div>
              {/* <div className="w-[350px] h-full" style={{ transition: ".5s" }}>
                <UserInfoSidebar data={false} />
              </div> */}
              <div
                className="w-full lg:w-[350px] md:w-[350px] bg-[#f8fafc] h-full fixed lg:flex md:flex"
                style={{ transition: ".5s" }}
              >
                <span>hello</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Chatbody;
