import Login from "./auth/Login";
import Signup from "./auth/Signup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import Chatbody from "./Chatbody";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import bg from "../assets/img/bb1.webp";
import { WiStars } from "react-icons/wi";
import gg from "../assets/img/gg.jpg";
import {
  addAllGroup,
  addTotalGroup,
  clearAllGroup,
  clearTotalGroup,
} from "../utils/chatSlice";
import { onSnapshot } from "firebase/firestore";
import { useDispatch } from "react-redux";
const Loading = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [per, setPer] = useState(0);
  const [isSubLoading, setIsSubLoading] = useState(false);
  const [messageMode, setMessageMode] = useState(1);

  const dispatch = useDispatch();
  useEffect(() => {
    // Creating a timeout within the useEffect hook
    run();
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setIsLoading(false);
      return () => clearTimeout(timer);
    }, 3990);
  }, []);
  useEffect(() => {
    if (per != 0 && per <= 100) {
      run();
    }
  }, [per]);

  function run() {
    // while (true) {
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setPer(per + 25);
      return () => clearTimeout(timer);
    }, 980);
    // }
  }
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const TotalGroups = useSelector((store) => store.chat.totalGroup);

  useEffect(() => {
    // console.log(
    //   "TotalGroupssnnadgfjdsfusdyfv------------------------------------------------------------------"
    // );
    // console.log(TotalGroups);
    if (ActiveChatUser.length !== 0) {
      if (isNameInArray(ActiveChatUser)) {
        setMessageMode(2);
      } else {
        setMessageMode(1);
      }
    }
  }, [ActiveChatUser]);

  function isNameInArray(name) {
    for (let i = 0; i < TotalGroups.length; i++) {
      if (TotalGroups[i].GroupName === name) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    fetchAllGroups();
  }, []);

  function fetchAllGroups() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const grpRef = db.collection("Groups");
    // .doc(user.uid);

    onSnapshot(grpRef, (snapshot) => {
      console.log("Group Naemeeeee");
      console.log(snapshot.docs);

      dispatch(clearTotalGroup());
      snapshot.docs.forEach((name) => {
        console.log("name---------------------------");
        console.log(name?.id);
        dispatch(addTotalGroup({ GroupName: name.id }));
      });
    });
  }

  useEffect(() => {
    // Creating a timeout within the useEffect hook
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setIsSubLoading(false);
      return () => clearTimeout(timer);
    }, 9000);
  }, []);

  return (
    <>
      {isLoading == true ? (
        <>
          <div className="w-full bg-[#ffffff] flex flex-col justify-center items-center h-[100dvh]">
            {/* <div class="col-3">
              <div class="snippet" data-title="dot-gathering">
                <div class="stage filter-contrast">
                  <div class="dot-gathering"></div>
                </div>
              </div>
            </div> */}
            {/* <svg viewBox="0 0 1236 600" className=" block m-auto">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                className="text-[120px] lg:text-[50px] md:text-[50px] text-center stroke-[2px] lg:stroke-[1px] md:stroke-[1px]"
              >
                INFINITY
              </text>
            </svg> */}
            {/* <div class="custom-loader"></div> */}
            <div className="flex justify-center items-center font-[google] text-[28px]">
              <WiStars className="text-[#965ba3] text-[30px]" />{" "}
              <span>Wait a moment !</span>{" "}
              {/* <span>We are loading everything for you</span> */}
            </div>
            <div className="w-[230px] lg:w-[400px] md:w-[400px] h-[4px] rounded-full ">
              {/* <span class="bg-black w-full"></span> */}
              <span class="loader4 bg-gradient-to-l from-[#2e9df6] to-[#975ba3]"></span>

              {/* <span class="loader"></span> */}
            </div>
            <div className="flex flex-col justify-center items-center font-[work] text-[16px] mt-[32px] text-[#424242]">
              <span>We are preparing everything for you</span>
              <span className="text-[20px] ">{per}%</span>
            </div>

            {/* <span className="text-[13px] lg:text-[16px] md:text-[16px] tracking-[13px] lg:tracking-[17px] md:tracking-[17px] font-semibold text-[#cdd8dd] mt-[20px] w-full flex justify-center items-center">
              FETCHING MESSAGES
            </span> */}
          </div>
          <div className="hidden">
            <Sidebar />
          </div>
        </>
      ) : isSubLoading === true ? (
        <>
          <div className="w-full bg-[#1b202d] flex flex-col justify-center items-center h-[100dvh]">
            <svg
              viewBox="0 0 1236 600"
              className="  m-auto flex justify-center items-center text-[#ffb6b5]"
            >
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                className="text-[120px] lg:text-[50px] md:text-[50px] text-center stroke-[#ffb6b5] text-[#ffb6b5] stroke-[2px] lg:stroke-[.7px] md:stroke-[.7px]"
              >
                INFINTIY
              </text>
            </svg>
          </div>
          <div className="hidden">
            <Sidebar />
          </div>
        </>
      ) : (
        <>
          {/* <div
            className="w-full h-[80px] flex justify-center items-center px-[10px] fixed top-[10px]"
            style={{ zIndex: "9999" }}
          >
            <div className="w-full h-full bg-slate-400 rounded-xl flex justify-center items-center p-[10px]">
              <div className="w-[60px] h-[60px] bg-white rounded-full mr-[10px]">
                <img className="w-full h-full rounded-full object-cover"></img>
              </div>
              <div className="w-[calc(100%-70px)] h-full bg-slate-500"></div>
            </div>
          </div> */}
          <div className="w-full flex h-[100svh] justify-between items-center">
            <Sidebar />

            <Chatbody mode={messageMode} />
          </div>
        </>
      )}
    </>
  );
};

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [start, setStart] = useState(false);
  const [subStart, setSubStart] = useState(false);
  const [subSubStart, setSubSubStart] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else setAuthUser(null);
    });
    return () => {
      listen();
    };
  }, []);
  function createUserFriendCollection(UserId, UserName) {
    // const user = firebase.auth().currentUser;
    // console.log(user.uid);
    // db.collection("Chat Record")
    //   .doc(user.uid)
    //   .collection("Chat Friends")
    //   .doc(UserId)
    //   .set({
    //     Name: UserName,
    //   });
    // console.log("done");
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out Successfully"))
      .catch((error) => console.log(error));
  };

  function uploadImage(e) {
    console.log(e.target.files);
  }
  const mode = useSelector((store) => store.chat.signingMode);

  return (
    <>
      {authUser ? (
        <>
          <Loading />
          {/* <button className="font-bold" onClick={userSignOut}>
            Sign Out
          </button> */}
        </>
      ) : (
        <>
          {start == false ? (
            <>
              <div className="w-full h-[100svh] flex flex-col justify-center items-center z-10 backdrop-blur-xl ">
                {/* {mode === 1 ? <Login /> : <Signup />} */}
                <span
                  className="text-white font-[google] font-medium flex text-[37px] lg:text-[65px]  b justify-center items-center"
                  style={{ transition: ".2s" }}
                >
                  Welcome to Infinity <WiStars className="text-[#0462e8]" />
                </span>
                <span
                  className="text-[#000000b4] mt-[20px] h-[90px]  w-[90%] md:w-[40%] lg:w-[40%] font-[work] font-thin text-[15px] tracking-wide px-[30px] flex justify-center items-center text-center "
                  style={{ transition: ".2s" }}
                >
                  Experience seamless connections and vibrant conversations with
                  Infinity, where every message brings joy and connection to
                  your fingertips.
                </span>
                <div
                  className="px-[20px] h-[40px] w-auto whitespace-nowrap mt-[30px] cursor-pointer select-none outline-none drop-shadow-sm bg-[#8981f7] text-white rounded-full text-[16px] flex justify-center items-center "
                  onClick={() => {
                    setStart(!start);
                    setTimeout(() => {
                      setSubStart(true);
                    }, 1500);
                    setTimeout(() => {
                      setSubSubStart(true);
                    }, 2000);
                  }}
                  style={{ transition: ".2s" }}
                >
                  Let's Start
                </div>
                {/* <div className="w-full h-full bg-slate-500"></div> */}
              </div>
              {/* <div className="w-full h-[100svh] fixed z-0">
                <img className="w-full h-full object-cover" src={bg}></img>
              </div> */}
            </>
          ) : subStart === false ? (
            <>
              <div className="w-full h-[100svh] flex flex-col justify-center items-center backdrop-blur-xl z-10">
                <span
                  className="text-black font-[google] text-[35px] hidden  "
                  style={{ transition: ".2s" }}
                >
                  Welcome to Infinity
                </span>
                <span
                  className="text-[#4f4f4f]  max-h-[90px] h-0 overflow-hidden w-full md:w-[40%] lg:w-[40%] font-[google] text-[16px] tracking-wide px-[30px] text-center "
                  style={{ transition: ".2s" }}
                >
                  Experience seamless connections and vibrant conversations with
                  Infinity, where every message brings joy and connection to
                  your fingertips.
                </span>
                <div
                  className="px-[20px] h-[40px] w-[40px] animate-bounce  cursor-pointer bg-[white] text-black rounded-full text-[16px] flex justify-center  select-none outline-none items-center"
                  // onClick={() => setStart(!start)}
                  style={{ transition: ".2s" }}
                ></div>
              </div>
              {/* <div className="w-full h-[100svh] fixed z-0">
                <img className="w-full h-full object-cover" src={bg}></img>
              </div> */}
            </>
          ) : (
            <div className="w-full h-[100svh] flex flex-col justify-center items-center bg-[#e4eaf1]">
              <span
                className="text-black font-[google] text-[35px] hidden  "
                style={{ transition: ".2s" }}
              >
                <b>Welcome to Infinity</b>
              </span>
              <span
                className="text-[#4f4f4f]  max-h-[90px] h-0 overflow-hidden w-full md:w-[40%] lg:w-[40%] font-[google] text-[16px] tracking-wide px-[30px] text-center "
                style={{ transition: ".2s" }}
              >
                Experience seamless connections and vibrant conversations with
                Infinity, where every message brings joy and connection to your
                fingertips.
              </span>
              <div
                className=" h-[100svh] w-full  bg-[#ffffff] text-black rounded-none text-[16px] flex justify-center outline-none items-center"
                onClick={() => {
                  // setStart(!start);
                  // setSubStart(false);
                  // setSubSubStart(false);
                }}
                style={{ transition: ".2s" }}
              >
                {subSubStart === true ? (
                  <>
                    {/* <div className="w-full h-[100svh] flex justify-center items-center z-50">
                      <img
                        className="w-[70%] h-full object-cover z-50"
                        src={gg}
                      ></img>
                      <div className="w-[30%] h-full"></div>
                    </div> */}
                    {mode === 1 ? (
                      <>
                        <div
                          className="w-full px-[20px] h-full backdrop-blur-xl opacity-100 flex justify-center z-10 items-center"
                          style={{ transition: ".4s" }}
                        >
                          <Login />
                        </div>
                      </>
                    ) : (
                      <div
                        className="w-full h-full opacity-100 flex justify-center items-center"
                        style={{ transition: ".4s" }}
                      >
                        <Signup />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {mode === 1 ? (
                      <div
                        className="w-full h-full opacity-0 flex justify-center items-center"
                        style={{ transition: ".4s" }}
                      >
                        <Login />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full opacity-0 flex justify-center items-center"
                        style={{ transition: ".4s" }}
                      >
                        <Signup />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AuthDetails;
