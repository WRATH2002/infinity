import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
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
// import { MdGroups2 } from "react-icons/md";
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
import { MdPersonSearch } from "react-icons/md";
// import { FaPlus } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";
import { MdGroups2 } from "react-icons/md";
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
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { MdOutlineDone } from "react-icons/md";
import { RiRadioButtonLine } from "react-icons/ri";
import { RiSettings4Fill } from "react-icons/ri";
import StatusUserList from "./StatusUserList";

import { LuSettings2 } from "react-icons/lu";
// import { MdGroups2 } from "react-icons/md";
import { MdGroupAdd } from "react-icons/md";
import { BsPersonFillAdd } from "react-icons/bs";
import { IoIosApps } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
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
import { BiSolidMoon } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdNoAccounts } from "react-icons/md";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { IoMdMoon } from "react-icons/io";
import { IoMoonOutline } from "react-icons/io5";
import { PiMoon } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { AiOutlineDelete } from "react-icons/ai";
// import { MdNoAccounts } from "react-icons/md";
import { FaAppStoreIos } from "react-icons/fa";

const dd = [
  {
    date: 21,
    time: 3.4,
  },
  {
    date: 22,
    time: 6.4,
  },
  {
    date: 23,
    time: 3.8,
  },
  {
    date: 24,
    time: 5.4,
  },
  {
    date: 25,
    time: 7.8,
  },
  {
    date: 26,
    time: 3.7,
  },
];

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
  const [id, setId] = useState();
  const [not, setNot] = useState(true);

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  useEffect(() => {
    if (
      lastMsg !== "" &&
      chatFlag == 2 &&
      props.data.UserId !== ActiveChatUser
    ) {
      console.log(
        "Incominggggggggggggggggggggggg------------------------------------------------------"
      );
      // toast.dismiss();
      setNot(true);
      toast.remove();
      // const toastId =
      //     toast.custom((t) => (

      //       <div
      //       style={{zIndex:"10000"}}
      //         className={`${
      //           t.visible ? "animate-enter" : "animate-leave"
      //         } max-w-md z-50 w-full bg-[#292f3f] border border-[#797979] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      //       >
      //         <div className="flex-1 w-0 p-4">
      //           <div className="flex items-start">
      //             <div className="flex-shrink-0 pt-0.5">
      //               {photoURL === "nophoto" ? (
      //                 <img
      //                 className="h-10 w-10 rounded-full object-cover"
      //                 src={profile2}
      //                 alt=""
      //               />

      //                 ) : (
      // <img
      //                 className="h-10 w-10 rounded-full  object-cover"
      //                 src={photoURL}
      //                 alt=""
      //               />

      //                 )}

      //             </div>
      //             <div className="ml-3 flex-1">
      //               <p className="text-sm font-medium text-[white]">{userName}</p>
      //               <p className="mt-1 text-sm text-[#b3b3b3]">{lastMsg}</p>
      //             </div>
      //           </div>
      //         </div>
      //         {/* <div className="flex border-l ">
      //           <button
      //             onClick={() => toast.dismiss(t.id)}
      //             className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      //           >
      //             Close
      //           </button>
      //         </div> */}
      //       </div>
      //     ));
      // setId(toastId)
    }
  }, [lastMsg]);

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
      <Toaster position="top-center" reverseOrder={false} />
      {/* {ActiveChatUser.length !== 0 ? (
        <>
          <div
            className="w-full h-auto flex  justify-center items-center px-[10px] fixed top-[10px] z-50"
            style={{ zIndex: "999999" }}
          >
            <div className="w-full h-full bg-[#292f3f8a] font-[google] text-[14px] text-white backdrop-blur-md rounded-xl flex flex-col justify-center items-center px-[20px] py-[5px]">
              <div className="w-full h-[70px]  flex justify-center items-center border-b-[.5px] border-[#696969]">
                <div className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src="https://firebasestorage.googleapis.com/v0/b/infinity-new.appspot.com/o/users%2FmQWgSxyplBPSi1iTXfybzmoIQOr1%2FProfile%20Photo?alt=media&token=63d7a766-2417-46a4-9150-29711c10f835"
                  ></img>
                </div>
                <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start">
                  <span className="text-[16px]">Hmadri Purkait</span>
                  <span className="text-[#b3b3b3]">
                    Hey! whats up?? where you been
                  </span>
                </div>
              </div>
              <div className="w-full h-[70px] flex justify-center items-center  border-b-[.5px] border-[#696969]">
                <div className="w-[40px] h-[40px] bg-white rounded-full mr-[10px]">
                  <img
                    className="w-full h-full rounded-full object-cover"
                    src="https://firebasestorage.googleapis.com/v0/b/infinity-new.appspot.com/o/users%2FUbP9mzfzYOgr5Z9ivbHdAjxQ2Sf2%2FProfile%20Photo?alt=media&token=c30bf2b7-26ee-4074-aaf8-8c5c7e61e1c9"
                  ></img>
                </div>
                <div className="w-[calc(100%-50px)] h-[40px] text-[15px] flex flex-col justify-center items-start">
                  <span className="text-[16px]">Niladri Purkait</span>
                  <span className="text-[#b3b3b3]">Hello Brp !!</span>
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
                  <span className="text-[#b3b3b3]">
                    YOu have won an mercedes
                  </span>
                </div>
              </div>
              <div className="w-[60px] h-[4px] bg-[#939393] border border-[#939393] rounded-xl flex justify-center items-center mt-[15px] px-[10px] my-[5px]"></div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )} */}
      {ActiveChatUser === UserUid && UserUid != "" ? (
        <>
          <div
            className={
              "group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center   cursor-pointer   border-b-[1px]   " +
              (theme ? " border-[#d9dde1]" : " border-[#35384a]")
            }
          >
            <div
              className="group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center cursor-pointer  "
              onClick={() => {
                activerChatUser();
                // dispatch(toggleSendFlag(true));
              }}
            >
              <div
                className={
                  "w-[50px] h-[50px]   rounded-full" +
                  (theme ? " bg-[#ffffff]" : " bg-[#1b202d]")
                }
              >
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
                  <span
                    className={
                      "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  >
                    {/* {props.data.user} */}
                    {userName}
                  </span>
                  <span
                    className={
                      "w-[70px] group-hover:mr-[25px] h-full text-[14px]  flex justify-end items-center    font-[google] font-light" +
                      (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                    }
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
                          <span
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light" +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <BsFillCameraFill
                        className={
                          "mr-[5px]  " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      >
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Video" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full font-[google] font-light" +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <TiVideo
                        className={
                          "mr-[5px]  " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      >
                        {lastMsg}
                      </span>
                    </>
                  ) : lastMsg === "Document" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light" +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}

                      <IoMdDocument
                        className={
                          "mr-[5px]  " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      >
                        {docName}
                      </span>
                    </>
                  ) : (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className={
                              "w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full  font-[google] font-light" +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
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
                  {/* </span> */}
                  <span className="w-[70px] text-[15px] h-full font-normal   flex justify-end items-center">
                    {unreadMessages === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#ffffff] text-[#000000]">
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
              <MdDelete className="text-[20px] text-[#000000]" />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 ">
            <div
              className={
                " group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px]  flex justify-center items-center bg-transparent  cursor-pointer   z-10  " +
                (theme ? " border-[#d9dde1]" : " border-[#35384a]")
              }
              onClick={() => activerChatUser()}
            >
              <div
                className={
                  "w-[50px] h-[50px]  rounded-full" +
                  (theme ? " bg-[#ffffff]" : " bg-[#1b202d]")
                }
              >
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
                    className={
                      "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-[google] font-normal " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                    // style={{ transition: ".9s" }}
                  >
                    {/* {props.data.user} */}
                    {userName}
                  </span>
                  <span
                    className={
                      "w-[70px] h-full group-hover:mr-[25px] text-[14px] flex justify-end items-center  font-[google] font-light z-50" +
                      (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                    }

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
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light" +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <BsFillCameraFill
                        className={
                          "mr-[5px]  " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
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
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light " +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <TiVideo
                        className={
                          "mr-[5px]   " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full     font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
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
                            className={
                              "w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light " +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <IoMdDocument
                        className={
                          "mr-[5px] " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                        // style={{ transition: ".5s" }}
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
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
                            className={
                              "w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[google] font-light " +
                              (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                            }
                            // style={{ transition: ".5s" }}
                          >
                            you:
                          </span>
                        </>
                      ) : (
                        <></>
                      )}
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
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
                        <span className="w-[20px] h-[20px] text-[11px] flex justify-center items-center rounded-full bg-[#ffffff] text-[#000000]">
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
              <MdDelete className="text-[20px] text-[#000000]" />
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
  const [isOnline, setIsOnline] = useState(false);
  // const [Time, setTime] = useState("");
  // const [unreadMessages, setUnreadMessages] = useState(0);
  // const [chatLength, setChatlength] = useState(0);

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

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

  useEffect(() => {
    fetchOnlineStatus();
  }, []);

  function fetchOnlineStatus() {
    const user = firebase.auth().currentUser;
    const userDoc = db.collection("Chat Record").doc(props.data.UserId);
    onSnapshot(userDoc, (snapshot) => {
      setIsOnline(snapshot?.data()?.Online);
      console.log(snapshot?.data()?.Online);
    });
  }

  return (
    <>
      <div className=" group w-[100%] h-[85px] px-[10px] md:px-[20px] lg:px-[20px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent ">
        <div
          className={
            "border-b-[1px] w-[100%] h-[85px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent   " +
            (theme ? " border-[#c8c8c8]" : " border-[#35384a]")
          }
          onClick={() => {
            props.setData("Chat");
            activerChatUser();
            addToFriendList();
            // setSearchFlag(false);
            // dispatch(toggleSendFlag(true));
          }}
        >
          <div className="w-[17px] h-full  flex justify-end items-end pb-[5px]">
            {isOnline === true ? (
              <div
                className={
                  "w-[12px] max-h-[12px] min-h-[12px] rounded-full flex justify-center items-center   z-50 " +
                  (theme
                    ? "bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                    : "bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f]")
                }
                style={{ zIndex: "100" }}
              >
                <div
                  className={
                    "w-[8px] max-h-[8px] min-h-[8px] rounded-full  z-50" +
                    (theme ? " bg-[#469422]" : " bg-[#96df73]")
                  }
                  style={{ zIndex: "100" }}
                ></div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={
              "w-[50px] h-[50px] ml-[-17px]  rounded-full " +
              (theme ? " bg-[#ffffff]" : " bg-[#1b202d]")
            }
            // style={{ zIndex: "10" }}
          >
            {photoURL === "nophoto" ? (
              <>
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover  "
                ></img>
                {/* <div className="w-[12px] h-[12px] bg-[#ffffff] ml-[5px] mt-[-10px] rounded-full border-[2px] border-[#1B202D] md:border-[#292f3f] lg:border-[#292f3f] z-50" style={{zIndex:"100"}}></div> */}
              </>
            ) : (
              <>
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover "
                ></img>
                {/* <div className="w-[12px] h-[12px] bg-[#ffffff] ml-[5px] mt-[-10px] rounded-full border-[2px] border-[#1B202D] md:border-[#292f3f] lg:border-[#292f3f] z-50"></div> */}
              </>
            )}
          </div>
          <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
            <div className="w-full font-semibold flex h-[23px]">
              <span
                className={
                  "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-[google] font-normal" +
                  (theme ? " text-[#000000]" : " text-[#ffffff]")
                }
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.user} */}
                {userName}
                {/* {isOnline} */}
              </span>
              <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-white group-hover:text-black ">
                {/* {props.data.time} */}
                {/* {Time} */}
              </span>
            </div>
            <div className="w-full flex h-[23px]">
              <span
                className={
                  "w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[google] font-light" +
                  (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                }
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
  const [help, setHelp] = useState(false);

  const [statusPosition, setStatusPosition] = useState(0);
  const [stTime, setStTime] = useState("");
  const [stText, setStText] = useState("");

  const [onMin, setOnMin] = useState(-1);
  const [onHour, setOnHour] = useState(-1);
  const [showTime, setShowTime] = useState(false);
  const [theme, setTheme] = useState(true);
  // const [left, setRight] = useState(0);
  // addFriendList;
  console.log("UserList");
  console.log(UserList);

  function changeTheme() {
    const user = firebase.auth().currentUser;
    if (theme === true) {
      // setTheme(false);
      db.collection("Chat Record").doc(user.uid).update({ theme: false });
    } else {
      // setTheme(true)
      db.collection("Chat Record").doc(user.uid).update({ theme: true });
    }
  }

  useEffect(() => {
    fetchownerInfo();
    fetchUserList();
    fetchAllGroups();
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setOnHour(snapshot?.data()?.onTimeHour);
      setOnMin(snapshot?.data()?.onTimeMinute);
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  useEffect(() => {
    if (onHour >= 0 && onMin >= 0) {
      const user = firebase.auth().currentUser;

      setTimeout(() => {
        // console.log("Hello, World!");
        //  const user = firebase.auth().currentUser;

        if (onMin + 1 >= 60) {
          db.collection("Chat Record")
            .doc(user.uid)
            .update({ onTimeHour: onHour + 1, onTimeMinute: 0 });
          // setOnMin(0);
          // setOnHour(onHour + 1);
        } else {
          db.collection("Chat Record")
            .doc(user.uid)
            .update({ onTimeMinute: onMin + 1 });
          // setOnMin(onMin + 1);
        }
      }, 60000);
    }
  }, [onMin, onHour]);

  function isLink(inputString) {
    // Regular expression to match URLs
    const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[\w.-]+\.\w{2,}(?:\/\S*)?$/i;

    // Test if the input string matches the URL pattern
    return urlPattern.test(inputString);
  }

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
      setStTime(snapshot?.data()?.StTime);
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
    if (statusImage) {
      uploadImage();
    }
  }, [statusImage]);

  function deleteStatus() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record").doc(user.uid).update({
      Status: "",
    });
  }

  const uploadImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    const now = new Date();

    // Get hours, minutes, and AM/PM
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const amPM = hours >= 12 ? "pm" : "am";

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format the time as "hh:mm am/pm"
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${amPM}`;

    var geturl = await uploadBytes(fileRef, statusImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setTempUrl(url);
        const statusRef = db
          .collection("Chat Record")
          .doc(user.uid)
          .update({
            Status: arrayUnion({
              url: url,
              text: "",
            }),
            StTime: formattedTime,
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
    setStatusImage();
    return geturl;
  };

  function setStatusText() {
    if (stText.length !== 0) {
      const user = firebase.auth().currentUser;
      const now = new Date();

      // Get hours, minutes, and AM/PM
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const amPM = hours >= 12 ? "pm" : "am";

      // Convert hours to 12-hour format
      hours = hours % 12 || 12;

      // Format the time as "hh:mm am/pm"
      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${amPM}`;
      db.collection("Chat Record")
        .doc(user.uid)
        .update({
          Status: arrayUnion({
            url: "text",
            text: stText,
          }),
          StTime: formattedTime,
        });

      setStText("");
    }
  }

  const uploadImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/status_image/${user.uid}/${statusCount + 1}`
    );
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
            {/* <div className="min-h-[70px] w-full  flex justify-center items-center"> */}
            <div className=" mt-[10px]   w-[100%] px-[0] md:px-[10px] lg:px-[10px] flex justify-end items-center h-[60px] pb-[10px] bg-[#1b202d] md:bg-[#292f3f] lg:bg-[#292f3f]   overflow-hidden  ">
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
                className="input w-full h-[50px] opacity-100  text-[white] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] font-[google] font-normal text-[15px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px] z-50  rounded-xl "
              ></input>
              <div
                className="w-[50px] h-[50px] ml-[-50px]  rounded-full flex justify-center items-center z-5   text-white cursor-pointer z-[100]"
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
                <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center z-[100]">
                  <RxCross2 className="text-[20px] z-[100] text-[white]" />
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll">
              {SearchUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#4b93b9] ">
                    <span>No Users Found</span>
                  </div>
                </>
              ) : (
                <>
                  {SearchUserList.map((friends) => {
                    return (
                      <SearchFriends setData={props.setData} data={friends} />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "All" ? (
          <>
            <div
              className={
                " mt-[10px]   w-[100%] px-[0] md:px-[10px] lg:px-[10px] flex justify-end items-center min-h-[60px] pb-[10px]    overflow-hidden z-[100] " +
                (theme
                  ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                  : " bg-[#1b202d] md:bg-[#292f3f] lg:bg-[#292f3f]")
              }
            >
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
                className={
                  "input w-full h-[50px] opacity-100   font-[google] font-normal text-[15px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px] z-50  rounded-xl " +
                  (theme
                    ? " text-[#000000] bg-[#ffffff] md:bg-[#ffffff] lg:bg-[#ffffff]"
                    : " text-[#ffffff] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d]")
                }
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
                  {searchUser.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <RxCross2
                        className={
                          "text-[20px] z-[100] " +
                          (theme ? " text-[black]" : " text-[white]")
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* </div> */}
            <div className="borr w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden mr-0 text-[#4b93b9]">
              {AllUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#4b93b9] ">
                    <span>No Users Yet</span>
                  </div>
                </>
              ) : (
                <>
                  {AllUserList?.map((friends) => {
                    return (
                      <SearchFriends setData={props.setData} data={friends} />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "Chat" ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-110px)] ">
            {UserList.length === 0 ? (
              <>
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#4b93b9] ">
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
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#4b93b9] ">
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
              <div
                className={
                  " z-50 fixed bottom-0 h-[100svh] w-full md:w-[400px] lg:w-[400px] left-0 flex-col flex justify-center items-center" +
                  (theme
                    ? " bg-[#e4eaf1]  md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                    : " bg-[#1b202d]  md:bg-[#292f3f] lg:bg-[#292f3f]")
                }
              >
                {/* Cross ------------------------- */}
                <div
                  className="fixed top-[25px] left-[calc(100%-55px)] md:left-[calc(400px-55px)]  lg:left-[calc(400px-55px)]  w-[35px] h-[35px]  rounded-full bg-[white] md:bg-[#1c1f2f] lg:bg-[white] drop-shadow-none text-black flex justify-center items-center  cursor-pointer rotate-45 z-40"
                  onClick={() => {
                    setShowStatus(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>
                {/* Profile ---------------------- */}
                <div
                  className=" group w-full md:w-[400px]  lg:w-[400px] h-[90px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal  px-[20px]  text-[#ffffff]  fixed top-0  drop-shadow-none"
                  onClick={() => {
                    // setShowStatus(true);
                  }}
                >
                  <div
                    className={
                      "w-[59px] h-[59px] border-[2.4px] flex justify-center items-center rounded-full" +
                      (theme ? " border-[#469422]" : " border-[#96df73]")
                    }
                  >
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-[50px] h-[50px] rounded-full object-cover "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-[50px] h-[50px] rounded-full object-cover "
                      ></img>
                    )}
                  </div>
                  <div className="w-[calc(100%-65px)] h-[50px] ml-[15px] bg-transparent  flex flex-col justify-center items-start ">
                    <div className="w-full font-semibold flex h-[23px]">
                      <span
                        className={
                          "w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                          (theme ? " text-black" : " text-black")
                        }
                      >
                        My Status
                      </span>
                      <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light"></span>
                    </div>
                    <div
                      className={
                        "w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-light" +
                        (theme ? " text-[#5f5f5f]" : " text-[#9fa5a7]")
                      }
                    >
                      {stTime}
                    </div>
                  </div>
                </div>

                <div className=" z-30 fixed bottom-0 h-[100svh] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] left-[20px] md:left-[20px] lg:left-[20px] rounded-lg  flex-col flex justify-center items-center  drop-shadow-none">
                  {/* Left Arrow ------------------------- */}

                  {statusPosition === 0 ? (
                    <></>
                  ) : (
                    <>
                      <div
                        className="fixed w-[26px] h-[46px] rounded-full bg-[white] cursor-pointer text-[black] flex justify-center items-center left-0"
                        onClick={() => {
                          if (statusPosition > 0) {
                            setStatusPosition(statusPosition - 1);
                          }
                        }}
                      >
                        <FaAngleLeft className="text-[19px]" />
                      </div>
                    </>
                  )}

                  {/* Right Arrow ------------------------- */}
                  {statusPosition === statusCount - 1 ? (
                    <></>
                  ) : (
                    <>
                      <div
                        className="fixed w-[26px] h-[46px] rounded-full bg-[white] cursor-pointer text-[black] flex justify-center items-center right-0"
                        onClick={() => {
                          if (statusPosition < statusCount - 1) {
                            setStatusPosition(statusPosition + 1);
                          }
                        }}
                      >
                        <FaAngleRight className="text-[19px]" />
                      </div>
                    </>
                  )}

                  {/* Status ------------------------- */}
                  {/* {statusImageUrl ? ( */}
                  {/* <img
                    className="w-full rounded-xl object-cover"
                    src={statusImageUrl[statusPosition]}
                    // onError={styl}
                  ></img> */}

                  {statusImageUrl[statusPosition]?.url === "text" ? (
                    <>
                      <div className="w-full h-full flex justify-center items-center ">
                        {isLink(statusImageUrl[statusPosition]?.text) ? (
                          <a
                            href={statusImageUrl[statusPosition]?.text}
                            target="_blank"
                            className="w-[80%] whitespace-pre-wrap text-center font-[google] font-normal text-[20px] cursor-pointer text-[#80ced3]"
                          >
                            {statusImageUrl[statusPosition]?.text}
                          </a>
                        ) : (
                          <pre
                            className={
                              "w-[80%] whitespace-pre-wrap text-center font-[google] font-normal text-[20px] " +
                              (theme ? " text-[black]" : " text-[white]")
                            }
                          >
                            {statusImageUrl[statusPosition]?.text}
                          </pre>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        className="w-full rounded-xl object-cover max-h-[calc(100svh-180px)]"
                        src={statusImageUrl[statusPosition]?.url}
                        // onError={styl}
                      ></img>
                    </>
                  )}
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
                              <div
                                className="w-[8px] mx-[2px] h-[4px] bg-white rounded-full"
                                style={{ transition: ".4s" }}
                              ></div>
                            ) : (
                              <div
                                className="w-[4px] mx-[2px] h-[4px] bg-[#8d8d8d] rounded-full"
                                style={{ transition: ".4s" }}
                              ></div>
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
                  className="fixed z-20 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full  text-white  flex justify-center items-center rotate-[135deg] cursor-pointer"
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
                  className="fixed z-20 opacity-100 bottom-[90px] mr-[60px] md:mr-[70px] lg:mr-[70px] w-[40px] h-[40px]  rounded-full bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d]   text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    // setStatusModal(!statusModal);
                    setStatusTextModal(false);
                  }}
                  style={{ transition: ".4s" }}
                  for="groupDp"
                >
                  <BsCameraFill className="text-[16px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed  opacity-100 bottom-[140px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d]  text-white flex justify-center items-center  cursor-pointer z-40"
                  onClick={() => {
                    setStatusTextModal(!statusTextModal);
                  }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  {statusTextModal === true ? (
                    <img
                      src={tick}
                      className="w-[30px] "
                      onClick={() => {
                        setStatusText();
                        setStatusModal(!statusModal);
                        setStatusTextModal(false);
                      }}
                    ></img>
                  ) : (
                    <FaPen className="text-[16px]" />
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  className="fixed z-30 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] text-white flex justify-center items-center  cursor-pointer"
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
                  className="fixed z-20 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d]   text-white flex justify-center items-center  cursor-pointer"
                  // onClick={() => {
                  //   setStatusModal(!statusModal);
                  // }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  <BsCameraFill className="text-[17px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed z-10 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]   rounded-full bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] text-white flex justify-center items-center  cursor-pointer"
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
                  className="h-[120px] resize-none py-[10px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bottom-[140px] fixed mr-[10px] md:mr-[20px] lg:mr-[20px] opacity-100 bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] rounded-lg outline-none px-[20px] font-[google] font-normal text-[15px] text-[white] input z-30"
                  placeholder="Enter Text"
                  // type="textarea"
                  value={stText}
                  onChange={(e) => {
                    setStText(e.target.value);
                  }}
                  style={{ transition: ".4s" }}
                ></textarea>
              </>
            ) : (
              <>
                <textarea
                  className="h-[40px] resize-none py-[10px] w-0 bottom-[140px] fixed opacity-0 bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] rounded-lg mr-[10px] md:mr-[20px] lg:mr-[20px] outline-none px-[20px] font-[google] font-normal text-[15px] text-[white] input"
                  placeholder="Enter Text"
                  // type="textarea"
                  value={stText}
                  onChange={(e) => {
                    setStText(e.target.value);
                  }}
                  style={{ transition: ".4s" }}
                ></textarea>
              </>
            )}
            {/* <div className="w-full h-auto flex justify-start items-center pl-[10px] mt-[25px]">
              <span className="text-[28px] text-[#8b8b8b] font-[google] font-normal">
                My{" "}
              </span>
              {"  "}
              <span className="text-[28px] text-[white] font-[google] font-normal ml-[10px]">
                {" "}
                Status
              </span>
            </div> */}

            {isStatus ? (
              <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 select-none">
                {" "}
                <div
                  className=" group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px] border-[#35384a] flex justify-center items-center bg-transparent  cursor-pointer   z-10 select-none"
                  onClick={() => {
                    setShowStatus(true);
                  }}
                >
                  <div
                    className={
                      "w-[59px] h-[59px] border-[2.4px]  flex justify-center items-center rounded-full" +
                      (theme ? " border-[#469422]" : " border-[#96df73]")
                    }
                  >
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-[50px] h-[50px] rounded-full object-cover "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-[50px] h-[50px] rounded-full object-cover "
                      ></img>
                    )}
                  </div>
                  <div
                    className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex justify-center items-start z-50"
                    style={{ zIndex: "999" }}
                  >
                    <div className="w-[calc(100%-70px)] font-semibold flex flex-col h-full">
                      <span className="w-full text-[16px] h-[50%] text-[white]  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
                        {/* {props.data.user} */}
                        {/* {ownerName} */}
                        My Status
                      </span>
                      <span className="w-full  h-[50%]  flex justify-start  items-center   text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                        {stTime}
                      </span>
                    </div>
                    <div
                      className="w-[70px] flex h-full justify-end  items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light z-50"
                      style={{ zIndex: "999" }}
                      onClick={() => {
                        deleteStatus();
                        setShowStatus(false);
                        console.log("clicked");
                      }}
                    >
                      <MdDelete className="text-[20px] text-white" />
                    </div>
                    {/* <span className="text-[15px]">Hello! How Are you</span> */}
                  </div>
                </div>
              </div>
            ) : (
              <div className=" group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal  px-[10px]  md:px-[20px] lg:px-[20px]  text-[#ffffff] hover:text-[#000000] border-t-[1px] border-b-[1px] border-[#404040]">
                <div className="w-[59px] h-[59px] border-[2.4px] border-transparent rounded-full">
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
                <div
                  className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex justify-center items-start "
                  // style={{ zIndex: "999" }}
                >
                  <div className="w-[calc(100%-70px)] font-semibold flex flex-col h-full">
                    <span className="w-full text-[16px] h-[50%] text-[white]  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
                      {/* {props.data.user} */}
                      {/* {ownerName} */}
                      My Status
                    </span>
                    <span className="w-full  h-[50%]  flex justify-start  items-center   text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                      No status yet
                    </span>
                  </div>
                  <div
                    className="w-[70px] flex h-full justify-end  items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light z-50"
                    // style={{ zIndex: "999" }}
                    // onClick={() => {
                    //   deleteStatus();
                    //   setShowStatus(false);
                    //   console.log("clicked");
                    // }}
                  >
                    {/* <MdDelete className="text-[20px] text-white" /> */}
                  </div>
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
            {/* <div className="w-[100%] fixed h-[100svh] flex justify-center items-center">
            <div className="w-[200px] h-[400px] bg-slate-500 rounded-xl"></div>
          </div> */}
            {/* <div className="w-full bg-[#292f3f] rounded-xl h-[300px] flex justify-center items-center tracking-widest text-white text-[60px] font-[google] font-normal">
                  12 : {onMin < 10 ? (<>0{onMin}</>) : (<>{onMin}</>)}
                </div> */}
            <div className="w-full h-full flex justify-center items-center ">
              <div className="w-full h-full  rounded-3xl flex flex-col justify-start pt-[10px]  items-center">
                {/* <div className="w-full h-auto flex justify-start items-center ml-[10px]">
                  <span className="text-[28px] text-[#8b8b8b] font-[google] font-normal">
                    My{" "}
                  </span>
                  {"  "}
                  <span className="text-[28px] text-[white] font-[google] font-normal ml-[10px]">
                    {" "}
                    Profile
                  </span>
                </div> */}
                {showTime == true ? (
                  <div
                    className="w-full md:w-[380px] lg:w-[380px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] rounded-xl min-h-[240px] max-h-[240px] flex flex-col justify-between items-center  text-white text-[25px] font-[google] font-normal p-[20px]"
                    style={{ transition: ".4s" }}
                    onClick={() => {
                      setShowTime(false);
                    }}
                  >
                    {/* <span className="text-[19px] fixed left-[30px] top-[100px] tracking-normal block text-[#9f9f9f]">
                      Screen Time
                    </span> */}
                    {/* <span className="text-[19px] tracking-normal w-[0px] overflow-hidden opacity-0" style={{transition:".4s"}}>Screen Time</span> */}
                    <div
                      className="w-full h-[20px] flex justify-between items-center"
                      // style={{ transition: ".4s" }}
                    >
                      <div className="text-[16px] text-[white] tracking-normal flex justify-start items-center">
                        <FaAngleDown className="text-[white] text-[17px] mr-[10px]" />
                        21/06/2024
                      </div>
                      <div className="text-[#c0c0c0]">
                        {onHour < 10 ? <>0{onHour}</> : <>{onHour}</>} :{" "}
                        {onMin < 10 ? <>0{onMin}</> : <>{onMin}</>}
                      </div>
                    </div>
                    <div
                      className="w-full mt-[40px] h-[140px] flex justify-center items-end"
                      // style={{ transition: ".4s", transitionDelay: ".5s" }}
                    >
                      <div
                        className="w-full h-full flex justify-center items-end"
                        style={{ transition: ".4s", transitionDelay: ".5s" }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart width={730} height={250} data={dd}>
                            <defs>
                              <linearGradient
                                id="colorAvg"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="10%"
                                  stopColor="#96df73"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#96df73"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            {/* <Tooltip /> */}
                            <Area
                              type="bump"
                              dataKey="time"
                              stroke="#487532"
                              fillOpacity={1}
                              fill="url(#colorAvg)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full md:w-[380px] lg:w-[380px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] rounded-xl min-h-[60px] max-h-[60px]  flex flex-col justify-between right-[0px] items-center  text-white text-[25px] font-[google] font-normal p-[20px]"
                    style={{ transition: ".4s", transitionDelay: ".5s" }}
                    onClick={() => {
                      setShowTime(true);
                    }}
                  >
                    {/* <span className="text-[19px] fixed left-[30px] top-[100px] tracking-normal block ">
                      Screen Time
                    </span> */}
                    {/* <span className="text-[19px] tracking-normal w-[130px] overflow-hidden opacity-100" style={{transition:".4s"}}>Screen Time</span> */}
                    <div
                      className="w-full h-[20px] flex justify-between items-center"
                      // style={{ transition: ".4s", transitionDelay: ".5s" }}
                    >
                      <div className="text-[18px] text-[#c0c0c0] tracking-normal flex justify-start items-center">
                        Today
                      </div>
                      <div>
                        {onHour < 10 ? <>0{onHour}</> : <>{onHour}</>} :{" "}
                        {onMin < 10 ? <>0{onMin}</> : <>{onMin}</>}
                      </div>
                    </div>
                    <div
                      className="w-full mt-[20px] h-[0] flex justify-center items-end"
                      style={{ transition: ".4s" }}
                    >
                      <div
                        className="w-full  h-[0] flex justify-center items-end"
                        style={{ transition: ".4s" }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart width={730} height={250} data={dd}>
                            <defs>
                              <linearGradient
                                id="colorAvg"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                              >
                                <stop
                                  offset="10%"
                                  stopColor="#96df73"
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#96df73"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            {/* <Tooltip /> */}
                            <Area
                              type="bump"
                              dataKey="time"
                              stroke="#487532"
                              fillOpacity={1}
                              fill="url(#colorAvg)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                )}
                <div className="w-full h-[100px] mt-[25px] flex justify-start items-center px-[20px]">
                  <div className="group w-[80px] h-[80px] rounded-full  flex justify-end items-end">
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
                      className="hidden fixed opacity-0 text-white bg-transparent w-[45px] h-[35px] rounded-full z-30 cursor-pointer"
                      onChange={(e) => profileImage(e)}
                    ></input>
                    <label
                      for="getFile"
                      // onclick={document.getElementById("getFile").click()}
                      className=" w-[30px] h-[30px] flex justify-center items-center border-[2px] border-[#292f3f] md:border-[#1b202d] lg:border-[#1b202d] bg-[#4b565c] fixed rounded-full cursor-pointer z-10"
                    >
                      <BsCameraFill className="text-white text-[13px]" />
                    </label>
                  </div>
                  <div className="w-[calc(100%-140px)] h-full  ml-[20px] flex flex-col justify-center  items-start">
                    {/* <div className="mt-[50px] w-[250px] flex justify-center items-center">
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
                            className="w-[calc(100%-10px)] h-[50px] text-[white] font-normal px-[20px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] input tracking-[.4px] font-[google]  border-none  z-0 outline-none  text-[15px]  rounded-xl pr-[50px]"
                          ></input>
                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center ml-[-45px]  z-20"
                            onClick={() => {
                              setNameChangeFlag(false);
                            }}
                          >
                            <RxCross2 className="text-[18px] text-[#4b93b9]" />
                          </span>
                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center mr-[5px]  z-20"
                            onClick={() => {
                              setNameChangeFlag(false);
                              updateUserName();
                            }}
                          >
                            <MdOutlineDone className="text-[18px] text-[#4b93b9]" />
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
                            className="w-[calc(100%-10px)] h-[50px] text-[#bababa] font-normal px-[20px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] input tracking-[.4px] font-[google]  border-none  z-0 outline-none  text-[15px]  rounded-xl pr-[30px]"
                          ></input>
                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center ml-[-25px] mr-[5px] z-20"
                            onClick={() => {
                              setNameChangeFlag(true);
                            }}
                          >
                            <RiEditFill className="text-[18px] text-[#4b93b9]" />
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
                            className="w-[calc(100%-10px)] h-[50px] text-[#bababa]  px-[20px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] input tracking-[.4px] font-[google] font-normal border-none  z-0 outline-none  text-[15px]  rounded-xl pr-[50px]"
                          ></input>
                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center ml-[-45px] z-20"
                            onClick={() => {
                              setAboutChangeFlag(false);
                            }}
                          >
                            <RxCross2 className="text-[18px] text-[#4b93b9]" />
                          </span>
                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center mr-[5px] z-20"
                            onClick={() => {
                              setAboutChangeFlag(false);
                              updateUserInfo();
                            }}
                          >
                            <MdOutlineDone className="text-[18px] text-[#4b93b9]" />
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
                            className="w-[calc(100%-10px)] h-[50px] text-[#bababa] font-normal px-[20px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] input tracking-[.4px] font-[google]  border-none  z-0 outline-none  text-[15px]  rounded-xl pr-[30px]"
                          ></input>

                          <span
                            className="w-[20px] h-[30px] flex justify-center items-center ml-[-25px] mr-[5px] z-20"
                            onClick={() => {
                              setAboutChangeFlag(true);
                            }}
                          >
                            <RiEditFill className="text-[18px] text-[#4b93b9]" />
                          </span>
                        </>
                      )}
                    </div> */}
                    <div className="text-white font-[google] text-[20px] md:text-[22px] lg:text-[22px] w-full ">
                      {ownerName}
                    </div>
                    <div className="text-[#bbbbbb] font-[google] max-h-[47px] line-clamp-2 overflow-hidden text-ellipsis mt-[5px] text-[15px] w-full font-light">
                      {ownerInfo}
                    </div>
                  </div>
                  <div className="w-[30px] flex justify-end items-center">
                    <RiEditFill className="text-[20px] text-[#ffffff]" />
                  </div>
                </div>
                <div className="w-full px-[20px] mt-[30px]">
                  <div className="w-full border-[1px] border-[#d9dde1]"></div>
                </div>
                {help === true ? (
                  <div
                    className="w-full md:w-[400px] lg:w-[400px] h-[400px] fixed top-[70px] p-[20px] flex justify-center items-center z-50 text-[16px]"
                    style={{ transition: ".4s" }}
                  >
                    <div className="w-full h-full rounded-xl font-[google] font-normal text-white px-[20px] bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] flex flex-col justify-center items-start">
                      <span className="font-medium">How to add friend ?</span>
                      <span className="text-[#a8a8a8]">
                        Go to add person icon and click on it. Then in the
                        searchbar type the exact username your friend has and
                        click on the search icon. From the result below click on
                        your friends profile and start messaging.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-full md:w-[400px] lg:w-[400px] h-[400px] fixed top-[-430px] p-[10px] flex justify-center items-center"
                    style={{ transition: ".4s" }}
                  >
                    <div className="w-full h-full rounded-xl bg-[#292f3f] md:bg-[#1b202d] lg:bg-[#1b202d] "></div>
                  </div>
                )}

                <div className=" h-[230px]  mt-[50px] w-full px-[20px] flex flex-col justify-between items-center ">
                  <div
                    className={
                      "w-full   h-auto flex flex-col justify-center items-start" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    {/* <div className="w-[100%] h-[34px]  rounded-xl   flex justify-start items-center text-white font-[google] font-light  text-[15px] cursor-pointer">
                      <BiSolidMoon className="text-[20px] mr-[16px]" /> App
                      Theme
                    </div> */}
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-between items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        changeTheme();
                      }}
                    >
                      <div className="flex justify-start items-center">
                        <BiSolidMoon className="text-[20px] mr-[16px]" /> App
                        Theme : {theme === true ? <>Light</> : <>Dark</>}
                      </div>
                      <div
                        className={
                          "w-[32px] h-[22px] rounded-full flex items-center justify-start  border " +
                          (theme
                            ? " bg-[#ffffff] border-[#b7bcc0]"
                            : " bg-[#95df734c] border-[#96df73]")
                        }
                      >
                        {theme ? (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[3px] bg-[#b7bcc0] "
                            style={{ transition: ".4s" }}
                          ></div>
                        ) : (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[13px] bg-[#96df73] "
                            style={{ transition: ".4s" }}
                          ></div>
                        )}
                      </div>
                    </div>
                    {/* <div className="w-[calc(100%-40px)] h-[50px] rounded-xl bg-[#292f3f] mt-[10px] flex justify-center items-center text-white font-[google] font-light  text-[13px] cursor-pointer">
                      <MdOutlinePassword className="mr-[10px] text-[20px] text-[gray]" />{" "}
                      Change Password
                    </div> */}
                    {/* </div> */}
                    {/* <div className="w-full px-[10px] h-[40px] mt-[10px] flex justify-evenly items-center"> */}

                    <div className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center font-[google] font-light  text-[15px] cursor-pointer">
                      <AiFillDelete className="text-[20px] mr-[16px]" /> Delete
                      Account
                    </div>

                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-between items-center font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        changeAccountStatus();
                      }}
                    >
                      <div className="flex justify-start items-center">
                        <MdNoAccounts className="text-[20px] mr-[16px]" /> Hide
                        Account : {accountStatus === true ? <>Off</> : <>On</>}
                      </div>
                      <div
                        className={
                          "w-[32px] h-[22px] rounded-full flex items-center justify-start  border  " +
                          (theme
                            ? "bg-[#ffffff] border-[#b7bcc0]"
                            : "bg-[#95df734c] border-[#96df73]")
                        }
                      >
                        {accountStatus ? (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[3px] bg-[#b7bcc0] "
                            style={{ transition: ".4s" }}
                          ></div>
                        ) : (
                          <div
                            className="w-[16px] h-[16px] rounded-full ml-[13px] bg-[#96df73] "
                            style={{ transition: ".4s" }}
                          ></div>
                        )}
                      </div>
                    </div>
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        setHelp(true);
                      }}
                    >
                      <TbHelpSquareRoundedFilled className="text-[20px] mr-[16px]" />{" "}
                      Help
                    </div>
                    <div
                      className={
                        "w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center text-[#ff9448] font-[google] font-light  text-[15px] cursor-pointer" +
                        (theme ? " text-[#bf692c]" : " text-[#ff9448]")
                      }
                      onClick={() => {
                        userSignOut();
                      }}
                    >
                      <IoLogOut className="text-[23px] mr-[12px] ml-[1.5px]" />{" "}
                      Log Out
                    </div>
                  </div>
                </div>

                {/* <div className="w-full py-[40px] text-[#8b8b8b] text-[13px] flex flex-col justify-center items-center">
                  <span>Want to use this in Android</span>
                  <span> Click the icon below to download the app</span>
                  <span>
                    <FaAppStoreIos className=" text-[25px]" />
                  </span>
                </div> */}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={
          "w-full md:w-[400px] lg:w-[400px] h-[60px]   overflow-hidden fixed bottom-0 flex items-center justify-center  " +
          (theme
            ? "bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
            : "bg-[#1c1f2f] md:bg-[#292f3f] lg:bg-[#292f3f]")
        }
      >
        {/* <div className="fixed w-[50px] h-[50px] rounded-full text-[white] bg-[#4b93b9] "></div> */}
        {/* bg-[#283035]
        bg-[#303A40]
        bg-[#354249] */}

        <div
          className={
            "w-[calc(400px/5)] fixed h-[40px] rounded-xl  z-0 " +
            (theme
              ? "text-[#000000] bg-[#ffffff] "
              : "text-[#ffffff] bg-[#96df73] ")
          }
          style={{ zIndex: "0" }}
        ></div>

        {props.data === "All" ? (
          <div
            className={
              "w-full h-full  flex  items-center ml-[0]" +
              (theme ? "text-[#000000] " : "text-[#ffffff] ")
            }
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px]  flex justify-center items-center z-10  text-[black]"
              // style={{ transitionDelay: ".25s" }}
            >
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
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
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
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
              className="min-w-[20%] h-[40px]  flex justify-center items-center z-10  text-[black]"
              // style={{ transitionDelay: ".25s" }}
            >
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
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
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] flex justify-center items-center  text-[black] z-10 "
              // style={{ transitionDelay: ".25s" }}
            >
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
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
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            <div
              className="min-w-[20%] h-[40px]  flex justify-center items-center z-10  text-[black]"
              // style={{ transitionDelay: ".25s" }}
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
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
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
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  props.setData("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
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
              className="min-w-[20%] h-[40px]  flex justify-center items-center z-10  text-[black]"
              // style={{ transitionDelay: ".25s" }}
            >
              <RiSettings4Fill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <BsPersonFillAdd
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  props.setData("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <MdGroups2
                className="text-[27px]"
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px]  flex justify-center items-center">
              <HiChatBubbleBottomCenterText
                className="text-[25px]"
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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-[#373748] border border-[#8d6c6e] rounded-xl flex flex-col gap-4 ">
        <p className="text-medium text-white text-lg">Hour : {label}</p>
        <p className="text-sm text-blue-400 font-[google]">
          Max:
          <span className="ml-2">{payload[0].value} bpm</span>
        </p>
        <p className="text-sm text-[#72f63b] font-[google]">
          Min:
          <span className="ml-2">{payload[1].value} bpm</span>
        </p>
        <p className="text-sm text-[#ff7b00] font-[google]">
          Avg:
          <span className="ml-2">{payload[2].value} bpm</span>
        </p>
      </div>
    );
  }
};
