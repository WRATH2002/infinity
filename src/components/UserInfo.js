import React from "react";
import dp from "../assets/img/dp2.jpg";
import profile2 from "../assets/img/d.png";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdCall, MdDoNotDisturb } from "react-icons/md";
import { BiCross, BiSolidVideo } from "react-icons/bi";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { addActiveUser } from "../utils/chatSlice";
import { onSnapshot, serverTimestamp } from "firebase/firestore";
import back from "../assets/img/back.png";
import call from "../assets/img/call.png";
import videocall from "../assets/img/videocall.png";
import chat from "../assets/img/message.png";
// import back from "../assets/img/back.png";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import { MdChevronRight } from "react-icons/md";
import download from "../assets/img/download.png";
import { saveAs } from "file-saver";
import toast, { Toaster, useToaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import del from "../assets/img/delete2.png";
import { IoMdVideocam } from "react-icons/io";
import { LuChevronRight } from "react-icons/lu";
import { RiMessage2Fill } from "react-icons/ri";
import { BsFiletypeJpg } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFiletypePpt } from "react-icons/bs";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeExe } from "react-icons/bs";
import { BsFiletypeGif } from "react-icons/bs";
import { BsFileEarmark } from "react-icons/bs";
import { BsFileEarmarkZip } from "react-icons/bs";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { BsFileEarmarkPlay } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
// import {MdCall} from "react-icons/md";

// import { FaAngleLeft } from "react-icons/fa6";

const Media = (props) => {
  const [url, setUrl] = useState("");
  const downloadImage = (data) => {
    // console.log("url");
    console.log(data);
    let urll = data;
    saveAs(urll, "helo.jpg");
  };
  return (
    <>
      {/* <div className="w-full h-full justify-start items-center  flex"> */}

      {props.data.mop === "Photos" ? (
        <>
          {!props.data.docName ? (
            <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
              <img
                className="w-full h-full rounded-xl"
                src={props.data.url}
              ></img>
            </div>
          ) : (
            // <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl">
            //   <img
            //     className="group-hover:opacity-40 w-full h-full object-cover rounded-xl"
            //     src={props.data.url}
            //   ></img>
            //   <div className="min-w-[90px] lg:min-w-[120px] md:min-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mt-[-90px] lg:mt-[-120px] md:mt-[-120px] rounded-xl flex justify-center items-center bg-[#1f201f]">
            //     <div
            //       className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm z-20 cursor-pointer "
            //       onClick={() => {
            //         setUrl(props.data.url);
            //         downloadImage(props.data.url);
            //         toast("Downloading Image", {
            //           icon: "⬇️",
            //           className: "font-[nunitosans] font-normal",
            //           style: {
            //             borderRadius: "9px",
            //             background: "#333",
            //             color: "#cdd8dd",
            //           },
            //         });
            //       }}
            //     >
            //       <img src={download} className="w-[20px]   z-20 "></img>
            //     </div>
            //   </div>
            // </div>
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {/* {!props.data.docName ? (
        <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl">
          <img
            className="group-hover:opacity-40 w-full h-full object-cover rounded-xl"
            src={props.data.url}
          ></img>
          <div className="min-w-[90px] lg:min-w-[120px] md:min-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mt-[-90px] lg:mt-[-120px] md:mt-[-120px] rounded-xl flex justify-center items-center bg-[#1f201f]">
            <div
              className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm z-20 cursor-pointer "
              onClick={() => {
                setUrl(props.data.url);
                downloadImage(props.data.url);
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
              <img src={download} className="w-[20px]   z-20 "></img>
            </div>
          </div>
        </div>
      ) : (
        <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl ">
          <div className="w-full h-full bg-white rounded-xl flex justify-center items-center">
            <div className="w-[70px] h-[70px] rounded-xl bg-[#e8e8e8] flex justify-center items-center text-black font-[google] font-light ">
              {props.data.docName
                ?.substring(props.data.docName?.indexOf(".") + 1)
                .toUpperCase()}
            </div>
          </div>
        </div>
      )} */}
      {/* <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div> */}
      {/* </div> */}
    </>
  );
};

export const UserInfo = () => {
  const [chatUserNumber, setChatUserNumber] = useState("");
  const [chatUserName, setChatUserName] = useState("");
  const [chatUserAbout, setChatUserAbout] = useState("");
  const [userSidebar, setUserSidebar] = useState(false);
  const [expand, setExpand] = useState(false);
  const [chatUserPhoto, setChatUserPhoto] = useState("");
  const [media, setMedia] = useState();
  const [delConfirmation, setDelConfirmation] = useState(false);

  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);
  const [chatFlag, setChatFlag] = useState("");
  const [docName, setDocName] = useState("");

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ImageMediaLink = useSelector((store) => store.chat.imageMediaLink);

  const dispatch = useDispatch();

  const allFriends = useSelector((store) => store.chat.FriendList);

  const [arr, setArr] = useState([]);
  const [timer, setTimer] = useState(false);
  const [theme, setTheme] = useState(true);
  const [mediaOption, setMediaOption] = useState("Documents");
  const [mediaShow, setMediaShow] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  useEffect(() => {
    fetchNotification();
  }, []);

  function fetchNotification() {
    const user = firebase.auth().currentUser;
    allFriends.map((item) => {
      if (item.UserId !== ActiveChatUser) {
        const userMsg = db
          .collection("Chat Record")
          .doc(user.uid)
          .collection("Chat Friends")
          .doc(item.UserId);

        var tt = "";
        var t = "";
        onSnapshot(userMsg, (snapshot) => {
          setChatFlag(
            snapshot?.data()?.ChatHistory[
              snapshot?.data()?.ChatHistory?.length - 1
            ]?.Flag
          );
          if (
            snapshot?.data()?.ChatHistory[
              snapshot?.data()?.ChatHistory?.length - 1
            ]?.Message.length === 0
          ) {
            if (
              snapshot?.data()?.ChatHistory[
                snapshot?.data()?.ChatHistory?.length - 1
              ]?.Image.length === 0
            ) {
              if (
                snapshot?.data()?.ChatHistory[
                  snapshot?.data()?.ChatHistory?.length - 1
                ]?.Video.length === 0
              ) {
                if (
                  snapshot?.data()?.ChatHistory[
                    snapshot?.data()?.ChatHistory?.length - 1
                  ]?.Document.length === 0
                ) {
                } else {
                  setLastMsg("Document");
                  setDocName(
                    snapshot?.data()?.ChatHistory[
                      snapshot?.data()?.ChatHistory?.length - 1
                    ]?.docName
                  );
                }
              } else {
                setLastMsg("Video");
              }
            } else {
              setLastMsg("Image");
            }
          } else {
            setLastMsg(
              snapshot?.data()?.ChatHistory[
                snapshot?.data()?.ChatHistory?.length - 1
              ]?.Message
            );

            const ref = db.collection("Chat Record").doc(item.UserId);
            onSnapshot(ref, (snapshot) => {
              tt = snapshot.data().Name;
              t = snapshot.data().Photo;
            });

            setTimer(true);
            setTimeout(() => {
              setTimer(false);
              setArr([]);
            }, 4000);

            setArr([
              {
                last: snapshot?.data()?.ChatHistory[
                  snapshot?.data()?.ChatHistory?.length - 1
                ]?.Message,
                name: tt,
                photo: t,
              },
            ]);
          }
        });
      }
    });
  }

  useEffect(() => {
    fetchChatUserInfo();
    // console.log("urlllllllllllllllllllllllllllllll");
    // console.log(ImageMediaLink);
  }, [ActiveChatUser]);

  useEffect(() => {
    console.log("fetch media");
    fetchMedia();
  }, [ActiveChatUser]);

  function fetchMedia() {
    const user = firebase.auth().currentUser;
    const listRef = ref(storage, `chats_images/${user.uid}/${ActiveChatUser}/`);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        console.log("media");
        console.log(res);
        res.items.forEach((itemRef) => {
          console.log("item");
          console.log(itemRef);
          itemRef.getDownloadURL().then((url) => {
            console.log("media url");
            console.log(url);
          });
          // console.log(itemRef.getDown)
          // All the items under listRef.
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  function fetchChatUserInfo() {
    if (ActiveChatUser.length !== 0) {
      const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
      // userDoc.get().then((data) => {
      //   setChatUserName(data.data().Name);
      //   setChatUserAbout(data.data().Info);
      // });
      onSnapshot(userDoc, (snapshot) => {
        // console.log("snapshot.docssssssssssssss");
        // console.log(snapshot.data());
        setChatUserName(snapshot?.data()?.Name);
        setChatUserAbout(snapshot?.data()?.Info);
        setChatUserNumber(snapshot?.data()?.Phone);
        // setChatUserPhoto(snapshot?.data()?.Photo);
        if (snapshot.data().Photo) {
          setChatUserPhoto(snapshot.data().Photo);
        } else {
          setChatUserPhoto("nophoto");
        }
      });
    } else {
      setChatUserName("Select Any User");
    }
  }

  function deleteChats() {
    const user = firebase.auth().currentUser;
    const chatRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(ActiveChatUser);

    chatRef.get().then((doc) => {
      if (doc.data().ChatHistory.length == 0) {
        toast.error("No Chats to Delete", {
          style: {
            backgroundColor: "#333333",
            color: "#fff",
            font: "work",
            fontWeight: "400",
          },
        });
      } else {
        toast.success("Chats Deleted", {
          style: {
            backgroundColor: "#333333",
            color: "#fff",
            font: "work",
            fontWeight: "400",
          },
        });
        chatRef.set({
          ChatHistory: [],
          LastUpdated: serverTimestamp(),
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
        });
      }
    });
  }

  useEffect(() => {
    setDelConfirmation(false);
  }, [ActiveChatUser]);

  useEffect(() => {
    if (ActiveChatUser.length !== 0) {
      fetchOnlineStatus();
    }
  }, []);

  function fetchOnlineStatus() {
    const user = firebase.auth().currentUser;
    const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
    onSnapshot(userDoc, (snapshot) => {
      setIsOnline(snapshot?.data()?.Online);
      console.log(snapshot?.data()?.Online);
    });
  }

  const [isOnline, setIsOnline] = useState(false);

  return (
    <>
      {/* <div
        className="w-full h-[80px] flex justify-center items-center px-[10px] fixed top-[10px]"
        // style={{ zIndex: "9999" }}
      >
        <div className="w-full h-full bg-slate-400 rounded-xl flex justify-center items-center p-[10px]">
          <div className="w-[60px] h-[60px] bg-white rounded-full mr-[10px]">
            <img className="w-full h-full rounded-full object-cover"></img>
          </div>
          <div className="w-[calc(100%-70px)] h-full bg-slate-500"></div>
        </div>
      </div> */}
      {userSidebar === false ? (
        <>
          {ActiveChatUser.length === 0 ? (
            <></>
          ) : (
            <>
              {ActiveChatUser.length !== 0 && chatFlag == 2 ? (
                <>
                  {/* {arr.map((item) => {
                        return (
                          <> */}
                  {/* {arr.length != 0 && timer == true ? (
                    <>
                      <div
                        className="w-full h-auto flex mt-[0]  justify-center items-center px-[10px] fixed top-[10px]"
                        style={{ zIndex: "9999", transition: ".4s" }}
                      >
                        <div className="w-full h-full bg-[#292f3f8a] font-[google] text-[14px] text-white backdrop-blur-md rounded-xl flex flex-col justify-center items-center px-[20px] py-[5px]">
                          <div className="w-full h-[70px]  flex justify-center items-center">
                            <div
                              className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]"
                              style={{ transition: ".4s" }}
                            >
                              <img
                                className="w-full h-full rounded-full object-cover"
                                src={arr[0]?.photo}
                              ></img>
                            </div>
                            <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start">
                              <span className="text-[16px]">
                                {arr[0]?.name}
                              </span>
                              <span className="text-[#b3b3b3] font-light">
                                {arr[0]?.last}
                              </span>
                            </div>
                          </div>
                          <div className="w-[60px] h-[4px] bg-[#939393] border border-[#939393] rounded-xl flex justify-center items-center mt-[15px] px-[10px] my-[5px]"></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-full h-auto flex mt-[-120px] justify-center items-center px-[10px] fixed top-[10px]"
                        style={{ zIndex: "9999", transition: ".4s" }}
                      >
                        <div className="w-full h-full bg-[#292f3f8a] font-[google] text-[14px] text-white backdrop-blur-md rounded-xl flex flex-col justify-center items-center px-[20px] overflow-hidden py-[0]">
                          <div className="w-full h-[70px]  flex justify-center items-center border-b-[.5px] border-[#696969]">
                            <div className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]">
                              <img
                                className="w-full h-full rounded-full object-cover"
                                src={arr[0]?.photo}
                              ></img>
                            </div>
                            <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start">
                              <span className="text-[16px]">
                                {arr[0]?.name}
                              </span>
                              <span className="text-[#b3b3b3] font-light">
                                {arr[0]?.last}
                              </span>
                            </div>
                          </div>
                          <div className="w-[60px] h-[4px] bg-[#939393] border border-[#939393] rounded-xl flex justify-center items-center mt-[15px] px-[10px] my-[5px]"></div>
                        </div>
                      </div>
                    </>
                  )} */}
                  {/* </>
                        );
                      })} */}

                  {/* <div className="w-full h-[70px] flex justify-center items-center  border-b-[.5px] border-[#696969]">
                        <div className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]">
                          <img
                            className="w-full h-full rounded-full object-cover"
                            src="https://firebasestorage.googleapis.com/v0/b/infinity-new.appspot.com/o/users%2FUbP9mzfzYOgr5Z9ivbHdAjxQ2Sf2%2FProfile%20Photo?alt=media&token=c30bf2b7-26ee-4074-aaf8-8c5c7e61e1c9"
                          ></img>
                        </div>
                        <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start">
                          <span className="text-[16px]">Niladri Purkait</span>
                          <span className="text-[#b3b3b3] font-light">
                            Hello Brp !!
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-[70px] flex justify-center items-center  ">
                        <div className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]">
                          <img
                            className="w-full h-full rounded-full object-cover"
                            src="https://firebasestorage.googleapis.com/v0/b/infinity-new.appspot.com/o/users%2FP9RvCXpI86UBTywtRFDUSvPjxn22%2FProfile%20Photo?alt=media&token=b030ecbe-106f-4ca6-a93f-35c6373281b9"
                          ></img>
                        </div>

                        <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start ">
                          <span className="text-[16px]">Random Purkait</span>
                          <span className="text-[#b3b3b3] font-light">
                            YOu have won an mercedes
                          </span>
                        </div>
                      </div> */}
                </>
              ) : (
                <></>
              )}
              <div
                className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[0] fixed bg-[#1b202d] text-[white]  overflow-hidden"
                // style={{ transition: ".5s" }}
              ></div>
              {/* <div
                className="w-full px-[10px] pt-[20px] h-[70px]  bg-[#1b202d] text-[black] z-50"
                style={{ zIndex: "10000" }}
              >
                <div className="w-full h-full pb-[20px] flex justify-center items-center">
                  <div
                    className="w-[35px] lg:w-[0] md:w-[0]  h-[35px] rounded-full text-[#ffb6b5]  flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      dispatch(addActiveUser(""));
                    }}
                  >
                    <FaAngleLeft className="text-[20px]" />
                  
                  </div>
                  <div className="w-[17px] h-[55px] ml-[10px]  flex justify-end items-end  z-10 ">
                    {isOnline === true ? (
                      <div
                        className="w-[12px] max-h-[12px] min-h-[12px] bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f]  rounded-full flex justify-center items-center   z-10 "
                        // style={{ zIndex: "100" }}
                      >
                        <div
                          className="w-[8px] max-h-[8px] min-h-[8px] bg-[#96df73]  rounded-full  z-10"
                          // style={{ zIndex: "100" }}
                        ></div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div
                    className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-[#21323a] ml-[-17px]  text-white "
                    onClick={() => {
                      setUserSidebar(!userSidebar);
                    }}
                  >
                    {chatUserPhoto === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-full h-full rounded-full object-cover"
                      ></img>
                    ) : (
                      <img
                        src={chatUserPhoto}
                        className="w-full h-full rounded-full object-cover"
                      ></img>
                    )}
                  </div>

                  <div className="w-[calc(100%-160px)] lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start z-20">
                    <span className="text-[17px]  font-[google] font-normal text-white   z-20">
                      {chatUserName}
                    </span>
                    <span className="text-[14px]  font-[google] font-light text-[#b1b1b1]   z-20">
                      +91 {chatUserNumber}
                    </span>
                  </div>

                  <span
                    className="cursor-pointer w-[50px] lg:w-[150px] md:w-[150px] "
                    onClick={() => {
                      setDelConfirmation(true);
                      // deleteChats();
                    }}
                  >
              
                    <div className="group flex justify-end items-center">
                      <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal bg-[#292f3f] text-[white]">
                        Delete Chats
                      </div>
                      <MdDelete className="text-[20px] text-[#ffb6b5] " />
                     
                    </div>
                  </span>
                </div>
              </div> */}
              {delConfirmation === true ? (
                <div
                  className={
                    "fixed  w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  h-[100%]  flex justify-center items-center    backdrop-blur-md top-[0px] " +
                    (theme ? " bg-[#e4eaf16d]" : " bg-[#17171a25]")
                  }
                  style={{ zIndex: "100" }}
                  onClick={() => {
                    // console.log("clicked");
                    // setDelConfirmation(false);
                  }}
                >
                  <div
                    className={
                      " text-[15px] w-[320px] lg:w-[450px] md:w-[450px] h-[220px] rounded-3xl flex flex-col justify-center items-center " +
                      (theme
                        ? " bg-[#ffffff] text-black"
                        : " bg-[#222228] text-white")
                    }
                  >
                    <div className="w-full rounded-xl  flex justify-start items-center px-[40px]">
                      <span className=" font-[google] font-medium text-[22px] ">
                        Clear this Chat?
                      </span>
                    </div>
                    <div
                      className={
                        "w-full mt-[10px] rounded-xl font-[work] flex justify-center items-center px-[40px]" +
                        (theme ? " text-[#343434]" : " text-[#afafaf]")
                      }
                    >
                      <span className="  font-light ">
                        ⚠️&nbsp; All the chats and media will be deleted. Are
                        you sure?
                      </span>
                    </div>
                    <div className=" h-[45px] w-full mt-[30px] flex justify-between items-center px-[40px] rounded-xl">
                      <button
                        className={
                          "w-[calc((100%-20px)/2)] h-[45px]    cursor-pointer  font-[google] font-light   rounded-2xl" +
                          (theme
                            ? " bg-[#e4eaf1] text-[#000000]"
                            : " bg-[#17171a] text-[#ffffff]")
                        }
                        onClick={() => {
                          // console.log("clicked");
                          setDelConfirmation(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="w-[calc((100%-20px)/2)] h-[45px] text-[black]   cursor-pointer  font-[google] font-light bg-[#96df73]  rounded-2xl"
                        onClick={() => {
                          // console.log("clicked");
                          setDelConfirmation(false);
                          deleteChats();
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
              {mediaShow === true ? (
                <div
                  className={
                    "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[calc(100svh-200px)]  top-[190px] flex flex-col justify-start items-center rounded-2xl py-[20px] pb-[10px] px-[15px]" +
                    (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                  }
                  style={{ zIndex: "100", transition: ".4s" }}
                >
                  <div
                    className={
                      "w-full h-[40px] flex justify-center items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] z-10" +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  >
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Documents");
                      }}
                    >
                      Documents
                    </div>
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Photos");
                      }}
                    >
                      Photos
                    </div>
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Videos");
                      }}
                    >
                      Videos
                    </div>
                  </div>
                  <div
                    className={
                      "w-full h-[40px] mt-[-50px] flex justify-start items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  >
                    {mediaOption === "Photos" ? (
                      <div
                        className={
                          "w-[calc(100%/3)]  ml-[calc(100%/3)]  h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    ) : mediaOption === "Videos" ? (
                      <div
                        className={
                          "w-[calc(100%/3)] ml-[calc((100%/3)*2)] h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    ) : (
                      <div
                        className={
                          "w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    )}
                  </div>
                  <div className="w-full max-h-[calc(100%-60px)] overflow-y-scroll flex justify-start items-start gap-y-0 flex-wrap">
                    {ImageMediaLink.map((link) => {
                      return (
                        <>
                          {console.log(link)}
                          {mediaOption === "Photos" ? (
                            <>
                              {!link.docName ? (
                                <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
                                  <img
                                    className={
                                      "object-cover w-full h-full rounded-xl" +
                                      (theme
                                        ? " bg-[#e4eaf1]"
                                        : " bg-[#17171a]")
                                    }
                                    src={link?.url}
                                  ></img>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : mediaOption === "Videos" ? (
                            <></>
                          ) : (
                            <>
                              {!link.docName ? (
                                <></>
                              ) : (
                                <>
                                  <div
                                    className={
                                      "w-full h-[50px] font-[google] font-normal flex justify-start items-center text-[15px] px-[5px] rounded-xl  " +
                                      (theme
                                        ? " text-[#b21313] hover:bg-[#e4eaf1]"
                                        : " text-[#04bdb6] hover:bg-[#17171a]")
                                    }
                                  >
                                    {link?.docName
                                      ?.substring(
                                        link?.docName?.indexOf(".") + 1
                                      )
                                      .toLowerCase() === "png" ? (
                                      <BsFiletypePng className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "jpg" ? (
                                      <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "jpeg" ? (
                                      <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "pdf" ? (
                                      <BsFiletypePdf className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "txt" ? (
                                      <BsFiletypeTxt className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "docx" ? (
                                      <BsFiletypeDocx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "xlsx" ? (
                                      <BsFiletypeXlsx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "ppt" ? (
                                      <BsFiletypePpt className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "pptx" ? (
                                      <BsFiletypePptx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "exe" ? (
                                      <BsFiletypeExe className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "gif" ? (
                                      <BsFiletypeGif className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "rar" ? (
                                      <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "zip" ? (
                                      <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "mp3" ? (
                                      <BsFileEarmarkMusic className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "mp4" ? (
                                      <BsFileEarmarkPlay className="text-[20px] mr-[10px]" />
                                    ) : (
                                      <>
                                        <BsFileEarmark className="text-[20px] mr-[10px]" />
                                      </>
                                    )}
                                    <div
                                      className={
                                        "w-[calc(100%-40px)] flex justify-start items-center  overflow-hidden text-ellipsis line-clamp-1 h-full" +
                                        (theme
                                          ? " text-[black]"
                                          : " text-[white]")
                                      }
                                    >
                                      {link?.docName}
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}

                          {/* <Media data={link} mop={mediaOption} /> */}
                        </>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div
                  className={
                    "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[0px]  top-[190px] flex flex-col justify-start items-center rounded-2xl py-[0px] pb-[0px] px-[15px] overflow-hidden " +
                    (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                  }
                  style={{ zIndex: "100", transition: ".4s" }}
                >
                  <div
                    className={
                      "w-full h-[40px] flex justify-center items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  >
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Documents");
                      }}
                    >
                      Documents
                    </div>
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Photos");
                      }}
                    >
                      Photos
                    </div>
                    <div
                      className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaOption("Videos");
                      }}
                    >
                      Videos
                    </div>
                  </div>
                  <div
                    className={
                      "w-full h-[40px] mt-[-50px] flex justify-start items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  >
                    {mediaOption === "Photos" ? (
                      <div
                        className={
                          "w-[calc(100%/3)]  ml-[calc(100%/3)]  h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    ) : mediaOption === "Videos" ? (
                      <div
                        className={
                          "w-[calc(100%/3)] ml-[calc((100%/3)*2)] h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    ) : (
                      <div
                        className={
                          "w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg " +
                          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                        }
                        style={{ transition: ".2s" }}
                      ></div>
                    )}
                  </div>
                  <div className="w-full max-h-[calc(100%-60px)] overflow-y-scroll flex justify-start items-start gap-y-0 flex-wrap">
                    {ImageMediaLink.map((link) => {
                      return (
                        <>
                          {console.log(link)}
                          {mediaOption === "Photos" ? (
                            <>
                              {!link.docName ? (
                                <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
                                  <img
                                    className="object-cover w-full h-full rounded-xl"
                                    src={link?.url}
                                  ></img>
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          ) : mediaOption === "Videos" ? (
                            <></>
                          ) : (
                            <>
                              {!link.docName ? (
                                <></>
                              ) : (
                                <>
                                  <div
                                    className={
                                      "w-full h-[50px] font-[google] font-normal flex justify-start items-center text-[15px] px-[5px] rounded-xl  " +
                                      (theme
                                        ? " text-[black]"
                                        : " text-[white]")
                                    }
                                  >
                                    {link?.docName
                                      ?.substring(
                                        link?.docName?.indexOf(".") + 1
                                      )
                                      .toLowerCase() === "png" ? (
                                      <BsFiletypePng className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "jpg" ? (
                                      <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "jpeg" ? (
                                      <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "pdf" ? (
                                      <BsFiletypePdf className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "txt" ? (
                                      <BsFiletypeTxt className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "docx" ? (
                                      <BsFiletypeDocx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "xlsx" ? (
                                      <BsFiletypeXlsx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "ppt" ? (
                                      <BsFiletypePpt className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "pptx" ? (
                                      <BsFiletypePptx className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "exe" ? (
                                      <BsFiletypeExe className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "gif" ? (
                                      <BsFiletypeGif className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "rar" ? (
                                      <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "zip" ? (
                                      <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "mp3" ? (
                                      <BsFileEarmarkMusic className="text-[20px] mr-[10px]" />
                                    ) : link?.docName
                                        ?.substring(
                                          link?.docName?.indexOf(".") + 1
                                        )
                                        .toLowerCase() === "mp4" ? (
                                      <BsFileEarmarkPlay className="text-[20px] mr-[10px]" />
                                    ) : (
                                      <>
                                        <BsFileEarmark className="text-[20px] mr-[10px]" />
                                      </>
                                    )}
                                    <div className="w-[calc(100%-40px)] flex justify-start items-center  overflow-hidden text-ellipsis line-clamp-1 h-full">
                                      {link?.docName}
                                    </div>
                                  </div>
                                </>
                              )}
                            </>
                          )}

                          {/* <Media data={link} mop={mediaOption} /> */}
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
              <div
                className={
                  "w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] z-30 fixed top-0" +
                  (theme ? " h-[80px] bg-[#e4eaf1]" : " h-[80px] bg-[#17171a]")
                }
              ></div>

              <div
                className={
                  "w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  z-50  fixed top-0 flex justify-center items-start p-[10px] backdrop-blur-md overflow-visible" +
                  (theme
                    ? expand
                      ? " h-[100svh] bg-[#e4eaf16d] "
                      : " h-[80px] bg-[#e4eaf1]"
                    : expand
                    ? " h-[100svh] bg-[#17171a25] "
                    : " h-[80px] bg-[#17171a]")
                }
              >
                {expand == true ? (
                  <div
                    className={
                      "w-full h-[170px] z-50  rounded-2xl  top-0 flex justify-between items-center p-[20px] " +
                      (theme ? " bg-[#ffffff]" : " bg-[#282828]")
                    }
                    style={{ transition: ".4s" }}
                  >
                    <div
                      className={
                        "w-[0] overflow-hidden lg:w-[0] md:w-[0]  h-[35px] rounded-full   cursor-pointer flex justify-start items-center" +
                        (theme ? " text-[black]" : " text-[white]")
                      }
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
                      onClick={() => {
                        dispatch(addActiveUser(""));
                      }}
                    >
                      <FaAngleLeft className="text-[20px] " />
                    </div>
                    <div
                      className="w-[17px] opacity-0 overflow-hidden h-[55px]   flex justify-end items-end  z-10 "
                      style={{
                        transition: ".4s",
                        // transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
                    >
                      {isOnline === true ? (
                        <div
                          className={
                            "w-[12px] max-h-[12px] min-h-[12px]  rounded-full flex justify-center items-center   z-10 " +
                            (theme
                              ? " bg-[#ffffff] md:bg-[#ffffff] lg:bg-[#ffffff] "
                              : " bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f] ")
                          }
                          // style={{ zIndex: "100" }}
                        >
                          <div
                            className={
                              "w-[8px] max-h-[8px] min-h-[8px]   rounded-full  z-10" +
                              (theme ? " bg-[#469422] " : " bg-[#96df73]")
                            }
                            // style={{ zIndex: "100" }}
                          ></div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div
                      className={
                        "w-[130px] h-[130px]  rounded-full cursor-pointer  ml-[-17px]  text-white " +
                        (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                      }
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
                      onClick={() => {
                        setExpand(!expand);
                        setMediaShow(false);
                      }}
                    >
                      {chatUserPhoto === "nophoto" ? (
                        <img
                          src={profile2}
                          className="w-full h-full rounded-full object-cover"
                        ></img>
                      ) : (
                        <img
                          src={chatUserPhoto}
                          className="w-full h-full rounded-full object-cover"
                        ></img>
                      )}
                    </div>
                    <div className="w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-full ml-[15px]  flex flex-col justify-center items-start z-20">
                      <span
                        className={
                          "text-[18px]  font-[google] font-normal    z-20" +
                          (theme ? " text-black" : " text-white")
                        }
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        {chatUserName}
                      </span>
                      <span
                        className={
                          "text-[15px]  font-[work] font-light    z-20" +
                          (theme ? " text-[#2d2d2d]" : " text-[#b1b1b1]")
                        }
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        +91 {chatUserNumber}
                      </span>
                      <span
                        className={
                          "text-[14px]  max-h-[50px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[work] font-light   z-20" +
                          (theme ? " text-[#2d2d2d]" : " text-[#8e8e8e]")
                        }
                        style={{ transition: ".4s", transitionDelay: ".4s" }}
                      >
                        {chatUserAbout}
                      </span>

                      {/* {isOnline === true ? (
                        <>
                          <div
                            className=" justify-center  items-center h-[30px] flex  mt-[5px]"
                            style={{
                              transition: ".4s",
                              transitionDelay: ".4s",
                            }}
                          >
                            <span
                              class={
                                "pulse z-50  opacity-100 " +
                                (theme ? " bg-[#469422] " : " bg-[#96df73]")
                              }
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            ></span>{" "}
                            <span
                              className={
                                "ml-[10px] text-[15px]  font-[google] font-normal opacity-100 " +
                                (theme ? " text-[#2d2d2d]" : " text-[#b3b3b3]")
                              }
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            >
                              Online
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className=" justify-center  items-center h-[30px] flex  mt-[5px]"
                            style={{
                              transition: ".4s",
                              transitionDelay: ".4s",
                            }}
                          >
                            <span
                              class="pulsew z-50 bg-[#ffd557] opacity-100 "
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            ></span>{" "}
                            <span
                              className={
                                "ml-[10px] text-[15px]  font-[google] font-normal opacity-100 " +
                                (theme ? " text-[#2d2d2d]" : " text-[#b3b3b3]")
                              }
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            >
                              Offline
                            </span>
                          </div>
                        </>
                      )} */}
                      <span
                        className="w-auto pl-[10px] pr-[3.5px] mt-[10px] h-[30px] rounded-3xl overflow-hidden bg-[#04bdb6] text-white text-[14px]  font-[work] font-light flex justify-center items-center"
                        onClick={() => {
                          // setUserSidebar(!userSidebar);
                          setMediaShow(!mediaShow);
                          setMediaOption("Documents");
                        }}
                        style={{
                          transition: ".4s",
                          transitionDelay: ".8s",
                        }}
                      >
                        <span>
                          {ImageMediaLink.length !== 0 ? (
                            <>
                              {mediaShow === true ? (
                                <>Close Media</>
                              ) : (
                                <>Media</>
                              )}
                            </>
                          ) : (
                            <>No Media</>
                          )}
                        </span>
                        <div className="border-[.7px] border-[white] h-[15px] ml-[6px]"></div>
                        {ImageMediaLink.length !== 0 ? (
                          <>
                            {mediaShow === true ? (
                              <>
                                <RxCross2 className="text-white text-[15px] ml-[1.5px] mr-[1.5px]" />
                              </>
                            ) : (
                              <LuChevronRight className="text-white text-[15px] ml-[1.5px]" />
                            )}
                          </>
                        ) : (
                          <>
                            <MdDoNotDisturb className="text-white text-[15px] ml-[3px] mr-[1.5px]" />
                          </>
                        )}
                      </span>
                    </div>
                    <span
                      className="cursor-pointer w-[0] lg:w-[0]  md:w-[0] overflow-hidden "
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
                      onClick={() => {
                        setDelConfirmation(true);
                        // deleteChats();
                      }}
                    >
                      <div className="group flex justify-end items-center">
                        <div
                          className={
                            "hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal " +
                            (theme
                              ? " bg-[#e4eaf1] text-black"
                              : " bg-[#17171a] text-white")
                          }
                        >
                          Delete Chats
                        </div>
                        <MdDelete
                          className={
                            "text-[20px] " +
                            +(theme ? " bg-[#469422] " : " bg-[#96df73]")
                          }
                        />
                      </div>
                    </span>
                  </div>
                ) : (
                  <div
                    className={
                      "w-full h-[60px] z-50  rounded-2xl  top-0 flex justify-between items-center px-[20px]" +
                      (theme
                        ? " bg-[#ffffff] text-[black]"
                        : " bg-[#282828] text-[white]")
                    }
                    style={{ transition: ".4s", transitionDelay: ".4s" }}
                    // onClick={() => {
                    //   setExpand(!expand);
                    // }}
                  >
                    <div
                      className="w-[35px]  lg:w-[0] md:w-[0]  h-[35px] rounded-full    cursor-pointer flex justify-start items-center"
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                      }}
                      onClick={() => {
                        dispatch(addActiveUser(""));
                      }}
                    >
                      <FaAngleLeft className="text-[20px] " />
                    </div>
                    <div
                      className="w-[17px] h-[55px] opacity-100  flex justify-end  items-end  z-10 "
                      style={{ transition: ".2s", transitionDelay: ".8s" }}
                    >
                      {isOnline === true ? (
                        <div
                          className={
                            "w-[12px] max-h-[12px] min-h-[12px]   rounded-full flex justify-center items-center   z-10 " +
                            (theme
                              ? " bg-[#ffffff] md:bg-[#ffffff] lg:bg-[#ffffff]"
                              : " bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                          }
                          // style={{ zIndex: "100" }}
                        >
                          <div
                            className={
                              "w-[8px] max-h-[8px] min-h-[8px]   rounded-full  z-10" +
                              (theme ? " bg-[#469422] " : " bg-[#96df73]")
                            }
                            // style={{ zIndex: "100" }}
                          ></div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div
                      className={
                        "w-[50px] h-[50px]  rounded-full cursor-pointer  ml-[-17px]   " +
                        (theme
                          ? " bg-[#e4eaf1] text-black"
                          : " bg-[#17171a] text-white")
                      }
                      style={{
                        transition: ".4s",
                        // transitionDelay: ".2s",
                      }}
                      // onClick={() => {
                      //   setUserSidebar(!userSidebar);
                      // }}
                      onClick={() => {
                        setExpand(!expand);
                      }}
                    >
                      {chatUserPhoto === "nophoto" ? (
                        <img
                          src={profile2}
                          className="w-full h-full rounded-full object-cover"
                        ></img>
                      ) : (
                        <img
                          src={chatUserPhoto}
                          className="w-full h-full rounded-full object-cover"
                        ></img>
                      )}
                    </div>

                    <div
                      className={
                        "w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start z-20" +
                        (theme ? "  text-black" : "  text-white")
                      }
                    >
                      <span
                        className="text-[18px]  font-[google] font-normal    z-20"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".2s",
                        }}
                      >
                        {chatUserName}
                      </span>
                      <span
                        className={
                          "text-[14px]  font-[work] font-light   z-20" +
                          (theme ? "  text-[#2d2d2d]" : "  text-[#b1b1b1]")
                        }
                        style={{
                          transition: ".4s",
                          transitionDelay: ".2s",
                        }}
                      >
                        +91 {chatUserNumber}
                      </span>
                      <span
                        className={
                          "text-[14px]  max-h-[0px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[work] font-light  z-20" +
                          (theme ? "  text-[#2d2d2d]" : "  text-[#8e8e8e] ")
                        }
                        style={{ transition: ".4s", transitionDelay: ".4s" }}
                      >
                        ~ {chatUserAbout}
                      </span>

                      {/* {isOnline === true ? (
                        <>
                          <div
                            className=" justify-center overflow-hidden items-center flex h-[0] mt-[5px]"
                            style={
                              {
                                // transition: ".4s",
                                // transitionDelay: ".4s",
                              }
                            }
                          >
                            <span
                              class={
                                "pulse z-50 opacity-0 " +
                                (theme ? " bg-[#469422] " : " bg-[#96df73]")
                              }
                              style={{ transition: ".4s" }}
                            ></span>{" "}
                            <span
                              className={
                                "ml-[10px] text-[15px] font-[google] font-normal opacity-0 " +
                                (theme
                                  ? "  text-[#2d2d2d]"
                                  : "  text-[#8e8e8e] ")
                              }
                              style={{ transition: ".4s" }}
                            >
                              Online
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className=" justify-center overflow-hidden items-center flex h-[0] mt-[5px]"
                            style={
                              {
                                // transition: ".4s",
                                // transitionDelay: ".4s",
                              }
                            }
                          >
                            <span
                              class="pulsew z-50 bg-[#ffd557] opacity-0 "
                              style={{ transition: ".4s" }}
                            ></span>{" "}
                            <span
                              className={
                                "ml-[10px] text-[15px]  font-[google] font-normal opacity-0 " +
                                (theme
                                  ? "  text-[#2d2d2d]"
                                  : "  text-[#8e8e8e] ")
                              }
                              style={{ transition: ".4s" }}
                            >
                              Offline
                            </span>
                          </div>
                        </>
                      )} */}
                      <span
                        className="w-0 pl-[0px] pr-0 mt-[0px] h-[0px] overflow-hidden rounded-3xl bg-[#04bdb6] text-white text-[14px]  font-[work] font-light flex justify-center items-center"
                        onClick={() => {
                          setUserSidebar(!userSidebar);
                        }}
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        <span>
                          {ImageMediaLink.length !== 0 ? (
                            <>
                              {mediaShow === true ? (
                                <>Close Media</>
                              ) : (
                                <>Media</>
                              )}
                            </>
                          ) : (
                            <>No Media</>
                          )}
                        </span>
                        <div className="border-[.7px] border-[white] h-[15px] ml-[6px]"></div>
                        {ImageMediaLink.length !== 0 ? (
                          <>
                            {mediaShow === true ? (
                              <>
                                <RxCross2 className="text-white text-[15px] ml-[1.5px] mr-[1.5px]" />
                              </>
                            ) : (
                              <LuChevronRight className="text-white text-[15px] ml-[1.5px]" />
                            )}
                          </>
                        ) : (
                          <>
                            <MdDoNotDisturb className="text-white text-[15px] ml-[3px] mr-[1.5px]" />
                          </>
                        )}
                      </span>
                      {/* <span
                        className="w-[0] mt-[10px] h-[0px] overflow-hidden rounded-full bg-[#4b93b9] text-white text-[15px]  font-[google] font-light flex justify-center items-center"
                        onClick={() => {
                          setUserSidebar(!userSidebar);
                        }}
                        style={{
                          transition: ".4s",
                          // transitionDelay: ".4s",
                        }}
                      >
                        <span>Media</span>
                        <LuChevronRight className="text-white text-[20px] ml-[5px]" />
                      </span> */}
                    </div>

                    <span
                      className="cursor-pointer w-[50px]  lg:w-[150px] md:w-[150px] "
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                      }}
                      onClick={() => {
                        setDelConfirmation(true);
                        // deleteChats();
                      }}
                    >
                      <div className="group flex justify-end items-center">
                        <div
                          className={
                            "hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal " +
                            (theme
                              ? " bg-[#e4eaf1] text-black"
                              : " bg-[#17171a] text-white")
                          }
                        >
                          Delete Chats
                        </div>
                        <MdDelete
                          className={
                            "text-[20px]  " +
                            (theme ? "  text-[#000000]" : "  text-[#ffffff] ")
                          }
                        />
                      </div>
                    </span>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="w-full lg:w-[40%] md:w-[40%] h-[100svh] fixed bg-[#1b202d]   backdrop-blur-lg   text-white z-50 overflow-hidden flex flex-col justify-center items-center px-[10px] right-0 border-l-[0px] md:border-l-[2px] lg:border-l-[2px] border-[#383e4f]"
            // style={{ transition: ".5s" }}
            style={{ zIndex: "10000" }}
          >
            <div className="w-full h-[70px] flex justify-start items-center ">
              <div
                className="w-[35px] h-[35px] rounded-full  text-[#ffb6b5] flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                <FaAngleLeft className="text-[20px]" />
                {/* <img src={back} className="w-[25px] "></img> */}
              </div>
            </div>

            <div className="w-full h-[calc(100%-70px)]  flex flex-col justify-center items-center">
              <div
                className={
                  "w-[150px] lg:w-[200px] md:w-[200px] h-[150px] lg:h-[200px] md:h-[200px] rounded-full   " +
                  (theme ? " bg-[#cdd8dd]" : " bg-[#17171a]")
                }
              >
                {/* <span>Photo</span> */}
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              {/* <div className="w-[17px] h-[55px] ml-[10px]  flex justify-end items-end  z-50 "> */}

              {/* </div> */}
              <div className="flex flex-col justify-center items-center mt-[20px]">
                <span className="text-[20px] font-[google] font-normal text-[#ffffff] ">
                  {chatUserName}
                </span>
                <span className="text-[15px]  font-[google] font-light text-[#b1b1b1] ">
                  +91 {chatUserNumber}
                </span>
                {isOnline === true ? (
                  <>
                    <div className="flex justify-center items-center h-[30px] mt-[5px]">
                      <span class="pulse z-50 bg-[#96df73] "></span>{" "}
                      <span className="ml-[10px] text-[15px] text-[#b1b1b1] font-[google] font-normal ">
                        Online
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-center items-center h-[30px] mt-[5px]">
                      <span class="pulsew z-50 bg-[#ffd557] "></span>{" "}
                      <span className="ml-[10px] text-[15px] text-[#b1b1b1] font-[google] font-normal ">
                        Offline
                      </span>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-[20px] w-full flex justify-center items-start h-[26px] overflow-hidden text-ellipsis">
                <span className="text-[15px]   font-[google] font-extralight text-[#b1b1b1] ">
                  ~ {chatUserAbout}
                </span>
              </div>

              <div className="w-full flex justify-center items-center mt-[20px] ">
                <span className="w-[50px] h-[50px]  rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <MdCall className="text-[30px]" />
                  {/* <img src={call} className="w-[35px] "></img> */}
                </span>
                <span className="w-[50px] h-[50px]  rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <IoMdVideocam className="text-[30px]" />
                  {/* <img
                    src={videocall}
                    className="w-[35px] "
                  ></img> */}
                </span>
                <span className="w-[50px] h-[50px]  rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <RiMessage2Fill className="text-[30px]" />
                  {/* <img src={chat} className="w-[35px]  "></img> */}
                </span>
              </div>
              <span className=" font-[google] font-light text-[16px] w-full flex justify-start items-center mt-[20px] text-[white] px-[10px]">
                Media, Links & Docs{" "}
                <div className="ml-[10px]  w-[20px] h-[20px] flex justify-center items-center text-[13px] font-[google] font-light text-black rounded-full bg-[#ffb6b5]">
                  {ImageMediaLink.length}{" "}
                </div>
                <MdChevronRight className="text-[#a0a0a0] text-[25px] ml-[5px]" />
              </span>
              <div className="w-full h-[200px]  flex overflow-x-scroll mt-[5px] px-[10px]">
                {ImageMediaLink.map((link) => {
                  return (
                    <>
                      <Media data={link} />
                    </>
                  );
                })}
              </div>
            </div>
            {/* <div className="w-[calc(100%-40px)] h-[50px] bg-[#ffb6b5] rounded-xl fixed flex justify-center items-center text-black bottom-[20px]">
              Delete Chats
            </div> */}
          </div>
          <div className="w-full px-[10px] pt-[20px] h-[70px]  bg-[#1b202d] text-[black]">
            <div className="w-full h-full pb-[20px] flex justify-center items-center">
              <div
                className="w-[35px] lg:w-[0] md:w-[0]  h-[35px] rounded-full  text-black flex justify-center items-center cursor-pointer"
                onClick={() => {
                  dispatch(addActiveUser(""));
                }}
              >
                {/* <FaAngleLeft className="text-[20px]" /> */}
                <img src={back} className="w-[25px]  "></img>
              </div>
              <div className="w-[17px] h-[55px] ml-[10px]  flex justify-end items-end  z-50 ">
                {isOnline === true ? (
                  <div
                    className="w-[12px] max-h-[12px] min-h-[12px] bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f]  rounded-full flex justify-center items-center   z-50 "
                    style={{ zIndex: "100" }}
                  >
                    <div
                      className="w-[8px] max-h-[8px] min-h-[8px] bg-[#96df73]  rounded-full  z-50"
                      style={{ zIndex: "100" }}
                    ></div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-slate-400 ml-[-17px]"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-160px)] lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                <span className="text-[17px]  font-[google] font-normal text-white ">
                  {chatUserName}
                </span>
                <span className="text-[14px]  font-[google] font-light text-[#b1b1b1] ">
                  +91 {chatUserNumber}
                </span>
              </div>

              <span
                className="cursor-pointer w-[50px] lg:w-[150px] md:w-[150px] "
                onClick={() => {
                  deleteChats();
                }}
              >
                {/* <MdDelete className="text-[20px] text-[white] hover:text-[#b54848]" /> */}
                <div className="group flex justify-end items-center">
                  <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px]  font-[work] font-normal tracking-[.4px] bg-[#505050]">
                    Delete Chats
                  </div>
                  <img src={del} className=" w-[25px]  "></img>
                </div>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
