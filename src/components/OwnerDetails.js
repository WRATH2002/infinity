import React from "react";
import { db } from "../firebase";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import { onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RiSettings4Fill } from "react-icons/ri";
import { BsPersonFillAdd } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { LuCircleDashed } from "react-icons/lu";

const OwnerDetails = (props) => {
  const [ownerInfo, setOwnerInfo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [totalChats, setTotalChats] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [isAni, setIsAni] = useState();
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
    fetchownerInfo();
  }, []);

  useEffect(() => {
    UpdateIsOnline();
  }, [isOnline]);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      setIsOnline(false);
      setIsAni(true);
      setTimeout(() => {
        setIsAni(false);
      }, 2000);
    });
    window.addEventListener("online", function (e) {
      setIsOnline(true);
      setIsAni(true);
      setTimeout(() => {
        setIsAni(false);
      }, 2000);
    });
  }, []);

  function Transition() {
    setIsAni(true);
    setTimeout(() => {
      setIsAni(false);
    }, 2000);
  }

  function fetchownerInfo() {
    const user = firebase.auth().currentUser;

    const collectionRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends");

    const usersRef = db.collection("Chat Record");

    onSnapshot(collectionRef, (snapshot) => {
      setTotalChats(snapshot.size);
    });

    onSnapshot(usersRef, (snapshot) => {
      setTotalUsers(snapshot.size);
    });

    const userDoc = db.collection("Chat Record").doc(user.uid);
    onSnapshot(userDoc, (snapshot) => {
      setOwnerName(snapshot?.data()?.Name);
      setOwnerInfo(snapshot?.data()?.Info);
      setProfileURL(snapshot?.data()?.Photo);
    });
  }

  const UpdateIsOnline = () => {
    const user = firebase.auth().currentUser;
    const statusRef = db.collection("Chat Record").doc(user.uid).update({
      Online: isOnline,
    });
  };

  return (
    <>
      <div
        className={
          "w-full md:w-[400px] lg:w-[400px] h-[80px] fixed top-0 flex   justify-between items-center px-[10px] overflow-hidden py-[10px] z-0" +
          (theme
            ? " md:bg-[#e4eaf1] lg:bg-[#e4eaf1] bg-[#e4eaf1]"
            : "bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a] ")
        }
      >
        {ActiveChatUser.length === 0 ? (
          <>
            <div
              className={
                "text-[18px] font-[google] font-medium  w-full h-full flex justify-between items-center px-[10px] rounded-2xl z-0 pl-[20px]" +
                (theme
                  ? " bg-[#ffffff] md:bg-[#ffffff] lg:bg-[#ffffff] text-[#000000]"
                  : " bg-[#222228] md:bg-[#222228] lg:bg-[#222228] text-[#ffffff]")
              }
            >
              <div>
                {props.data === "Chat" ? (
                  <span className="flex justify-start items-center">
                    <HiChatBubbleBottomCenterText className="text-[22px]   mr-[10px]" />
                    Message's ( {totalChats} )
                  </span>
                ) : props.data === "All" ? (
                  <span className="flex justify-start items-center">
                    <BsPersonFillAdd className="text-[20px]   mr-[10px]" />
                    Total User's ( {totalUsers} )
                  </span>
                ) : props.data === "Status" ? (
                  <span className="flex justify-start items-center">
                    <LuCircleDashed className="text-[20px]   mr-[10px]" />
                    <div
                      className={
                        "w-[11px] h-[11px] rounded-full ml-[-25.5px] mr-[11px]" +
                        (theme ? " bg-black " : " bg-white")
                      }
                    ></div>
                    Status's ( 1 )
                  </span>
                ) : props.data === "Group" ? (
                  <span className="flex justify-start items-center">
                    <MdGroups2 className="text-[25px]   mr-[10px]" />
                    Group's ( 0 )
                  </span>
                ) : (
                  <span className="flex justify-start items-center">
                    <RiSettings4Fill className="text-[20px] mt-[-1px]  mr-[10px]" />
                    Settings
                  </span>
                )}
              </div>
              <div className="w-[160px]  h-full   flex justify-end items-center pr-[21px] z-0">
                {isOnline == true ? (
                  <>
                    {isAni == true ? (
                      <>
                        <div
                          className="w-[105px] h-[28px] rounded-full bg-[#96df73] z-0 flex justify-center items-center overflow-visible text-black text-[15px] whitespace-nowrap "
                          style={{ transition: ".4s" }}
                        >
                          <span
                            className="opacity-100"
                            style={{
                              transition: ".2s",
                              transitionDelay: ".2s",
                            }}
                          >
                            Back Online
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-[#96df73] z-0 flex justify-end items-center overflow-hidden text-transparent text-black text-[15px] whitespace-nowrap cursor-pointer"
                          onClick={() => {
                            Transition();
                          }}
                          style={{ transition: ".4s", transitionDelay: ".4s" }}
                        >
                          <span
                            className="opacity-0 text-transparent"
                            style={{ transition: ".1s" }}
                          ></span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isAni == true ? (
                      <>
                        <div
                          className="w-[105px] h-[28px] rounded-full bg-[#ffd557] z-0 flex justify-center items-center overflow-visible text-black text-[15px] whitespace-nowrap "
                          style={{ transition: ".4s" }}
                        >
                          <span
                            className="opacity-100"
                            style={{
                              transition: ".2s",
                              transitionDelay: ".2s",
                            }}
                          >
                            Oh! Offline
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-[#ffd557] z-0 flex justify-end items-center overflow-hidden text-transparent text-black text-[15px] whitespace-nowrap  cursor-pointer"
                          style={{ transition: ".4s", transitionDelay: ".4s" }}
                          onClick={() => {
                            Transition();
                          }}
                        >
                          <span
                            className="opacity-0 text-transparent"
                            style={{ transition: ".1s" }}
                          ></span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <div
              className={
                "text-[18px] font-[google] font-medium w-full h-full hidden md:flex lg:flex  justify-between items-center px-[10px] rounded-2xl z-0 pl-[20px]" +
                (theme
                  ? "bg-[#ffffff] md:bg-[#ffffff] lg:bg-[#ffffff] text-[#000000]"
                  : "bg-[#222228] md:bg-[#222228] lg:bg-[#222228] text-[#ffffff]")
              }
            >
              <div>
                {props.data === "Chat" ? (
                  <span className="flex justify-start items-center">
                    <HiChatBubbleBottomCenterText className="text-[22px]   mr-[10px]" />
                    Message's ( {totalChats} )
                  </span>
                ) : props.data === "All" ? (
                  <span className="flex justify-start items-center">
                    <BsPersonFillAdd className="text-[20px]   mr-[10px]" />
                    Total User's ( {totalUsers} )
                  </span>
                ) : props.data === "Status" ? (
                  <span className="flex justify-start items-center">
                    <LuCircleDashed className="text-[20px]   mr-[10px]" />
                    <div
                      className={
                        "w-[11px] h-[11px] rounded-full ml-[-25.5px] mr-[11px]" +
                        (theme ? " bg-black " : " bg-white")
                      }
                    ></div>
                    Status's ( 0 )
                  </span>
                ) : props.data === "Group" ? (
                  <span className="flex justify-start items-center">
                    <MdGroups2 className="text-[25px]   mr-[10px]" />
                    Group's ( 0 )
                  </span>
                ) : (
                  <span className="flex justify-start items-center">
                    <RiSettings4Fill className="text-[20px] mt-[-1px]  mr-[10px]" />
                    Settings
                  </span>
                )}
              </div>
              <div className="w-[160px]  h-full hidden md:flex lg:flex   justify-end items-center pr-[21px] z-0">
                {isOnline == true ? (
                  <>
                    {isAni == true ? (
                      <>
                        <div
                          className="w-[105px] h-[28px] rounded-full bg-[#96df73] z-0 flex justify-center items-center overflow-visible text-black text-[15px] whitespace-nowrap "
                          style={{ transition: ".4s" }}
                        >
                          <span
                            className="opacity-100"
                            style={{
                              transition: ".2s",
                              transitionDelay: ".2s",
                            }}
                          >
                            Back Online
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-[#96df73] z-0 flex justify-end items-center overflow-hidden text-transparent text-black text-[15px] whitespace-nowrap cursor-pointer"
                          onClick={() => {
                            Transition();
                          }}
                          style={{ transition: ".4s", transitionDelay: ".4s" }}
                        >
                          <span
                            className="opacity-0 text-transparent"
                            style={{ transition: ".1s" }}
                          ></span>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {isAni == true ? (
                      <>
                        <div
                          className="w-[105px] h-[28px] rounded-full bg-[#ffd557] z-0 flex justify-center items-center overflow-visible text-black text-[15px] whitespace-nowrap "
                          style={{ transition: ".4s" }}
                        >
                          <span
                            className="opacity-100"
                            style={{
                              transition: ".2s",
                              transitionDelay: ".2s",
                            }}
                          >
                            Oh! Offline
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="w-[8px] h-[8px] rounded-full bg-[#ffd557] z-0 flex justify-end items-center overflow-hidden text-transparent text-black text-[15px] whitespace-nowrap  cursor-pointer"
                          style={{ transition: ".4s", transitionDelay: ".4s" }}
                          onClick={() => {
                            Transition();
                          }}
                        >
                          <span
                            className="opacity-0 text-transparent"
                            style={{ transition: ".1s" }}
                          ></span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className="w-full md:w-[400px] lg:w-[400px] h-[70px] top-0 flex  bg-transparent justify-between items-center px-[20px]"></div>
    </>
  );
};

export default OwnerDetails;
