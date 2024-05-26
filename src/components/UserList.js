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
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import dp from "../assets/img/dp2.jpg";
import profile from "../assets/img/profile.jpg";
import profile2 from "../assets/img/d.png";
import tick from "../assets/img/tick.png";
// import { auth } from "../firebase";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { IoMdInformationCircle } from "react-icons/io";
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
  limit,
  onSnapshot,
  serverTimestamp,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import {
  BsCaretDownFill,
  BsCaretUpFill,
  BsFillCameraFill,
} from "react-icons/bs";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { RiDonutChartLine, RiSearch2Line } from "react-icons/ri";
import { IoMdDocument } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { BsCameraFill } from "react-icons/bs";
import AllGroupList from "./AllGroupList";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import {
  FaCheckCircle,
  FaLongArrowAltDown,
  FaLongArrowAltUp,
  FaPen,
} from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { TbAlertTriangle, TbPlaystationCircle } from "react-icons/tb";
import {
  MdBarChart,
  MdBugReport,
  MdDescription,
  MdGroups,
  MdOutlineAdd,
} from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { signOut } from "firebase/auth";
import { RiEditFill } from "react-icons/ri";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { RiSettings4Fill } from "react-icons/ri";
import StatusUserList from "./StatusUserList";
import { BsPersonFillAdd } from "react-icons/bs";
import { BiSolidMoon } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { MdNoAccounts } from "react-icons/md";
import { TbHelpSquareRoundedFilled } from "react-icons/tb";
import { IoChevronDownOutline, IoLogOut } from "react-icons/io5";
import { RiTimer2Fill } from "react-icons/ri";
import { LuCircleDashed } from "react-icons/lu";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";

const data = [
  {
    date: 4,
    usage: 2,
  },
  // { date: 5, usage: 4 },
  // { date: 6, usage: 6 },
  { date: 7, usage: 1 },
  // { date: 6, usage: 6 },
  // { date: 7, usage: 1 },
  // {
  //   date: 4,
  //   usage: 2,
  // },
  { date: 5, usage: 4 },
  // { date: 6, usage: 6 },
  // { date: 7, usage: 1 },
  { date: 6, usage: 6 },
  // { date: 5, usage: 4 },
  // { date: 6, usage: 6 },
  // { date: 7, usage: 1 },
  // { date: 6, usage: 6 },
  // { date: 7, usage: 1 },
  {
    date: 4,
    usage: 2,
  },
  { date: 5, usage: 4 },
  { date: 6, usage: 6 },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
  const [confirmDelete, setConfirmDelete] = useState(false);

  // -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  // -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });
  // -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (
      lastMsg !== "" &&
      chatFlag == 2 &&
      props.data.UserId !== ActiveChatUser
    ) {
      setNot(true);
      toast.remove();
    }
  }, [lastMsg]);
  // -----------------------------------------------------------------------------------------------------
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

    const userMsg = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(props.data.UserId);
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
    dispatch(addActiveUser(props.data.UserId));
  }

  function deleteChatUser() {
    const user = firebase.auth().currentUser;
    var delRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(UserUid)
      .delete();
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {confirmDelete === true ? (
        <div className=" w-full md:w-[400px] lg:w-[400px] h-[100svh] top-0 left-0 fixed bg-[#17171a25] z-50 backdrop-blur-md flex justify-center items-center">
          <div
            className={
              " text-[15px] w-[320px]  h-auto p-[20px] rounded-3xl flex flex-col justify-center items-center " +
              (theme ? " bg-[#ffffff] text-black" : " bg-[#222228] text-white")
            }
          >
            <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
              <span className=" font-[google] font-light text-[22px] flex justify-start items-center text-[#bb2a23] ">
                <TbAlertTriangle className="text-[25px] text-[#bb2a23]" />{" "}
                &nbsp; Delete this Contact?
              </span>
            </div>

            <div
              className={
                "w-full mt-[10px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                (theme ? " text-[#343434] " : " text-[#b7b7b7]")
              }
            >
              <span className="  font-light ">
                All the chat's history and media with this contact will be
                deleted. Are you sure?
              </span>
            </div>
            <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
              <button
                className={
                  "w-auto h-auto  flex items-end bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                  (theme
                    ? " bg-[#e4eaf1] text-[#000000]"
                    : " bg-[#17171a] text-[#ffffff]")
                }
                onClick={() => {
                  setConfirmDelete(false);
                }}
              >
                Close
              </button>
              <button
                className="w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl"
                onClick={() => {
                  deleteChatUser();
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
      {ActiveChatUser === UserUid && UserUid != "" ? (
        <>
          <div
            className={
              "group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[75px] py-[10px] flex justify-center items-center   cursor-pointer   border-b-[1px]   " +
              (theme ? " border-[#d9dde1]" : " border-[#25262f]")
            }
          >
            <div
              className="group w-full h-[75px] py-[10px] flex justify-center items-center cursor-pointer  "
              onClick={() => {
                activerChatUser();
              }}
            >
              <div
                className={
                  "w-[45px] h-[45px]   rounded-[18px]" +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                onClick={() => props.setProfileZoom(photoURL)}
              >
                {photoURL === "nophoto" ? (
                  <img
                    src={profile2}
                    alt=""
                    className="w-full h-full rounded-[18px] object-cover "
                  ></img>
                ) : (
                  <img
                    src={photoURL}
                    alt=""
                    className="w-full h-full rounded-[18px] object-cover "
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-55px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
                <div className="w-full font-semibold flex h-[23px]">
                  <span
                    className={
                      "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  >
                    {userName}
                  </span>
                  <span
                    className={
                      "w-[70px] group-hover:mr-[25px] h-full text-[14px]  flex justify-end items-center font-light   font-[work] " +
                      (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                    }
                  >
                    {Time}
                  </span>
                </div>
                <div className="w-full flex h-[23px] justify-between items-center">
                  {lastMsg === "Image" ? (
                    <>
                      {chatFlag === 1 ? (
                        <>
                          <span
                            className={
                              "w-[35px] text-[14px]  whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work] " +
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
                          "w-[calc(100%-105px)] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
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
                              "w-[35px] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full font-[work] t" +
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
                          "w-[calc(100%-105px)] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
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
                              "w-[35px] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work] " +
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
                          "w-[calc(100%-105px)] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
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
                              "w-[30px] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full  font-[work] " +
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
                          "w-[calc(100%-70px)] text-[14px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      >
                        {!lastMsg ? (
                          <>Messages are end-to-end encrypted.</>
                        ) : (
                          <>{lastMsg}</>
                        )}
                      </span>
                    </>
                  )}
                  <span className="w-[70px] text-[14px] h-full font-normal   flex justify-end items-center">
                    {unreadMessages === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="w-[18px] h-[18px] text-[11px] font-[google] font-semibold flex justify-center items-center rounded-full bg-[#8981f7] text-[#ffffff]">
                          {unreadMessages}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <span
              className="group-hover:flex hidden justify-center items-start pt-[5px] h-full w-[20px] ml-[-20px] z-40"
              onClick={() => {
                deleteChatUser();
                setConfirmDelete(true);
              }}
            >
              <MdDelete
                className={
                  "text-[17px] " + (theme ? " text-[black]" : " text-[white]")
                }
              />
            </span>
          </div>
        </>
      ) : (
        <>
          <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 ">
            <div
              className={
                " group w-full h-[75px] py-[10px] border-b-[1px]  flex justify-center items-center bg-transparent  cursor-pointer   z-10  " +
                (theme ? " border-[#d9dde1]" : " border-[#25262f]")
              }
            >
              <div
                className={
                  "w-[45px] h-[45px]  rounded-[18px]" +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                onClick={() => props.setProfileZoom(photoURL)}
              >
                {photoURL === "nophoto" ? (
                  <img
                    src={profile2}
                    alt=""
                    className="w-full h-full rounded-[18px] object-cover "
                  ></img>
                ) : (
                  <img
                    src={photoURL}
                    alt=""
                    className="w-full h-full rounded-[18px] object-cover "
                  ></img>
                )}
              </div>
              <div
                className=" w-[calc(100%-55px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start"
                onClick={() => activerChatUser()}
              >
                <div className="w-full font-semibold flex h-[23px]">
                  <span
                    className={
                      "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-[google] font-normal " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  >
                    {userName}
                  </span>
                  <span
                    className={
                      "w-[70px] h-full group-hover:mr-[25px] text-[14px] flex justify-end items-center  font-[work] font-light z-50" +
                      (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                    }
                  >
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
                              "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work] " +
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
                          "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
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
                              "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
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
                          "mr-[5px]   " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full     font-[work] " +
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
                              "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
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
                          "mr-[5px] " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      />
                      <span
                        className={
                          "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
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
                              "w-[30px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
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
                          "w-[calc(100%-70px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                          (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                        }
                      >
                        {!lastMsg ? (
                          <>Messages are end-to-end encrypted.</>
                        ) : (
                          <>{lastMsg}</>
                        )}
                      </span>
                    </>
                  )}
                  <span className="w-[70px] text-[14px] h-full font-normal  flex justify-end items-center">
                    {unreadMessages === 0 ? (
                      <></>
                    ) : (
                      <>
                        <span className="w-[20px] h-[20px] text-[11px] font-[google] font-semibold flex justify-center items-center rounded-full bg-[#8981f7] text-[#ffffff]">
                          {unreadMessages}
                        </span>
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <span
              className="group-hover:flex hidden justify-center items-start pt-[5px] h-full w-[20px] ml-[-20px] z-40"
              onClick={() => {
                setConfirmDelete(true);
              }}
            >
              <MdDelete
                className={
                  "text-[17px] " + (theme ? " text-black" : " text-white")
                }
              />
            </span>
          </div>
        </>
      )}
    </>
  );
};

const SearchFriends = (props) => {
  const [userName, setUserName] = useState("");
  const [info, setInfo] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [isOnline, setIsOnline] = useState(false);
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
    // console.log("props.data.UserId");
    // console.log(props.data.UserId);
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
        // console.log("frinds");
      } else {
        // console.log("not frinds");
        tete.set({
          ChatHistory: [],
          LastUpdated: serverTimestamp(),
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
          ChatPassCode: "",
          ChatLock: false,
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
      // console.log(snapshot?.data()?.Online);
    });
  }

  return (
    <>
      <div className=" group w-[100%] h-[75px] px-[10px] md:px-[20px] lg:px-[20px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent ">
        <div
          className={
            "border-b-[1px] w-[100%] h-[75px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent   " +
            (theme ? " border-[#d9dde1]" : " border-[#25262f]")
          }
        >
          <div className="w-[13px] h-full  flex justify-end items-end pb-[4px] z-30">
            {isOnline === true ? (
              <div
                className={
                  "w-[12px] max-h-[12px] min-h-[12px] rounded-full flex justify-center items-center   z-30 " +
                  (theme ? "bg-[#e4eaf1] " : "bg-[#222228] ")
                }
                style={{ zIndex: "100" }}
              >
                <div
                  className={
                    "w-[8px] max-h-[8px] min-h-[8px] rounded-full  z-30" +
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
              "w-[45px] h-[45px] ml-[-13px]  rounded-[18px] " +
              (theme ? " bg-[#ffffff]" : " bg-[#222228]")
            }
            onClick={() => {
              props.setProfileZoom(photoURL);
            }}
            // style={{ zIndex: "10" }}
          >
            {photoURL === "nophoto" ? (
              <>
                <img
                  src={profile2}
                  className="w-full h-full rounded-[18px] object-cover  "
                ></img>
                {/* <div className="w-[12px] h-[12px] bg-[#ffffff] ml-[5px] mt-[-10px] rounded-full border-[2px] border-[#17171a] md:border-[#17171a] lg:border-[#17171a] z-50" style={{zIndex:"100"}}></div> */}
              </>
            ) : (
              <>
                <img
                  src={photoURL}
                  className="w-full h-full rounded-[18px] object-cover "
                ></img>
                {/* <div className="w-[12px] h-[12px] bg-[#ffffff] ml-[5px] mt-[-10px] rounded-full border-[2px] border-[#17171a] md:border-[#17171a] lg:border-[#17171a] z-50"></div> */}
              </>
            )}
          </div>
          <div
            className=" w-[calc(100%-55px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start"
            onClick={() => {
              props.setData("Chat");
              activerChatUser();
              addToFriendList();
              // setSearchFlag(false);
              // dispatch(toggleSendFlag(true));
            }}
          >
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
                  "w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                  (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                }
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.msg} */}
                {info}
              </span>
              <span className="w-[70px] text-[14px] h-full font-normal  flex justify-end items-center">
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
  const [groupImage, setGroupImage] = useState();
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
  const [totalDay, setTotalDay] = useState(0);
  const [totalHour, setTotalHour] = useState(0);
  const [serverDate, setServerDate] = useState(0);
  const [showTime, setShowTime] = useState(false);
  const [theme, setTheme] = useState(true);
  const [timer, setTimer] = useState(false);
  const [profileZoom, setProfileZoom] = useState("");
  const [confirmStatusDelete, setConfirmStatusDelete] = useState(false);
  const [timeoutId, setTimeoutId] = useState();
  const [subAlert, setSubAlert] = useState(false);
  const [subSuccess, setSubSuccess] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [bugAbout, setBugAbout] = useState("");
  const [reportBug, setReportBug] = useState(false);
  const [subModal, setSubModal] = useState(false);
  const [graph, setGraph] = useState(false);
  const [changeDpModal, setChangeDpModal] = useState(false);
  const [usageData, setUsageData] = useState();
  const [tempUsageData, setTempUsageData] = useState();
  const [showMonthFlag, setShowMonthFlag] = useState(false);
  const [showMonth, setShowMonth] = useState(0);
  // const [left, setRight] = useState(0);
  // addFriendList;
  // console.log("UserList");
  // console.log(UserList);

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
    // db.collection("Chat Record").doc(user.uid).update({server : serverTimestamp()})
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setOnHour(snapshot?.data()?.onTimeHour);
      setOnMin(snapshot?.data()?.onTimeMinute);
      setTheme(snapshot?.data()?.theme);
      setTotalDay(snapshot?.data()?.totalDay);
      setTotalHour(snapshot?.data()?.totalHour);
      setServerDate(snapshot?.data()?.server);
      setUsageData(snapshot?.data()?.UsageArray);
      // setTempUsageData(snapshot?.data()?.UsageArray);
    });
  }, []);

  useEffect(() => {
    setTempUsageData(usageData);
  }, [usageData]);

  useEffect(() => {
    const today = new Date();
    const date = today.getDate();
    const month = today.getMonth() + 1; // getMonth() returns 0-11, so we add 1
    const year = today.getFullYear();
    const user = firebase.auth().currentUser;
    if (serverDate !== 0) {
      let checkDate = generateDateMonthNumber();
      if (serverDate !== checkDate) {
        db.collection("Chat Record")
          .doc(user.uid)
          .update({
            server: checkDate,
            onTimeHour: 0,
            onTimeMinute: 0,
            totalDay: totalDay + 1,
            totalHour: totalHour + onHour * 60 + onMin,
          });

        db.collection("Chat Record")
          .doc(user.uid)
          .update({
            UsageArray: arrayUnion({
              month: month,
              date: date,
              year: year,
              usage: (onHour * 60 + onMin) / 60,
            }),
          });
      }
    }
  }, [serverDate, onMin]);

  function generateDateMonthNumber() {
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index
    let dateMonthNumber = parseInt(date.toString() + month.toString());

    return dateMonthNumber;
  }

  useEffect(() => {
    if (onHour >= 0 && onMin >= 0) {
      const user = firebase.auth().currentUser;
      clearTimeout(timeoutId);
      const id = setTimeout(() => {
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
      setTimeoutId(id);
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
      // console.log("Last Updated User Message");
      // console.log(snapshot.docs);
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
      // console.log("Last Updated User Message");
      // console.log(snapshot.docs);
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

  function searchUserFriendChangeWord() {
    let words = searchUser.split(" ");

    // Iterate through each word in the array
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first character of the word and make the rest lowercase
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    // Join the words back together into a single string
    // return words.join(" ");
    searchUserFriend(words.join(" "));
  }

  function searchUserFriend(nameString) {
    // console.log("USers--------");
    const UserRef = db.collection("Chat Record");

    const queryRef = UserRef.where("Name", "==", nameString);
    queryRef.get().then((data) => {
      // console.log(data.docs);
      // setSearchUserList(data.docs);
      dispatch(clearSearchFriendList());
      data.docs.forEach((userId) => {
        // console.log(userId.id);
        dispatch(addSearchFriendList({ UserId: userId.id }));
        // SearchUserList.push(userId.id);
      });
    });
  }

  function GroupProfileImage(e) {
    setGroupImage(e.target.files[0]);
  }

  const uploadGroupImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/group_image/${user.uid}/${user.uid}.${groupName}`
    );
    const myPromise = uploadGroupImageGetUrl(fileRef);
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

  const uploadGroupImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const amPM = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${amPM}`;

    var geturl = await uploadBytes(fileRef, groupImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        // console.log(url);
        setTempUrl(url);
        // const statusRef = db
        //   .collection("Chat Record")
        //   .doc(user.uid)
        //   .update({
        //     Status: arrayUnion({
        //       url: url,
        //       text: "",
        //     }),
        //     StTime: formattedTime,
        //   });
        geturl = url;
      });
      // console.log("Uploaded a blob or file!");
    });
    setGroupImage();
    return geturl;
  };

  useEffect(() => {
    if (groupImage) {
      uploadGroupImage();
    }
  }, [groupImage]);

  function createGroup() {
    const user = firebase.auth().currentUser;
    // console.log(user.uid);

    db.collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      .doc(groupName)
      .set({ Admin: true });
    db.collection("Groups")
      .doc(groupName)
      .set({
        ProfileURL: tempUrl,
        Description: groupDescription,
        Name: groupName,
        Member: [user.uid],
        MessageId: 0,
      });

    // const grpRef = db
    //   .collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Group")
    //   // .doc(user.uid)
    //   .doc(user.uid)
    //   .collection("GroupNames")
    //   .doc(groupName)
    //   .collection("Member")
    //   .doc(user.uid)
    //   // .doc(user.uid)
    //   .set({
    //     chat: "hello",
    //     // Description: groupDescription,
    //   });

    // const grp2Ref = db
    //   .collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Group")
    //   // .doc(user.uid)
    //   .doc(user.uid)
    //   .collection("GroupNames")
    //   .doc(groupName)
    //   // .doc(user.uid)
    //   .set({
    //     Description: groupDescription,
    //   });
  }

  function fetchAllGroups() {
    const user = firebase.auth().currentUser;
    // console.log(user.uid);
    const grpRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group");
    // .doc(user.uid);

    onSnapshot(grpRef, (snapshot) => {
      // console.log("Group Naemeeeee");
      // console.log(snapshot.docs);

      dispatch(clearAllGroup());
      snapshot.docs.forEach((name) => {
        // console.log("name---------------------------");
        // console.log(name?.id);
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
    db.collection("Chat Record")
      .doc(user.uid)
      .update({
        Status: "",
      })
      .then(() => {
        // console.log("Deleteddddddddddddd..............")
        // setShowAlert(true);
        setAlertMessage("Status Deleted");
      });
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setShowAlert(false);
  //     setAlertMessage("");
  //   }, 2000);
  // }, []);

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
        // console.log(url);
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
      // console.log("Uploaded a blob or file!");
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
    // console.log(e.target.files[0]);
    setTempProfileImage(e.target.files[0]);

    //  setImageLength(e.target.files.length);
  }

  // useEffect(() => {
  //   if (tempProfileImage) {
  //     uploadProfileImage();
  //   }
  // }, [tempProfileImage]);

  const uploadProfileImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    var geturl = await uploadBytes(fileRef, tempProfileImage).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          // console.log(url);
          db.collection("Chat Record").doc(user.uid).update({ Photo: url });

          geturl = url;
        });
        // console.log("Uploaded a blob or file!");
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

  function CamalCaseName() {
    let words = ownerName.split(" ");

    // Iterate through each word in the array
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first character of the word and make the rest lowercase
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }

    // Join the words back together into a single string
    // return words.join(" ");
    // searchUserFriend(words.join(" "));
    updateUserName(words.join(" "));
    setOwnerName(words.join(" "));
  }

  function updateUserInfo() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record").doc(user.uid).update({ Info: ownerInfo });
    toast.success("Name Changed");
  }
  function updateUserName(dataName) {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record").doc(user.uid).update({ Name: dataName });
    toast.success("Info Changed");
  }

  // function set

  function changeAccountStatus() {
    const user = firebase.auth().currentUser;
    db.collection("Chat Record")
      .doc(user.uid)
      .update({ AccountStatus: !accountStatus });
  }

  function deleteAccount() {
    const user = firebase.auth().currentUser;
    // console.log(user.uid);
    // console.log(UserUid);
    // var docRef = doc(db,"")
    var delRef = db.collection("Chat Record").doc(user.uid).delete();
    // deleteDoc(delRef).then(() => {
    //   console.log("chat deleted");
    // });
    // dispatch(addActiveUser(""));
  }

  function postBug() {
    const user = firebase.auth().currentUser;
    db.collection("Feedbacks")
      .doc("Bugs")
      .update({
        Bugs: arrayUnion({ Bugs: bugAbout, User: user.uid }),
      });

    setBugAbout("");
  }

  function filterByMonth() {
    return usageData?.filter((entry) => entry.month === showMonth);
  }

  useEffect(() => {
    if (showMonth !== 0) {
      setTempUsageData(filterByMonth());
    } else if (showMonth === 0) {
      setTempUsageData(usageData);
    }
  }, [showMonth]);

  return (
    <>
      {showAlert === true ? (
        <>
          <div
            className="fixed w-full h-[60px] top-[10px] z-50 flex justify-center items-center"
            style={{ transition: ".4s" }}
          >
            <div className="w-auto h-[60px] bg-slate-400">{alertMessage}</div>
          </div>
        </>
      ) : (
        <>
          <div
            className="fixed w-full h-[60px] top-[10px] z-50 flex justify-center items-center mt-[-80px]"
            style={{ transition: ".4s" }}
          >
            <div className="w-auto h-[60px] bg-slate-400">{alertMessage}</div>
          </div>
        </>
      )}
      <div className="w-[calc(100%-20px)] md:w-full lg:w-full  h-[calc(100%-140px)] flex flex-col items-end  pt-[0px] overflow-y-scroll">
        {searchFlag === true ? (
          <>
            {/* <div className="min-h-[70px] w-full  flex justify-center items-center"> */}
            {profileZoom.length === 0 ? (
              <div
                className={
                  "w-full h-[0] fixed z-50 right-0 top-0 flex justify-center items-center" +
                  (theme ? " bg-[#e4eaf16d]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {" "}
                {profileZoom === "nophoto" ? (
                  <img src={profile2} className="w-[0] h-[0] "></img>
                ) : (
                  <img src={profileZoom} className="w-[0] h-[0] "></img>
                )}
                {/* <img src={profileZoom} className="w-[0] h-[0] "></img> */}
              </div>
            ) : (
              <div
                className={
                  "w-full backdrop-blur-sm lg:w-[400px] md:w-[400px] lg:left-0 md:left-0 h-[100svh]  fixed z-50 right-0 top-0 flex justify-center items-center flex-col drop-shadow-md" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {profileZoom === "nophoto" ? (
                  <img
                    src={profile2}
                    className={
                      "w-[280px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                ) : (
                  <img
                    src={profileZoom}
                    className={
                      "w-[280px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                )}

                {/* <div className="w-[280px] h-[50px]  flex ">
              <div className="w-[140px] h-full flex justify-center items-center "><MdDelete  className="text-white text-[24px]"/></div>
              <div className="w-[140px] h-full flex justify-center items-center "><HiChatBubbleBottomCenterText className="text-white text-[24px]"/></div>
            </div> */}
              </div>
            )}
            <div
              className={
                " mt-[10px]   w-[100%] px-[0] md:px-[10px] lg:px-[10px] flex justify-end items-center h-[60px] pb-[10px]   overflow-hidden  " +
                (theme ? " bg-[#e4eaf1] " : " bg-[#17171a] ")
              }
            >
              <input
                style={{ transition: ".5s" }}
                value={searchUser}
                onKeyDown={(e) => {
                  if (
                    e.nativeEvent.key === "Enter" &&
                    searchUser.length !== 0
                  ) {
                    searchUserFriendChangeWord();
                    setSearchFlag(true);
                  }
                }}
                onChange={(e) => setSearchUser(e.target.value)}
                onClick={() => {
                  // setIsSearchBar(!isSearchBar);
                }}
                placeholder="Search Friends"
                className={
                  "input w-full h-[50px] opacity-100   font-[google] font-normal text-[15px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px] z-30  rounded-2xl " +
                  (theme
                    ? " text-[#000000] bg-[#ffffff] "
                    : " text-[#ffffff] bg-[#222228] ")
                }
              ></input>
              <div
                className="w-[50px] h-[50px] ml-[-50px]  rounded-full flex justify-center items-center   text-white cursor-pointer z-40"
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
                <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center z-40">
                  <RxCross2
                    className={
                      "text-[20px] z-[100] " +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  />
                </div>
              </div>
            </div>
            {/* </div> */}
            <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll">
              {SearchUserList.length === 0 ? (
                <>
                  <div
                    className={
                      " group w-full h-[100px] py-[10px] flex flex-col justify-center items-center cursor-pointer font-[google]   px-[10px]  " +
                      (theme ? " text-[black]" : " text-[white]")
                    }
                  >
                    <span className="h-[40px] flex justify-center items-center px-[15px] bg-[#8981f7] rounded-2xl text-black">
                      No Users Found
                    </span>
                    <span className="flex justify-center items-center mt-[10px] ">
                      <IoMdInformationCircle className="text-[24px] mr-[5px] " />{" "}
                      Try to search Full Name
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className=" w-full px-[10px] flex justify-end items-center h-[14px] font-[work] font-normal text-[15px]">
                    {SearchUserList.length} Results
                  </div>
                  {SearchUserList.map((friends) => {
                    return (
                      <SearchFriends
                        setData={props.setData}
                        data={friends}
                        setProfileZoom={setProfileZoom}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "All" ? (
          <>
            {profileZoom.length === 0 ? (
              <div
                className={
                  "w-full h-[0]  fixed z-50 right-0 top-0 flex justify-center items-center" +
                  (theme ? " bg-[#e4eaf16d]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {profileZoom === "nophoto" ? (
                  <img src={profile2} className="w-[0] h-[0] "></img>
                ) : (
                  <img src={profileZoom} className="w-[0] h-[0] "></img>
                )}
              </div>
            ) : (
              <div
                className={
                  "w-full backdrop-blur-sm lg:w-[400px] md:w-[400px] lg:left-0 md:left-0 h-[100svh] fixed z-50 right-0 top-0 flex justify-center items-center flex-col drop-shadow-md" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {profileZoom === "nophoto" ? (
                  <img
                    src={profile2}
                    className={
                      "w-[320px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                ) : (
                  <img
                    src={profileZoom}
                    className={
                      "w-[320px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                )}
                {/* <div className="w-[280px] h-[50px]  flex ">
              <div className="w-[140px] h-full flex justify-center items-center "><MdDelete  className="text-white text-[24px]"/></div>
              <div className="w-[140px] h-full flex justify-center items-center "><HiChatBubbleBottomCenterText className="text-white text-[24px]"/></div>
            </div> */}
              </div>
            )}

            <div
              className={
                " mt-[10px]   w-[100%] px-[0] md:px-[10px] lg:px-[10px] flex justify-end items-center min-h-[60px] pb-[10px]    overflow-hidden z-30 " +
                (theme ? " bg-[#e4eaf1] " : " bg-[#17171a] ")
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
                    searchUserFriendChangeWord();
                    setSearchFlag(true);
                  }
                }}
                onChange={(e) => setSearchUser(e.target.value)}
                onClick={() => {
                  // setIsSearchBar(!isSearchBar);
                }}
                placeholder="Search Friends"
                className={
                  "input w-full h-[50px] opacity-100   font-[google] font-normal text-[15px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px] z-30  rounded-2xl " +
                  (theme
                    ? " text-[#000000] bg-[#ffffff] "
                    : " text-[#ffffff] bg-[#222228] ")
                }
              ></input>
              <div
                className="w-[50px] h-[50px] ml-[-50px]  rounded-full flex justify-center items-center    text-white cursor-pointer z-40"
                onClick={() => {
                  // if (searchUser.length !== 0) {
                  //   searchUserFriend();
                  //   setSearchFlag(true);
                  // }
                  setSearchUser("");
                  setIsSearchBar(false);
                }}
              >
                <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center z-40">
                  {searchUser.length === 0 ? (
                    <></>
                  ) : (
                    <>
                      <RxCross2
                        className={
                          "text-[20px] " +
                          (theme ? " text-[black]" : " text-[white]")
                        }
                      />
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* </div> */}
            <div className="borr w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden mr-0 text-[#8981f7]">
              {AllUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#8981f7] ">
                    <span>No Users Yet</span>
                  </div>
                </>
              ) : (
                <>
                  {AllUserList?.map((friends) => {
                    return (
                      <SearchFriends
                        setData={props.setData}
                        data={friends}
                        setProfileZoom={setProfileZoom}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "Chat" ? (
          <>
            {profileZoom.length === 0 ? (
              <div
                className={
                  "w-full h-[0] fixed z-50 right-0 top-0 flex justify-center items-center" +
                  (theme ? " bg-[#e4eaf16d]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {profileZoom === "nophoto" ? (
                  <img src={profile2} className="w-[0] h-[0] "></img>
                ) : (
                  <img src={profileZoom} className="w-[0] h-[0] "></img>
                )}
              </div>
            ) : (
              <div
                className={
                  "w-full backdrop-blur-sm lg:w-[400px] md:w-[400px] lg:left-0 md:left-0 h-[100svh] fixed z-50 right-0 top-0 flex justify-center items-center flex-col drop-shadow-md" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  setProfileZoom("");
                }}
              >
                {profileZoom === "nophoto" ? (
                  <img
                    src={profile2}
                    className={
                      "w-[320px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                ) : (
                  <img
                    src={profileZoom}
                    className={
                      "w-[320px] rounded-3xl aspect-square object-cover " +
                      (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                    }
                  ></img>
                )}
                {/* <div className="w-[280px] h-[50px]  flex ">
              <div className="w-[140px] h-full flex justify-center items-center "><MdDelete  className="text-white text-[24px]"/></div>
              <div className="w-[140px] h-full flex justify-center items-center "><HiChatBubbleBottomCenterText className="text-white text-[24px]"/></div>
            </div> */}
              </div>
            )}
            <div className="w-full lg:w-full md:w-full h-[(100%-110px)] ">
              {UserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#8981f7] ">
                    <span>No Friends Made Yet</span>
                  </div>
                </>
              ) : (
                <>
                  {UserList?.map((friends) => {
                    return (
                      <Friends data={friends} setProfileZoom={setProfileZoom} />
                    );
                  })}
                </>
              )}
            </div>
          </>
        ) : props.data === "Group" ? (
          <>
            {groupModal === true ? (
              <div
                className={
                  "fixed  bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px]  w-[40px] h-[40px] z-30 rounded-full   flex justify-center items-center rotate-[135deg] cursor-pointer " +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#17171a] text-[white]")
                }
                onClick={() => {
                  setGroupModal(!groupModal);
                }}
                style={{ transition: ".4s" }}
              >
                <FaPlus className="text-[20px]" />
              </div>
            ) : (
              <div
                className={
                  "fixed  bottom-[90px] w-[40px] h-[40px] z-30  mr-[10px] md:mr-[20px] lg:mr-[20px]  rounded-full flex justify-center items-center  cursor-pointer" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#17171a] text-[white]")
                }
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
                className={
                  "w-full md:w-[400px] lg:w-[400px] left-0 top-0 fixed backdrop-blur-md flex justify-center items-center z-50 h-[100svh]" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
              >
                <div
                  className={
                    "px-[24px] h-auto p-[20px] rounded-3xl w-[320px]  flex flex-col justify-center items-center z-50" +
                    (theme
                      ? " bg-[#ffffff] text-black"
                      : " bg-[#222228] text-white")
                  }
                  style={{ transition: ".4s" }}
                >
                  {subModal === true ? (
                    <>
                      <div
                        className={
                          "group w-[110px] h-[110px] rounded-full flex  justify-center items-center " +
                          (theme
                            ? " bg-[#e4eaf1] text-black"
                            : " bg-[#17171a] text-white")
                        }
                      >
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
                          onChange={(e) => GroupProfileImage(e)}
                          accept="image/*"
                        ></input>
                        <label
                          className="group-hover:opacity-100 opacity-0 cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#000000a9] text-white z-20"
                          for="groupDp"
                        >
                          <BsCameraFill className="text-[17px]" />
                        </label>
                      </div>

                      <div className=" h-auto w-full mt-[20px] flex justify-end items-center  rounded-xl text-[14px]">
                        <button
                          className={
                            "w-auto h-auto  flex items-end bg-transparent  text-[14px]  cursor-pointer  font-[google] font-light   rounded-2xl" +
                            (theme
                              ? " bg-[#e4eaf1] text-[#000000]"
                              : " bg-[#17171a] text-[#ffffff]")
                          }
                          onClick={() => {
                            // console.log("clicked");
                            setSubModal(false);
                          }}
                        >
                          Back
                        </button>

                        {tempUrl.length === 0 ? (
                          <button className="w-auto flex items-end text-[14px] ml-[30px] h-auto text-[#c9c5ff]   cursor-pointer  font-[google] font-light  rounded-2xl ">
                            {/* <img src={tick} className="w-full"></img> */}
                            Create
                          </button>
                        ) : (
                          <div
                            className="w-auto flex items-end text-[14px] ml-[30px] h-auto text-[#655fc7]   cursor-pointer  font-[google] font-light  rounded-2xl "
                            onClick={() => {
                              createGroup();
                              setGroupModal(false);
                              setGroupDescription("");
                              setGroupName("");
                              setSubModal(false);
                              setTempUrl("");
                            }}
                          >
                            Create
                            {/* <img src={tick} className="w-full"></img> */}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-full  flex flex-col justify-center items-center">
                        {groupName?.length === 0 ? (
                          <label
                            className={
                              " font-[google] font-normal text-[14px]  w-full flex justify-start items-center h-[30px] mb-[-30px]" +
                              (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                            }
                            style={{ transition: ".3s" }}
                          >
                            Group Name
                          </label>
                        ) : (
                          <label
                            className={
                              " font-[google] font-normal text-[12px]  w-full flex justify-start items-center h-[30px] mb-[-11px]" +
                              (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                            }
                            style={{ transition: ".3s" }}
                          >
                            Group Name
                          </label>
                        )}
                        <input
                          value={groupName}
                          onChange={(e) => {
                            setGroupName(e.target.value);
                          }}
                          className={
                            " input border-b-[1.5px]  h-[30px] w-full  font-[google] tracking-[.4px] font-normal text-[15px]   bg-transparent outline-none" +
                            (theme
                              ? " border-[#606060] text-black"
                              : " border-[#b1b1b1] text-white")
                          }
                          // placeholder="Group Name"
                        ></input>
                        {groupDescription?.length === 0 ? (
                          <label
                            className={
                              " mt-[15px] font-[google] font-normal text-[14px]  w-full flex justify-start items-center h-[30px] mb-[-30px]" +
                              (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                            }
                            style={{ transition: ".3s" }}
                          >
                            Group Description
                          </label>
                        ) : (
                          <label
                            className={
                              " mt-[15px] font-[google] font-normal text-[12px]  w-full flex justify-start items-center h-[30px] mb-[-11px]" +
                              (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                            }
                            style={{ transition: ".3s" }}
                          >
                            Group Description
                          </label>
                        )}
                        <input
                          value={groupDescription}
                          onChange={(e) => {
                            setGroupDescription(e.target.value);
                          }}
                          className={
                            " input border-b-[1.5px]  h-[30px] w-full   flex justify-start items-start font-[google] tracking-[.4px] font-normal text-[15px]  bg-transparent outline-none" +
                            (theme
                              ? " border-[#606060] text-black"
                              : " border-[#b1b1b1] text-white")
                          }
                          // placeholder="Group Descritption"
                        ></input>

                        <div className=" h-auto w-full mt-[20px] flex justify-end items-center  rounded-xl text-[14px]">
                          <button
                            className={
                              "w-auto h-auto  flex items-end bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                              (theme
                                ? " bg-[#e4eaf1] text-[#000000]"
                                : " bg-[#17171a] text-[#ffffff]")
                            }
                            onClick={() => {
                              // console.log("clicked");
                              setGroupName("");
                              setGroupDescription("");
                              setGroupModal(false);
                              setTempUrl("");
                            }}
                          >
                            Close
                          </button>
                          <button
                            className={
                              "w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl" +
                              (groupName.length === 0
                                ? " text-[#c5c9ff]"
                                : " text-[#655fc7]")
                            }
                            onClick={() => {
                              // console.log("clicked");
                              // exitGroup();
                              if (groupName.length !== 0) {
                                setSubModal(true);
                              }
                            }}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
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
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[#8981f7] ">
                  <span>No Groups Formed Yet</span>
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
            {confirmStatusDelete === true ? (
              <div
                className={
                  "fixed  w-full lg:w-[400px] md:w-[400px]  h-[100svh]  flex justify-center items-center    backdrop-blur-md top-[0px] left-0" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
                style={{ zIndex: "100" }}
                onClick={() => {
                  // console.log("clicked");
                  // setDelConfirmation(false);
                }}
              >
                <div
                  className={
                    " text-[15px] w-[320px] p-[20px] rounded-3xl flex flex-col justify-center items-center " +
                    (theme
                      ? " bg-[#ffffff] text-black"
                      : " bg-[#222228] text-white") +
                    (subAlert ? " h-[70px]" : " h-[171px]")
                  }
                  style={{ transition: ".3s" }}
                >
                  {/* {subAlert === false ? (
                    <> */}
                  <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
                    <span className=" font-[google] font-medium text-[22px] flex justify-start items-center text-[#bb2a23] ">
                      <TbAlertTriangle className="text-[25px] text-[#bb2a23]" />{" "}
                      &nbsp; Delete all Status?
                    </span>
                  </div>
                  <div
                    className={
                      "w-full mt-[10px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                      (theme ? " text-[#343434]" : " text-[#b7b7b7]")
                    }
                  >
                    <span className="  font-light ">
                      Once deleted none will be able to see the status. Are you
                      sure?
                    </span>
                  </div>
                  <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
                    <button
                      className={
                        "w-auto h-auto flex items-end  bg-transparent  cursor-pointer  font-[google] font-light   rounded-2xl" +
                        (theme
                          ? " bg-[#e4eaf1] text-[#000000]"
                          : " bg-[#17171a] text-[#ffffff]")
                      }
                      onClick={() => {
                        // console.log("clicked");
                        // setDelConfirmation(false);
                        setConfirmStatusDelete(false);
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="w-auto h-auto flex items-end ml-[30px] text-[#bb2a23]   cursor-pointer  font-[google] font-light   rounded-2xl"
                      onClick={() => {
                        // console.log("clicked");
                        // setDelConfirmation(false);
                        // deleteChats();
                        // setSubAlert(true);
                        // setShowAlert(true);
                        // setTimeout(() => {
                        //   setShowAlert(false);
                        //   setAlertMessage("");
                        //   setTimeout(() => {
                        //     // setShowAlert(false);
                        //     setSubAlert(false);
                        //     // setAlertMessage("");
                        //     setConfirmStatusDelete(false);
                        //   }, 1000);
                        // }, 1000);
                        deleteStatus();
                        setConfirmStatusDelete(false);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {/* </>
                  ) : (
                    <>
                      {showAlert === true ? (
                        <>
                          <span class="loaderDel"></span>
                        </>
                      ) : (
                        <>
                          <span className=" font-[google] font-medium text-[18px] flex justify-start items-center text-[#bb2a23] ">
                            <FaCheckCircle className="text-[20px] mr-[10px]" />
                            Deleted Successfully
                          </span>
                        </>
                      )}
                    </>
                  )} */}

                  {/* <FaCheckCircle className="text-[38px] mr-[10px] text-[#bb2a23]" /> */}
                </div>
              </div>
            ) : (
              <></>
            )}
            {showStatus === true ? (
              // <div className="fixed">
              <div
                className={
                  " z-50 fixed bottom-0 h-[100svh] w-full md:w-[400px] lg:w-[400px] left-0 flex-col flex justify-center items-center" +
                  (theme
                    ? " bg-[#e4eaf1]  md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                    : " bg-[#17171a]  md:bg-[#17171a] lg:bg-[#17171a]")
                }
              >
                {/* Cross ------------------------- */}
                <div
                  className={
                    "fixed top-[25px] left-[calc(100%-55px)] md:left-[calc(400px-55px)]  lg:left-[calc(400px-55px)]  w-[35px] h-[35px]  rounded-full  drop-shadow-none flex justify-center items-center  cursor-pointer rotate-45 z-40" +
                    (theme
                      ? " bg-[#17171a] text-white"
                      : " bg-[white] text-black")
                  }
                  onClick={() => {
                    setShowStatus(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>
                {/* Profile ---------------------- */}
                <div
                  className={
                    " group w-full md:w-[400px]  lg:w-[400px] h-[90px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal  px-[20px]    fixed top-0  drop-shadow-none" +
                    (theme
                      ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                      : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
                  }
                  onClick={() => {
                    // setShowStatus(true);
                  }}
                >
                  <div className="w-[53px] h-[53px]  border-[2.2px] border-transparent rounded-[22.2px]  flex justify-center items-center z-10">
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-[45px] h-[45px] rounded-[18px] object-cover z-10 "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-[45px] h-[45px] rounded-[18px] object-cover z-10 "
                      ></img>
                    )}
                    {/* <div
                      className={
                        "w-[45px] h-[45px] rounded-[19.5px] fixed z-0" +
                        (theme
                          ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                          : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
                      }
                    ></div> */}
                  </div>
                  <div className="w-[calc(100%-65px)] h-[50px] ml-[15px] bg-transparent  flex flex-col justify-center items-start ">
                    <div className="w-full font-semibold flex h-[23px]">
                      <span
                        className={
                          "w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                          (theme ? "  text-black" : "  text-white")
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
                        className={
                          "fixed w-[26px] h-[46px] rounded-full cursor-pointer flex justify-center items-center left-0" +
                          (theme
                            ? " bg-[#17171a] text-white"
                            : " bg-[white] text-black")
                        }
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
                        className={
                          "fixed w-[26px] h-[46px] rounded-full cursor-pointer flex justify-center items-center right-0" +
                          (theme
                            ? " bg-[#17171a] text-white"
                            : " bg-[white] text-black")
                        }
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
                              (theme ? "  text-black" : "  text-white")
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
                                className={
                                  "w-[8px] mx-[2px] h-[4px]  rounded-full" +
                                  (theme
                                    ? " bg-[#17171a] text-white"
                                    : " bg-[white] text-black")
                                }
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
                  className={
                    "fixed z-20 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full   flex justify-center items-center rotate-[135deg] cursor-pointer" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "fixed z-20 opacity-100 bottom-[90px] mr-[60px] md:mr-[70px] lg:mr-[70px] w-[40px] h-[40px]  rounded-full  flex justify-center items-center  cursor-pointer" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "fixed  opacity-100 bottom-[140px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full  flex justify-center items-center  cursor-pointer z-40" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "fixed z-30 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full   flex justify-center items-center  cursor-pointer" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "fixed z-20 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]  rounded-full flex justify-center items-center  cursor-pointer" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
                  // onClick={() => {
                  //   setStatusModal(!statusModal);
                  // }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  <BsCameraFill className="text-[17px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className={
                    "fixed z-10 opacity-0 bottom-[90px] mr-[10px] md:mr-[20px] lg:mr-[20px] w-[40px] h-[40px]   rounded-full  flex justify-center items-center  cursor-pointer" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "h-[120px] resize-none py-[10px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bottom-[140px] fixed mr-[10px] md:mr-[20px] lg:mr-[20px] opacity-100  rounded-2xl outline-none px-[20px] font-[google] font-normal text-[15px]  input z-30" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    "h-[40px] resize-none py-[10px] w-0 bottom-[140px] fixed opacity-0  rounded-2xl mr-[10px] md:mr-[20px] lg:mr-[20px] outline-none px-[20px] font-[google] font-normal text-[15px]  input" +
                    (theme
                      ? " text-[black] bg-[white]"
                      : " text-[white] bg-[#282828] md:bg-[#282828] lg:bg-[#282828]")
                  }
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
                  className={
                    " group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px]  flex justify-center items-center bg-transparent  cursor-pointer   z-10 select-none" +
                    (theme ? " border-[#dde1e7]" : " border-[#212129] ")
                  }
                >
                  <div
                    className="w-[53px] h-[53px]  border-[2.2px] border-[#8981f7] rounded-[22.2px] flex justify-center items-center  z-10"
                    onClick={() => {
                      setShowStatus(true);
                    }}
                  >
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-[45px] h-[45px] rounded-[18px] object-cover z-10 "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-[45px] h-[45px] rounded-[18px] object-cover z-10 "
                      ></img>
                    )}
                    {/* <div
                      className={
                        "w-[53.2px] h-[53.2px] rounded-[20px] fixed z-0" +
                        (theme
                          ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                          : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
                      }
                    ></div> */}
                  </div>
                  <div
                    className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex justify-center items-start z-50"
                    style={{ zIndex: "999" }}
                  >
                    <div
                      className="w-[calc(100%-70px)] font-semibold flex flex-col  h-full"
                      onClick={() => {
                        setShowStatus(true);
                      }}
                    >
                      <span
                        className={
                          "w-full text-[16px] h-[50%] flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                          (theme ? "  text-black" : "  text-white")
                        }
                      >
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
                        // deleteStatus();
                        setConfirmStatusDelete(true);
                        setShowStatus(false);
                        // console.log("clicked");
                      }}
                    >
                      <MdDelete
                        className={
                          "text-[20px] " +
                          (theme ? "  text-[#17171a]" : "  text-white")
                        }
                      />
                    </div>
                    {/* <span className="text-[15px]">Hello! How Are you</span> */}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className={
                  " group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-start items-center cursor-pointer font-[google] font-normal  px-[10px]  md:px-[20px] lg:px-[20px]   border-b-[1px] " +
                  (theme ? " border-[#dde1e7]" : " border-[#212129] ")
                }
              >
                <div className="w-[59px] h-[59px] border-[2.4px] border-transparent rounded-[20px]">
                  {profileURL === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-[20px] object-cover "
                    ></img>
                  ) : (
                    <img
                      src={profileURL}
                      className="w-full h-full rounded-[20px] object-cover "
                    ></img>
                  )}
                </div>
                <div
                  className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex justify-center items-start "
                  // style={{ zIndex: "999" }}
                >
                  <div className="w-[calc(100%-70px)] font-semibold flex flex-col h-full">
                    <span
                      className={
                        "w-full text-[16px] h-[50%]   flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                        (theme ? " text-black" : " text-white")
                      }
                    >
                      {/* {props.data.user} */}
                      {/* {ownerName} */}
                      My Status
                    </span>
                    <span className="w-full  h-[50%]  flex justify-start  items-center   text-[15px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#767a7d]   font-[work] font-normal">
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
            {changeDpModal === true ? (
              <>
                <div
                  className={
                    " w-full lg:w-[400px] md:w-[400px] h-[100svh] top-0 left-0 fixed  z-50 backdrop-blur-md flex justify-center items-center" +
                    (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                  }
                  style={{ zIndex: "999" }}
                >
                  <div
                    className={
                      " text-[15px] w-[320px]  h-auto p-[20px] rounded-3xl flex flex-col justify-center items-center " +
                      (theme
                        ? " bg-[#ffffff] text-black"
                        : " bg-[#222228] text-white")
                    }
                  >
                    <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
                      <span className=" font-[google] font-light text-[22px] flex justify-start items-center ">
                        <BsFillCameraFill className="text-[25px] " /> &nbsp;
                        Choose any Photo
                      </span>
                    </div>

                    <label
                      for="getFile"
                      className={
                        "w-full mt-[20px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                        (theme ? " text-[#343434] " : " text-[#b7b7b7]")
                      }
                    >
                      <div
                        className={
                          "w-[60px] h-[60px] rounded-2xl border-[2px]  flex justify-center items-center cursor-pointer" +
                          (theme ? " border-[#e4eaf1]" : " border-[#878787]")
                        }
                      >
                        {tempProfileImage === undefined ? (
                          <MdOutlineAdd
                            className={
                              "text-[25px]" +
                              (theme ? " text-[#e4eaf1]" : " text-[#878787]")
                            }
                          />
                        ) : (
                          <div
                            className={
                              "w-[25px] h-[25px] flex justify-center items-center text-[14px] rounded-full " +
                              (theme
                                ? " bg-[#e4eaf1] text-black"
                                : " bg-[#878787] text-white")
                            }
                          >
                            1
                          </div>
                        )}
                      </div>
                    </label>

                    <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
                      <button
                        className={
                          "w-auto h-auto  flex items-end bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                          (theme
                            ? " bg-[#e4eaf1] text-[#000000]"
                            : " bg-[#17171a] text-[#ffffff]")
                        }
                        onClick={() => {
                          // console.log("clicked");

                          setTempProfileImage();
                          setChangeDpModal(false);
                        }}
                      >
                        Close
                      </button>

                      <button
                        className={
                          "w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl" +
                          (tempProfileImage === undefined
                            ? " text-[#c9c5ff]"
                            : " text-[#655fc7]")
                        }
                        onClick={() => {
                          // console.log("clicked");

                          if (tempProfileImage !== undefined) {
                            uploadProfileImage();

                            setChangeDpModal(false);
                            setTempProfileImage();
                          }
                        }}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {reportBug === true ? (
              <>
                <div
                  className=" w-full lg:w-[400px] md:w-[400px] h-[100svh] top-0 left-0 fixed bg-[#17171a25] z-50 backdrop-blur-md flex justify-center items-center"
                  style={{ zIndex: "99" }}
                >
                  <div
                    className={
                      " text-[15px] w-[320px]  h-auto p-[20px] rounded-3xl flex flex-col justify-center items-center " +
                      (theme
                        ? " bg-[#ffffff] text-black"
                        : " bg-[#222228] text-white")
                    }
                  >
                    <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
                      <span className=" font-[google] font-light text-[22px] flex justify-start items-center text-[#bb2a23] ">
                        <MdBugReport className="text-[25px] text-[#bb2a23]" />{" "}
                        &nbsp; Report Bug Form
                      </span>
                    </div>

                    <div
                      className={
                        "w-full mt-[10px] rounded-xl font-[google]  flex justify-start items-center px-[6px]" +
                        (theme ? " text-[#343434] " : " text-[#b7b7b7]")
                      }
                    >
                      <span className="  font-light ">
                        Feddback / Explain about Bug *
                      </span>
                    </div>
                    <textarea
                      placeholder="Feedback"
                      value={bugAbout}
                      onChange={(e) => {
                        setBugAbout(e.target.value);
                      }}
                      className={
                        "log w-[calc(100%-12px)] mt-[10px] rounded-xl font-[google]  flex justify-start items-center font-normal resize-none h-[100px] outline-none p-[10px]" +
                        (theme ? " bg-[#e4eaf1] " : " bg-[#17171a]")
                      }
                    />
                    <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
                      <button
                        className={
                          "w-auto h-auto  flex items-end bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                          (theme
                            ? " bg-[#e4eaf1] text-[#000000]"
                            : " bg-[#17171a] text-[#ffffff]")
                        }
                        onClick={() => {
                          // console.log("clicked");
                          setReportBug(false);
                        }}
                      >
                        Close
                      </button>
                      <button
                        className="w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl"
                        onClick={() => {
                          // console.log("clicked");
                          // exitGroup();
                          postBug();

                          setReportBug(false);
                        }}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {graph ? (
              <div
                className={
                  "w-full md:w-[400px] lg:w-[400px] h-[100svh] fixed top-0 left-0 flex justify-center items-center backdrop-blur-md z-50" +
                  (theme ? " bg-[#e4eaf125]" : " bg-[#17171a25]")
                }
                // onClick={() => {
                //   // deleteStatus();
                //   setGraph(false);
                // }}
              >
                <div
                  className={
                    "w-[320px] h-auto p-[20px] px-[20px] rounded-3xl flex flex-col justify-center items-center" +
                    (theme ? " bg-[white]" : " bg-[#282828]")
                  }
                >
                  <div
                    className={
                      "text-[21px]  font-[google] mb-[10px] w-full flex justify-start items-center whitespace-nowrap" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    {showMonth === 0 ? (
                      <>Showing Last 7 Days</>
                    ) : (
                      <>
                        Showing Month{" "}
                        <span className="ml-[7px] text-[#655fc7]">
                          {monthNames[showMonth - 1]}
                        </span>{" "}
                        <div
                          className={
                            "w-[25px] h-[25px] flex justify-center items-center rounded-full ml-[10px] " +
                            (theme ? " bg-[#c9c5ff]" : " bg-[#655fc7]")
                          }
                          onClick={() => {
                            setShowMonth(0);
                            // setShowMonth(0)
                          }}
                        >
                          <RxCross2
                            className={
                              " text-[18px]" +
                              (theme ? " text-black" : " text-white")
                            }
                          />
                        </div>{" "}
                      </>
                    )}
                  </div>
                  <div
                    className={
                      "text-[14px]  font-[google] mb-[10px] w-full flex justify-start items-center" +
                      (theme ? " text-black" : " text-white")
                    }
                    onClick={() => {
                      setShowMonthFlag(!showMonthFlag);
                      // setShowMonth(0)
                    }}
                  >
                    <IoChevronDownOutline
                      className={
                        "text-[18px] mr-[5px] " +
                        (showMonthFlag ? " rotate-180" : " rotate-0")
                      }
                      style={{ transition: ".4s" }}
                    />{" "}
                    Choose Month
                  </div>
                  {showMonthFlag ? (
                    <>
                      <div
                        className={
                          "w-[280px] rounded-2xl h-[120px]  flex justify-center items-center font-[google] font-normal mb-[15px] text-[14px]" +
                          (theme
                            ? " bg-[#e4eaf1] text-black"
                            : " bg-[#17171a] text-white")
                        }
                        style={{ transition: ".4s" }}
                      >
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".4s",
                            }}
                            onClick={() => {
                              setShowMonth(1);
                              setShowMonthFlag(false);
                            }}
                          >
                            Jan
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".7s",
                            }}
                            onClick={() => {
                              setShowMonth(2);
                              setShowMonthFlag(false);
                            }}
                          >
                            Feb
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{ transition: ".3s", transitionDelay: "1s" }}
                            onClick={() => {
                              setShowMonth(3);
                              setShowMonthFlag(false);
                            }}
                          >
                            Mar
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: "1.3s",
                            }}
                            onClick={() => {
                              setShowMonth(4);
                              setShowMonthFlag(false);
                            }}
                          >
                            Apr
                          </div>
                        </div>
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".5s",
                            }}
                            onClick={() => {
                              setShowMonth(5);
                              setShowMonthFlag(false);
                            }}
                          >
                            May
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".8s",
                            }}
                            onClick={() => {
                              setShowMonth(6);
                              setShowMonthFlag(false);
                            }}
                          >
                            June
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: "1.1s",
                            }}
                            onClick={() => {
                              setShowMonth(7);
                              setShowMonthFlag(false);
                            }}
                          >
                            July
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: "1.4s",
                            }}
                            onClick={() => {
                              setShowMonth(8);
                              setShowMonthFlag(false);
                            }}
                          >
                            Aug
                          </div>
                        </div>
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".6s",
                            }}
                            onClick={() => {
                              setShowMonth(9);
                              setShowMonthFlag(false);
                            }}
                          >
                            Sep
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: ".9s",
                            }}
                            onClick={() => {
                              setShowMonth(10);
                              setShowMonthFlag(false);
                            }}
                          >
                            Oct
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: "1.2s",
                            }}
                            onClick={() => {
                              setShowMonth(11);
                              setShowMonthFlag(false);
                            }}
                          >
                            Nov
                          </div>
                          <div
                            className="w-full h-[30px] flex justify-center items-center cursor-pointer"
                            style={{
                              transition: ".3s",
                              transitionDelay: "1.5s",
                            }}
                            onClick={() => {
                              setShowMonth(12);
                              setShowMonthFlag(false);
                            }}
                          >
                            Dec
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={
                          "w-[280px] rounded-2xl h-[0px] overflow-hidden  flex justify-center items-center font-[google] font-normal text-[14px]" +
                          (theme
                            ? " bg-[#e4eaf1] text-black"
                            : " bg-[#17171a] text-white")
                        }
                        style={{ transition: ".4s" }}
                      >
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Jan
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Feb
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Mar
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Apr
                          </div>
                        </div>
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            May
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            June
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            July
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Aug
                          </div>
                        </div>
                        <div className="w-[calc(100%/3)] h-full flex flex-col justify-center items-center">
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Sep
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Oct
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Nov
                          </div>
                          <div className="w-full h-[30px] flex justify-center items-center opacity-0">
                            Dec
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div
                    className={
                      "w-full h-[115px] text-[14px]   flex flex-col justify-center items-center whitespace-nowrap  rounded-2xl" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    <div className="w-full h-full flex justify-center items-center">
                      {tempUsageData?.length === 0 || !tempUsageData ? (
                        <>
                          <span className="font-[google] font-normal text-[17px] ">
                            No Data to Show
                          </span>
                        </>
                      ) : (
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            width={730}
                            height={250}
                            data={tempUsageData}
                            // fontSize="16"
                          >
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
                                  stopColor="#8981f7"
                                  stopOpacity={0.6}
                                />
                                <stop
                                  offset="100%"
                                  stopColor="#8981f7"
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            {/* <XAxis style={{ fontSize: "10px" }} dataKey="date"/>
                            <YAxis  style={{ fontSize: "10px" }}/> */}
                            <Tooltip content={<CustomTooltip />} />

                            <Area
                              type="natural"
                              dataKey="usage"
                              stroke="#8981f7"
                              fillOpacity={1}
                              fill="url(#colorAvg)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      )}
                    </div>
                  </div>
                  <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
                    <button
                      className={
                        "w-auto h-auto  flex items-end bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                        (theme
                          ? " bg-[#e4eaf1] text-[#000000]"
                          : " bg-[#17171a] text-[#ffffff]")
                      }
                      onClick={() => {
                        // console.log("clicked");
                        setGraph(false);
                        setShowMonth(0);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {timer ? (
              <div
                className={
                  "w-full md:w-[400px] lg:w-[400px] h-[100svh] fixed top-0 left-0 flex justify-center items-center backdrop-blur-md z-50" +
                  (theme ? " bg-[#e4eaf125]" : " bg-[#17171a25]")
                }
                onClick={() => {
                  // deleteStatus();
                  setTimer(false);
                }}
              >
                <div
                  className={
                    "w-[320px] h-[350px] rounded-3xl flex flex-col justify-center items-center" +
                    (theme ? " bg-[white]" : " bg-[#282828]")
                  }
                >
                  <div
                    className={
                      "text-[21px] h-[45px] font-[google] mb-[10px]" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    Today's Usage
                  </div>
                  <div
                    className={
                      "fixed font-[google]   " +
                      (theme ? " text-black" : " text-white")
                    }
                    style={{ zIndex: "100" }}
                  >
                    <span className="text-[30px]">
                      {onHour < 10 ? <>0{onHour}</> : <>{onHour}</>}
                    </span>
                    h{" "}
                    <span className="text-[30px]">
                      {onMin < 10 ? <>0{onMin}</> : <>{onMin}</>}
                    </span>
                    m
                  </div>
                  <div className="w-[150px] h-[150px] text-0">
                    {onHour * 60 + onMin > 600 ? (
                      <>
                        {theme ? (
                          <Flat
                            progress={onHour * 60 + onMin}
                            range={{ from: 0, to: 1440 }}
                            //  sign={{ value: '%', position: 'end' }}
                            //  text={''}
                            showMiniCircle={true}
                            showValue={false}
                            sx={{
                              strokeColor: "#ff653b",
                              barWidth: 2.6,
                              bgStrokeColor: "#c2c2c2",
                              bgColor: { value: "#ffffff", transparency: "99" },
                              shape: "threequarters",
                              strokeLinecap: "round",
                              valueSize: 13,
                              valueWeight: "bold",
                              valueColor: "#000000",
                              valueFamily: "Trebuchet MS",
                              textSize: 3,
                              textWeight: "bold",
                              textColor: "#000000",
                              textFamily: "Trebuchet MS",
                              loadingTime: 1000,
                              miniCircleColor: "#ff653b",
                              miniCircleSize: 3,
                              valueAnimation: true,
                              intersectionEnabled: true,
                            }}
                          />
                        ) : (
                          <Flat
                            progress={onHour * 60 + onMin}
                            range={{ from: 0, to: 1440 }}
                            //  sign={{ value: '%', position: 'end' }}
                            //  text={''}
                            showMiniCircle={true}
                            showValue={false}
                            sx={{
                              strokeColor: "#ff653b",
                              barWidth: 2.6,
                              bgStrokeColor: "#47474d",
                              bgColor: { value: "#282828", transparency: "99" },
                              shape: "threequarters",
                              strokeLinecap: "round",
                              valueSize: 13,
                              valueWeight: "bold",
                              valueColor: "#000000",
                              valueFamily: "Trebuchet MS",
                              textSize: 3,
                              textWeight: "bold",
                              textColor: "#000000",
                              textFamily: "Trebuchet MS",
                              loadingTime: 1000,
                              miniCircleColor: "#ff653b",
                              miniCircleSize: 3,
                              valueAnimation: true,
                              intersectionEnabled: true,
                            }}
                          />
                        )}
                      </>
                    ) : (
                      <>
                        {theme ? (
                          <Flat
                            progress={onHour * 60 + onMin}
                            range={{ from: 0, to: 1440 }}
                            //  sign={{ value: '%', position: 'end' }}
                            //  text={''}
                            showMiniCircle={true}
                            showValue={false}
                            sx={{
                              strokeColor: "#8981f7",
                              barWidth: 2.6,
                              bgStrokeColor: "#c2c2c2",
                              bgColor: { value: "#ffffff", transparency: "99" },
                              shape: "threequarters",
                              strokeLinecap: "round",
                              valueSize: 13,
                              valueWeight: "bold",
                              valueColor: "#000000",
                              valueFamily: "Trebuchet MS",
                              textSize: 3,
                              textWeight: "bold",
                              textColor: "#000000",
                              textFamily: "Trebuchet MS",
                              loadingTime: 1000,
                              miniCircleColor: "#8981f7",
                              miniCircleSize: 3,
                              valueAnimation: true,
                              intersectionEnabled: true,
                            }}
                          />
                        ) : (
                          <Flat
                            progress={onHour * 60 + onMin}
                            range={{ from: 0, to: 1440 }}
                            //  sign={{ value: '%', position: 'end' }}
                            //  text={''}
                            showMiniCircle={true}
                            showValue={false}
                            sx={{
                              strokeColor: "#8981f7",
                              barWidth: 2.6,
                              bgStrokeColor: "#47474d",
                              bgColor: { value: "#282828", transparency: "99" },
                              shape: "threequarters",
                              strokeLinecap: "round",
                              valueSize: 13,
                              valueWeight: "bold",
                              valueColor: "#000000",
                              valueFamily: "Trebuchet MS",
                              textSize: 3,
                              textWeight: "bold",
                              textColor: "#000000",
                              textFamily: "Trebuchet MS",
                              loadingTime: 1000,
                              miniCircleColor: "#8981f7",
                              miniCircleSize: 3,
                              valueAnimation: true,
                              intersectionEnabled: true,
                            }}
                          />
                        )}
                      </>
                    )}
                  </div>
                  <div
                    className={
                      "w-auto h-[45px] rounded-2xl mt-[10px] text-[14px]  px-[16px] flex flex-col justify-center items-center whitespace-nowrap" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    {/* <div className="w-[150px] h-[350px] ">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart width={730} height={250} data={data}>
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
                                stopColor="#8981f7"
                                stopOpacity={0.6}
                              />
                              <stop
                                offset="100%"
                                stopColor="#8981f7"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>

                          <Area
                            type="monotone"
                            dataKey="num"
                            stroke="#8981f7"
                            fillOpacity={1}
                            fill="url(#colorAvg)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div> */}
                    {onHour * 60 + onMin > 600 ? (
                      <>
                        <span className="flex justify-center items-center text-[#ff653b] text-[16px]">
                          <FaLongArrowAltUp className="mr-[2px] text-[18px] text-[#ff653b]" />{" "}
                          Too Much
                        </span>
                        <span className=" ">( You should stop right now )</span>
                      </>
                    ) : onHour * 60 + onMin > (totalHour * 60) / totalDay ? (
                      <>
                        <span className="flex justify-center items-center text-[#ff653b] text-[16px]">
                          <FaLongArrowAltUp className="mr-[2px] text-[18px] text-[#ff653b]" />{" "}
                          Above Avg
                        </span>
                        <span className=" ">( You should take a break )</span>
                      </>
                    ) : (
                      <>
                        <span className="flex justify-center items-center">
                          <FaLongArrowAltDown
                            Fill
                            className="mr-[2px] text-[18px] text-[#96df73]"
                          />{" "}
                          Below Avg
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}

            {/* <div className="w-[100%] fixed h-[100svh] flex justify-center items-center">
            <div className="w-[200px] h-[400px] bg-slate-500 rounded-xl"></div>
          </div> */}
            {/* <div className="w-full bg-[#17171a] rounded-xl h-[300px] flex justify-center items-center tracking-widest text-white text-[60px] font-[google] font-normal">
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

                {nameChangeFlag === true ? (
                  <div
                    className={
                      "w-full md:w-[400px] lg-[400px] h-[100svh]  z-50 fixed top-0 left-0 flex justify-center items-center p-[10px] md:px-0 lg:px-0 backdrop-blur-md" +
                      (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                    }
                  >
                    <div
                      className={
                        "w-[320px] h-auto rounded-3xl  flex flex-col justify-center items-center p-[30px] drop-shadow-sm" +
                        (theme ? " bg-[white]" : " bg-[#222228]")
                      }
                    >
                      <span
                        className={
                          "font-medium w-full h-[30px]  flex items-start mt-[-5px]  text-[21px] font-[google]" +
                          (theme ? " text-black" : " text-white")
                        }
                      >
                        Update Profile
                      </span>
                      {ownerName?.length === 0 ? (
                        <label
                          className={
                            " font-[google] font-normal text-[14px]  w-full flex justify-start items-center h-[30px] mb-[-30px]" +
                            (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                          }
                          style={{ transition: ".3s" }}
                        >
                          Name
                        </label>
                      ) : (
                        <label
                          className={
                            " font-[google] font-normal text-[12px]  w-full flex justify-start items-center h-[30px] mb-[-11px]" +
                            (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                          }
                          style={{ transition: ".3s" }}
                        >
                          Name
                        </label>
                      )}
                      <input
                        value={ownerName}
                        onChange={(e) => {
                          setOwnerName(e.target.value);
                        }}
                        className={
                          " input border-b-[1.5px]  h-[30px] w-full  font-[google] tracking-[.4px] font-normal text-[15px]   bg-transparent outline-none" +
                          (theme
                            ? " border-[#606060] text-black"
                            : " border-[#b1b1b1] text-white")
                        }
                        // placeholder="Group Name"
                      ></input>
                      {ownerInfo?.length === 0 ? (
                        <label
                          className={
                            " mt-[15px] font-[google] font-normal text-[14px]  w-full flex justify-start items-center h-[30px] mb-[-30px]" +
                            (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                          }
                          style={{ transition: ".3s" }}
                        >
                          About
                        </label>
                      ) : (
                        <label
                          className={
                            " mt-[15px] font-[google] font-normal text-[12px]  w-full flex justify-start items-center h-[30px] mb-[-11px]" +
                            (theme ? " text-[#606060]" : " text-[#b1b1b1]")
                          }
                          style={{ transition: ".3s" }}
                        >
                          About
                        </label>
                      )}
                      <input
                        value={ownerInfo}
                        onChange={(e) => {
                          setOwnerInfo(e.target.value);
                        }}
                        className={
                          " input border-b-[1.5px]  h-[30px] w-full   flex justify-start items-start font-[google] tracking-[.4px] font-normal text-[15px]  bg-transparent outline-none" +
                          (theme
                            ? " border-[#606060] text-black"
                            : " border-[#b1b1b1] text-white")
                        }
                        // placeholder="Group Descritption"
                      ></input>
                      {/* <input
                        style={{ transition: ".5s" }}
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        placeholder="Name"
                        className={
                          "log w-[calc(100%-12px)] bg-transparent h-[35px] font-normal  input tracking-[.4px] font-[google]  border-b-[1.5px]   z-0 outline-none  text-[15px]  mt-[20px]" +
                          (theme
                            ? " text-black bg-[#e4eaf1] border-[#545454]"
                            : " text-[white] bg-[#17171a] border-[#c3c3c3]")
                        }
                      ></input>
                      <input
                        style={{ transition: ".5s" }}
                        value={ownerInfo}
                        onChange={(e) => setOwnerInfo(e.target.value)}
                        placeholder="About"
                        className={
                          "log w-[calc(100%-12px)] bg-transparent h-[35px] font-normal  input tracking-[.4px] font-[google]  border-b-[1.5px]   z-0 outline-none  text-[15px]  mt-[10px]" +
                          (theme
                            ? " text-black bg-[#e4eaf1] border-[#545454]"
                            : " text-[white] bg-[#17171a] border-[#c3c3c3]")
                        }
                      ></input> */}

                      <div className="w-[100%] h-auto flex justify-end items-center font-[google] font-normal text-[15px] mt-[20px]">
                        <span
                          className={
                            "w-auto  flex items-end h-auto rounded-2xl bg-transparent  z-20" +
                            (theme
                              ? " text-black bg-[#e4eaf1]"
                              : " text-[white] bg-[#17171a]")
                          }
                          onClick={() => {
                            setNameChangeFlag(false);
                          }}
                        >
                          {/* <RxCross2 className="text-[18px] text-[#8981f7]" /> */}
                          Close
                        </span>
                        <span
                          className="w-auto ml-[30px] flex items-end h-auto rounded-2xl text-[#5f54ff]   z-20"
                          onClick={() => {
                            setNameChangeFlag(false);
                            CamalCaseName();
                            updateUserInfo();
                          }}
                        >
                          {/* <MdOutlineDone className="text-[18px] text-[#8981f7]" /> */}
                          Update
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}

                {/* dfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb */}
                <div className="w-full h-[100px] mt-[25px] flex justify-start items-center px-[20px]">
                  <div className="group w-[80px] h-[80px] rounded-full  flex justify-end items-end">
                    {/* <img
                    src={profileURL}
                    className="w-full h-full rounded-full object-cover"
                  ></img> */}
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className={
                          "w-full h-full rounded-[28px] object-cover" +
                          (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                        }
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className={
                          "w-full h-full rounded-[28px] object-cover" +
                          (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                        }
                      ></img>
                    )}
                    <input
                      type="file"
                      id="getFile"
                      accept="image/*"
                      className="hidden fixed opacity-0 text-white bg-transparent w-[45px] h-[35px] rounded-full z-30 cursor-pointer"
                      onChange={(e) => {
                        profileImage(e);
                      }}
                    ></input>
                    <label
                      // for="getFile"
                      // onclick={document.getElementById("getFile").click()}
                      onClick={() => {
                        setChangeDpModal(true);
                      }}
                      className={
                        " w-[30px] h-[30px]  flex justify-center items-center border-[2px]   fixed rounded-full cursor-pointer z-10" +
                        (theme
                          ? " bg-[#8981f7] text-white border-[#e4eaf1] md:border-[#e4eaf1] lg:border-[#e4eaf1]"
                          : " bg-[#4b565c] text-white border-[#17171a] md:border-[#17171a] lg:border-[#17171a]")
                      }
                    >
                      <BsCameraFill className=" text-[13px]" />
                    </label>
                  </div>

                  <div className="w-[calc(100%-140px)] h-full  ml-[20px] flex flex-col justify-center  items-start">
                    <div
                      className={
                        " font-[google] text-[22px] md:text-[22px] lg:text-[22px] w-full " +
                        (theme ? " text-black" : " text-white")
                      }
                    >
                      {ownerName}
                    </div>
                    <div
                      className={
                        " font-[google] max-h-[47px] line-clamp-2 overflow-hidden text-ellipsis mt-[0px] text-[16px] w-full font-light" +
                        (theme ? " text-[#2d2d2d]" : " text-[#bbbbbb]")
                      }
                    >
                      {ownerInfo}
                    </div>
                  </div>

                  <div
                    className="w-[30px] flex justify-end items-center"
                    onClick={() => {
                      setNameChangeFlag(true);
                    }}
                  >
                    <RiEditFill
                      className={
                        "text-[20px] " + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                </div>
                {help === true ? (
                  <>
                    <div
                      className="w-full md:w-[400px] lg:w-[400px] h-[calc(100svh-75px)] backdrop-blur-md fixed top-[70px] p-[10px] flex flex-col justify-center items-center z-50 text-[15px]"
                      style={{ transition: ".4s" }}
                    >
                      <div
                        className={
                          "w-full h-[calc(100%-50px)] rounded-2xl font-[google] font-normal  p-[20px]  flex flex-col justify-start items-start " +
                          (!theme
                            ? " text-white bg-[#222228]"
                            : " text-black bg-[#ffffff]")
                        }
                      >
                        <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll">
                          <span
                            className="font-medium text-[18px]  opacity-100"
                            style={{
                              transition: ".5s",
                              transitionDelay: ".5s",
                            }}
                          >
                            ◍ How to add friend ?
                          </span>
                          <span
                            className={
                              " mt-[5px] opacity-100" +
                              (theme ? " text-[#656565]" : " text-[#b0b0b0]")
                            }
                            style={{
                              transition: ".5s",
                              transitionDelay: ".5s",
                            }}
                          >
                            Go to left most icon at bottom. Then in the{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Search-Bar
                            </span>{" "}
                            type the <span className="">Exact Username</span>{" "}
                            your friend is using and click on the search icon.
                            From the result below click on your friends profile
                            and start messaging.
                          </span>
                          <span
                            className="font-medium text-[18px]  mt-[20px] opacity-100"
                            style={{
                              transition: ".5s",
                              transitionDelay: ".7s",
                            }}
                          >
                            ◍ How to change Profile Photo ?
                          </span>
                          <span
                            className={
                              " mt-[5px] opacity-100" +
                              (theme ? " text-[#656565]" : " text-[#b0b0b0]")
                            }
                            style={{
                              transition: ".5s",
                              transitionDelay: ".7s",
                            }}
                          >
                            Go to{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Settings
                            </span>{" "}
                            -{">"} click on{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Camera Icon
                            </span>{" "}
                            on top of{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Profile Photo
                            </span>{" "}
                            -{">"} choose preferred image. The profile will
                            automatically be updated.
                          </span>
                          <span
                            className="font-medium text-[18px]  mt-[20px] opacity-100"
                            style={{
                              transition: ".5s",
                              transitionDelay: ".9s",
                            }}
                          >
                            ◍ How to update Name and About ?
                          </span>
                          <span
                            className={
                              " mt-[5px] opacity-100" +
                              (theme ? " text-[#656565]" : " text-[#b0b0b0]")
                            }
                            style={{
                              transition: ".5s",
                              transitionDelay: ".9s",
                            }}
                          >
                            Go to{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Settings
                            </span>{" "}
                            -{">"} click on{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Edit Icon
                            </span>{" "}
                            beside Profile Name -{">"} enter new name or info -
                            {">"} click on{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Update Button
                            </span>
                            .
                          </span>
                          <span
                            className="font-medium text-[18px]  mt-[20px] opacity-100"
                            style={{
                              transition: ".5s",
                              transitionDelay: "1.1s",
                            }}
                          >
                            ◍ How to give Status ?
                          </span>
                          <span
                            className={
                              " mt-[5px] opacity-100" +
                              (theme ? " text-[#656565]" : " text-[#b0b0b0]")
                            }
                            style={{
                              transition: ".5s",
                              transitionDelay: "1.1s",
                            }}
                          >
                            Go to{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Status
                            </span>{" "}
                            -{">"} click on{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Plus Icon
                            </span>{" "}
                            at bottom right -{">"} choose status format (image /
                            Text) -{">"} the profile will automatically be
                            updated.
                          </span>
                          <span
                            className="font-medium text-[18px]  mt-[20px] opacity-100"
                            style={{
                              transition: ".5s",
                              transitionDelay: "1.3s",
                            }}
                          >
                            ◍ How to access all Media of any Chat ?
                          </span>
                          <span
                            className={
                              " mt-[5px] opacity-100" +
                              (theme ? " text-[#656565]" : " text-[#b0b0b0]")
                            }
                            style={{
                              transition: ".5s",
                              transitionDelay: "1.3s",
                            }}
                          >
                            Go to{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Chat
                            </span>{" "}
                            -{">"} click on the friend's name -{">"} click on
                            the{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Profile Photo
                            </span>{" "}
                            at top left -{">"} click on{" "}
                            <span
                              className={
                                " font-medium" +
                                (!theme ? " text-[white]" : " text-[black]")
                              }
                            >
                              Media
                            </span>{" "}
                            -{">"} select media type.
                          </span>
                        </div>
                      </div>
                      <div
                        className={
                          "w-auto px-[15px] flex justify-center items-center h-[40px] mt-[10px]  rounded-full" +
                          (!theme
                            ? " text-[white] bg-[#222228]"
                            : " text-[black] bg-[#ffffff]")
                        }
                        onClick={() => {
                          setHelp(false);
                        }}
                      >
                        Close
                      </div>
                    </div>

                    <div
                      className={
                        "w-full  md:w-[400px] lg:w-[400px] h-[100svh] backdrop-blur-md z-40 fixed" +
                        (theme ? "bg-[#17171a25]" : " bg-[e4eaf125]")
                      }
                    ></div>
                  </>
                ) : (
                  <>
                    <div
                      className="w-full md:w-[400px] lg:w-[400px] h-[400px] fixed top-[-430px] p-[10px] z-50 flex justify-center items-center"
                      style={{ transition: ".4s" }}
                    >
                      <div
                        className={
                          "w-full h-[calc(100%-50px)] rounded-2xl font-[google] font-normal  p-[20px]  flex flex-col justify-start items-start text-[15px] " +
                          (!theme
                            ? " text-white bg-[#222228]"
                            : " text-black bg-[#ffffff]")
                        }
                      >
                        <div className="w-full h-full flex flex-col justify-start items-start overflow-y-scroll">
                          <span className="font-medium text-[18px] text-black opacity-0">
                            How to add friend ?
                          </span>
                          <span className="text-[#656565] mt-[5px] opacity-0">
                            Go to left most icon at bottom. Then in the{" "}
                            <span className="text-black font-medium">
                              Search-Bar
                            </span>{" "}
                            type the{" "}
                            <span className="text-black">Exact Username</span>{" "}
                            your friend is using and click on the search icon.
                            From the result below click on your friends profile
                            and start messaging.
                          </span>
                          <span className="font-medium text-[18px] text-black mt-[20px] opacity-0">
                            How to change Profile Photo ?
                          </span>
                          <span className="text-[#656565] mt-[5px] opacity-0">
                            Go to{" "}
                            <span className="text-black font-medium">
                              Settings
                            </span>{" "}
                            -{">"} click on{" "}
                            <span className="text-black font-medium">
                              Camera Icon
                            </span>{" "}
                            on top of{" "}
                            <span className="text-black font-medium">
                              Profile Photo
                            </span>{" "}
                            -{">"} choose preferred image. The profile will
                            automatically be updated.
                          </span>
                          <span className="font-medium text-[18px] text-black mt-[20px] opacity-0">
                            How to update Name and About ?
                          </span>
                          <span className="text-[#656565] mt-[5px] opacity-0">
                            Go to{" "}
                            <span className="text-black font-medium">
                              Settings
                            </span>{" "}
                            -{">"} click on{" "}
                            <span className="text-black font-medium">
                              Edit Icon
                            </span>{" "}
                            beside Profile Name -{">"} enter new name or info -
                            {">"} click on{" "}
                            <span className="text-black font-medium">
                              Update Button
                            </span>
                            .
                          </span>
                          <span className="font-medium text-[18px] text-black mt-[20px] opacity-0">
                            How to give Status ?
                          </span>
                          <span className="text-[#656565] mt-[5px] opacity-0">
                            Go to{" "}
                            <span className="text-black font-medium">
                              Status
                            </span>{" "}
                            -{">"} click on{" "}
                            <span className="text-black font-medium">
                              Plus Icon
                            </span>{" "}
                            at bottom right -{">"} choose status format (image /
                            Text) -{">"} the profile will automatically be
                            updated.
                          </span>
                          <span className="font-medium text-[18px] text-black mt-[20px] opacity-0">
                            How to access all Media of any Chat ?
                          </span>
                          <span className="text-[#656565] mt-[5px] opacity-0">
                            Go to{" "}
                            <span className="text-black font-medium">Chat</span>{" "}
                            -{">"} click on the friend's name -{">"} click on
                            the{" "}
                            <span className="text-black font-medium">
                              Profile Photo
                            </span>{" "}
                            at top left -{">"} click on{" "}
                            <span className="text-black font-medium">
                              Media
                            </span>{" "}
                            -{">"} select media type.
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      className={
                        "w-0  md:w-[0px] lg:w-[0px] h-[0px] backdrop-blur-md z-0 fixed" +
                        (theme ? "bg-[#17171a25]" : " bg-[e4eaf125]")
                      }
                    ></div>
                    {/* <div className="w-0  md:w-0 lg:w-0 h-0 bg-[#e4eaf125] backdrop-blur-md z-0 fixed"></div> */}
                  </>
                )}

                <div className=" h-[230px]  mt-[20px] w-full px-[20px] flex flex-col justify-between items-center ">
                  <div
                    className={
                      "w-full   h-auto flex flex-col justify-center items-start" +
                      (theme ? " text-black" : " text-white")
                    }
                  >
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-between items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        changeTheme();
                      }}
                    >
                      <div className="flex justify-start items-center">
                        <BiSolidMoon
                          className={
                            " text-[23px] mr-[16px]" +
                            (theme ? " text-[#000000]" : " text-[#ffffff]")
                          }
                        />
                        Theme : {theme === true ? <>Light</> : <>Dark</>}
                      </div>
                      <div
                        className={
                          "w-[32px] h-[22px] rounded-full flex items-center justify-start  border " +
                          (theme ? "  border-[#b7bcc0]" : "  border-[#8981f7]")
                        }
                      >
                        {theme ? (
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
                      </div>
                    </div>

                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-between items-center font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        changeAccountStatus();
                      }}
                    >
                      <div className="flex justify-start items-center">
                        <MdNoAccounts
                          className={
                            " text-[23px] mr-[16px]" +
                            (theme ? " text-[#000000]" : " text-[#ffffff]")
                          }
                        />
                        Account Visibility :{" "}
                        {accountStatus === true ? <>Public</> : <>Private</>}
                      </div>
                      <div
                        className={
                          "w-[32px] h-[22px] rounded-full flex items-center justify-start  border  " +
                          (accountStatus
                            ? "border-[#b7bcc0]"
                            : "border-[#8981f7]")
                        }
                      >
                        {accountStatus ? (
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
                      </div>
                    </div>

                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        setTimer(!timer);
                      }}
                    >
                      <RiTimer2Fill
                        className={
                          " text-[23px] mr-[16px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />
                      Daily Usage
                    </div>

                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        setGraph(!graph);
                      }}
                    >
                      <MdBarChart
                        className={
                          " text-[23px] mr-[16px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />
                      Daily Usage Graph
                    </div>
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        setHelp(!help);
                      }}
                    >
                      <TbHelpSquareRoundedFilled
                        className={
                          " text-[23px] mr-[16px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />{" "}
                      Help
                    </div>
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center  font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        setReportBug(true);
                      }}
                    >
                      <MdBugReport
                        className={
                          " text-[23px] mr-[16px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />{" "}
                      Report Bug
                    </div>

                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center font-[google] font-light  text-[15px] cursor-pointer"
                      onClick={() => {
                        userSignOut();
                        setTimeout(() => {
                          deleteAccount();
                        }, 2000);
                      }}
                    >
                      <AiFillDelete
                        className={
                          " text-[23px] mr-[16px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />{" "}
                      Delete Account
                    </div>
                    <div
                      className="w-[100%] h-[34px]  rounded-xl    mt-[10px] flex justify-start items-center font-[google] font-light  text-[15px] cursor-pointer" // {
                      //    +
                      //   (theme ? " text-[#bf692c]" : " text-[#ff9448]")
                      // }
                      onClick={() => {
                        userSignOut();
                      }}
                    >
                      <IoLogOut
                        className={
                          " text-[23px] mr-[12px] ml-[1.5px]" +
                          (theme ? " text-[#000000]" : " text-[#ffffff]")
                        }
                      />{" "}
                      Log Out
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full md:w-[400px] lg:w-[400px] h-[60px]  bottom-0 flex  items-center z-0 mt-[10px]">
        <div
          className={
            "w-[calc(100%/5)] h-[40px] rounded-2xl  z-0   " +
            (theme ? " bg-[#ffffff] " : " bg-[#222228] ") +
            (props.data === "All"
              ? "ml-[0px]"
              : props.data === "Group"
              ? "ml-[calc(100%/5)]"
              : props.data === "Chat"
              ? "ml-[calc((100%/5)*2)]"
              : props.data === "Status"
              ? "ml-[calc((100%/5)*3)]"
              : "ml-[calc((100%/5)*4)]")
          }
          style={{ zIndex: "0", transition: ".4s" }}
        ></div>
      </div>

      <div
        className="w-full md:w-[400px] lg:w-[400px] h-[60px]   overflow-hidden fixed bottom-0 flex items-center justify-center  " // {
      >
        <div
          className={
            "w-full h-full  flex  items-center  z-20" +
            (theme ? " text-[#000000]" : " text-[#ffffff]")
          }
          style={{ transition: ".5s" }}
        >
          <div className="min-w-[20%] h-full  flex justify-center items-center">
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
          <div className="min-w-[20%] h-full  flex justify-center items-center">
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
            className="min-w-[20%] h-full flex justify-center items-center  z-10 "
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

          <div className="min-w-[20%] h-full  flex justify-center items-center">
            <RiDonutChartLine
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                props.setData("Status");
                setIsSearchBar(false);
              }}
            />
            {/* <div
              className={
                "w-[12px] h-[12px] rounded-full ml-[-17.3px]" +
                (theme ? " bg-[#000000]" : " bg-[#8981f7]")
              }
              onClick={() => {
                setSearchFlag(false);
                props.setData("Status");
                setIsSearchBar(false);
              }}
            ></div> */}
          </div>
          {props.data === "Setting" ? (
            <div
              className="min-w-[20%] h-full  flex justify-center items-center "
              style={{ transition: ".4s" }}
            >
              <RiSettings4Fill
                className="text-[23px] rotate-90"
                style={{ transition: ".4s" }}
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
          ) : (
            <div
              className="min-w-[20%] h-full  flex justify-center items-center"
              style={{ transition: ".4s" }}
            >
              <RiSettings4Fill
                className="text-[23px] rotate-0"
                style={{ transition: ".4s" }}
                onClick={() => {
                  setSearchFlag(false);
                  props.setData("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;

const CustomTooltip = ({ active, payload, label }) => {
  const [theme, setTheme] = useState(true);

  // -----------------------------------------------------------------------------------------------------
  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  if (active && payload && payload.length) {
    return (
      <div
        className={
          "custom-tooltip  rounded-2xl p-[20px] w-[150px] font-[google]" +
          (theme ? " bg-[#e4eaf1] text-black" : " bg-[#17171a] text-[white]")
        }
      >
        {/* <p className="label text-[15px]">Date {`${label}`}</p> */}
        <p className="intro">Usage : {payload[0].value.toFixed(2)} Hrs</p>
        {/* <p className="desc">Anything you want can be displayed here.</p> */}
      </div>
    );
  }

  return null;
};
