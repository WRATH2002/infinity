import React from "react";
import profile2 from "../assets/img/d.png";
import { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { arrayRemove, arrayUnion, onSnapshot } from "firebase/firestore";
import { FaCircleCheck } from "react-icons/fa6";
import { RiCheckboxBlankLine, RiCheckboxFill } from "react-icons/ri";

const AddGroupMember = (props) => {
  const [theme, setTheme] = useState(true);
  const [profile, setProfile] = useState(true);
  const [name, setName] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [about, setAbout] = useState(true);
  const [uid, setUid] = useState("");
  const [adminModal, setAdminModal] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
    setUid(props?.data?.UserId);

    // console.log("addgroup memberbjhbhbv dvvhisvhsvubosubv");
    // console.log(props);
  }, []);

  useEffect(() => {
    const ref = db.collection("Chat Record").doc(props?.data?.UserId);
    onSnapshot(ref, (snapshot) => {
      setName(snapshot?.data()?.Name);
      setAbout(snapshot?.data()?.Info);
      setProfile(snapshot?.data()?.Photo);
    });
  }, []);

  function addMemberToGroup() {
    db.collection("Chat Record")
      .doc(props?.data?.UserId)
      .collection("Group")
      .doc(props?.groupName)
      .set({
        Admin: false,
      });

    db.collection("Groups")
      .doc(props?.groupName)
      .update({
        Member: arrayUnion(uid),
      });

    setIsAdded(true);
    props?.selected(props?.sel + 1);
  }

  function Unselect() {
    db.collection("Groups")
      .doc(props?.groupName)
      .update({
        // Member: Member.filter((post) => post !== props?.data),
        Member: arrayRemove(uid),
      });
    setIsAdded(false);
    props?.selected(props?.sel - 1);
  }

  return (
    <>
      {adminModal === true ? (
        <>
          <div
            className="w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[100svh] fixed right-0 top-0 backdrop-blur-md flex justify-center items-center bg-[#17171a25] z-50"
            onClick={() => {
              setAdminModal(false);
            }}
          >
            <div
              className={
                "w-[320px] h-auto p-[20px] py-[10px] text-[15px] flex flex-col justify-center items-start rounded-3xl font-[google] font-normal" +
                (theme
                  ? " bg-[#ffffff] text-black"
                  : " bg-[#222228] text-white")
              }
              style={{ zIndex: "999" }}
              onClick={() => {}}
            >
              <div
                className={
                  "w-full h-[35px] flex justify-start items-center cursor-pointer" +
                  (!isAdded ? " " : " text-[#808080c4]")
                }
                onClick={() => {
                  if (!isAdded) {
                    addMemberToGroup();
                  }
                }}
              >
                <RiCheckboxFill className="text-[18px] mr-[10px]" /> Select{" "}
                {name}
              </div>
              <div
                className={
                  "w-full h-[35px] flex justify-start items-center cursor-pointer" +
                  (isAdded ? " " : " text-[#808080c4]")
                }
                onClick={() => {
                  if (isAdded) {
                    Unselect();
                    // console.log(uid);
                  }
                }}
              >
                <RiCheckboxBlankLine className="text-[18px] mr-[10px]" />{" "}
                Unselect {name}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className=" group w-[100%] h-[65px]  py-[10px] flex items-center justify-center cursor-pointer bg-transparent ">
        <div
          className={
            "w-[100%] h-[65px] py-[10px] flex items-center justify-center cursor-pointer px-[10px]   " +
            (isAdded
              ? theme
                ? " bg-[#c9c5ff]"
                : " bg-[#756dedcd]"
              : " bg-transparent")
          }
          // onClick={() => {
          //   // addMemberToGroup();
          //   setAdminModal(true);
          // }}

          onClick={() => {
            if (!isAdded) {
              addMemberToGroup();
            } else if (isAdded) {
              Unselect();
              // console.log(uid);
            }
          }}
        >
          <div
            className={
              "w-[45px] h-[45px]   rounded-[18px] " +
              (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
            }
          >
            {profile === "nophoto" ? (
              <>
                <img
                  src={profile2}
                  className="w-full h-full rounded-[18px] object-cover  "
                ></img>
              </>
            ) : (
              <>
                <img
                  src={profile}
                  className="w-full h-full rounded-[18px] object-cover "
                ></img>
              </>
            )}
          </div>
          <div
            className=" w-[calc(100%-55px)] h-[50px] ml-[15px]  flex  justify-start items-center"
            onClick={() => {}}
          >
            <div className="w-[calc(100%-50px)] font-semibold flex flex-col justify-center items-start h-full">
              <span
                className={
                  "w-full text-[17px] h-[23px]  flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-[google] font-normal" +
                  (!theme
                    ? isAdded
                      ? " text-[white]"
                      : " text-[white]"
                    : " text-[#000000]")
                }
                // style={{ transition: ".9s" }}
              >
                {name}
              </span>
              <span
                className={
                  "w-full  text-[14px]   mt-[2px] h-[19px] overflow-hidden text-ellipsis line-clamp-1     font-[work] font-normal" +
                  (!theme
                    ? isAdded
                      ? " text-[#bdbdbd]"
                      : " text-[#bdbdbd]"
                    : " text-[#5f5f5f]")
                }
              >
                {about}
              </span>
            </div>
            <div className="w-[50px] flex justify-center items-center h-[50px]">
              {/* <span
              className={
                "w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] font-normal" +
                (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
              }
            >
              {about}
            </span>
            <span className="w-[70px] text-[14px] h-full font-normal  flex justify-end items-center"></span> */}
              {isAdded ? (
                <>
                  <FaCircleCheck
                    className={
                      "text-[20px] " +
                      (theme ? " text-[#8981f7]" : " text-[#ffffff]")
                    }
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddGroupMember;
