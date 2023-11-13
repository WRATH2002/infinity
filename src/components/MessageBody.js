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
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { BiSolidLockAlt } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import { BiSolidMicrophone } from "react-icons/bi";
import { TiAttachment } from "react-icons/ti";
import { BsFillEmojiLaughingFill } from "react-icons/bs";
import { HiDocumentText, HiSaveAs } from "react-icons/hi";
import { IoMdPhotos } from "react-icons/io";
import { MdContactPage } from "react-icons/md";
import { PiStickerFill } from "react-icons/pi";
import { FcImageFile } from "react-icons/fc";
import { FcDocument } from "react-icons/fc";
// import { TiAttachment } from "react-icons/ti";
// import { TiAttachment } from "react-icons/ti";
import chat from "../assets/img/chat.png";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { storage } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import toast, { Toaster, useToaster } from "react-hot-toast";
import a from "../assets/img/a.jpg";
import aa from "../assets/img/aa.jpg";
// ----------------------------------
import docc from "../assets/img/document.png";
import phot from "../assets/img/image.png";
import three from "../assets/img/threedots.png";
import mic from "../assets/img/mic.png";
import profile from "../assets/img/profile.png";
import sendd from "../assets/img/send.png";
import logout from "../assets/img/logout.png";
import sticker from "../assets/img/sticker.png";
import attach from "../assets/img/attach.png";
import smiley from "../assets/img/smiley.png";
import settings from "../assets/img/settings.png";
import camera from "../assets/img/camera.png";
import contacts from "../assets/img/contacts.png";
import cross from "../assets/img/cross.png";
import back from "../assets/img/back.png";
import download from "../assets/img/download.png";
import download1 from "../assets/img/download1.png";
import download2 from "../assets/img/download2.png";
import loading from "../assets/img/loading.png";
import { Blurhash } from "react-blurhash";
import { saveAs } from "file-saver";

const Messagess = (props) => {
  const [url, setUrl] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
      {props?.data?.Flag === 2 ? (
        <>
          <div className="w-full  my-[4px] flex text-[14px] justify-start drop-shadow-sm">
            {props.data.Message.length != 0 ? (
              <>
                <div className="w-auto bg-[#252525] text-[white] max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] px-[14px] rounded-lg flex flex-wrap justify-between">
                  <pre className=" max-w-[calc(100%)] whitespace-pre-wrap font-[work] font-normal">
                    {props?.data?.Message}
                  </pre>
                  <div className="ml-auto w-[48px] flex justify-end items-end whitespace-nowrap font-[work]  text-[10px]  mb-[-5px] text-[#9fa5a7] ">
                    {props?.data?.Time}
                  </div>{" "}
                </div>
              </>
            ) : (
              <div className="group w-auto bg-[#1f201f] max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[0px] rounded-lg flex text-black flex-wrap justify-end items-center">
                {/* <a href={props.data.Image} download> */}
                <img
                  loading="lazy"
                  onLoad={() => {
                    setIsImageLoaded(true);
                    console.log("Loaded Image");
                  }}
                  src={props.data.Image}
                  className="rounded-lg w-full h-full object-cover group-hover:opacity-60"

                  // onClick={() => {}}
                ></img>
                <div
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
                  <img
                    src={download}
                    className="w-[25px]   z-20 drop-shadow-md"
                  ></img>
                </div>

                {isImageLoaded === true ? (
                  <div className="w-auto bottom-0 drop-shadow-md h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px] text-[#ffffff] py-[8px] px-[14px]">
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
            )}
          </div>
        </>
      ) : (
        <>
          <div className="w-full  my-[4px] flex text-[14px] justify-end drop-shadow-sm">
            {props.data.Message.length != 0 ? (
              <div className="w-auto gradients max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] px-[14px] rounded-lg flex text-black flex-wrap justify-between">
                <pre className="max-w-[calc(100%)] whitespace-pre-wrap font-[work]">
                  {props?.data?.Message}
                </pre>
                <div className="ml-auto w-[48px] flex justify-end items-end whitespace-nowrap font-[work]  text-[10px]  mb-[-5px] text-[#474747]">
                  {props?.data?.Time}
                </div>
              </div>
            ) : (
              <div className="group w-auto  max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[0px] rounded-lg flex items-center text-black flex-wrap justify-center hover:bg-[#1f201f]">
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
                  src={props.data.Image}
                  className="rounded-lg w-full h-full object-cover  group-hover:opacity-60"
                ></img>
                <div
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
                  <img
                    src={download}
                    className="w-[25px]  z-20 drop-shadow-md"
                  ></img>
                </div>
                {isImageLoaded === true ? (
                  <div className="w-[60px]  right-0 bottom-0 h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px] text-[#ffffff] py-[8px] px-[14px] drop-shadow-md">
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
  const [document, setDocument] = useState(false);

  const [image, setImage] = useState();
  const [Doc, setDoc] = useState();
  const [profileURL, setProfileURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
    console.log(ChatOne);
    if (send === true) {
      sendMessage();
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

  function storeToReactStore(Messages, temp, url) {
    dispatch(
      pushFlagOneMessage({
        id: lastIdOne + 1,
        Message: Messages,
        Flag: 1,
        Time: temp,
        Image: url,
      })
    );
    dispatch(
      pushFlagTwoMessage({
        id: lastIdTwo + 1,
        Message: Messages,
        Flag: 2,
        Time: temp,
        Image: url,
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

  useEffect(() => {}, [imageUrl]);

  const [imageLength, setImageLength] = useState();

  function Image(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImageLength(e.target.files.length);
  }

  function Document(e) {
    console.log(e.target.files[0]);
    setDoc(e.target.files[0]);
  }

  function uploadImage() {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/chats_images/${user.uid}/${lastIdOne + 1}`);
    uploadBytes(fileRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("urlbefore");
        console.log(url);
        setImageUrl(url);
        console.log(imageUrl);
        console.log("urlafter");
        var temp = formatAMPM(new Date());
        storeToReactStore(Messages, temp, url);

        // sendMessage(Messages);
        setMessages("");
      });
      // toast.success("Photo Changed Successfully");
      toast("Image Sent", {
        icon: "✅",
        className: "font-[nunitosans] font-normal",
        style: {
          borderRadius: "9px",
          background: "#333",
          color: "#cdd8dd",
        },
      });
      console.log("Uploaded a blob or file!");
    });
  }

  function uploadDoc() {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/chats_doc/${user.uid}/${lastIdOne + 1}`);
    uploadBytes(fileRef, doc).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("urlbefore");
        console.log(url);
        // g(url);
        // setImageUrl(url);
        // console.log(imageUrl);
        // console.log("urlafter");
        var temp = formatAMPM(new Date());
        storeToReactStore(Messages, temp, url);

        // sendMessage(Messages);
        setMessages("");
      });
      // toast.success("Photo Changed Successfully");
      toast("Image Sent", {
        icon: "✅",
        className: "font-[nunitosans] font-normal",
        style: {
          borderRadius: "9px",
          background: "#333",
          color: "#cdd8dd",
        },
      });
      console.log("Uploaded a blob or file!");
    });
  }

  function g(imageUrl) {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      console.log(img.height);
      console.log(img.width);
    };
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full h-[calc(100%-170px)] px-[20px] overflow-y-scroll bg-[#0b0c0b] z-20">
        <div ref={listRef} className="w-full h-full  py-[10px] flex flex-col">
          {ActiveChatUser.length === 0 ? (
            <>
              <div className="w-full h-full bg-[#0b0c0b] rounded-lg flex justify-center items-center drop-shadow-sm">
                <img src={chat} className="w-full h-full"></img>
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
              {/* <img src="https://firebasestorage.googleapis.com/v0/b/infinity-new.appspot.com/o/chats_images%2Fmb05JDt06hedvvAijxzn09KfbHu1%2F5?alt=media&token=1b5182f5-1ca5-4bc0-81d1-f312d9eb7561"></img> */}
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
      {document === true ? (
        <>
          <div
            className="w-[208px] px-[19px] fixed mt-[-258px]"
            style={{ transition: ".5s" }}
          >
            <div
              className="w-[170px] h-[258px] text-[white] bg-[#313131ae] border border-transparent  backdrop-blur-md p-[20px] px-[10px] rounded-lg font-[nunitosans] font-normal text-[14px] flex flex-col justify-between"
              style={{ transition: ".5s" }}
            >
              <div className="w-full flex flex-col items-center">
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg cursor-pointer"
                  // style={{ transition: ".2s" }}
                  for="document-file-input"
                  style={{ transition: "2s", transitionDelay: ".2s" }}
                >
                  <div className="w-full h-full px-[10px] flex items-center border-l-[2.5px] hover:text-[#b8dedf] border-transparent hover:border-l-[#b8dedf]   hover:drop-shadow-xl">
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
                    <img src={docc} className="w-[25px] mr-[8px]"></img>{" "}
                    Documents
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  // style={{ transition: ".2s" }}
                  style={{ transition: "2s", transitionDelay: ".5s" }}
                  for="image-file-input"
                >
                  <div className="w-full h-full px-[10px] flex items-center border-l-[2.5px] hover:text-[#b8dedf] border-transparent hover:border-l-[#b8dedf]   hover:drop-shadow-xl">
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                    ></input>
                    {/* <IoMdPhotos className="text-[24px] mr-[8px]" /> */}
                    <img src={phot} className="w-[25px] mr-[8px]"></img>
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Photos
                  </div>
                </label>
                <div
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg  cursor-pointer"
                  style={{ transition: "2s", transitionDelay: ".8s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className="w-full h-full px-[10px] flex items-center border-l-[2.5px] hover:text-[#b8dedf] border-transparent hover:border-l-[#b8dedf]   hover:drop-shadow-xl"
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
                    <img src={contacts} className="w-[25px] mr-[8px]"></img>{" "}
                    Contact
                  </div>
                </div>
                <div
                  className="w-full flex items-center h-[40px] opacity-100 rounded-lg   cursor-pointer"
                  style={{ transition: "2s", transitionDelay: "1.1s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div
                    className="w-full h-full px-[10px] flex items-center border-l-[2.5px] hover:text-[#b8dedf] border-transparent hover:border-l-[#b8dedf]   hover:drop-shadow-xl"
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
                    <img src={sticker} className="w-[25px] mr-[8px]"></img>{" "}
                    Sticker
                  </div>
                </div>
                <div
                  className="w-full flex items-center  opacity-100 rounded-lg   cursor-pointer my-[10px]"
                  style={{ transition: "2s", transitionDelay: "1.125s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div className="w-full border border-[#ccd7dc1f] px-[10px] flex items-center  "></div>
                </div>
              </div>

              <div
                className="w-full flex items-center justify-center  h-[40px]    opacity-100
                 "
                style={{ transition: "2s", transitionDelay: "1.4s" }}
              >
                {image ? (
                  <div className="w-full h-full hover:bg-[#8171f3]  hover:text-[white] px-[10px] rounded-lg cursor-pointer ">
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
                      <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img>
                      Send
                      <span className="w-[20px] h-[20px] text-[12px] rounded-full ml-[40px] bg-[#cdd8dd] text-[black]   flex justify-center items-center">
                        {imageLength}
                      </span>
                    </button>
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
                      <img
                        src={sendd}
                        className="w-[25px] mr-[10px] z-20"
                      ></img>
                      Send
                      <span className="w-[20px] h-[20px] text-[12px] rounded-full ml-[40px] bg-[#cdd8dd00] text-[black]   flex justify-center items-center">
                        {imageLength}
                      </span>
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
            className="w-[208px] px-[19px] fixed mt-[-258px]"
            style={{ transition: ".5s" }}
          >
            <div
              className="w-[0] h-[258px] text-[#ccd7dc] bg-[#1f201fae] backdrop-blur-md py-[20px]   border-transparent  rounded-lg font-[nunitosans] font-normal text-[14px] flex flex-col justify-between"
              style={{ transition: ".5s" }}
            >
              <div className="w-full flex flex-col items-center">
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg hover:backdrop-blur-md hover:bg-[#ccd7dc]  hover:text-[black]  cursor-pointer"
                  // style={{ transition: ".2s" }}
                  for="document-file-input"
                  style={{ transition: ".2s" }}
                >
                  <div className="w-full h-full px-[10px] flex items-center">
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
                    <img src={docc} className="w-[25px] mr-[8px]"></img>{" "}
                    Documents
                  </div>
                </label>
                <label
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md hover:bg-[#ccd7dc]  hover:text-[black] cursor-pointer"
                  style={{ transition: ".2s" }}
                  for="image-file-input"
                >
                  <div className="w-full h-full px-[10px] flex items-center">
                    <input
                      id="image-file-input"
                      type="file"
                      accept="image/*"
                      onChange={(e) => Image(e)}
                      className="hidden"
                      // style={{ transition: ".2s" }}
                    ></input>
                    {/* <IoMdPhotos className="text-[24px] mr-[8px]" /> */}
                    <img src={phot} className="w-[25px] mr-[8px]"></img>
                    {/* <FcImageFile className="text-[24px] mr-[8px]" /> */}
                    Photos
                  </div>
                </label>
                <div
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md hover:bg-[#ccd7dc]  hover:text-[black] cursor-pointer"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div className="w-full h-full px-[10px] flex items-center">
                    <img src={contacts} className="w-[25px] mr-[8px]"></img>{" "}
                    Contact
                  </div>
                </div>
                <div
                  className="w-full flex items-center h-[40px] opacity-0 rounded-lg  hover:backdrop-blur-md hover:bg-[#ccd7dc]  hover:text-[black] cursor-pointer"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div className="w-full h-full px-[10px] flex items-center">
                    <img src={sticker} className="w-[25px] mr-[8px]"></img>{" "}
                    Sticker
                  </div>
                </div>
                <div
                  className="w-full flex items-center  opacity-100 rounded-lg   cursor-pointer my-[10px]"
                  style={{ transition: ".2s" }}
                >
                  {/* <MdContactPage className="text-[24px] mr-[8px]" /> */}

                  <div className="w-full border border-[#ccd7dc1f] flex items-center hover:bg-[#ccd7dc]  hover:text-[black] rounded-lg hover:drop-shadow-xl"></div>
                </div>
              </div>

              <div
                className="w-full flex items-center justify-center  h-[40px]   opacity-0"
                style={{ transition: ".2s" }}
              >
                <div className="w-full h-full hover:bg-[#8171f3]  hover:text-[white] px-[10px] rounded-lg">
                  <button
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
                    <img src={sendd} className="w-[25px] mr-[10px] z-20"></img>
                    Send
                    <span className="w-[20px] h-[20px] text-[12px] rounded-full ml-[40px] opacity-0 text-[black]   flex justify-center items-center">
                      {imageLength}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="w-full h-[80px] px-[20px] flex flex-col justify-center items-start bg-[#0b0c0b]">
        {ActiveChatUser.length === 0 ? (
          <></>
        ) : (
          <div className="w-full h-full flex justify-center items-center ">
            {/* <EmojiPicker /> */}
            {emoji === true ? (
              <div
                className="w-[35px] h-[35px] ml-[8px] flex justify-center items-center cursor-pointer bg-white rounded-full  z-10 text-[black]  hover:text-[black]"
                onClick={() => setEmoji(!emoji)}
              >
                {/* <BsFillEmojiLaughingFill className="text-[20px] " /> */}
                <img src={smiley} className="w-[25px]"></img>
              </div>
            ) : (
              <div
                className="w-[35px] h-[35px] ml-[8px] flex justify-center items-center cursor-pointer hover:bg-white rounded-full  z-10 text-[black]  hover:text-[black]"
                onClick={() => setEmoji(!emoji)}
              >
                {/* <BsFillEmojiLaughingFill className="text-[20px] " /> */}
                <img src={smiley} className="w-[25px] drop-shadow-md"></img>
              </div>
            )}
            <div
              className="w-[35px] h-[35px] flex justify-center items-center cursor-pointer hover:bg-white rounded-full mr-[-78px] z-10 text-[black]  hover:text-[black]"
              onClick={() => {
                setDocument(!document);
              }}
            >
              {/* <TiAttachment className="text-[23px] " /> */}
              <img src={attach} className="w-[25px] drop-shadow-md"></img>
            </div>

            <input
              type="text"
              onKeyDown={(e) => {
                if (e.nativeEvent.key === "Enter") {
                  if (Messages.length !== 0) {
                    var temp = formatAMPM(new Date());
                    storeToReactStore(Messages, temp, imageUrl);
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
              className="bg-[#b8dedf] w-[calc(100%-60px)] pl-[85px] px-[50px] h-[50px] outline-none font-normal rounded-lg drop-shadow-sm resize-none "
            ></input>

            {/* <EmojiPicker /> */}
            <button
              className="ml-[-35px] mr-[8px] z-10 h-[35px]   w-[35px] flex justify-center items-center cursor-pointer text-[black]  hover:bg-white rounded-full"
              onClick={() => {
                if (Messages.length !== 0) {
                  var temp = formatAMPM(new Date());
                  storeToReactStore(Messages, temp, imageUrl);
                  setSend(true);
                  // sendMessage(Messages);
                  setMessages("");
                  // sendMessage(Messages);
                  // dispatch(toggleSendFlag(true));
                }
              }}
            >
              {Messages.length === 0 ? (
                // <BiSolidSend className="text-[20px] text-[#828282]" />
                <img src={sendd} className="w-[25px] z-20 drop-shadow-md"></img>
              ) : (
                // <BiSolidSend className="text-[20px] " />
                <img src={sendd} className="w-[25px] z-20 drop-shadow-md"></img>
              )}
            </button>
            <div className="w-[50px] h-[50px] flex justify-center items-center cursor-pointer rounded-lg bg-[#b8dedf]  z-10  ml-[10px] text-[black]  ">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full hover:bg-white">
                {/* <BiSolidMicrophone className="text-[21px]  " /> */}
                <img src={mic} className="w-[25px] drop-shadow-md"></img>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MessageBody;
