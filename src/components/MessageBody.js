import React, { useEffect, useState } from "react";
// import EmojiPicker from "emoji-picker-react";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addFlagOneMessage,
  addFlagTwoMessage,
  clearFlagOneMessage,
  toggleSendFlag,
  clearFlagTwoMessage,
  pushFlagOneMessage,
  pushFlagTwoMessage,
} from "../utils/chatSlice";
import { onSnapshot, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import { BiSolidMicrophone } from "react-icons/bi";
import { BsFillEmojiLaughingFill } from "react-icons/bs";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Messagess = (props) => {
  return (
    <>
      {props?.data?.Flag === 2 ? (
        <>
          <div className="w-full  my-[4px] flex text-[14px] justify-start drop-shadow-sm">
            <div className="w-auto bg-[#1f201f] text-[#cdd8dd] max-w-[80%] lg:max-w-[60%] md:max-w-[60%] font-normal py-[8px] px-[14px] rounded-lg flex flex-wrap justify-between">
              <pre className=" max-w-[calc(100%)] whitespace-pre-wrap font-sans">
                {props?.data?.Message}
              </pre>
              <div className="ml-auto w-[48px] flex justify-end items-end whitespace-nowrap text-[10px]  mb-[-5px] text-[#9fa5a7] ">
                {props?.data?.Time}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full  my-[4px] flex text-[14px] justify-end drop-shadow-sm">
            <div className="w-auto bg-[#cdd8dd] max-w-[80%] lg:max-w-[60%] md:max-w-[60%] font-normal py-[8px] px-[14px] rounded-lg flex text-black flex-wrap justify-between">
              <pre className="max-w-[calc(100%)] whitespace-pre-wrap font-sans">
                {props?.data?.Message}
              </pre>
              <div className="ml-auto w-[48px] flex justify-end items-end whitespace-nowrap text-[10px]  mb-[-5px] text-[#474747]">
                {props?.data?.Time}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export const MessageBody = () => {
  const [chatMessage, setChatMessage] = useState([]);
  const [Messages, setMessages] = useState("");
  const [time, setTime] = useState("");
  const [dayFlag, setDayFlag] = useState("");

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ChatOne = useSelector((store) => store.chat.FlagOneMessage);
  const ChatTwo = useSelector((store) => store.chat.FlagTwoMessage);
  const [lastIdOne, setLastIdOne] = useState(0);
  const [lastIdTwo, setLastIdTwo] = useState(0);
  const [LastMessageOne, setLastMessageOne] = useState(0);
  const [LastMessageTwo, setLastMessageTwo] = useState(0);
  const [send, setSend] = useState(false);
  const [emoji, setEmoji] = useState(false);

  function sendMessage() {
    console.log("Clicked");
    if (ActiveChatUser.length !== 0) {
      const user = firebase.auth().currentUser;
      const userDoc = db
        .collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser)
        .set({
          ChatHistory: ChatOne,
          LastUpdated: serverTimestamp(),
          LastId: lastIdOne + 1,
          TotalMessage: ChatOne.length,
          LastMessage: ChatOne.length,
        });

      // userDoc.get().then((doc) => {
      //   if (doc.exists) {
      //     // console.log("Document available");
      //     userDoc.set({
      //       ChatHistory: ChatOne,
      //     });
      //   } else {
      //     db.collection("Chat Record")
      //       .doc(user.uid)
      //       .collection("Chat Friends")
      //       .doc(ActiveChatUser)
      //       .set({
      //         ChatHistory: ChatOne,
      //       });
      //     // console.log("No such document");
      //   }
      // });

      // -------------------------------------------

      const MyDoc = db
        .collection("Chat Record")
        .doc(ActiveChatUser)
        .collection("Chat Friends")
        .doc(user.uid)
        .set({
          ChatHistory: ChatTwo,
          LastUpdated: serverTimestamp(),
          LastId: lastIdTwo + 1,
          TotalMessage: ChatTwo.length,
          LastMessage: LastMessageTwo,
        });

      // MyDoc.get().then((doc) => {
      //   if (doc.exists) {
      //     console.log("Document available");
      //     MyDoc.set({
      //       ChatHistory: ChatTwo,
      //     });
      //   } else {
      //     db.collection("Chat Record")
      //       .doc(ActiveChatUser)
      //       .collection("Chat Friends")
      //       .doc(user.uid)
      //       .set({
      //         ChatHistory: ChatTwo,
      //       });
      //     console.log("No such document");
      //   }
      // });
    }
  }

  useEffect(() => {
    if (send === true) {
      sendMessage(Messages);
      // console.log("Chat one");
      // console.log(ChatOne);
      // console.log("Chat Two");
      // console.log(ChatTwo);
      setSend(false);
    }
  }, [ChatOne]);
  // useEffect(() => {
  //   console.log("ActiveChatUser");
  //   console.log(ActiveChatUser);
  //   console.log("Chat");
  //   console.log(ChatOne);
  // }, [ActiveChatUser]);

  // useEffect(() => {
  //   dispatch(clearFlagOneMessage());
  //   dispatch(clearFlagTwoMessage());
  //   fetchChatHistory();
  //   console.log("chatMessage");
  //   console.log(chatMessage);
  // }, [ActiveChatUser]);

  // useEffect(() => {
  //   if (Messages.length === 0) {
  //     dispatch(clearFlagOneMessage());
  //     dispatch(clearFlagTwoMessage());
  //     fetchChatHistory();
  //   }
  // }, [Messages]);

  // function fetchChatHistory() {
  //   const user = firebase.auth().currentUser;

  //   if (ActiveChatUser.length !== 0) {
  //     const userOneDoc = db
  //       .collection("Chat Record")
  //       .doc(user.uid)
  //       .collection("Chat Friends")
  //       .doc(ActiveChatUser);
  //     // // dispatch(clearFlagOneMessage());
  //     // userOneDoc.get().then((doc) => {
  //     //   console.log(doc.data().ChatHistory);
  //     //   doc.data().ChatHistory.forEach((element) => {
  //     //     console.log(element);
  //     //     dispatch(
  //     //       addFlagOneMessage({
  //     //         id: element.id,
  //     //         Message: element.Message,
  //     //         Flag: element.Flag,
  //     //       })
  //     //     );
  //     //     // chatMessage.push({
  //     //     //   id: element.id,
  //     //     //   Message: element.Message,
  //     //     //   Flag: element.Flag,
  //     //     // });
  //     //   });
  //     // });
  //     userOneDoc.get().then((doc) => {
  //       console.log("doc.data().ChatHistory)");
  //       console.log(doc.data().ChatHistory);
  //       // setChatMessage(doc.data().ChatHistory);
  //       doc.data().ChatHistory.forEach((chats) => {
  //         dispatch(
  //           addFlagOneMessage({
  //             id: chats.id,
  //             Message: chats.Message,
  //             Flag: chats.Flag,
  //           })
  //         );
  //       });
  //       // dispatch(addFlagOneMessage(doc.data().ChatHistory));
  //       // setChatMessage(doc.data().ChatHistory);
  //     });
  //     const userTwoDoc = db
  //       .collection("Chat Record")
  //       .doc(ActiveChatUser)
  //       .collection("Chat Friends")
  //       .doc(user?.uid);
  //     dispatch(clearFlagTwoMessage());
  //     userTwoDoc.get().then((doc) => {
  //       console.log("doc.data().ChatHistory)");
  //       console.log(doc.data().ChatHistory);
  //       doc.data().ChatHistory.forEach((chats) => {
  //         dispatch(
  //           addFlagTwoMessage({
  //             id: chats.id,
  //             Message: chats.Message,
  //             Flag: chats.Flag,
  //           })
  //         );
  //       });
  //       // dispatch(addFlagOneMessage(doc.data().ChatHistory));
  //       // setChatMessage(doc.data().ChatHistory);
  //     });
  //   } else {
  //     dispatch(clearFlagOneMessage());
  //     dispatch(clearFlagTwoMessage());
  //   }
  // }

  // -------------------------------------------------

  function storeToReactStore(Messages, temp) {
    dispatch(
      pushFlagOneMessage({
        id: lastIdOne + 1,
        Message: Messages,
        Flag: 1,
        Time: temp,
      })
    );
    dispatch(
      pushFlagTwoMessage({
        id: lastIdTwo + 1,
        Message: Messages,
        Flag: 2,
        Time: temp,
      })
    );
  }

  // useEffect(() => {
  //   dispatch(clearFlagOneMessage());
  //   dispatch(clearFlagTwoMessage());
  //   fetchChatHistory();
  // }, [ActiveChatUser]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (ActiveChatUser.length !== 0) {
      // -----------------------for flag one
      db.collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser)
        .onSnapshot((doc) => {
          setChatMessage(doc.data().ChatHistory);
          setLastIdOne(doc.data().LastId);
          setLastMessageOne(doc.data().LastMessage);
          dispatch(clearFlagOneMessage());
          doc.data().ChatHistory.forEach((flagOne) => {
            dispatch(pushFlagOneMessage(flagOne));
          });
        });
      // -----------------------for flag two
      db.collection("Chat Record")
        .doc(ActiveChatUser)
        .collection("Chat Friends")
        .doc(user.uid)
        .onSnapshot((doc) => {
          if (doc.data()) {
            console.log("exists");
            setLastIdTwo(doc.data().LastId);
            setLastMessageTwo(doc.data().LastMessage);
            dispatch(clearFlagTwoMessage());
            doc.data().ChatHistory.forEach((flagTwo) => {
              dispatch(pushFlagTwoMessage(flagTwo));
            });
          } else {
            console.log("dont exists");
            setLastIdTwo(0);
            setLastMessageTwo(0);
            dispatch(clearFlagTwoMessage());
            doc.data()?.ChatHistory?.forEach((flagTwo) => {
              dispatch(pushFlagTwoMessage(flagTwo));
            });
          }
        });
    }
  }, [ActiveChatUser]);

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatMessage]);

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

  function onSelectEmoji(emoji) {
    console.log(emoji);
    /*
    // result
    { 
        i: "😚", 
        n: ["kissing face"], 
        r: "1f61a", // with skin tone
        t: "neutral", // skin tone
        u: "1f61a" // without tone
    }
    */
  }
  return (
    <>
      <div className="w-full h-[calc(100%-170px)] px-[20px] overflow-y-scroll bg-[#0b0c0b] z-20">
        <div ref={listRef} className="w-full h-full  py-[10px] flex flex-col">
          {ActiveChatUser.length === 0 ? (
            <>
              <div className="w-full min-h-[40px] bg-[#0b0c0b] rounded-lg flex justify-center items-center drop-shadow-sm px-[10px]">
                <span className="w-full h-full flex justify-center items-center ml-[10px] font-normal text-[15px] text-[#8171f3]">
                  <BiSolidLockAlt className="text-[#8171f3] mr-[10px]" />{" "}
                  Messages are end-to-end encrypted. No one outside of this chat
                  can read or listen to them.
                </span>
              </div>

              {console.log("zero ")}
            </>
          ) : (
            <>
              <div className="w-full min-h-[40px] bg-[#0b0c0b] rounded-lg flex justify-center items-center drop-shadow-sm px-[10px]">
                <span className="w-full h-full flex justify-center items-center ml-[10px] font-normal text-[15px] text-[#8171f3]">
                  <BiSolidLockAlt className="text-[#8171f3] mr-[10px]" />{" "}
                  Messages are end-to-end encrypted.
                </span>
              </div>
              {chatMessage?.map((msg) => {
                return (
                  <>
                    <Messagess data={msg} />
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="w-full px-[19px] fixed mt-[-435px]">
        {emoji === true ? (
          <Picker
            data={data}
            onEmojiSelect={(e) => {
              console.log(e.native);
              setMessages(Messages + e.native);
            }}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="w-full h-[80px] px-[20px] flex flex-col justify-center items-start bg-[#0b0c0b]">
        <div className="w-full h-full flex justify-center items-center ">
          {/* <EmojiPicker /> */}
          {emoji === true ? (
            <div
              className="w-[35px] h-[35px] ml-[8px] flex justify-center items-center cursor-pointer bg-white rounded-full mr-[-40px] z-10 text-[black]  hover:text-[black]"
              onClick={() => setEmoji(!emoji)}
            >
              <BsFillEmojiLaughingFill className="text-[20px] " />
            </div>
          ) : (
            <div
              className="w-[35px] h-[35px] ml-[8px] flex justify-center items-center cursor-pointer hover:bg-white rounded-full mr-[-40px] z-10 text-[black]  hover:text-[black]"
              onClick={() => setEmoji(!emoji)}
            >
              <BsFillEmojiLaughingFill className="text-[20px] " />
            </div>
          )}

          <input
            type="text"
            onKeyDown={(e) => {
              if (e.nativeEvent.key === "Enter") {
                if (Messages.length !== 0) {
                  var temp = formatAMPM(new Date());
                  storeToReactStore(Messages, temp);
                  setSend(true);
                  // sendMessage(Messages);
                  setMessages("");

                  // dispatch(toggleSendFlag(true));
                }
              }
            }}
            onChange={(e) => setMessages(e.target.value)}
            value={Messages}
            placeholder="Write Something .."
            className="bg-[#cdd8dd] w-[calc(100%-60px)] px-[50px] h-[50px] outline-none font-normal rounded-lg drop-shadow-sm resize-none "
          ></input>

          {/* <EmojiPicker /> */}
          <button
            className="ml-[-35px] mr-[8px] z-10 h-[35px]   w-[35px] flex justify-center items-center cursor-pointer text-[black]  hover:bg-white rounded-full"
            onClick={() => {
              if (Messages.length !== 0) {
                var temp = formatAMPM(new Date());
                storeToReactStore(Messages, temp);
                setSend(true);
                // sendMessage(Messages);
                setMessages("");
                // sendMessage(Messages);
                // dispatch(toggleSendFlag(true));
              }
            }}
          >
            {Messages.length === 0 ? (
              <BiSolidSend className="text-[20px] text-[#828282]" />
            ) : (
              <BiSolidSend className="text-[20px] " />
            )}
          </button>
          <div className="w-[50px] h-[50px] flex justify-center items-center cursor-pointer rounded-lg bg-[#cdd8dd]  z-10  ml-[10px] text-[black]  ">
            <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-white">
              <BiSolidMicrophone className="text-[21px]  " />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageBody;
