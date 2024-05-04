import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import firebase from "../firebase";
import { onSnapshot } from "firebase/firestore";
import profile2 from "../assets/img/d.png";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const StatusUserList = (props) => {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [statusLength, setStatusLength] = useState(0);
  const [statusPosition, setStatusPosition] = useState(0);
  const [statusImageUrl, setStatusImageUrl] = useState();
  const [stTime, setStTime] = useState("");
  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  useEffect(() => {
    console.log("propssssssssssssssssssssssssssssss");
    console.log(props);
    getInfo();
  }, []);

  function getInfo() {
    const user = firebase.auth().currentUser;
    const UserRef = db.collection("Chat Record").doc(props.data.UserId);
    onSnapshot(UserRef, (snapshot) => {
      console.log(snapshot.data());
      setName(snapshot.data().Name);
      setPhoto(snapshot.data().Photo);
      setStatusLength(snapshot.data()?.Status?.length);
      console.log(snapshot.data()?.Status?.length);
      setStatusImageUrl(snapshot.data().Status);
      setStTime(snapshot?.data()?.StTime);
    });
  }

  function isLink(inputString) {
    // Regular expression to match URLs
    const urlPattern = /^(?:https?:\/\/)?(?:www\.)?[\w.-]+\.\w{2,}(?:\/\S*)?$/i;

    // Test if the input string matches the URL pattern
    return urlPattern.test(inputString);
  }

  return (
    <>
      {showStatus === true ? (
        // <div className="fixed">
        <div
          className={
            " z-50 fixed bottom-0 h-[100svh]  w-full md:w-[400px] lg:w-[400px] left-0 flex-col flex justify-center items-center" +
            (theme
              ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
              : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
          }
        >
          {/* Cross ------------------------- */}
          <div
            className={
              "fixed top-[25px] left-[calc(100%-55px)] md:left-[calc(400px-55px)]  lg:left-[calc(400px-55px)]  w-[35px] h-[35px]  rounded-full drop-shadow-none  flex justify-center items-center  cursor-pointer rotate-45 z-40" +
              (theme ? " bg-[#17171a] text-white" : " bg-[white] text-black")
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
              " group w-full md:w-[400px] lg:w-[400px] h-[90px] py-[10px] flex justify-start items-center  cursor-pointer font-[google] font-normal  px-[20px]  text-[#ffffff]  fixed top-0   drop-shadow-none" +
              (theme
                ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
            }
            onClick={() => {
              // setShowStatus(true);
            }}
          >
            <div className="w-[59px] h-[59px] border-[2.4px] borderGrad  flex justify-center items-center rounded-[20px] z-10">
              {photo === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-[50px] h-[50px] rounded-[20px] object-cover z-10 "
                ></img>
              ) : (
                <img
                  src={photo}
                  className="w-[50px] h-[50px] rounded-[20px] object-cover z-10 "
                ></img>
              )}
              <div
                className={
                  "w-[53.2px] h-[53.2px] rounded-[20px] bg-white fixed z-0" +
                  (theme
                    ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                    : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
                }
              ></div>
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className={
                    "w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                    (theme ? "  text-black" : "  text-white")
                  }
                >
                  {name}
                </span>
                <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light"></span>
              </div>
              <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                {stTime}
              </div>
            </div>
          </div>

          <div className=" z-30 fixed bottom-0 h-[100svh] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] left-[20px] md:left-[20px] lg:left-[20px] rounded-lg  flex-col flex justify-center items-center   pt-[20px] pb-[40px] drop-shadow-none">
            {/* Left Arrow ------------------------- */}

            {statusPosition === 0 ? (
              <></>
            ) : (
              <>
                <div
                  className={
                    "fixed w-[26px] h-[46px] rounded-full  cursor-pointer  flex justify-center items-center left-0" +
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
            {statusPosition === statusLength - 1 ? (
              <></>
            ) : (
              <>
                <div
                  className={
                    "fixed w-[26px] h-[46px] rounded-full  cursor-pointer  flex justify-center items-center right-0" +
                    (theme
                      ? " bg-[#17171a] text-white"
                      : " bg-[white] text-black")
                  }
                  onClick={() => {
                    if (statusPosition < statusLength - 1) {
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
            {statusImageUrl[statusPosition]?.url === "text" ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
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
              {Array(statusLength)
                .fill()
                .map((item, index) => {
                  return (
                    <>
                      {index === statusPosition ? (
                        <div
                          className={
                            "w-[8px] mx-[2px] h-[4px] rounded-full" +
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

      {statusLength > 0 ? (
        <div
          className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 select-none"
          onClick={() => {
            setShowStatus(true);
          }}
        >
          {" "}
          <div
            className={
              " group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px] flex justify-center items-center bg-transparent  cursor-pointer   z-10 select-none" +
              (theme ? " border-[#dde1e7]" : " border-[#212129] ")
            }
            onClick={() => {
              // setShowStatus(true);
            }}
          >
            <div className="w-[59px] h-[59px] border-[2.4px] borderGrad  flex justify-center items-center rounded-[20px] z-10">
              {photo === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-[50px] h-[50px] rounded-[20px] object-cover z-10 "
                ></img>
              ) : (
                <img
                  src={photo}
                  className="w-[50px] h-[50px] rounded-[20px] object-cover z-10 "
                ></img>
              )}
              <div
                className={
                  "w-[53.2px] h-[53.2px] rounded-[20px] fixed z-0" +
                  (theme
                    ? " bg-[#e4eaf1] md:bg-[#e4eaf1] lg:bg-[#e4eaf1]"
                    : " bg-[#17171a] md:bg-[#17171a] lg:bg-[#17171a]")
                }
              ></div>
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className={
                    "w-[calc(100%-70px)] text-[16px] h-full   flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  " +
                    (theme ? "  text-black" : "  text-white")
                  }
                >
                  {/* {props.data.user} */}
                  {/* {ownerName} */}
                  {name}
                </span>
                <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                  {/* {statusCount} */}
                </span>
              </div>
              <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                {stTime}
              </div>
              {/* <span className="text-[15px]">Hello! How Are you</span> */}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default StatusUserList;
