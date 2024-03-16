import React from "react";
import dp from "../assets/img/dp2.jpg";
import profile2 from "../assets/img/d.png";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { BiSolidVideo } from "react-icons/bi";
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
      {!props.data.docName ? (
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
              <img
                src={download}
                className="w-[20px]   z-20 drop-shadow-md"
              ></img>
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
      )}
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

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ImageMediaLink = useSelector((store) => store.chat.imageMediaLink);

  const dispatch = useDispatch();

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
      {userSidebar === false ? (
        <>
          {ActiveChatUser.length === 0 ? (
            <></>
          ) : (
            <>
              {" "}
              <div
                className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[0] fixed bg-[#1b202d] text-[white] z-30 overflow-hidden"
                // style={{ transition: ".5s" }}
              ></div>
              {/* <div
                className="w-full px-[10px] pt-[20px] h-[70px]  bg-[#1b202d] text-[black] z-50"
                style={{ zIndex: "10000" }}
              >
                <div className="w-full h-full pb-[20px] flex justify-center items-center">
                  <div
                    className="w-[35px] lg:w-[0] md:w-[0]  h-[35px] rounded-full text-[#ffb6b5] drop-shadow-md flex justify-center items-center cursor-pointer"
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
                    className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-[#21323a] ml-[-17px]  text-white drop-shadow-md"
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
                    <span className="text-[17px]  font-[google] font-normal text-white drop-shadow-md  z-20">
                      {chatUserName}
                    </span>
                    <span className="text-[14px]  font-[google] font-light text-[#b1b1b1] drop-shadow-md  z-20">
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
                      <MdDelete className="text-[20px] text-[#ffb6b5] drop-shadow-md" />
                     
                    </div>
                  </span>
                </div>
              </div> */}
              {delConfirmation === true ? (
                <div
                  className="fixed  w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  h-[calc(100%-80px)]  flex justify-center items-center  bg-[#000000a2]  backdrop-blur-sm top-[80px]"
                  style={{ zIndex: "10" }}
                  onClick={() => {
                    // console.log("clicked");
                    setDelConfirmation(false);
                  }}
                >
                  <div className="bg-[#292f3f] text-white text-[15px] w-[320px] lg:w-[450px] md:w-[450px] h-[190px] rounded-xl flex flex-col drop-shadow-md">
                    <div className="w-full h-[110px] rounded-xl  flex justify-center items-center px-[30px]">
                      <span className=" font-[google] font-light ">
                        ⚠️ Are you sure? you want to delete all chats!
                      </span>
                    </div>
                    <div className=" h-[80px] w-full flex justify-between items-center px-[30px] rounded-xl">
                      <button
                        className="w-[115px] lg:w-[165px] md:w-[165px] h-[45px] text-[#ffffff]   cursor-pointer  font-[google] font-light bg-[#1b202d]  rounded-xl"
                        onClick={() => {
                          // console.log("clicked");
                          setDelConfirmation(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-[115px] lg:w-[165px] md:w-[165px] h-[45px] text-[black]   cursor-pointer  font-[google] font-light bg-[#ffb6b5]  rounded-xl"
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
              <div className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[80px] z-50 bg-[#1b202d] fixed top-0 flex justify-center items-start p-[10px] overflow-visible">
                {expand == true ? (
                  <div
                    className="w-full h-[170px] z-50 bg-[#292f3f] rounded-xl  top-0 flex justify-between items-center p-[20px] drop-shadow-md"
                    style={{ transition: ".4s" }}
                  >
                    <div
                      className="w-[0] overflow-hidden lg:w-[0] md:w-[0]  h-[35px] rounded-full text-[#ffb6b5] drop-shadow-md  cursor-pointer flex justify-start items-center"
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
                      onClick={() => {
                        dispatch(addActiveUser(""));
                      }}
                    >
                      <FaAngleLeft className="text-[20px]" />
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
                      className="w-[130px] h-[130px]  rounded-full cursor-pointer bg-[#21323a] ml-[-17px]  text-white "
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                        // transitionDelay: ".2s",
                      }}
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
                    <div className="w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-full ml-[15px]  flex flex-col justify-center items-start z-20">
                      <span
                        className="text-[20px]  font-[google] font-normal text-white drop-shadow-md  z-20"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        {chatUserName}
                      </span>
                      <span
                        className="text-[15px]  font-[google] font-light text-[#b1b1b1] drop-shadow-md  z-20"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        +91 {chatUserNumber}
                      </span>
                      <span
                        className="text-[14px]  max-h-[50px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[google] font-light text-[#8e8e8e]  z-20"
                        style={{ transition: ".4s", transitionDelay: ".4s" }}
                      >
                        {chatUserAbout}
                      </span>

                      {isOnline === true ? (
                        <>
                          <div
                            className=" justify-center  items-center h-[30px] flex  mt-[5px]"
                            style={{
                              transition: ".4s",
                              transitionDelay: ".4s",
                            }}
                          >
                            <span
                              class="pulse z-50 bg-[#96df73] opacity-100 "
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            ></span>{" "}
                            <span
                              className="ml-[10px] text-[15px] text-[#b3b3b3] font-[google] font-normal opacity-100 "
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
                              className="ml-[10px] text-[15px] text-[#b3b3b3] font-[google] font-normal opacity-100 "
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                            >
                              Offline
                            </span>
                          </div>
                        </>
                      )}
                      {/* <span
                        className="w-[90px] mt-[10px] h-[30px] rounded-full bg-[#4b93b9] text-white text-[15px]  font-[google] font-light flex justify-center items-center"
                        onClick={() => {
                          setUserSidebar(!userSidebar);
                        }}
                        style={{
                          transition: ".4s",
                          transitionDelay: ".4s",
                        }}
                      >
                        <span>Media</span>
                        <LuChevronRight className="text-white text-[20px] ml-[5px]" />
                      </span> */}
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
                        <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal bg-[#292f3f] text-[white]">
                          Delete Chats
                        </div>
                        <MdDelete className="text-[20px] text-[white] drop-shadow-md" />
                      </div>
                    </span>
                  </div>
                ) : (
                  <div
                    className="w-full h-[60px] z-50 bg-[#292f3f] rounded-xl  top-0 flex justify-between items-center px-[20px]"
                    style={{ transition: ".4s", transitionDelay: ".4s" }}
                    // onClick={() => {
                    //   setExpand(!expand);
                    // }}
                  >
                    <div
                      className="w-[35px]  lg:w-[0] md:w-[0]  h-[35px] rounded-full text-[white] drop-shadow-md  cursor-pointer flex justify-start items-center"
                      style={{
                        transition: ".4s",
                        transitionDelay: ".4s",
                      }}
                      onClick={() => {
                        dispatch(addActiveUser(""));
                      }}
                    >
                      <FaAngleLeft className="text-[20px]" />
                    </div>
                    <div
                      className="w-[17px] h-[55px] opacity-100  flex justify-end  items-end  z-10 "
                      style={{ transition: ".2s", transitionDelay: ".8s" }}
                    >
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
                      className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-[#21323a] ml-[-17px]  text-white drop-shadow-md"
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

                    <div className="w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start z-20">
                      <span
                        className="text-[17px]  font-[google] font-normal text-white drop-shadow-md  z-20"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".2s",
                        }}
                      >
                        {chatUserName}
                      </span>
                      <span
                        className="text-[14px]  font-[google] font-light text-[#b1b1b1] drop-shadow-md  z-20"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".2s",
                        }}
                      >
                        +91 {chatUserNumber}
                      </span>
                      <span
                        className="text-[14px]  max-h-[0px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[google] font-light text-[#8e8e8e]  z-20"
                        style={{ transition: ".4s", transitionDelay: ".4s" }}
                      >
                        ~ {chatUserAbout}
                      </span>

                      {isOnline === true ? (
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
                              class="pulse z-50 bg-[#96df73] opacity-0 "
                              style={{ transition: ".4s" }}
                            ></span>{" "}
                            <span
                              className="ml-[10px] text-[15px] text-[#b3b3b3] font-[google] font-normal opacity-0 "
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
                              className="ml-[10px] text-[15px] text-[#b3b3b3] font-[google] font-normal opacity-0 "
                              style={{ transition: ".4s" }}
                            >
                              Offline
                            </span>
                          </div>
                        </>
                      )}
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
                        <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal bg-[#292f3f] text-[white]">
                          Delete Chats
                        </div>
                        <MdDelete className="text-[20px] text-[white] drop-shadow-md" />
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
            className="w-full lg:w-[40%] md:w-[40%] h-[100svh] fixed bg-[#1b202d]   backdrop-blur-lg drop-shadow-md  text-white z-50 overflow-hidden flex flex-col justify-center items-center px-[10px] right-0 border-l-[0px] md:border-l-[2px] lg:border-l-[2px] border-[#383e4f]"
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
                {/* <img src={back} className="w-[25px] drop-shadow-lg"></img> */}
              </div>
            </div>

            <div className="w-full h-[calc(100%-70px)]  flex flex-col justify-center items-center">
              <div className="w-[150px] lg:w-[200px] md:w-[200px] h-[150px] lg:h-[200px] md:h-[200px] rounded-full bg-[#cdd8dd]  drop-shadow-lg">
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
                <span className="text-[20px] font-[google] font-normal text-[#ffffff] drop-shadow-lg">
                  {chatUserName}
                </span>
                <span className="text-[15px]  font-[google] font-light text-[#b1b1b1] drop-shadow-lg">
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
                <span className="text-[15px]   font-[google] font-extralight text-[#b1b1b1] drop-shadow-lg">
                  ~ {chatUserAbout}
                </span>
              </div>

              <div className="w-full flex justify-center items-center mt-[20px] ">
                <span className="w-[50px] h-[50px] drop-shadow-md rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <MdCall className="text-[30px]" />
                  {/* <img src={call} className="w-[35px] drop-shadow-lg"></img> */}
                </span>
                <span className="w-[50px] h-[50px] drop-shadow-md rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <IoMdVideocam className="text-[30px]" />
                  {/* <img
                    src={videocall}
                    className="w-[35px] drop-shadow-lg"
                  ></img> */}
                </span>
                <span className="w-[50px] h-[50px] drop-shadow-md rounded-full hover:bg-[#383e4f] text-[#ffb6b5] flex justify-center items-center mx-[10px]">
                  <RiMessage2Fill className="text-[30px]" />
                  {/* <img src={chat} className="w-[35px] drop-shadow-lg "></img> */}
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
                <img src={back} className="w-[25px] drop-shadow-lg "></img>
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
                <span className="text-[17px]  font-[google] font-normal text-white drop-shadow-md">
                  {chatUserName}
                </span>
                <span className="text-[14px]  font-[google] font-light text-[#b1b1b1] drop-shadow-md">
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
                  <img src={del} className=" w-[25px] drop-shadow-lg "></img>
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
