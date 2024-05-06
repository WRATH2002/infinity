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
  clearImageMediaLink,
  addImageMediaLink,
  addActiveUser,
} from "../utils/chatSlice";
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { BiCheckDouble, BiSolidLockAlt } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import { BiSolidMicrophone } from "react-icons/bi";
import { TiArrowLeft, TiAttachment, TiLockClosed } from "react-icons/ti";
import { GrFormAttachment } from "react-icons/gr";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { HiDocumentText, HiSaveAs } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdContactPage } from "react-icons/md";
import { PiStickerFill } from "react-icons/pi";
import { FcImageFile } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
import { MdDownload } from "react-icons/md";
// import { TiAttachment } from "react-icons/ti";
// import { TiAttachment } from "react-icons/ti";
import chat from "../assets/img/chat.png";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { storage } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import toast, { Toaster, useToaster } from "react-hot-toast";

// ---------------------------------------------------------- Import Icons Png

import logo from "../assets/img/lll3.png";

import { saveAs } from "file-saver";
import { BsFillStopFill } from "react-icons/bs";
// ---------------------------------------------------------- Test Videos

import { MdEmojiEmotions } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";

import { IoCameraOutline } from "react-icons/io5";
import { IoDocumentOutline } from "react-icons/io5";
import { HiOutlinePhoto } from "react-icons/hi2";
import { MdOutlineGif } from "react-icons/md";
import { TbGif } from "react-icons/tb";
import { PiSticker } from "react-icons/pi";
import { LuContact2, LuRefreshCw } from "react-icons/lu";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { WiStars } from "react-icons/wi";
import { BsStars } from "react-icons/bs";
import { MdFileDownload } from "react-icons/md";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Messagess = (props) => {
  const [url, setUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const [zoomImage, setZoomImage] = useState(false);
  const [theme, setTheme] = useState(true);
  const [lastMessageId, setLastMessageId] = useState(0);

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  useEffect(() => {
    CheckMesageDelivery();
  }, []);

  function CheckMesageDelivery() {
    const user = firebase.auth().currentUser;
    const mesRef = db
      .collection("Chat Record")
      .doc(ActiveChatUser)
      .collection("Chat Friends")
      .doc(user.uid);
    onSnapshot(mesRef, (snapshot) => {
      setLastMessageId(snapshot?.data()?.LastMessage);
    });
  }
  // useEffect(() => {
  //   g();
  // }, []);

  // async function g() {
  //   const blurhash = await Blurhash.encode(props?.data?.Image, 4, 3);
  //   setUrl(blurhash);
  // }

  const downloadImage = (data) => {
    // console.log("url");
    console.log(data);
    let urll = data;
    saveAs(urll, "helo.jpg");
  };
  return (
    <>
      {/* <div className="w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] right-0 h-[100svh] fixed bg-[#0000003a] z-50 mt-[-70px] flex justify-center items-center">
        <img src={props.data.Image} className=" w-full"></img>
      </div> */}
      {console.log(props.data)}

      {props?.data?.Flag === 2 ? (
        <>
          <div className="w-full  my-[4px] flex text-[15px] justify-start  pl-[10px]">
            {props.data.Message.length != 0 ? (
              <>
                <div
                  className={
                    "w-auto  max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] px-[14px] pr-[8px] rounded-lg flex flex-wrap justify-between" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <pre className=" max-w-[calc(100%)] whitespace-pre-wrap font-[google] font-light">
                    {props?.data?.Message}
                  </pre>
                  <div
                    className={
                      "ml-auto w-[49px] flex justify-end items-end whitespace-nowrap  font-[google] font-light  text-[10px]  mb-[-5px]  " +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                    }
                  >
                    {props?.data?.Time}
                  </div>{" "}
                </div>
              </>
            ) : props.data.Image.length != 0 ? (
              <div
                className={
                  "group w-auto  max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[1.5px] rounded-lg flex flex-wrap justify-end items-center" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                {/* <a href={props.data.Image} download> */}
                <img
                  loading="lazy"
                  onLoad={() => {
                    setIsImageLoaded(true);
                    console.log("Loaded Image");
                  }}
                  src={props.data.Image}
                  className="rounded-lg w-full h-full object-cover group-hover:opacity-60"
                  onClick={() => {
                    props.temp(props.data.Image);
                  }}
                ></img>
                <span className="fixed text-transparent overflow-hidden w-full select-none right-0">
                  {props.data.Image}
                </span>
                {/* <div
                  className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm fixed z-20 cursor-pointer "
                  onClick={() => {
                    setUrl(props.data.Image);
                    downloadImage(props.data.Image);
                    toast("Downloading Image", {
                      icon: "⬇️",
                      className: "font-[nunitosans] font-normal",
                      style: {
                        borderRadius: "9px",
                        background: "#333",
                        color: "#cdd8dd",
                      },
                    });
                  }}
                >
             
                  <MdDownload className="text-[25px] text-[#8981f7]" />
                </div> */}

                {isImageLoaded === true ? (
                  <div
                    className={
                      "w-auto bottom-0  h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px]   py-[8px] px-[14px] font-[google] font-light" +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                    }
                  >
                    {props?.data?.Time}
                  </div>
                ) : (
                  <></>
                )}
                {/* {props?.data?.Time} */}
                {/* <div className="w-[60px] z-20 bg-slate-400 right-0 bottom-0 h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px] text-[#ffffff] py-[8px] px-[14px]">
                  {props?.data?.Time}
                </div> */}
                {/* </a> */}
                {/* <div className="ml-auto w-auto  bg-slate-800 h-[calc(100%-2px)] flex justify-end items-end whitespace-nowrap text-[10px] rounded-lg text-[#9fa5a7] fixed ">

                  10.03 AM
                </div> */}
              </div>
            ) : props.data.Video.length != 0 ? (
              <div className="max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] md:max-h-[370px] w-auto rounded-lg flex justify-start items-center min-w-[25%]">
                <video
                  controls
                  className="w-auto  h-full rounded-lg 
              "
                >
                  <source src={props.data.Video}></source>
                </video>
                <span className="fixed text-transparent overflow-hidden w-full select-none right-0">
                  {props.data.Video}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={
                    "w-[75%] lg:w-[32%] md:w-[32%]  h-[65px] p-[0px]  rounded-lg  flex justify-center items-center" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <div className="w-full h-full  rounded-lg  flex justify-start items-center ">
                    <div className="w-[55px] h-[55px]  rounded-lg flex justify-center items-center">
                      {/* <img src={doccc} className="w-[40px]"></img> */}
                      <IoMdDocument className=" text-[35px]" />
                    </div>
                    <div className="w-[calc(100%-95px)]  h-full flex flex-col justify-center items-start px-[10px]">
                      <span className="w-full text-[14px]   whitespace-nowrap text-ellipsis overflow-hidden  font-[google] font-light ">
                        {props.data.docName}
                      </span>
                      <span className=" font-[google] font-light text-[11px]  ">
                        {props.data.docSize > 1024 ? (
                          <>{(props.data.docSize / 1024).toFixed(2)} mB</>
                        ) : (
                          <>{props.data.docSize} kB</>
                        )}
                      </span>
                    </div>
                    <div className="w-[40px] h-full flex justify-start items-center">
                      <div
                        className={
                          "w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer" +
                          (theme
                            ? " hover:bg-[#e4eaf1]"
                            : " hover:bg-[#17171a]")
                        }
                      >
                        {/* <img src={download} className="w-[20px]"></img> */}
                        <MdDownload
                          className={
                            "text-[25px]  " +
                            (theme ? " text-[#000000]" : " text-[#8981f7]")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-full  my-[4px] flex text-[15px] justify-end  pr-[10px]">
            {props.data.Message.length != 0 ? (
              <div
                className={
                  "w-auto max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] px-[14px] pr-[8px] rounded-lg flex  flex-wrap justify-between" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                <pre className="max-w-[calc(100%)] whitespace-pre-wrap   font-[google] font-light">
                  {props?.data?.Message}
                </pre>
                <div
                  className={
                    "ml-auto w-[64px] flex justify-end items-end whitespace-nowrap  font-[google] font-light  text-[10px]  mb-[-5px]  " +
                    (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                  }
                >
                  {props?.data?.Time}
                  {props.data.id > lastMessageId ? (
                    <BiCheckDouble className="text-[15px] ml-[2px] text-[#747474]" />
                  ) : (
                    <BiCheckDouble className="text-[15px] ml-[2px] text-[#04bdb6]" />
                  )}
                </div>{" "}
              </div>
            ) : props.data.Image.length != 0 ? (
              <div
                className={
                  "group w-auto  max-w-[75%] lg:max-w-[32%]  md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[1.5px] rounded-lg flex items-center  flex-wrap justify-center hover:bg-[#1f201f]" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                {/* <img
                  loading="lazy"
                  src={props.data.Image}
                  className="rounded-lg w-full h-full object-cover "
                ></img> */}

                {/* {isImageLoaded === false ? ( */}
                {/* <div
                  style={{
                    display: !isImageLoaded ? "inline" : "none",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Blurhash
                    hash={url}
                    width="100%"
                    height="100%"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                  />
                </div> */}

                {/* ) : ( */}
                {/* <a href={props.data.Image} download="image react"> */}
                <img
                  loading="lazy"
                  onLoad={() => {
                    setIsImageLoaded(true);
                    console.log("Loaded Image");
                  }}
                  // onClick={() => {
                  //   setZoomImage(true);
                  // }}
                  src={props.data.Image}
                  className="rounded-lg w-full h-full object-cover  group-hover:opacity-60"
                  onClick={() => {
                    props.temp(props.data.Image);
                  }}
                ></img>
                <span className="fixed text-transparent overflow-hidden w-full select-none left-0">
                  {props.data.Image}
                </span>
                {/* <div
                  className="group-hover:flex hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm fixed z-20 cursor-pointer"
                  onClick={() => {
                    setUrl(props.data.Image);
                    downloadImage(props.data.Image);
                    toast("Downloading Image", {
                      icon: "⬇️",
                      className: "font-[nunitosans] font-normal",
                      style: {
                        borderRadius: "9px",
                        background: "#333",
                        color: "#cdd8dd",
                      },
                    });
                  }}
                >
               
                  <MdDownload className="text-[25px] text-[#8981f7]" />
                </div> */}
                {isImageLoaded === true ? (
                  <div
                    className={
                      "w-[60px]  right-[10px] bottom-0 h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px]  py-[8px] px-[14px]   font-[google] font-light" +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                    }
                  >
                    {props?.data?.Time}
                  </div>
                ) : (
                  <></>
                )}
                {/* </a> */}
                {/* )}  */}

                {/* <div className="ml-auto w-auto  bg-slate-800 h-[calc(100%-2px)] flex justify-end items-end whitespace-nowrap text-[10px] rounded-lg text-[#9fa5a7] fixed ">
    
                  10.03 AM
                </div> */}
              </div>
            ) : props.data.Video.length != 0 ? (
              <div className="max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] md:max-h-[370px] w-auto rounded-lg flex justify-start items-center min-w-[25%]">
                <video
                  controls
                  className="w-auto  h-full rounded-lg 
              "
                >
                  <source src={props.data.Video} className="z-50"></source>
                </video>
                <span className="fixed text-transparent overflow-hidden w-full select-none left-0">
                  {props.data.Video}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={
                    "w-[75%] lg:w-[32%] md:w-[32%]  h-[65px] p-[2px]  rounded-lg  flex justify-center items-center " +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <div className="w-full h-full  rounded-lg  flex justify-start items-center ">
                    <div className="w-[55px] h-[55px]  rounded-lg flex justify-center items-center">
                      <IoMdDocument className=" text-[35px]" />
                      {/* <img src={doccc} className="w-[40px]"></img> */}
                    </div>
                    <div className="w-[calc(100%-95px)]  h-full flex flex-col justify-center items-start px-[10px]">
                      <span className="w-full  font-[google] font-light text-[14px] whitespace-nowrap text-ellipsis overflow-hidden">
                        {props.data.docName}
                      </span>
                      <span className=" font-[google] font-light text-[11px]">
                        {props.data.docSize > 1024 ? (
                          <>{(props.data.docSize / 1024).toFixed(2)} mB</>
                        ) : (
                          <>{props.data.docSize} kB</>
                        )}
                      </span>
                    </div>
                    <div className="w-[40px] h-full flex justify-start items-center">
                      <a href={props.data.Document} download>
                        <div
                          className={
                            "w-[30px] h-[30px] rounded-full  flex justify-center items-center cursor-pointer" +
                            (theme
                              ? " hover:bg-[#e4eaf1]"
                              : " hover:bg-[#17171a]")
                          }
                        >
                          {/* <img src={download} className="w-[20px]"></img> */}

                          <MdDownload
                            className={
                              "text-[25px] " +
                              (theme ? " text-[#000000]" : " text-[#8981f7]")
                            }
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {/* <div className="bg-slate-400 w-full h-[100vh] fixed"></div> */}
    </>
  );
};

export const MessageBody = () => {
  const [chatMessage, setChatMessage] = useState([]);
  const [Messages, setMessages] = useState("");
  const [time, setTime] = useState("");
  const [dayFlag, setDayFlag] = useState("");

  const [lastIdOne, setLastIdOne] = useState(0);
  const [lastIdTwo, setLastIdTwo] = useState(0);
  const [LastMessageOne, setLastMessageOne] = useState(0);
  const [LastMessageTwo, setLastMessageTwo] = useState(0);
  const [send, setSend] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [document, setDocument] = useState(false);

  const [image, setImage] = useState();
  const [Doc, setDoc] = useState();
  const [DocName, setDocName] = useState("");
  const [DocSize, setDocSize] = useState("");
  const [video, setVideo] = useState();
  const [profileURL, setProfileURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [tempPhotoUrl, setTempPhotoUrl] = useState("");

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ChatOne = useSelector((store) => store.chat.FlagOneMessage);
  const ChatTwo = useSelector((store) => store.chat.FlagTwoMessage);

  const textAreaRef = useRef(null);

  const [isListening, setIsListening] = useState(false);

  const [PassCode1, setPassCode1] = useState("");
  const [Lock1, setLock1] = useState(false);
  const [tempLock, setTempLock] = useState(false);
  const [tempLockFlag, setTempLockFlag] = useState(false);
  const [PassCode2, setPassCode2] = useState("");
  const [Lock2, setLock2] = useState(false);
  const [er, setEr] = useState("");
  const [inp1, setIn1] = useState("");
  const [inp2, setIn2] = useState("");
  const [inp3, setIn3] = useState("");
  const [inp4, setIn4] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support speech recognition.");
  }

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  // -------------------------------------------------------------------------- Send Message to Firebase Firestore

  function sendMessage() {
    console.log("Message Sending to Firestore -----");
    if (ActiveChatUser.length !== 0) {
      const user = firebase.auth().currentUser;
      const userDoc = db
        .collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser)
        .update({
          ChatHistory: ChatOne,
          LastUpdated: serverTimestamp(),
          LastId: lastIdOne + 1,
          TotalMessage: ChatOne.length,
          LastMessage: ChatOne.length,
          ChatPassCode: PassCode1,
          ChatLock: Lock1,
        });

      const MyDoc = db
        .collection("Chat Record")
        .doc(ActiveChatUser)
        .collection("Chat Friends")
        .doc(user.uid)
        .update({
          ChatHistory: ChatTwo,
          LastUpdated: serverTimestamp(),
          LastId: lastIdTwo + 1,
          TotalMessage: ChatTwo.length,
          LastMessage: LastMessageTwo,
          ChatPassCode: PassCode2,
          ChatLock: Lock2,
        });
    }
  }

  // --------------------------------------------------------------------------

  useEffect(() => {
    console.log("Chat One Changed ---- ");
    console.log(ChatOne);
    if (send === true) {
      sendMessage();
      setSend(false);
    }
  }, [ChatOne]);

  // -------------------------------------------------------------------------- Store Chats in React Redux Store

  function storeToReactStore(
    Messages,
    temp,
    imageUrl,
    videoUrl,
    documentUrl,
    DocName,
    DocSize
  ) {
    dispatch(
      pushFlagOneMessage({
        id: lastIdOne + 1,
        Message: Messages,
        Flag: 1,
        Time: temp,
        Image: imageUrl,
        Video: videoUrl,
        Document: documentUrl,
        docName: DocName,
        docSize: DocSize,
      })
    );
    dispatch(
      pushFlagTwoMessage({
        id: lastIdTwo + 1,
        Message: Messages,
        Flag: 2,
        Time: temp,
        Image: imageUrl,
        Video: videoUrl,
        Document: documentUrl,
        docName: DocName,
        docSize: DocSize,
      })
    );
  }

  // -------------------------------------------------------------------------- Fetch Chat History from Firebase Firestore

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (ActiveChatUser.length !== 0) {
      // -----------------------for Chat User One

      const userOneChat = db
        .collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser);
      onSnapshot(userOneChat, (snapshot) => {
        setChatMessage(snapshot.data().ChatHistory);
        setLastIdOne(snapshot.data().LastId);
        setLastMessageOne(snapshot.data().LastMessage);
        setPassCode1(snapshot.data()?.ChatPassCode);
        setLock1(snapshot.data()?.ChatLock);
        setTempLock(snapshot.data()?.ChatLock);
        setTempLockFlag(false);
        dispatch(clearFlagOneMessage());
        snapshot.data().ChatHistory.forEach((flagOne) => {
          dispatch(pushFlagOneMessage(flagOne));
        });
      });

      // -----------------------for Chat User Two

      const userTwoChat = db
        .collection("Chat Record")
        .doc(ActiveChatUser)
        .collection("Chat Friends")
        .doc(user.uid);
      onSnapshot(userTwoChat, (snapshot) => {
        if (snapshot.data()) {
          console.log("exists");
          setLastIdTwo(snapshot.data().LastId);
          setLastMessageTwo(snapshot.data().LastMessage);
          setPassCode2(snapshot.data()?.ChatPassCode);
          setLock2(snapshot.data()?.ChatLock);
          dispatch(clearFlagTwoMessage());
          snapshot.data().ChatHistory.forEach((flagTwo) => {
            dispatch(pushFlagTwoMessage(flagTwo));
          });
        } else {
          console.log("dont exists");
          setLastIdTwo(0);
          setLastMessageTwo(0);
          dispatch(clearFlagTwoMessage());
          snapshot.data()?.ChatHistory?.forEach((flagTwo) => {
            dispatch(pushFlagTwoMessage(flagTwo));
          });
        }
      });
    }
  }, [ActiveChatUser]);

  // --------------------------------------------------------------------------

  const listRef = useRef(null);
  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatMessage]);

  // --------------------------------------------------------------------------

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

  // --------------------------------------------------------------------------

  useEffect(() => {}, [imageUrl]);

  const [imageLength, setImageLength] = useState();

  // -------------------------------------------------------------------------- Get Image, Gif File

  function Image(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageLength(e.target.files.length);
  }

  // -------------------------------------------------------------------------- Get Document File

  function Document(e) {
    console.log(e.target.files[0]);
    setDoc(e.target.files[0]);
    setDocName(e.target.files[0].name);
    setDocSize(Math.round(e.target.files[0].size / 1024));
  }

  // -------------------------------------------------------------------------- Get Video File

  function Video(e) {
    console.log(e.target.files[0]);
    setVideo(e.target.files[0]);
  }

  // -------------------------------------------------------------------------- Upload Image, Gif & Get Url

  const uploadImageGetUrl = async (fileRef) => {
    var geturl = await uploadBytes(fileRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        var temp = formatAMPM(new Date());
        storeToReactStore(
          Messages,
          temp,
          url,
          videoUrl,
          documentUrl,
          DocName,
          DocSize
        );
        setMessages("");
        geturl = url;
      });
      console.log("Uploaded a blob or file!");
    });
    return geturl;
  };

  const uploadImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/chats_images/${user.uid}/${ActiveChatUser}/${lastIdOne + 1}`
    );
    const myPromise = uploadImageGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Sending Image",
        success: "Image Sent",
        error: "Error",
      },
      {
        style: {
          backgroundColor: "#333333",
          color: "#fff",
          font: "work",
          fontWeight: "400",
        },
      }
    );
  };

  // -------------------------------------------------------------------------- Upload Video & Get Url

  const uploadVideoGetUrl = async (fileRef) => {
    var geturl = await uploadBytes(fileRef, video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        var temp = formatAMPM(new Date());
        storeToReactStore(
          Messages,
          temp,
          imageUrl,
          url,
          documentUrl,
          DocName,
          DocSize
        );
        setMessages("");
        geturl = url;
      });
      console.log("Uploaded a blob or file!");
    });
    return geturl;
  };

  const uploadVideo = () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/chats_videos/${user.uid}/${ActiveChatUser}/${lastIdOne + 1}`
    );
    const myPromise = uploadVideoGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Sending Video",
        success: "Video Sent",
        error: "Error",
      },
      {
        style: {
          backgroundColor: "#333333",
          color: "#fff",
          font: "work",
          fontWeight: "400",
        },
      }
    );
  };

  // --------------------------------------------------------------------------  Upload Document & Get Url

  const uploadDocumentGetUrl = async (fileRef) => {
    var geturl = await uploadBytes(fileRef, video).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        var temp = formatAMPM(new Date());
        storeToReactStore(
          Messages,
          temp,
          imageUrl,
          videoUrl,
          url,
          DocName,
          DocSize
        );
        setMessages("");
        setDocName("");
        setDocSize("");
        geturl = url;
      });
      console.log("Uploaded a blob or file!");
    });
    return geturl;
  };

  const uploadDocument = () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/chats_documents/${user.uid}/${ActiveChatUser}/${lastIdOne + 1}`
    );
    const myPromise = uploadDocumentGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Sending Document",
        success: "Document Sent",
        error: "Error",
      },
      {
        style: {
          backgroundColor: "#333333",
          color: "#fff",
          font: "work",
          fontWeight: "400",
        },
      }
    );
  };

  // function uploadDoc() {
  //   const user = firebase.auth().currentUser;
  //   const fileRef = ref(storage, `/chats_doc/${user.uid}/${lastIdOne + 1}`);
  //   uploadBytes(fileRef, doc).then((snapshot) => {
  //     getDownloadURL(snapshot.ref).then((url) => {
  //       console.log(url);
  //       var temp = formatAMPM(new Date());
  //       storeToReactStore(Messages, temp, url);
  //       setMessages("");
  //     });
  //     console.log("Uploaded a blob or file!");
  //   });
  // }

  // --------------------------------------------------------------------------

  const ImageMediaLinkk = useSelector((store) => store.chat.imageMediaLink);
  useEffect(() => {
    console.log("urlllll------------------------------------------------");
    console.log(ImageMediaLinkk);
    getImageMediaLink();
  }, [ActiveChatUser]);

  // -------------------------------------------------------------------------- Get User Media Urls

  function getImageMediaLink() {
    const user = firebase.auth().currentUser;
    if (ActiveChatUser.length !== 0) {
      const mediaRef = db
        .collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser);
      onSnapshot(mediaRef, (snapshot) => {
        console.log(
          "Last Updated User Message -------------------------------------------"
        );
        console.log(snapshot.data().ChatHistory);
        dispatch(clearImageMediaLink());
        snapshot.data().ChatHistory.forEach((media) => {
          if (media.Document !== "") {
            console.log("media.Document");

            console.log(media.Document);
            dispatch(
              addImageMediaLink({ url: media.Document, docName: media.docName })
            );
          } else if (media.Image !== "") {
            console.log("media.image");

            console.log(media.Image);
            dispatch(addImageMediaLink({ url: media.Image }));
          }
        });
      });
    }
  }

  function checkInput(data) {
    let last = data.slice(-1);
    setEr("");
    if (inp1.length === 0) {
      setIn1(last);
    } else if (inp2.length === 0) {
      setIn2(last);
    } else if (inp3.length === 0) {
      setIn3(last);
    } else if (inp4.length === 0) {
      setIn4(last);
    }
  }

  useEffect(() => {
    setIn1("");
    setIn2("");
    setIn3("");
    setIn4("");
    // setTempLock(false);
    // setTempLockFlag(false);
  }, [ActiveChatUser]);

  // useEffect(() => {
  //   if (Lock1 === true && tempLockFlag === false) {
  //     setTempLock(true);
  //     setTempLockFlag(false);
  //   } else {
  //     setTempLock(false);
  //     setTempLockFlag(false);
  //   }
  // }, [Lock1]);

  useEffect(() => {
    if ((inp1 + inp2 + inp3 + inp4).length === 4) {
      checkValidity();
    }
  }, [inp4]);

  function checkValidity() {
    if (inp1 + inp2 + inp3 + inp4 === PassCode1) {
      setTempLockFlag(true);
      setTempLock(false);
      setIn1("");
      setIn2("");
      setIn3("");
      setIn4("");
    } else {
      setEr("Wrong PassCode");
      setIn1("");
      setIn2("");
      setIn3("");
      setIn4("");
    }
  }

  // --------------------------------------------------------------------------

  // useEffect(() => {
  //   if (ActiveChatUser) {
  //     // textAreaRef.current.style.height = "auto";
  //     console.log("textAreaRef.current.style.height");
  //     console.log(textAreaRef.current.style.height);
  //     // if (textAreaRef.current.scrollHeight <= "300px") {
  //     textAreaRef.current.style.height =
  //       textAreaRef.current.scrollHeight + "px";
  //     // }
  //   }
  // }, [Messages]);

  function Mes() {
    console.log("Clicked");
    let chattt = {
      Document: "",
      Flag: 1,
      Image: "",
      Message: "Hello",
      Time: "20:30 PM",
      Video: "",
      docName: "",
      docSize: "",
      id: 2,
    };
    const user = firebase.auth().currentUser;
    const ref = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(ActiveChatUser)
      .update({ ChatHistory: chattt });
  }

  return (
    <>
      {tempLock === true ? (
        <>
          <div
            className="fixed w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[100svh] top-0 right-0 flex justify-center items-center backdrop-blur-md"
            style={{ zIndex: "200" }}
          >
            <div
              className={
                "w-[40px] md:w-[0px]  lg:w-[0px] h-[40px] md:h-[0px]  lg:h-[0px] overflow-hidden rounded-full left-[20px] top-[20px] flex justify-center items-center  fixed" +
                (theme
                  ? " bg-[white] text-[black]"
                  : " bg-[black] text-[white]")
              }
              onClick={() => {
                dispatch(addActiveUser(""));
                setTempLock(false);
              }}
            >
              <TiArrowLeft className="text-[30px]" />{" "}
            </div>
            <div
              className={
                "w-[320px] flex flex-col justify-start items-start rounded-3xl p-[20px]" +
                (theme
                  ? " bg-[#ffffff] text-black"
                  : " bg-[#222228] text-white")
              }
            >
              <div className="w-full rounded-xl  flex justify-start items-center px-[10px]">
                <span className="w-full flex justify-start items-center font-[google] font-medium text-[22px] ">
                  This Chat is Locked{" "}
                  <TiLockClosed
                    className={
                      "text-[24px] ml-[6px] mt-[-2px]" +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  />
                </span>
              </div>
              {/* <div
                className={
                  "w-full mt-[10px] rounded-xl font-[work]  flex justify-center items-center px-[10px]" +
                  (theme ? " text-[#343434] " : " text-[#afafaf]")
                }
              >
                <span className="  font-light ">
                  ⚠️&nbsp; Chat Lock will be removed from this chat. Anyone can
                  see the content of the chat. Are you sure?
                </span>
              </div> */}
              <div
                className="w-full px-[10px] mt-[10px] flex justify-between items-center font-[google] font-light  text-[16px] cursor-pointer"
                // onClick={() => {
                //   // changeAccountStatus();
                //   setLock(!lock);
                //   setIn1("");
                //   setIn2("");
                //   setIn3("");
                //   setIn4("");
                // }}
              >
                <div
                  className={
                    "flex justify-start items-center " +
                    (theme ? " text-[#595959]" : " text-[#b1b1b1]")
                  }
                >
                  Enter the PassCode
                </div>
                {/* <div
                        className={
                          "w-[32px] h-[22px] rounded-full flex items-center justify-start  border  " +
                          (lock ? "border-[#b7bcc0]" : "border-[#8981f7]")
                        }
                      >
                        {!lock ? (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[3px] bg-[#b7bcc0] "
                            style={{ transition: ".4s" }}
                          ></div>
                        ) : (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[12px] bg-[#8981f7] "
                            style={{ transition: ".4s" }}
                          ></div>
                        )}
                      </div> */}
              </div>
              <div
                className="w-full  mt-[15px] flex justify-center items-center ml-[17px] overflow-hidden h-[45px] font-[google] font-normal"

                // style={{ transition: ".3s" }}
              >
                <input
                  value={inp1}
                  onChange={(e) => {
                    console.log(e);
                    // setEe(e);
                    checkInput(e.target.value);
                  }}
                  className={
                    "h-full w-[35px] rounded-lg outline-none flex justify-center items-center px-[11px] text-[20px] caret-transparent" +
                    (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                  }
                ></input>
                <input
                  value={inp2}
                  onChange={(e) => {
                    console.log(e);
                    checkInput(e.target.value);
                  }}
                  className={
                    "h-full w-[35px] ml-[5px] rounded-lg outline-none flex justify-center items-center px-[11px] text-[20px] caret-transparent" +
                    (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                  }
                ></input>
                <input
                  value={inp3}
                  onChange={(e) => {
                    console.log(e);
                    checkInput(e.target.value);
                  }}
                  className={
                    "h-full w-[35px] ml-[5px] rounded-lg outline-none flex justify-center items-center px-[11px] text-[20px] caret-transparent" +
                    (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                  }
                ></input>
                <input
                  value={inp4}
                  onChange={(e) => {
                    console.log(e);
                    checkInput(e.target.value);
                  }}
                  className={
                    "h-full w-[35px] ml-[5px] rounded-lg outline-none flex justify-center items-center px-[11px] text-[20px] caret-transparent" +
                    (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                  }
                ></input>
                <div
                  onClick={() => {
                    // console.log("clicked");
                    // deleteChatUser();
                    setIn1("");
                    setIn2("");
                    setIn3("");
                    setIn4("");
                    setEr("");
                  }}
                >
                  <LuRefreshCw
                    className={
                      "text-[21px] ml-[15px] " +
                      (theme ? " text-black" : " text-white")
                    }
                  />
                </div>
              </div>
              <div className="w-full px-[10px] mt-[10px] flex justify-center text-[#ff653b] items-center font-[google] font-light  text-[14px] cursor-pointer">
                {/* <div className="flex justify-start items-center"> */}
                {er.length === 0 ? <></> : <>{er}</>}
                {/* </div> */}
              </div>
              {/* <div className=" h-[45px] w-full mt-[15px] flex justify-between items-center px-[10px] mb-[10px] rounded-xl">
                <button
                  className={
                    "w-[calc((100%-20px)/2)] h-[45px]    cursor-pointer  font-[google] font-light   rounded-2xl" +
                    (theme
                      ? " bg-[#e4eaf1] text-[#000000]"
                      : " bg-[#17171a] text-[#ffffff]")
                  }
                  onClick={() => {
                    // console.log("clicked");
                    // setConfirmDelete(false);
                    // setChatLockModal(false);
                    // setLock(false);
                    // setChatUnlockModal(false);
                    // setIn1("");
                    // setIn2("");
                    // setIn3("");
                    // setIn4("");
                    // setEr("");
                  }}
                >
                  Close
                </button>
                {true ? (
                  <button
                    className="w-[calc((100%-20px)/2)] h-[45px] text-[black]   cursor-pointer  font-[google] font-light bg-[#96df73]  rounded-2xl"
                    onClick={() => {
                      // console.log("clicked");
                      // deleteChatUser();
                      // checkChatLock();
                      // // setChatLockModal(false);
                      // // setLock(false);
                      // setIn1("");
                      // setIn2("");
                      // setIn3("");
                      // setIn4("");
                      // setEr("");
                    }}
                  >
                    Remove Lock
                  </button>
                ) : (
                  <button
                    className="w-[calc((100%-20px)/2)] h-[45px] text-[black]   cursor-pointer  font-[google] font-light bg-[#95df7394]  rounded-2xl"
                    onClick={() => {
                      // console.log("clicked");
                      // deleteChatUser();
                      // checkChatLock();
                      // // setChatLockModal(false);
                      // // setLock(false);
                      // setIn1("");
                      // setIn2("");
                      // setIn3("");
                      // setIn4("");
                      // setEr("");
                    }}
                  >
                    Remove Lock
                  </button>
                )}
              </div> */}
              {/* {ee} */}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      {tempPhotoUrl.length === 0 ? (
        <></>
      ) : (
        <div
          className={
            "fixed w-auto  max-w-[100%] lg:max-w-[32%] md:max-w-[32%] min-h-[100svh] max-h-[100svh] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal flex flex-wrap justify-end items-center z-50" +
            (theme
              ? " bg-[#e4eaf1] text-[black]"
              : " bg-[#17171a] text-[white]")
          }
          onClick={() => {
            setTempPhotoUrl("");
          }}
        >
          {/* {tempPhotoUrl} */}
          <img
            loading="lazy"
            // onLoad={() => {
            //   setIsImageLoaded(true);
            //   console.log("Loaded Image");
            // }}
            src={tempPhotoUrl}
            className=" w-full h-full object-cover group-hover:opacity-60"

            // onClick={() => {}}
          ></img>
          {/* <span className="fixed text-transparent overflow-hidden w-full select-none right-0">
          {props.data.Image}
        </span>
        

        {isImageLoaded === true ? (
          <div
            className={
              "w-auto bottom-0  h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px]   py-[8px] px-[14px] font-[google] font-light" +
              (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
            }
          >
            {props?.data?.Time}
          </div>
        ) : (
          <></>
        )} */}
        </div>
      )}
      <div
        className={
          "w-full h-[calc(100%-140px)] pb-[10px] mt-[80px] overflow-y-scroll  z-20 " +
          (theme ? "bg-[#e4eaf1]" : "bg-[#17171a]")
        }
      >
        <div
          ref={listRef}
          className="w-full h-full  flex flex-col   font-[google] font-normal"
        >
          {ActiveChatUser.length === 0 ? (
            <>
              <div
                className={
                  "w-[calc(100%-400px)] right-0 top-[0] h-[100svh] fixed    flex flex-col justify-center items-center  font-[google]  " +
                  (theme
                    ? " bg-[#e4eaf1] text-black"
                    : " bg-[#17171a] text-white")
                }
              >
                <img src={logo} className="w-[150px] opacity-60"></img>
                <span className="text-[30px] tracking-wide b2 flex justify-center items-center">
                  Welcome to Infinity <WiStars className="text-[#9f63a0]" />
                </span>
                <span
                  className={
                    "text-[14px] font-light tracking-wider mt-[10px] " +
                    (theme ? " text-[#2d2d2d]" : " text-[#b3b3b3]")
                  }
                >
                  Send and recieve messages with end-to-end encryption
                </span>
                <span
                  className={
                    "text-[14px] font-light tracking-wider " +
                    (theme ? " text-[#2d2d2d]" : " text-[#b3b3b3]")
                  }
                >
                  Invite your friends and start chatting with them
                </span>
              </div>

              {console.log("zero ")}
            </>
          ) : (
            <>
              {/* <div className="fixed flex lg:hidden md:hidden w-full h-[calc(100%-135px)] lg:h-[calc(100%-150px)] md:h-[calc(100%-150px)]  justify-center items-center ">
                <img src={ww} className="h-full w-full object-cover"></img>
              </div> */}
              <div className="w-full min-h-[40px]  rounded-lg flex justify-center items-center  px-[10px]">
                <span
                  className={
                    "w-full h-full flex justify-center items-center ml-[10px] font-[google] font-light text-[14px] " +
                    (theme ? " text-[#000000] " : " text-[#8981f7] ")
                  }
                >
                  <BiSolidLockAlt className=" mr-[10px]" /> Messages are
                  end-to-end encrypted.
                </span>
              </div>
              {/* <div className="w-full h-full flex justify-center items-center ml-[10px] font-[google] font-light text-[14px] text-[#ffffff] ">
                <button
                  onClick={() => {
                    Mes();
                  }}
                >
                  Click Me
                </button>
              </div> */}
              {chatMessage?.map((msg) => {
                return (
                  <>
                    <Messagess data={msg} temp={setTempPhotoUrl} />
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className="w-full px-[10px] fixed mt-[-435px] drop-shadow-md">
        {emoji === true ? (
          <Picker
            // className="w-[100%]"
            theme="light"
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

      {document === true ? (
        <>
          <div
            className="w-[208px] pl-[10px] fixed mt-[-338px] drop-shadow-md "
            style={{ transition: ".5s" }}
          >
            <div
              className={
                "w-[170px] h-[338px]   border  backdrop-blur-md p-[20px] px-[10px] rounded-lg font-[google] font-normal text-[14px] flex flex-col justify-between " +
                (theme
                  ? " bg-[#ffffff] text-[black] border-[#e4eaf1]"
                  : " border-[#17171a] bg-[#282828] text-[white]  ")
              }
              style={{ transition: ".5s" }}
            >
              <div className="w-full flex flex-col items-center">
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg cursor-pointer"
                  for="document-file-input"
                  style={{ transition: "2s", transitionDelay: ".2s" }}
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center    border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="document-file-input"
                      type="file"
                      accept="document/*"
                      onChange={(e) => {
                        Document(e);
                        console.log(e.target.files[0].name);
                      }}
                      className="hidden"
                    ></input>
                    <IoDocumentOutline className="text-[22px] mr-[8px]" />
                    {/* <img src={docc} className="w-[25px] mr-[8px]"></img>{" "} */}
                    Documents
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  style={{ transition: "2s", transitionDelay: ".4s" }}
                  for="image-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center  border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                    ></input>
                    <MdOutlineInsertPhoto className="text-[22px] mr-[8px]" />
                    {/* <img src={phot} className="w-[25px] mr-[8px]"></img> */}
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Photos
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  // style={{ transition: ".2s" }}
                  style={{ transition: "2s", transitionDelay: ".6s" }}
                  for="video-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center    border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="video-file-input"
                      type="file"
                      accept="video/*"
                      onChange={(e) => Video(e)}
                      className="hidden"
                    ></input>
                    <RiVideoLine className="text-[22px] mr-[8px]" />
                    {/* <img src={vide} className="w-[25px] mr-[8px]"></img> */}
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Videos
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  // style={{ transition: ".2s" }}
                  style={{ transition: "2s", transitionDelay: ".8s" }}
                  for="gif-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center   border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="gif-file-input"
                      type="file"
                      accept="image/gif"
                      onChange={(e) => Image(e)}
                      className="hidden"
                    ></input>
                    <TbGif className="text-[22px] mr-[8px]" />
                    {/* <img src={giff} className="w-[25px] mr-[8px]"></img> */}
                    {/* <PiSticker className="text-[24px] mr-[8px]" /> */}
                    Gif's
                  </div>
                </label>
                <div
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  style={{ transition: "2s", transitionDelay: "1s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center    border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                    onClick={() => {
                      toast("Sticker Sharing not Supported", {
                        icon: "⚠️",
                        className: "font-[nunitosans] font-normal",
                        style: {
                          borderRadius: "9px",
                          background: "#333",
                          color: "#cdd8dd",
                        },
                      });
                    }}
                  >
                    <PiSticker className="text-[22px] mr-[8px]" />
                    {/* <img src={sticker} className="w-[25px] mr-[8px]"></img>{" "} */}
                    Sticker
                  </div>
                </div>
                <div
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg  cursor-pointer"
                  style={{ transition: "2s", transitionDelay: "1.2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center  border-transparent hover: rounded-md" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                    onClick={() => {
                      toast("Contact Sharing not Supported", {
                        icon: "⚠️",
                        className: "font-[nunitosans] font-normal",
                        style: {
                          borderRadius: "9px",
                          background: "#333",
                          color: "#cdd8dd",
                        },
                      });
                    }}
                  >
                    <FiUser className="text-[22px] mr-[8px]" />
                    {/* <img
                      src={contacts}
                      className="w-[25px] mr-[8px]"
                    ></img>{" "} */}
                    Contact
                  </div>
                </div>

                <div
                  className="w-full flex items-center  opacity-100 rounded-lg   cursor-pointer my-[10px]"
                  style={{ transition: "2s", transitionDelay: "1.125s" }}
                >
                  {/* <AiOutlineSend className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full border  px-[10px] flex items-center  " +
                      (theme ? " border-[#e7e9ec]" : " border-[#ccd7dc1f]")
                    }
                  ></div>
                </div>
              </div>

              <div
                className="w-full flex items-center justify-center  h-[40px]    opacity-100
                 "
                style={{ transition: "2s", transitionDelay: "1.4s" }}
              >
                {image ? (
                  <div className="w-full h-full  px-[10px]  cursor-pointer rounded-lg ">
                    <button
                      className="w-full h-full opacity cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        if (image) {
                          setDocument(false);
                          setSend(true);
                          uploadImage();
                          // uploadDoc();
                          // setDoc();
                          setImage();
                          console.log("upload");
                          setImageLength();
                        }
                        // else if (doc) {
                        //   setDocument(false);
                        //   setSend(true);
                        //   uploadDoc();
                        //   setDoc();
                        //   console.log("upload");
                        // }
                        else {
                          console.log("not upload");
                          // toast.error("Select Image First");
                          toast("Select Image", {
                            icon: "❌",
                            className: "font-[nunitosans] font-normal",
                            style: {
                              borderRadius: "9px",
                              background: "#333",
                              color: "#cdd8dd",
                            },
                          });
                        }
                      }}
                      // onClick={() => {
                      //   if (Messages.length !== 0) {
                      //     var temp = formatAMPM(new Date());
                      //     storeToReactStore(Messages, temp);
                      //     setSend(true);
                      //     // sendMessage(Messages);
                      //     setMessages("");
                      //     // sendMessage(Messages);
                      //     // dispatch(toggleSendFlag(true));
                      //   }
                      // }}
                    >
                      <AiOutlineSend className="text-[22px] mr-[8px]" />
                      {/* <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img> */}
                      Send
                      <span
                        className={
                          "w-[20px] h-[20px] text-[12px] rounded-full ml-[40px]  text-[black]   flex justify-center items-center" +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#ffffff]")
                        }
                      >
                        {imageLength}
                      </span>
                    </button>
                  </div>
                ) : video ? (
                  <div className="w-full h-full  px-[10px] rounded-lg  cursor-pointer ">
                    <button
                      className="w-full h-full opacity cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        if (video) {
                          setDocument(false);
                          setSend(true);
                          uploadVideo();
                          // uploadDoc();
                          // setDoc();
                          setVideo();
                          console.log("upload");
                          setImageLength();
                        } else {
                          console.log("not upload");
                          // toast.error("Select Image First");
                          toast("Select Image", {
                            icon: "❌",
                            className: "font-[nunitosans] font-normal",
                            style: {
                              borderRadius: "9px",
                              background: "#333",
                              color: "#cdd8dd",
                            },
                          });
                        }
                      }}
                    >
                      <AiOutlineSend className="text-[22px] mr-[8px]" />
                      {/* <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img> */}
                      Send
                      <span
                        className={
                          "w-[20px] h-[20px] text-[12px] rounded-full ml-[40px]  text-[black]   flex justify-center items-center" +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#ffffff]")
                        }
                      >
                        1
                      </span>
                    </button>
                  </div>
                ) : Doc ? (
                  <div className="w-full h-full  px-[10px] rounded-lg  cursor-pointer ">
                    <div
                      className="w-full h-full opacity cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        if (Doc) {
                          setDocument(false);
                          setSend(true);
                          uploadDocument();
                          setDoc();
                          console.log("upload");
                          setImageLength();
                        }
                        // else if (doc) {
                        //   setDocument(false);
                        //   setSend(true);
                        //   uploadDoc();
                        //   setDoc();
                        //   console.log("upload");
                        // }
                        else {
                          console.log("not upload");
                          // toast.error("Select Image First");
                          toast("Select Image", {
                            icon: "❌",
                            className: "font-[nunitosans] font-normal",
                            style: {
                              borderRadius: "9px",
                              background: "#333",
                              color: "#cdd8dd",
                            },
                          });
                        }
                      }}
                      // onClick={() => {
                      //   if (Messages.length !== 0) {
                      //     var temp = formatAMPM(new Date());
                      //     storeToReactStore(Messages, temp);
                      //     setSend(true);
                      //     // sendMessage(Messages);
                      //     setMessages("");
                      //     // sendMessage(Messages);
                      //     // dispatch(toggleSendFlag(true));
                      //   }
                      // }}
                    >
                      <AiOutlineSend className="text-[22px] mr-[8px]" />
                      {/* <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img> */}
                      Send
                      <span
                        className={
                          "w-[20px] h-[20px] text-[12px] rounded-full ml-[40px]  text-[black]   flex justify-center items-center" +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#ffffff]")
                        }
                      >
                        1
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full opacity-30 px-[10px] rounded-lg">
                    <div
                      className="w-full h-full opacity cursor-pointer flex justify-between items-center"
                      onClick={() => {
                        if (image) {
                          setDocument(false);
                          setSend(true);
                          uploadImage();
                          setImage();
                          console.log("upload");
                          setImageLength();
                        }
                        // else if (doc) {
                        //   setDocument(false);
                        //   setSend(true);
                        //   uploadDoc();
                        //   setDoc();
                        //   console.log("upload");
                        // }
                        else {
                          console.log("not upload");
                          // toast.error("Select Image First");
                          toast("Select Image", {
                            icon: "❌",
                            className: "font-[nunitosans] font-normal",
                            style: {
                              borderRadius: "9px",
                              background: "#333",
                              color: "#cdd8dd",
                            },
                          });
                        }
                      }}
                      // onClick={() => {
                      //   if (Messages.length !== 0) {
                      //     var temp = formatAMPM(new Date());
                      //     storeToReactStore(Messages, temp);
                      //     setSend(true);
                      //     // sendMessage(Messages);
                      //     setMessages("");
                      //     // sendMessage(Messages);
                      //     // dispatch(toggleSendFlag(true));
                      //   }
                      // }}
                    >
                      <AiOutlineSend className="text-[22px] mr-[8px]" />
                      {/* <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img> */}
                      Send
                      <span className="w-[20px] h-[20px] text-[12px] rounded-full ml-[40px]  text-[black]   flex justify-center items-center"></span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className="w-[0] pl-[50px] fixed mt-[0] "
            style={{ transition: ".5s" }}
          >
            <div
              className={
                "w-[0] h-[0]  backdrop-blur-md py-[0px]   border-transparent  rounded-lg font-[nunitosans] font-normal text-[14px] flex flex-col justify-between" +
                (theme
                  ? " bg-[#ffffff] text-[black]"
                  : " bg-[#282828] text-[white]")
              }
              style={{ transition: ".5s" }}
            >
              <div className="w-full flex flex-col items-center">
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg hover:backdrop-blur-md   cursor-pointer"
                  // style={{ transition: ".2s" }}
                  for="document-file-input"
                  style={{ transition: ".2s" }}
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="document-file-input"
                      type="file"
                      accept="document/*"
                      onChange={(e) => {
                        Document(e);
                        console.log(e.target.files);
                      }}
                      className="hidden"
                    ></input>
                    <IoDocumentOutline className="text-[22px] mr-[8px]" />
                    {/* <img src={docc} className="w-[25px] mr-[8px]"></img>{" "} */}
                    Documents
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md  cursor-pointer"
                  style={{ transition: ".2s" }}
                  for="image-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                      // style={{ transition: ".2s" }}
                    ></input>
                    <MdOutlineInsertPhoto className="text-[22px] mr-[8px]" />
                    {/* <IoMdPhotos className="text-[24px] mr-[8px]" /> */}
                    {/* <img src={phot} className="w-[25px] mr-[8px]"></img> */}
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Photos
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md  cursor-pointer"
                  style={{ transition: ".2s" }}
                  for="image-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                      // style={{ transition: ".2s" }}
                    ></input>
                    <RiVideoLine className="text-[22px] mr-[8px]" />
                    {/* <IoMdPhotos className="text-[24px] mr-[8px]" /> */}
                    {/* <img src={vide} className="w-[25px] mr-[8px]"></img> */}
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Videos
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md  cursor-pointer"
                  style={{ transition: ".2s" }}
                  for="image-file-input"
                >
                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                      // style={{ transition: ".2s" }}
                    ></input>
                    <TbGif className="text-[22px] mr-[8px]" />
                    {/* <IoMdPhotos className="text-[24px] mr-[8px]" /> */}
                    {/* <img src={giff} className="w-[25px] mr-[8px]"></img> */}
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Gif's
                  </div>
                </label>
                <div
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md  cursor-pointer"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <PiSticker className="text-[22px] mr-[8px]" />
                    {/* <img src={sticker} className="w-[25px] mr-[8px]"></img>{" "} */}
                    Sticker
                  </div>
                </div>
                <div
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md  cursor-pointer"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full h-full px-[10px] flex items-center" +
                      (theme ? " hover:bg-[#e4eaf1]" : " hover:bg-[#8981f7]")
                    }
                  >
                    <FiUser className="text-[22px] mr-[8px]" />
                    {/* <img
                      src={contacts}
                      className="w-[25px] mr-[8px]"
                    ></img>{" "} */}
                    Contact
                  </div>
                </div>

                <div
                  className="w-full flex items-center  opacity-100 rounded-lg   cursor-pointer my-[10px]"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className={
                      "w-full border flex items-center  rounded-lg hover:" +
                      (theme ? " border-[#e7e9ec]" : " border-[#ccd7dc1f]")
                    }
                  ></div>
                </div>
              </div>

              <div
                className="w-full flex items-center justify-center  h-[40px]   opacity-0"
                style={{ transition: ".2s" }}
              >
                <div className="w-full h-full opacity-30   px-[10px] z-0">
                  <button
                    className="w-full h-full opacity cursor-pointer flex justify-between items-center  z-0"
                    onClick={() => {
                      if (image) {
                        setDocument(false);
                        setSend(true);
                        uploadImage();
                        setImage();
                        console.log("upload");
                        setImageLength();
                      }
                      // else if (doc) {
                      //   setDocument(false);
                      //   setSend(true);
                      //   uploadDoc();
                      //   setDoc();
                      //   console.log("upload");
                      // }
                      else {
                        console.log("not upload");
                        // toast.error("Select Image First");
                        toast("Select Image", {
                          icon: "❌",
                          className: "font-[nunitosans] font-normal",
                          style: {
                            borderRadius: "9px",
                            background: "#333",
                            color: "#cdd8dd",
                          },
                        });
                      }
                    }}
                    // onClick={() => {
                    //   if (Messages.length !== 0) {
                    //     var temp = formatAMPM(new Date());
                    //     storeToReactStore(Messages, temp);
                    //     setSend(true);
                    //     // sendMessage(Messages);
                    //     setMessages("");
                    //     // sendMessage(Messages);
                    //     // dispatch(toggleSendFlag(true));
                    //   }
                    // }}
                  >
                    <sen className="text-[22px] mr-[8px]" />
                    {/* <img src={sendd} className="w-[25px] mr-[0] z-0 "></img> */}
                    Send
                    <span className="w-[20px] h-[20px] text-[12px] rounded-full ml-[40px] opacity-0 text-[black]   flex justify-center items-center"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <div
        className={
          "w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[60px] fixed bottom-0 flex flex-col justify-center items-start " +
          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
        }
      >
        {ActiveChatUser.length === 0 ? (
          <></>
        ) : (
          <div className="w-full h-full flex justify-center items-center  py-[5px] ">
            {emoji === true ? (
              <div
                className="w-[30px] h-full ml-[8px] flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                onClick={() => setEmoji(!emoji)}
              >
                <MdEmojiEmotions
                  className={
                    "text-[25px] " +
                    (theme ? " text-[#000000]" : " text-[#ffffff]")
                  }
                />
              </div>
            ) : (
              <div
                className="w-[30px] h-full ml-[8px] flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                onClick={() => {
                  setEmoji(!emoji);
                  setDocument(false);
                }}
              >
                <MdEmojiEmotions
                  className={
                    "text-[25px] " +
                    (theme ? " text-[#000000]" : " text-[#ffffff]")
                  }
                />
              </div>
            )}
            {document === true ? (
              <>
                {/* <OutsideClickHandler
                  onOutsideClick={() => {
                    // alert("You clicked outside of this component!!!");
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                > */}
                <div
                  className="w-[30px] h-full flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                  onClick={() => {
                    setImage();
                    setVideo();

                    setDocument(!document);
                  }}
                >
                  <TiAttachment
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  />
                </div>
                {/* </OutsideClickHandler> */}
              </>
            ) : (
              <>
                {/* <OutsideClickHandler
                  className="w-[30px] h-full flex justify-center items-center"
                  onOutsideClick={() => {
                    // alert("You clicked outside of this component!!!");
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                > */}
                <div
                  className="w-[30px] h-full flex justify-center items-center cursor-pointer   rounded-full  z-10  "
                  onClick={() => {
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                >
                  <TiAttachment
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  />
                </div>
                {/* </OutsideClickHandler> */}
              </>
            )}

            {isListening == true ? (
              <>
                <div
                  className="flex justify-center items-center w-[80px] h-full mr-[-80px] z-50"
                  style={{ transition: ".4s" }}
                >
                  <span class="loader1"></span>
                  <span class="loader"></span>
                  <span class="loader1"></span>
                </div>
                <input
                  onChange={(e) => setMessages(e.target.value)}
                  value={transcript}
                  // ref={textAreaRef}
                  rows="1"
                  placeholder="Write Something .."
                  className={
                    "input  w-[calc(100%-135px)] ml-[10px]   px-[20px] pr-[50px]  outline-none text-[15px] font-[work] font-medium tracking-[.4px] rounded-[15px]   h-[50px]   pl-[60px]" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                  style={{ transition: ".4s" }}
                ></input>
              </>
            ) : (
              <>
                <div
                  className="flex justify-center items-center w-[0] overflow-hidden h-full mr-[-20px] ml-[20px] z-50"
                  style={{ transition: ".4s" }}
                >
                  <span class="loader1"></span>
                  <span class="loader"></span>
                  <span class="loader1"></span>
                </div>
                <input
                  onChange={(e) => setMessages(e.target.value)}
                  value={Messages}
                  // ref={textAreaRef}
                  rows="1"
                  placeholder="Write Something .."
                  className={
                    "input w-[calc(100%-135px)] ml-[10px]   px-[20px] pr-[50px]  outline-none text-[15px] font-[work] font-medium tracking-[.4px] rounded-2xl   h-[45px]   pl-[20px]" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                  style={{ transition: ".4s" }}
                ></input>
              </>
            )}
            <button
              className="ml-[-43px] mr-[8px] z-10 h-full   w-[35px] flex justify-center items-center cursor-pointer  rounded-full "
              onClick={() => {
                if (Messages.length !== 0) {
                  var temp = formatAMPM(new Date());
                  storeToReactStore(
                    Messages,
                    temp,
                    imageUrl,
                    videoUrl,
                    documentUrl,
                    DocName,
                    DocSize
                  );
                  setSend(true);
                  setMessages("");
                }
              }}
            >
              {Messages.length === 0 ? (
                <BiSolidSend
                  className={
                    "text-[20px] " +
                    (theme
                      ? " bg-[#ffffff] text-[#303030]"
                      : " bg-[#282828] text-[#9b9b9b]")
                  }
                />
              ) : (
                <BiSolidSend
                  className={
                    "text-[20px] " +
                    (theme
                      ? " bg-[#ffffff] text-[#000000]"
                      : " bg-[#282828] text-[#ffffff]")
                  }
                />
              )}
            </button>
            <div className="w-[35px] h-full flex justify-center items-center cursor-pointer rounded-full    z-10  ml-[10px] mr-[10px]   ">
              {isListening === true ? (
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full   pullse">
                  <BsFillStopFill
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                    onClick={() => {
                      setIsListening(false);
                      SpeechRecognition.stopListening();
                      setMessages(transcript);
                      resetTranscript();
                    }}
                  />
                </div>
              ) : (
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full  ">
                  <BiSolidMicrophone
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                    onClick={() => {
                      resetTranscript();
                      setIsListening(true);
                      SpeechRecognition.startListening({
                        continuous: true,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBody;
