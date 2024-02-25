import { useEffect, useState } from "react";
import dp from "../assets/img/dp2.jpg";
import profile from "../assets/img/profile.jpg";
import profile2 from "../assets/img/d.png";
import tick from "../assets/img/tick.png";
// import { auth } from "../firebase";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendList,
  clearFriendList,
  addActiveUser,
  toggleSendFlag,
  addSearchFriendList,
  clearSearchFriendList,
  clearAllFriendList,
  addAllFriendList,
  addAllGroup,
  clearAllGroup,
  addAllGroupMembers,
  clearAllGroupMembers,
} from "../utils/chatSlice";
import {
  FieldValue,
  Firestore,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { query } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsFillCameraFill } from "react-icons/bs";
import { BiCamera, BiSolidSearch } from "react-icons/bi";
import { orderBy } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import searchh from "../assets/img/searchh.png";
import cross from "../assets/img/cross.png";
import { MdGroups2 } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdDocument } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { BsCameraFill } from "react-icons/bs";
import AllGroupList from "./AllGroupList";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { LuSearch } from "react-icons/lu";
// import { RxCross2 } from "react-icons/rx";
import { TbPlaystationCircle } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { PiChatCircleTextFill } from "react-icons/pi";
// import { FaPlus } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { MdOutlinePassword } from "react-icons/md";
import { IoTrailSignOutline } from "react-icons/io5";
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { MdPermContactCalendar } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { signOut } from "firebase/auth";
import { RiEditFill } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import StatusUserList from "./StatusUserList";

import { LuSettings2 } from "react-icons/lu";
// import { MdGroups2 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
// import { BsFillChatSquareTextFill } from "react-icons/bs";
// const Hello = () => {
//   const [userName, setUserName] = useState("");
//   const [photoURL, setPhotoURL] = useState("");

//   const [UserUid, setUserUid] = useState("");

//   useEffect(() => {
//     setUserUid(props.data.UserId);
//     fetchUserName();
//   });
//   return(<></>)
// }

const AddFriend = (props) => {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");

  const [UserUid, setUserUid] = useState("");

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  function fetchUserName() {
    const user = firebase.auth().currentUser;

    const userName = db.collection("Chat Record").doc(props.data.UserId);

    onSnapshot(userName, (snapshot) => {
      setUserName(snapshot.data().Name);
      if (snapshot.data().Photo) {
        setPhotoURL(snapshot.data().Photo);
      } else {
        setPhotoURL("nophoto");
      }
    });
  }

  return (
    <div className="w-[60px] h-[60px] mx-[5px] rounded-full ">
      {photoURL === "nophoto" ? (
        <img
          src={profile2}
          className="w-full h-full rounded-full object-cover "
        ></img>
      ) : (
        <img
          src={photoURL}
          className="w-full h-full rounded-full object-cover "
        ></img>
      )}
    </div>
  );
};

const Friends = (props) => {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);
  const [chatFlag, setChatFlag] = useState("");
  const [docName, setDocName] = useState("");

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  function fetchUserName() {
    const user = firebase.auth().currentUser;

    const userName = db.collection("Chat Record").doc(props.data.UserId);
    // .onSnapshot((data) => {
    //   setUserName(data.data().Name);
    // });

    onSnapshot(userName, (snapshot) => {
      setUserName(snapshot.data().Name);
      if (snapshot.data().Photo) {
        setPhotoURL(snapshot.data().Photo);
      } else {
        setPhotoURL("nophoto");
      }
    });

    const userMsg = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(props.data.UserId);
    // .onSnapshot((doc) => {
    //   setLastMsg(
    //     doc?.data()?.ChatHistory[doc?.data()?.ChatHistory?.length - 1]
    //       ?.Message
    //   );
    // });

    onSnapshot(userMsg, (snapshot) => {
      setChatlength(snapshot?.data()?.ChatHistory.length);
      setTime(
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Time
      );
      setUnreadMessages(
        snapshot?.data()?.TotalMessage - snapshot?.data()?.LastMessage
      );
      setChatFlag(
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Flag
      );
      if (
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Message.length === 0
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
      }
    });

    if (props.data.UserId === ActiveChatUser) {
      userMsg.update({
        LastMessage: chatLength,
      });
    }
  }

  function activerChatUser() {
    console.log("props.data.UserId");
    console.log(props.data.UserId);
    dispatch(addActiveUser(props.data.UserId));
  }

  function deleteChatUser() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    console.log(UserUid);
    // var docRef = doc(db,"")
    var delRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(UserUid)
      .delete();
    // deleteDoc(delRef).then(() => {
    //   console.log("chat deleted");
    // });
    // dispatch(addActiveUser(""));
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {ActiveChatUser === UserUid && UserUid != "" ? (
        <>
          <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-[#292f3f]  cursor-pointer   border-b-[1px] border-[#35384a]   ">
            <div
              className="group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center cursor-pointer  "
              onClick={() => {
                activerChatUser();
                // dispatch(toggleSendFlag(true));
              }}
            >
              <div className="w-[50px] h-[50px]  rounded-full">
                {photoURL === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover "
                  ></img>
                ) : (
                  <img
                    src={photoURL}
                    className="w-full h-full rounded-full object-cover "
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
                <div className="w-full font-semibold flex h-[23px]">
                  <span className="w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-white  font-[google] font-normal  ">
                    {/* {props.data.user} */}
                    {userName}
                  </span>
                  <span
                    className="w-[70px] group-hover:mr-[25px] h-full text-[13px]  flex justify-end items-center text-white   font-[google] font-light"
                    onClick={() => {
                      deleteChatUser();
                    }}
                  >
                    {/* {props.data.time} */}
                    {Time}
                  </span>
                </div>
                <div className="w-full flex h-[23px] justify-between items-center">
                  {/* {props.data.msg} */}

                  {lastMsg === "Image" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[google] font-light">
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <BsFillCameraFill className="mr-[5px] text-[#bcbcbc] " />
                      <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[google] font-light">
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Video" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[google] font-light">
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <TiVideo className="mr-[5px] text-[#bcbcbc] " />
                      <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[google] font-light">
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Document" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[google] font-light">
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <IoMdDocument className="mr-[5px] text-[#bcbcbc] " />
                      <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[google] font-light">
                        {docName}
                      </span>
                    </>
                  ) : (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[google] font-light">
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <span className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[google] font-light">
                        {lastMsg}
                      </span>
                    </>
                  )}
                  {/* </span> */}
                  <span className="w-[70px] text-[15px] h-full font-normal  text-[white] flex justify-end items-center">
                    {unreadMessages === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#000000] text-[#ffffff]">
                          {unreadMessages}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {/* <span className="text-[15px]">Hello! How Are you</span> */}
              </div>
            </div>
            <span
              className="group-hover:flex hidden justify-center items-start pt-[10px] md:pt-[5px] lg:pt-[5px] h-full w-[20px] ml-[-20px] z-40"
              onClick={() => {
                deleteChatUser();
                console.log("clickeddddddd");
              }}
            >
              <MdDelete className="text-[20px] text-[#ffb6b5]" />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 ">
            <div
              className=" group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px] border-[#35384a] flex justify-center items-center bg-transparent  cursor-pointer   z-10  "
              onClick={() => activerChatUser()}
            >
              <div className="w-[50px] h-[50px]  rounded-full">
                {photoURL === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover "
                  ></img>
                ) : (
                  <img
                    src={photoURL}
                    className="w-full h-full rounded-full object-cover "
                  ></img>
                )}
              </div>
              <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
                <div className="w-full font-semibold flex h-[23px]">
                  <span
                    className="w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[white]    font-[google] font-normal group-hover:text-[white] "
                    // style={{ transition: ".9s" }}
                  >
                    {/* {props.data.user} */}
                    {userName}
                  </span>
                  <span
                    className="w-[70px] h-full group-hover:mr-[25px] text-[13px] flex justify-end items-center text-[#8e9396] font-[google] font-light z-50"

                    // style={{ transition: ".9s" }}
                  >
                    {/* {props.data.time} */}
                    {Time}
                  </span>
                </div>
                <div className="w-full  flex h-[23px] justify-between items-center">
                  {lastMsg === "Image" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]   group-hover:text-[#8e9396]  font-[google] font-light"
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <BsFillCameraFill
                        className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[google] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Video" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[google] font-light group-hover:text-[#8e9396]"
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <TiVideo
                        className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[google] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Document" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[google] font-light group-hover:text-[#8e9396]"
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <IoMdDocument
                        className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[google] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        {docName}
                      </span>
                    </>
                  ) : (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[google] font-light group-hover:text-[#8e9396]"
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <span
                        className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[google] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        {!lastMsg ? (
                          <>Messages are end-to-end encrypted.</>
                        ) : (
                          <>{lastMsg}</>
                        )}
                      </span>
                    </>
                  )}
                  {/* <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]">
                  {lastMsg}
                </span> */}
                  <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                    {unreadMessages === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="w-[20px] h-[20px] text-[11px] flex justify-center items-center rounded-full bg-[#ffb6b5] text-[#000000]">
                          {unreadMessages}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                {/* <span className="text-[15px]">Hello! How Are you</span> */}
              </div>
            </div>
            <span
              className="group-hover:flex hidden justify-center items-start pt-[10px] md:pt-[5px] lg:pt-[5px] h-full w-[20px] ml-[-20px] z-40"
              onClick={() => {
                deleteChatUser();
                console.log("clickeddddddd");
              }}
            >
              <MdDelete className="text-[20px] text-[#ffb6b5]" />
            </span>
          </div>

          {/* <div className="w-full h-[100svh] backdrop-blur-md fixed"></div> */}
        </>
      )}
    </>
  );
};

const SearchFriends = (props) => {
  const [userName, setUserName] = useState("");
  const [info, setInfo] = useState("");
  // const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  // const [Time, setTime] = useState("");
  // const [unreadMessages, setUnreadMessages] = useState(0);
  // const [chatLength, setChatlength] = useState(0);

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  function fetchUserName() {
    const user = firebase.auth().currentUser;
    const userName = db.collection("Chat Record").doc(props.data.UserId);
    onSnapshot(userName, (snapshot) => {
      setUserName(snapshot?.data()?.Name);
      setInfo(snapshot?.data()?.Info);
      if (snapshot.data().Photo) {
        setPhotoURL(snapshot.data().Photo);
      } else {
        setPhotoURL("nophoto");
      }
      // setPhotoURL(snapshot?.data()?.Photo);
    });
    const userMsg = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(props.data.UserId);
  }

  function activerChatUser() {
    console.log("props.data.UserId");
    console.log(props.data.UserId);
    dispatch(addActiveUser(props.data.UserId));
  }

  function addToFriendList() {
    const user = firebase.auth().currentUser;

    const tete = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(UserUid);

    tete.get().then((doc) => {
      if (doc.data()) {
        console.log("frinds");
      } else {
        console.log("not frinds");
        tete.set({
          ChatHistory: [],
          LastUpdated: serverTimestamp(),
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
        });
      }
    });
  }

  return (
    <>
      <div className=" group w-[100%] h-[85px] px-[10px] md:px-[20px] lg:px-[20px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent ">
        <div
          className="border-b-[1px] border-[#35384a] w-[100%] h-[85px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent   "
          onClick={() => {
            activerChatUser();
            addToFriendList();
            // setSearchFlag(false);
            // dispatch(toggleSendFlag(true));
          }}
        >
          <div
            className="w-[50px] h-[50px]  rounded-full z-20"
            style={{ zIndex: "10" }}
          >
            {photoURL === "nophoto" ? (
              <img
                src={profile2}
                className="w-full h-full rounded-full object-cover drop-shadow-sm z-20"
              ></img>
            ) : (
              <img
                src={photoURL}
                className="w-full h-full rounded-full object-cover drop-shadow-sm"
              ></img>
            )}
          </div>
          <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
            <div className="w-full font-semibold flex h-[23px]">
              <span
                className="w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[white]   drop-shadow-sm  font-[google] font-normal"
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.user} */}
                {userName}
              </span>
              <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-white group-hover:text-black drop-shadow-md">
                {/* {props.data.time} */}
                {/* {Time} */}
              </span>
            </div>
            <div className="w-full flex h-[23px]">
              <span
                className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] drop-shadow-sm  font-[google] font-light"
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.msg} */}
                {info}
              </span>
              <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                {/* {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[white] text-black">
                        {unreadMessages}
                      </span>
                    </>
                  )} */}
              </span>
            </div>
            {/* <span className="text-[15px]">Hello! How Are you</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

// const Dummy = [
//   {
//     user: "Himadri Purkait",
//     msg: "Hello how Are you ! 😊",
//     no: "1",
//     time: "10.15",
//   },
//   {
//     user: "Sourav Poddar",
//     msg: "Here are few more travel destinations around europe, united states of america, japan, southern america, south africa, congo, sri lanka, west indies, green land and australia",
//     no: "5",
//     time: "12.23",
//   },
//   {
//     user: "Anirban Mandal",
//     msg: "https://upload.wikimedia.org/wikipedia/commons/b/be/Top_of_Atmosphere.jpg",
//     no: "3",
//     time: "2.15",
//   },
//   { user: "Ankan Maiti", msg: "Please Help Me ", no: "10", time: "10.15" },
//   {
//     user: "Anirban Das",
//     msg: "Will you help me to do my home work ? Pleaseeeeeeeeeee ",
//     no: "2",
//     time: "7.48",
//   },
// ];

const UserList = (props) => {
  // const [SearchUserList, setSearchUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  // const [section, setSection] = useState("Chat");

  const dispatch = useDispatch();
  const UserList = useSelector((store) => store.chat.FriendList);
  const AllUserList = useSelector((store) => store.chat.AllFriendList);
  const SearchUserList = useSelector((store) => store.chat.SearchFriendList);
  const GroupList = useSelector((store) => store.chat.allGroup);

  const [statusModal, setStatusModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  // const [createGroup, setCreateGroup] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusCount, setStatusCount] = useState(0);
  const [statusTimestamp, setStatusTimestamp] = useState("");

  const [isSearchBar, setIsSearchBar] = useState(false);
  const [ownerInfo, setOwnerInfo] = useState("");
  const [statusImage, setStatusImage] = useState();
  const [statusTextModal, setStatusTextModal] = useState(false);
  const [statusImageUrl, setStatusImageUrl] = useState();
  const [nameChangeFlag, setNameChangeFlag] = useState(false);
  const [aboutChangeFlag, setAboutChangeFlag] = useState(false);
  const [accountStatus, setAccountStatus] = useState(false);

  const [statusPosition, setStatusPosition] = useState(0);
  // const [left, setRight] = useState(0);
  // addFriendList;
  console.log("UserList");
  console.log(UserList);

  useEffect(() => {
    fetchownerInfo();
    fetchUserList();
    fetchAllGroups();
  }, []);

  function fetchownerInfo() {
    const user = firebase.auth().currentUser;

    const userDoc = db.collection("Chat Record").doc(user.uid);
    onSnapshot(userDoc, (snapshot) => {
      // console.log("snapshot.docssssssssssssss");
      // console.log(snapshot.data());
      setOwnerName(snapshot?.data()?.Name);
      setOwnerInfo(snapshot?.data()?.Info);
      setIsStatus(snapshot?.data()?.Status);
      setStatusImageUrl(snapshot?.data()?.Status);
      setStatusCount(snapshot?.data()?.Status?.length);
      setAccountStatus(snapshot?.data()?.AccountStatus);
      // setProfileURL(snapshot?.data()?.Photo);
      setStatusTimestamp(snapshot?.data()?.LastStatus);
    });
  }

  function fetchUserList() {
    const user = firebase.auth().currentUser;
    const userDoc = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .orderBy("LastUpdated", "desc");

    // userDoc.get().then((snapshot) => {
    //   console.log("snapshot.docs");
    //   console.log(snapshot);
    //   // setUserList(snapshot.docs);
    //   dispatch(clearFriendList());
    //   snapshot.docs?.map((user) => {
    //     console.log(user.id);

    //     dispatch(addFriendList({ UserId: user.id }));
    //   });
    // });
    onSnapshot(userDoc, (snapshot) => {
      console.log("Last Updated User Message");
      console.log(snapshot.docs);
      // setUserList(snapshot.docs);
      dispatch(clearFriendList());
      snapshot.docs?.map((user) => {
        dispatch(addFriendList({ UserId: user.id }));
      });
    });
  }

  function allUserList() {
    const users = firebase.auth().currentUser;
    const userDoc = db.collection("Chat Record").orderBy("Name", "desc");
    onSnapshot(userDoc, (snapshot) => {
      console.log("Last Updated User Message");
      console.log(snapshot.docs);
      // setUserList(snapshot.docs);
      dispatch(clearAllFriendList());
      snapshot.docs?.map((user) => {
        // console.log(typeof user.id);
        // console.log(typeof users.uid);
        // console.log("Showwwwwwwwwwwwwwwwwwwwwwww Acpoutnnnnnnnnnnnnnnnn STatusssssssssssssssssssss");
        console.log();
        if (user.id !== users.uid && user.data()?.AccountStatus !== false) {
          // console.log("Same user");
          dispatch(addAllFriendList({ UserId: user.id }));
        } else {
          // console.log("different user");
        }
      });
    });
  }

  // useEffect(() => {
  //   if (searchUser.length !== 0) {
  //     searchUserFriend();
  //   }
  // }, [searchUser]);

  function searchUserFriend() {
    console.log("USers--------");
    const UserRef = db.collection("Chat Record");

    const queryRef = UserRef.where("Name", "==", searchUser);
    queryRef.get().then((data) => {
      console.log(data.docs);
      // setSearchUserList(data.docs);
      dispatch(clearSearchFriendList());
      data.docs.forEach((userId) => {
        console.log(userId.id);
        dispatch(addSearchFriendList({ UserId: userId.id }));
        // SearchUserList.push(userId.id);
      });
    });
  }

  function createGroup() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const grpRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      // .doc(user.uid)
      .doc(groupName)
      // .doc(user.uid)
      .set({
        chat: "hello",
      });
  }

  function fetchAllGroups() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const grpRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group");
    // .doc(user.uid);

    onSnapshot(grpRef, (snapshot) => {
      console.log("Group Naemeeeee");
      console.log(snapshot.docs);

      dispatch(clearAllGroup());
      snapshot.docs.forEach((name) => {
        console.log("name---------------------------");
        console.log(name.id);
        dispatch(addAllGroup({ GroupName: name.id }));
      });
      // dispatch(clearAllFriendList());
      // snapshot.docs?.map((user) => {
      //   if (user.id !== users.uid) {
      //     dispatch(addAllFriendList({ UserId: user.id }));
      //   } else {
      //   }
      // });
    });
  }

  const [tempUrl, setTempUrl] = useState("");

  function Image(e) {
    console.log(e.target.files[0]);
    setStatusImage(e.target.files[0]);

    //  setImageLength(e.target.files.length);
  }

  useEffect(() => {
    if (statusImage?.length != 0) {
      uploadImage();
    }
  }, [statusImage]);

  const uploadImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    var geturl = await uploadBytes(fileRef, statusImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setTempUrl(url);
        const statusRef = db
          .collection("Chat Record")
          .doc(user.uid)
          .update({
            Status: arrayUnion(url),
          });
        // var temp = formatAMPM(new Date());
        // storeToReactStore(
        //   Messages,
        //   temp,
        //   url,
        //   videoUrl,
        //   documentUrl,
        //   DocName,
        //   DocSize
        // );
        // setMessages("");
        geturl = url;
      });
      console.log("Uploaded a blob or file!");
    });
    return geturl;
  };

  const uploadImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/group_profile_image/${user.uid}/`);
    const myPromise = uploadImageGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Uploading Photo",
        success: "Photo Updated",
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

  // ------------------------------

  const [tempProfileImage, setTempProfileImage] = useState();

  function profileImage(e) {
    console.log(e.target.files[0]);
    setTempProfileImage(e.target.files[0]);

    //  setImageLength(e.target.files.length);
  }

  useEffect(() => {
    if (tempProfileImage) {
      uploadProfileImage();
    }
  }, [tempProfileImage]);

  const uploadProfileImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    var geturl = await uploadBytes(fileRef, tempProfileImage).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          db.collection("Chat Record").doc(user.uid).update({ Photo: url });

          geturl = url;
        });
        console.log("Uploaded a blob or file!");
      }
    );
    return geturl;
  };

  const uploadProfileImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/users/${user.uid}/Profile Photo`);
    const myPromise = uploadProfileImageGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Updating Photo",
        success: "Photo Updated",
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

  useEffect(() => {
    fetchownerInfoSecond();
  }, []);

  function fetchownerInfoSecond() {
    const user = firebase.auth().currentUser;

    const collectionRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends");
    const userDoc = db.collection("Chat Record").doc(user.uid);
    onSnapshot(userDoc, (snapshot) => {
      setOwnerName(snapshot?.data()?.Name);
      // setOwnerInfo(snapshot?.data()?.Info);
      setProfileURL(snapshot?.data()?.Photo);
    });
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out Successfully"))
      .catch((error) => console.log(error));
  };

  function updateUserInfo() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record").doc(user.uid).update({ Info: ownerInfo });
    toast.success("Name Changed");
  }
  function updateUserName() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record").doc(user.uid).update({ Name: ownerName });
    toast.success("Info Changed");
  }

  // function set

  function changeAccountStatus() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record")
      .doc(user.uid)
      .update({ AccountStatus: !accountStatus });
  }

  return (
    <>
      <div className="w-[calc(100%-20px)] md:w-full lg:w-full  h-[calc(100%-140px)] flex flex-col items-end  pt-[0px] overflow-y-scroll">
        {searchFlag === true ? (
          <>
            <div className="min-h-[70px] w-full  flex justify-center items-center">
              <div className="w-full flex justify-start px-[10px] md:px-[20px] lg:px-[20px] items-center min-h-[45px]  overflow-hidden">
                <input
                  style={{ transition: ".5s" }}
                  value={searchUser}
                  onKeyDown={(e) => {
                    if (
                      e.nativeEvent.key === "Enter" &&
                      searchUser.length !== 0
                    ) {
                      searchUserFriend();
                      setSearchFlag(true);
                    }
                  }}
                  onChange={(e) => setSearchUser(e.target.value)}
                  onClick={() => {
                    // setIsSearchBar(!isSearchBar);
                  }}
                  placeholder="Search Friends"
                  className="input w-full h-[45px]  text-[white] bg-[#292f3f] font-[work] font-medium text-[14px] tracking-[.4px] border-none z-0 outline-none  pl-[20px] pr-[50px]  drop-shadow-md rounded-full "
                ></input>
                <div
                  className="w-[35px] h-[35px] ml-[-40px]  rounded-full flex justify-center items-center z-5 drop-shadow-md  text-[#ffb6b5] cursor-pointer"
                  onClick={() => {
                    // if (searchUser.length !== 0) {
                    //   searchUserFriend();
                    //   setSearchFlag(true);
                    // }
                    setSearchUser("");
                    setSearchFlag(false);
                    setIsSearchBar(false);
                  }}
                >
                  <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center ">
                    <RxCross2 className="text-[20px]  drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll">
              {SearchUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#ffb6b5] ">
                    <span>No Users Found</span>
                  </div>
                </>
              ) : (
                <>
                  {SearchUserList.map((friends) => {
                    return <SearchFriends data={friends} />;
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "All" ? (
          <>
            {isSearchBar === false ? (
              <>
                <div className="fixed bottom-[90px]  mr-[10px]  md:mr-[20px] lg:mr-[20px]   w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-40px)] flex justify-end items-center min-h-[45px]  overflow-hidden z-[100] ">
                  <input
                    disabled
                    style={{ transition: ".5s" }}
                    value={searchUser}
                    onKeyDown={(e) => {
                      if (
                        e.nativeEvent.key === "Enter" &&
                        searchUser.length !== 0
                      ) {
                        searchUserFriend();
                        setSearchFlag(true);
                      }
                    }}
                    onChange={(e) => setSearchUser(e.target.value)}
                    onClick={() => {
                      // setIsSearchBar(!isSearchBar);
                    }}
                    // placeholder="Search Friends"
                    className="w-[0] h-[50px] opacity-0 text-[black] bg-[#292f3f] font-[work] font-semibold border-none  z-0 outline-none  text-[14px]  rounded-full"
                  ></input>
                  <div
                    className="w-[50px] h-[50px] ml-[-40px]  bg-[#292f3f] rounded-full flex justify-center items-center z-5  text-white cursor-pointer z-[100]"
                    onClick={() => {
                      // if (searchUser.length !== 0) {
                      //   searchUserFriend();
                      //   setSearchFlag(true);
                      // }
                      setIsSearchBar(true);
                    }}
                  >
                    <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center  z-[100]">
                      <RiSearch2Line className="text-[20px]  z-[100] text-[#ffb6b5]" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="fixed bottom-[90px]  mr-[10px]  md:mr-[20px] lg:mr-[20px]  w-[calc(100%-20px)] md:w-[calc(100%-40px)] lg:w-[calc(100%-40px)] flex justify-end items-center min-h-[45px]  overflow-hidden z-[100] ">
                  <input
                    style={{ transition: ".5s", zIndex: "60" }}
                    value={searchUser}
                    onKeyDown={(e) => {
                      if (
                        e.nativeEvent.key === "Enter" &&
                        searchUser.length !== 0
                      ) {
                        searchUserFriend();
                        setSearchFlag(true);
                      }
                    }}
                    onChange={(e) => setSearchUser(e.target.value)}
                    onClick={() => {
                      // setIsSearchBar(!isSearchBar);
                    }}
                    placeholder="Search Friends"
                    className="input w-full h-[50px] opacity-100  text-[white] bg-[#292f3f] font-[work] font-normal text-[15px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px]   rounded-full "
                  ></input>
                  <div
                    className="w-[50px] h-[50px] ml-[-50px]  rounded-full flex justify-center items-center z-5   text-white cursor-pointer z-[100]"
                    onClick={() => {
                      // if (searchUser.length !== 0) {
                      //   searchUserFriend();
                      //   setSearchFlag(true);
                      // }
                      setSearchUser("");
                      setIsSearchBar(false);
                    }}
                  >
                    <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center z-[100]">
                      <RxCross2 className="text-[20px] z-[100] text-[#ffb6b5]" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* </div> */}
            <div className="borr w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden mr-0 text-[#ffb6b5]">
              {AllUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#ffb6b5] ">
                    <span>No Users Yet</span>
                  </div>
                </>
              ) : (
                <>
                  {AllUserList?.map((friends) => {
                    return <SearchFriends data={friends} />;
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "Chat" ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-110px)] ">
            {UserList.length === 0 ? (
              <>
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#ffb6b5] ">
                  <span>No Friends Yet</span>
                </div>
              </>
            ) : (
              <>
                {UserList?.map((friends) => {
                  return <Friends data={friends} />;
                })}
              </>
            )}
          </div>
        ) : props.data === "Group" ? (
          <>
            {groupModal === true ? (
              <div
                className="fixed  bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px]  w-[50px] h-[50px] z-30 rounded-full bg-[#292f3f] text-[white]  flex justify-center items-center rotate-[135deg] cursor-pointer"
                onClick={() => {
                  setGroupModal(!groupModal);
                }}
                style={{ transition: ".4s" }}
              >
                <FaPlus className="text-[20px]" />
              </div>
            ) : (
              <div
                className="fixed  bottom-[90px] w-[50px] h-[50px] z-30 bg-[#292f3f] mr-[10px] md:mr-[20px] lg:mr-[20px]  rounded-full  text-[white] flex justify-center items-center  cursor-pointer"
                onClick={() => {
                  setGroupModal(!groupModal);
                }}
                style={{ transition: ".4s" }}
              >
                <FaPlus className="text-[20px]" />
              </div>
            )}

            {groupModal === true ? (
              <div
                className="fixed bottom-[150px] mr-[10px] md:mr-[20px] lg:mr-[20px] h-[500px] rounded-xl w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bg-[#292f3f]   flex flex-col justify-center items-center"
                style={{ transition: ".4s" }}
              >
                {/* hello */}
                <div className="group w-[110px] h-[110px] rounded-full bg-[#1b202d] flex  justify-center items-center ">
                  {tempUrl.length != 0 ? (
                    <img
                      src={tempUrl}
                      className="w-[110px] h-[110px] z-10 rounded-full fixed object-cover"
                    ></img>
                  ) : (
                    <></>
                  )}
                  <input
                    className="hidden"
                    type="file"
                    id="groupDp"
                    onChange={(e) => Image(e)}
                    accept="image/*"
                  ></input>
                  <label
                    className="group-hover:opacity-100 opacity-0 cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#000000a9] text-white z-20"
                    for="groupDp"
                  >
                    <BsCameraFill className="text-[17px]" />
                  </label>
                </div>
                <div className="w-[calc(100%-100px)]  flex flex-col justify-center items-center">
                  <input
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                    className="input bg-[#1b202d] h-[50px] rounded-xl mt-[30px] w-[80%] border-b-[2px] font-[work] tracking-[.4px] font-normal text-[15px] text-white py-[5px] border-none px-[20px] outline-none"
                    placeholder="Group Name"
                  ></input>
                  <input
                    className="input bg-[#1b202d] h-[50px] rounded-xl w-[80%]  mt-[10px] flex justify-start items-start border-b-[2px] font-[work] tracking-[.4px] font-normal text-[15px] text-white py-[5px] border-none px-[20px] outline-none"
                    placeholder="Group Descritption"
                  ></input>
                </div>
                <div className="w-full h-[70px]  flex justify-center items-start overflow-x-scroll">
                  {UserList?.map((friend) => {
                    // return <AddFriend data={friend} />;
                  })}
                  {/* {UserList.length === 0 ? (
                    <>
                      <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[white] ">
                        <span>No Friends Yet</span>
                      </div>
                    </>
                  ) : (
                    <>
                      {UserList?.map((friends) => {
                        return <AddFriend data={friends} />;
                      })}
                    </>
                  )} */}
                  {/* <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div>
                  <div className="min-w-[60px] h-[60px] mx-[5px] rounded-full bg-slate-500">
                    He
                  </div> */}
                </div>
                {/* <div className="w-[65%]">
                  <input
                    className="input w-full  mt-[20px] flex justify-start items-start border-b-[2px] font-[google] font-normal text-[15px] py-[5px] border-b-black outline-none"
                    placeholder="Community Descritption"
                  ></input>
                </div> */}
                {groupName.length === 0 ? (
                  <div className="w-[40px] opacity-50 h-[40px] mt-[40px] rounded-full bg-[#2db82d] ">
                    <img src={tick} className="w-full"></img>
                  </div>
                ) : (
                  <div
                    className="w-[40px] h-[40px] opacity-100 mt-[40px] cursor-pointer rounded-full bg-[#2db82d] "
                    onClick={() => {
                      createGroup();
                      setGroupModal(false);
                    }}
                  >
                    <img src={tick} className="w-full"></img>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {/* <div className=" group w-full h-[70px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal hover:bg-[#8171f3] px-[10px]  text-[#ffffff] hover:text-[white]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center mr-[15px]">
                <MdGroups2 className="  text-[25px]" />
              </div>
              <FaPlus className="mr-[8px]   text-[17px]" />

              <span className="">Create New Group</span>
            </div> */}
            <div className=" w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden">
              {GroupList.length === 0 ? (
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#ffb6b5] ">
                  <span>No Groups Yet</span>
                </div>
              ) : (
                <>
                  {GroupList?.map((friends) => {
                    return <AllGroupList data={friends} />;
                  })}
                </>
              )}
            </div>
            {/* <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work] bg-slate-400  px-[10px]  text-[white] ">
              <span>No Friends Yet</span>
            </div>
            <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work] bg-slate-600  px-[10px]  text-[white] ">
              <span>No Friends Yet</span>
            </div> */}
          </>
        ) : props.data === "Status" ? (
          <>
            {showStatus === true ? (
              // <div className="fixed">
              <div className=" z-30 fixed bottom-0 h-[100svh] bg-[#1b202d] w-full md:w-[400px] lg:w-[400px] left-0 flex-col flex justify-center items-center">
                {/* Cross ------------------------- */}
                <div
                  className="fixed top-[25px] left-[calc(100%-60px)] md:left-[calc(400px-60px)]  lg:left-[calc(400px-60px)]  w-[40px] h-[40px]  rounded-full bg-[#455172] drop-shadow-none text-white flex justify-center items-center  cursor-pointer rotate-45 z-40"
                  onClick={() => {
                    setShowStatus(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>
                {/* Profile ---------------------- */}
                <div
                  className=" group w-full md:w-[400px] lg:w-[400px] h-[90px] py-[10px] flex justify-start items-center bg-[#1c1f2f] cursor-pointer font-[google] font-normal  px-[20px]  text-[#ffffff]  fixed top-0 border-b-[1px] border-[#404040]  drop-shadow-none"
                  onClick={() => {
                    // setShowStatus(true);
                  }}
                >
                  <div className="w-[50px] h-[50px] border-[2.4px] border-[#5bd150] rounded-full">
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    )}
                  </div>
                  <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                    <div className="w-full font-semibold flex h-[23px]">
                      <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
                        My Status
                      </span>
                      <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light"></span>
                    </div>
                    <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                      {statusTimestamp}
                    </div>
                  </div>
                </div>

                <div className=" z-30 fixed bottom-0 h-[calc(100svh-90px)] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] left-[20px] md:left-[20px] lg:left-[20px] rounded-lg  flex-col flex justify-center items-center  drop-shadow-none">
                  {/* Left Arrow ------------------------- */}

                  {statusPosition === 0 ? (
                    <></>
                  ) : (
                    <>
                      <div className="fixed w-[40px] h-[60px] rounded-r-xl bg-[#000000a6] cursor-pointer text-[#ffb6b5] flex justify-center items-center left-0">
                        <FaAngleLeft
                          className="text-[19px]"
                          onClick={() => {
                            if (statusPosition > 0) {
                              setStatusPosition(statusPosition - 1);
                            }
                          }}
                        />
                      </div>
                    </>
                  )}

                  {/* Right Arrow ------------------------- */}
                  {statusPosition === statusCount - 1 ? (
                    <></>
                  ) : (
                    <>
                      <div className="fixed w-[40px] h-[60px] rounded-l-xl bg-[#000000a6] cursor-pointer text-[#ffb6b5] flex justify-center items-center right-0">
                        <FaAngleRight
                          className="text-[19px]"
                          onClick={() => {
                            if (statusPosition < statusCount - 1) {
                              setStatusPosition(statusPosition + 1);
                            }
                          }}
                        />
                      </div>
                    </>
                  )}

                  {/* Status ------------------------- */}
                  {/* {statusImageUrl ? ( */}
                  <img
                    className="w-full rounded-xl object-cover"
                    src={statusImageUrl[statusPosition]}
                    // onError={styl}
                  ></img>
                  {/* ) : ( */}
                  {/* <></> */}
                  {/* )} */}

                  {/* Status Count Indication ------------------------- */}
                  <div className="fixed bottom-[20px] flex ">
                    {Array(statusCount)
                      .fill()
                      .map((item, index) => {
                        return (
                          <>
                            {index === statusPosition ? (
                              <div className="w-[4px] mx-[2px] h-[4px] bg-white rounded-full"></div>
                            ) : (
                              <div className="w-[4px] mx-[2px] h-[4px] bg-[#8d8d8d] rounded-full"></div>
                            )}
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              // </div>
              <></>
            )}
            {statusModal === true ? (
              <>
                <div
                  className="fixed z-20 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[50px] h-[50px]  rounded-full bg-[#292f3f] text-white  flex justify-center items-center rotate-[135deg] cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                    setStatusTextModal(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[19px]" />
                </div>
                {/* Camera ---------------------- */}

                <input
                  className="hidden"
                  type="file"
                  id="groupDp"
                  accept="image/*"
                  onChange={(e) => {
                    Image(e);
                  }}
                ></input>
                <label
                  className="fixed z-20 opacity-100 bottom-[90px] mr-[70px] md:mr-[80px] lg:mr-[80px] w-[50px] h-[50px]  rounded-full bg-[#292f3f]   text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    // setStatusModal(!statusModal);
                    setStatusTextModal(false);
                  }}
                  style={{ transition: ".4s" }}
                  for="groupDp"
                >
                  <BsCameraFill className="text-[19px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed z-20 opacity-100 bottom-[150px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[50px] h-[50px]  rounded-full bg-[#292f3f]  text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusTextModal(!statusTextModal);
                  }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  {statusTextModal === true ? (
                    <img src={tick} className="w-[30px] "></img>
                  ) : (
                    <FaPen className="text-[19px]" />
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  className="fixed z-20 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[50px] h-[50px]  rounded-full bg-[#292f3f] text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[19px]" />
                </div>

                {/* Camera ---------------------- */}
                <input
                  className="hidden"
                  type="file"
                  id="groupDp"
                  accept="image/*"
                ></input>
                <label
                  className="fixed z-20 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[50px] h-[50px]  rounded-full bg-[#292f3f]   text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  <BsCameraFill className="text-[17px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed z-10 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[50px] h-[50px]   rounded-full bg-[#292f3f] text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPen className="text-[17px]" />
                </div>
              </>
            )}
            {statusTextModal === true ? (
              <>
                <textarea
                  className="h-[120px] resize-none py-[10px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bottom-[150px] fixed mr-[10px] md:mr-[20px] lg:mr-[20px] opacity-100 bg-[#292f3f] rounded-lg outline-none px-[20px] font-[google] font-normal text-[15px] text-[white] input"
                  placeholder="Enter Text"
                  // type="textarea"
                  style={{ transition: ".4s" }}
                ></textarea>
              </>
            ) : (
              // <div
              //   className="fixed bottom-[70px]  h-[40px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bg-[#ffffff] rounded-full   flex justify-end items-center"
              //   style={{ transition: ".4s" }}
              // >
              //   {groupName.length === 0 ? (
              //     <div className="w-[40px] z-40 opacity-50 h-[40px] mr-0 fixed rounded-full bg-[#2db82d] ">
              //       <img src={tick} className="w-full"></img>
              //     </div>
              //   ) : (
              //     <div
              //       className="w-[40px] z-40 h-[40px] opacity-100 mr-0 fixed cursor-pointer rounded-full bg-[#2db82d] "
              //       onClick={() => {
              //         createGroup();
              //         setGroupModal(false);
              //       }}
              //     >
              //       <img src={tick} className="w-full"></img>
              //     </div>
              //   )}
              // </div>
              <>
                <textarea
                  className="h-[40px] resize-none py-[10px] w-0 bottom-[150px] fixed opacity-0 bg-[#292f3f] rounded-lg mr-[10px] md:mr-[20px] lg:mr-[20px] outline-none px-[20px] font-[google] font-normal text-[15px] text-[white] input"
                  placeholder="Enter Text"
                  // type="textarea"
                  style={{ transition: ".4s" }}
                ></textarea>
                {/* <div
                  className="fixed bottom-[70px]  h-[40px] w-0 bg-[#ffffff] rounded-full   flex justify-end items-center"
                  style={{ transition: ".4s" }}
                >
                  {groupName.length === 0 ? (
                    <div className="w-[40px] z-40 opacity-50 h-[40px] mr-0 fixed rounded-full bg-[#2db82d] ">
                      <img src={tick} className="w-full"></img>
                    </div>
                  ) : (
                    <div
                      className="w-[0] z-40 h-[40px] opacity-100 mr-0 fixed cursor-pointer rounded-full bg-[#2db82d] "
                      onClick={() => {
                        createGroup();
                        setGroupModal(false);
                      }}
                    >
                      <img src={tick} className="w-full"></img>
                    </div>
                  )}
                </div> */}
              </>
            )}

            {isStatus ? (
              <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 select-none">
                {" "}
                <div
                  className=" group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px] border-[#35384a] flex justify-center items-center bg-transparent  cursor-pointer   z-10 select-none"
                  onClick={() => {
                    setShowStatus(true);
                  }}
                >
                  <div className="w-[50px] h-[50px] border-[1.4px] border-[#a7ff2e] rounded-full">
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    )}
                  </div>
                  <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                    <div className="w-full font-semibold flex h-[23px]">
                      <span className="w-[calc(100%-70px)] text-[16px] h-full text-[white]  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
                        {/* {props.data.user} */}
                        {/* {ownerName} */}
                        My Status
                      </span>
                      <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light">
                        {/* {props.data.time} */}
                        {/* {Time} */}
                        {/* {statusCount} */}
                      </span>
                    </div>
                    <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                      {statusTimestamp}07:34 pm
                    </div>
                    {/* <span className="text-[15px]">Hello! How Are you</span> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" group w-full h-[70px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal hover:bg-[#ffffffe1] px-[10px]  md:px-[20px] lg:px-[20px]  text-[#ffffff] hover:text-[#000000] border-t-[1px] border-b-[1px] border-[#404040]">
                <div className="w-[50px] h-[50px]  rounded-full">
                  {profileURL === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  ) : (
                    <img
                      src={profileURL}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  )}
                </div>
                <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                  <div className="w-full font-semibold flex h-[23px]">
                    <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-[#ffffff]  font-[google] font-normal  ">
                      {/* {props.data.user} */}
                      {/* {ownerName} */}
                      My Status
                    </span>
                    <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light">
                      {/* {props.data.time} */}
                      {/* {Time} */}
                    </span>
                  </div>
                  <div className="w-full flex h-[23px] justify-between items-center"></div>
                  {/* <span className="text-[15px]">Hello! How Are you</span> */}
                </div>
              </div>
            )}

            {UserList?.map((friends) => {
              return <StatusUserList data={friends} />;
            })}
          </>
        ) : (
          <>
            <div className="w-full h-full p-[10px] flex justify-center items-center ">
              <div className="w-full h-full  rounded-3xl flex flex-col justify-center items-center">
                <div className="group w-[130px] h-[130px] rounded-full bg-slate-500 flex justify-center items-center">
                  {/* <img
                    src={profileURL}
                    className="w-full h-full rounded-full object-cover"
                  ></img> */}
                  {profileURL === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  ) : (
                    <img
                      src={profileURL}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  )}
                  <input
                    type="file"
                    id="getFile"
                    accept="image/*"
                    className="hidden fixed opacity-0 text-white bg-transparent w-[35px] h-[35px] rounded-full z-30 cursor-pointer"
                    onChange={(e) => profileImage(e)}
                  ></input>
                  <label
                    for="getFile"
                    // onclick={document.getElementById("getFile").click()}
                    className="group-hover:opacity-100 opacity-0 w-[35px] h-[35px] flex justify-center items-center bg-[#0b0c0b94] fixed rounded-full cursor-pointer z-10"
                  >
                    <BsCameraFill className="text-white" />
                  </label>
                </div>
                <div className="mt-[50px] w-[250px] flex justify-center items-center">
                  {nameChangeFlag === true ? (
                    <>
                      <input
                        style={{ transition: ".5s" }}
                        value={ownerName}
                        // onKeyDown={(e) => {
                        //   if (
                        //     e.nativeEvent.key === "Enter" &&
                        //     searchUser.length !== 0
                        //   ) {
                        //     searchUserFriend();
                        //     setSearchFlag(true);
                        //   }
                        // }}
                        onChange={(e) => setOwnerName(e.target.value)}
                        // onClick={() => {
                        //   // setIsSearchBar(!isSearchBar);
                        // }}
                        placeholder="Name"
                        className="w-[calc(100%-40px)] h-[50px] text-[white] font-normal px-[20px] bg-[#292f3f] input tracking-[.4px] font-[work]  border-none  z-0 outline-none  text-[14px] drop-shadow-md rounded-xl pr-[50px]"
                      ></input>
                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center ml-[-45px]  z-20"
                        onClick={() => {
                          setNameChangeFlag(false);
                        }}
                      >
                        <RxCross2 className="text-[18px] text-[#ffb6b5]" />
                      </span>
                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center mr-[5px]  z-20"
                        onClick={() => {
                          setNameChangeFlag(false);
                          updateUserName();
                        }}
                      >
                        <MdOutlineDone className="text-[18px] text-[#ffb6b5]" />
                      </span>
                    </>
                  ) : (
                    <>
                      <input
                        disabled
                        style={{ transition: ".5s" }}
                        value={ownerName}
                        // onKeyDown={(e) => {
                        //   if (
                        //     e.nativeEvent.key === "Enter" &&
                        //     searchUser.length !== 0
                        //   ) {
                        //     searchUserFriend();
                        //     setSearchFlag(true);
                        //   }
                        // }}
                        onChange={(e) => setOwnerName(e.target.value)}
                        // onClick={() => {
                        //   // setIsSearchBar(!isSearchBar);
                        // }}
                        placeholder="Name"
                        className="w-[calc(100%-40px)] h-[50px] text-[#bababa] font-normal px-[20px] bg-[#292f3f] input tracking-[.4px] font-[work]  border-none  z-0 outline-none  text-[14px] drop-shadow-md rounded-xl pr-[30px]"
                      ></input>
                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center ml-[-25px] mr-[5px] z-20"
                        onClick={() => {
                          setNameChangeFlag(true);
                        }}
                      >
                        <RiEditFill className="text-[18px] text-[#ffb6b5]" />
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-[10px] w-[250px] flex justify-center items-center">
                  {aboutChangeFlag === true ? (
                    <>
                      <input
                        style={{ transition: ".5s" }}
                        value={ownerInfo}
                        // onKeyDown={(e) => {
                        //   if (
                        //     e.nativeEvent.key === "Enter" &&
                        //     searchUser.length !== 0
                        //   ) {
                        //     searchUserFriend();
                        //     setSearchFlag(true);
                        //   }
                        // }}
                        onChange={(e) => setOwnerInfo(e.target.value)}
                        placeholder="About"
                        className="w-[calc(100%-40px)] h-[50px] text-[white] px-[20px] bg-[#292f3f] input tracking-[.4px] font-[work] font-normal border-none  z-0 outline-none  text-[14px] drop-shadow-md rounded-xl pr-[50px]"
                      ></input>
                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center ml-[-45px] z-20"
                        onClick={() => {
                          setAboutChangeFlag(false);
                        }}
                      >
                        <RxCross2 className="text-[18px] text-[#ffb6b5]" />
                      </span>
                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center mr-[5px] z-20"
                        onClick={() => {
                          setAboutChangeFlag(false);
                          updateUserInfo();
                        }}
                      >
                        <MdOutlineDone className="text-[18px] text-[#ffb6b5]" />
                      </span>
                    </>
                  ) : (
                    <>
                      <input
                        disabled
                        style={{ transition: ".5s" }}
                        value={ownerInfo}
                        // onKeyDown={(e) => {
                        //   if (
                        //     e.nativeEvent.key === "Enter" &&
                        //     searchUser.length !== 0
                        //   ) {
                        //     searchUserFriend();
                        //     setSearchFlag(true);
                        //   }
                        // }}
                        onChange={(e) => setOwnerInfo(e.target.value)}
                        placeholder="About"
                        className="w-[calc(100%-40px)] h-[50px] text-[#bababa] px-[20px] bg-[#292f3f] input tracking-[.4px] font-[work] font-normal border-none  z-0 outline-none  text-[14px] drop-shadow-md rounded-xl pr-[30px]"
                      ></input>

                      <span
                        className="w-[20px] h-[30px] flex justify-center items-center ml-[-25px] mr-[5px] z-20"
                        onClick={() => {
                          setAboutChangeFlag(true);
                        }}
                      >
                        <RiEditFill className="text-[18px] text-[#ffb6b5]" />
                      </span>
                    </>
                  )}
                </div>
                <div className=" h-[230px]  mt-[50px] w-[250px] flex flex-col justify-between items-center ">
                  <div className="w-full   h-[230px] flex flex-col justify-evenly items-center">
                    <div className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#292f3f] flex justify-center items-center text-white font-[google] font-light drop-shadow-md text-[13px] cursor-pointer">
                      <MdPermContactCalendar className="mr-[10px] text-[20px] text-[#ce9835]" />{" "}
                      Change Number
                    </div>
                    {/* <div className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#292f3f] mt-[10px] flex justify-center items-center text-white font-[google] font-light drop-shadow-md text-[13px] cursor-pointer">
                      <MdOutlinePassword className="mr-[10px] text-[20px] text-[gray]" />{" "}
                      Change Password
                    </div> */}
                    {/* </div> */}
                    {/* <div className="w-full px-[10px] h-[40px] mt-[10px] flex justify-evenly items-center"> */}
                    <div className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#292f3f] mt-[10px] flex justify-center items-center text-white font-[google] font-light drop-shadow-md text-[13px] cursor-pointer">
                      <TiDelete className="mr-[10px] text-[25px] text-[#bc3232]" />{" "}
                      Delete Account
                    </div>
                    <div
                      className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#ffb6b5] mt-[10px] flex justify-center items-center text-black font-[google] font-light drop-shadow-md text-[13px] cursor-pointer"
                      onClick={() => {
                        userSignOut();
                      }}
                    >
                      <IoTrailSignOutline className="mr-[10px] text-[20px] text-[black]" />{" "}
                      Log Out
                    </div>
                    <div
                      className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#292f3f] mt-[10px] flex justify-center items-center text-white font-[google] font-light drop-shadow-md text-[13px] cursor-pointer"
                      onClick={() => {
                        changeAccountStatus();
                      }}
                    >
                      <RiRadioButtonLine className="mr-[10px] text-[20px] text-[gray]" />{" "}
                      Status :{" "}
                      {accountStatus === true ? <>Visible</> : <>Hidden</>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="w-full md:w-[400px] lg:w-[400px] h-[70px]   overflow-hidden fixed bottom-0 flex items-center justify-center bg-[#1c1f2f] text-[white]">
        <div className="fixed w-[50px] h-[50px] rounded-full text-[white] bg-[#ffb6b5] drop-shadow-md"></div>
        {props.data === "All" ? (
          <div
            className="w-full h-full  flex  items-center ml-[0]"
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[black]"
              style={{ transitionDelay: ".25s" }}
            >
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : props.data === "Group" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-40%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[black]"
              style={{ transitionDelay: ".25s" }}
            >
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : props.data === "Chat" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-80%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[black]"
              style={{ transitionDelay: ".25s" }}
            >
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : props.data === "Status" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-120%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[black]"
              style={{ transitionDelay: ".25s" }}
            >
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full  flex  items-center ml-[-160%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[black]"
              style={{ transitionDelay: ".25s" }}
            >
              <LuSettings2
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdGroupAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillChatSquareTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        )}
        {/* <div className="w-full h-full bg-slate-800"></div> */}
      </div>
    </>
  );
};

export default UserList;
