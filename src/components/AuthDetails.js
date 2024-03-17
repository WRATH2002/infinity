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

const Loading = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubLoading, setIsSubLoading] = useState(false);
  useEffect(() => {
    // Creating a timeout within the useEffect hook
    const timer = setTimeout(() => {
      // setData("Welcome to gfg!");
      setIsLoading(false);
      return () => clearTimeout(timer);
    }, 4000);
  }, []);
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
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
      {isLoading === true ? (
        <>
          <div className="w-full bg-[#1b202d] flex flex-col justify-center items-center h-[100dvh]">
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
            <div className="w-[200px] lg:w-[400px] md:w-[400px] h-[4px] rounded-full ">
              <span class="loader"></span>
              {/* <span class="loader"></span> */}
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
          {ActiveChatUser.length !== 0 ? (
            <>
              {" "}
              {/* <div
                className="w-full h-auto flex  justify-center items-center px-[10px] fixed top-[10px]"
                style={{ zIndex: "9999" }}
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
              </div> */}
            </>
          ) : (
            <></>
          )}
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

            <Chatbody />
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
            <div className="w-full h-[100svh] flex flex-col justify-center items-center bg-[#292f3f]">
              {/* {mode === 1 ? <Login /> : <Signup />} */}
              <span
                className="text-white font-[google] flex text-[35px]  "
                style={{ transition: ".2s" }}
              >
                Welcome to Infinity
              </span>
              <span
                className="text-[#b3b3b3] mt-[20px] h-[90px]  w-[90%] md:w-[40%] lg:w-[40%] font-[google] text-[15px] px-[30px] flex justify-center items-center text-center "
                style={{ transition: ".2s" }}
              >
                Experience seamless connections and vibrant conversations with
                Infinity, where every message brings joy and connection to your
                fingertips.
              </span>
              <div
                className="px-[15px] h-[40px] w-[150px] whitespace-nowrap mt-[30px] cursor-pointer select-none outline-none  bg-[#1b202d] text-white rounded-full text-[15px] flex justify-center items-center"
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
                Start Messaging
              </div>
              {/* <div className="w-full h-full bg-slate-500"></div> */}
            </div>
          ) : subStart === false ? (
            <div className="w-full h-[100svh] flex flex-col justify-center items-center bg-[#292f3f]">
              <span
                className="text-white font-[google] text-[35px] hidden  "
                style={{ transition: ".2s" }}
              >
                Welcome to Infinity
              </span>
              <span
                className="text-white  max-h-[90px] h-0 overflow-hidden w-full md:w-[40%] lg:w-[40%] font-[google] text-[15px] px-[30px] text-center "
                style={{ transition: ".2s" }}
              >
                Experience seamless connections and vibrant conversations with
                Infinity, where every message brings joy and connection to your
                fingertips.
              </span>
              <div
                className="px-[15px] h-[40px] w-[40px] animate-bounce  cursor-pointer bg-[#1b202d] text-white rounded-full text-[16px] flex justify-center  select-none outline-none items-center"
                // onClick={() => setStart(!start)}
                style={{ transition: ".2s" }}
              ></div>
            </div>
          ) : (
            <div className="w-full h-[100svh] flex flex-col justify-center items-center bg-[#292f3f]">
              <span
                className="text-white font-[google] text-[35px] hidden  "
                style={{ transition: ".2s" }}
              >
                <b>Welcome to Infinity</b>
              </span>
              <span
                className="text-white  max-h-[90px] h-0 overflow-hidden w-full md:w-[40%] lg:w-[40%] font-[google] text-[15px] px-[30px] text-center "
                style={{ transition: ".2s" }}
              >
                Experience seamless connections and vibrant conversations with
                Infinity, where every message brings joy and connection to your
                fingertips.
              </span>
              <div
                className="px-[15px] h-[100svh] w-full cursor-pointer bg-[#1b202d] text-white rounded-none text-[16px] flex justify-center  select-none outline-none items-center"
                onClick={() => {
                  // setStart(!start);
                  // setSubStart(false);
                  // setSubSubStart(false);
                }}
                style={{ transition: ".2s" }}
              >
                {subSubStart === true ? (
                  <>
                    {mode === 1 ? (
                      <div
                        className="w-full h-full opacity-100 flex justify-center items-center"
                        style={{ transition: ".4s" }}
                      >
                        <Login />
                      </div>
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
