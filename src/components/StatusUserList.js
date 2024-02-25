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
    });
  }
  return (
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
              {photo === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              ) : (
                <img
                  src={photo}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
                  {name}
                </span>
                <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[google] font-light"></span>
              </div>
              <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[google] font-light">
                {/* {statusTimestamp} */}
              </div>
            </div>
          </div>

          <div className=" z-30 fixed bottom-0 h-[calc(100svh-90px)] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] left-[20px] md:left-[20px] lg:left-[20px] rounded-lg  flex-col flex justify-center items-center  drop-shadow-none pt-[20px] pb-[40px]">
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
            {statusPosition === statusLength - 1 ? (
              <></>
            ) : (
              <>
                <div className="fixed w-[40px] h-[60px] rounded-l-xl bg-[#000000a6] cursor-pointer text-[#ffb6b5] flex justify-center items-center right-0">
                  <FaAngleRight
                    className="text-[19px]"
                    onClick={() => {
                      if (statusPosition < statusLength - 1) {
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
              className="w-full rounded-xl object-cover max-h-[calc(100svh-150px)]"
              src={statusImageUrl[statusPosition]}
              // onError={styl}
            ></img>
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

      {statusLength > 0 ? (
        <div
          className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 select-none"
          onClick={() => {
            setShowStatus(true);
          }}
        >
          {" "}
          <div
            className=" group w-full h-[85px] md:h-[75px] lg:h-[75px] py-[10px] border-b-[1px] border-[#35384a] flex justify-center items-center bg-transparent  cursor-pointer   z-10 select-none"
            onClick={() => {
              // setShowStatus(true);
            }}
          >
            <div className="w-[50px] h-[50px] border-[1.4px] border-[#a7ff2e] rounded-full">
              {photo === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              ) : (
                <img
                  src={photo}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full text-[white]  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[google] font-normal  ">
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
                07:34 pm
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
