import React from "react";
import dp from "../assets/img/dp2.jpg";
import { auth, st } from "../firebase";
import { storage } from "../firebase";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../firebase";
import firebase from "../firebase";
import { useState, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { AiTwotoneEdit } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { BsCameraFill } from "react-icons/bs";
import { FaCamera } from "react-icons/fa";
import { upload } from "@testing-library/user-event/dist/upload";
import { getDownloadURL } from "firebase/storage";
import { onSnapshot } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { onAuthStateChanged, signOut } from "firebase/auth";
import profile2 from "../assets/img/d.png";
import profile from "../assets/img/profile.png";
import logout from "../assets/img/logout.png";
import settings from "../assets/img/settings.png";
import three from "../assets/img/threedots.png";
import cross from "../assets/img/cross.png";
import uploadd from "../assets/img/upload.png";
import { GrFormUpload } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";

const OwnerDetails = () => {
  const [ownerInfo, setOwnerInfo] = useState("");
  const [changeOwnerInfo, setChangeOwnerInfo] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [changeOwnerName, setChangeOwnerName] = useState("");
  const [isMenu, setIsMenu] = useState(false);
  const [isProfileMenu, setIsProfileMenu] = useState(false);
  const [isSettingsMenu, setIsSettingsMenu] = useState(false);
  const [nameChangeFlag, setNameChangeFlag] = useState(false);
  const [aboutChangeFlag, setAboutChangeFlag] = useState(false);
  const [image, setImage] = useState();
  const [profileURL, setProfileURL] = useState("");
  const [totalChats, setTotalChats] = useState(0);

  useEffect(() => {
    fetchownerInfo();
  }, []);

  function fetchownerInfo() {
    const user = firebase.auth().currentUser;

    const collectionRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends");

    onSnapshot(collectionRef, (snapshot) => {
      setTotalChats(snapshot.size);
    });

    const userDoc = db.collection("Chat Record").doc(user.uid);
    onSnapshot(userDoc, (snapshot) => {
      // console.log("snapshot.docssssssssssssss");
      // console.log(snapshot.data());
      setOwnerName(snapshot?.data()?.Name);
      setOwnerInfo(snapshot?.data()?.Info);
      setProfileURL(snapshot?.data()?.Photo);
    });
    // userDoc.get().then((data) => {
    //   setOwnerName(data?.data()?.Name);
    //   setOwnerInfo(data?.data()?.Info);
    //   setProfileURL(data?.data()?.Photo);
    // });
    // console.log(userDoc.data());
    // console.log(userDoc);
  }

  function Image(e) {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  function uploadImage() {
    const user = firebase.auth().currentUser;
    // const storage = getStorage();
    const fileRef = ref(storage, `/users/${user.uid}/Profile Photo`);
    uploadBytes(fileRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        db.collection("Chat Record").doc(user.uid).update({ Photo: url });
      });
      // toast.success("Photo Changed Successfully");
      toast("Photo Changed", {
        icon: "✅",
        className: "font-[nunitosans] font-normal",
        style: {
          borderRadius: "9px",
          background: "#333",
          color: "#cdd8dd",
        },
      });
      console.log("Uploaded a blob or file!");
    });
  }

  const userSignOut = () => {
    signOut(auth)
      .then(() => console.log("Signed Out Successfully"))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full h-[70px]  fixed top-0 flex md:hidden lg:hidden bg-[#1d2031] justify-between items-center px-[20px]">
        <div className="text-[18px] font-[rubik] font-medium text-[#ffffff] flex flex-col justify-center items-start">
          <span>Message's ({totalChats})</span>
          {/* <span className="text-[13px] font-[rubik] font-normal">RECENT</span> */}
        </div>
        <div className="w-[40px] h-[40px] text-[#ffffff] rounded-full flex justify-end items-center ">
          <FiSearch className="text-[23px]" />
        </div>
      </div>
      <div className="w-full h-[70px] top-0 flex md:hidden lg:hidden bg-transparent justify-between items-center px-[20px]"></div>
      <div className="w-full px-[30px] pt-[20px] h-[50px] mb-[20px] hidden md:flex lg:flex justify-center items-center">
        <div className="w-[50px] h-[50px]  rounded-full">
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
        </div>
        <div className="w-[calc(100%-95px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start overflow-hidden">
          <span className="text-[16px]  text-[#ffffff]  font-[rubik] font-normal">
            {ownerName}
          </span>
          <span className="text-[14px] whitespace-nowrap overflow-hidden text-ellipsis font-[rubik] font-light text-[#9fa5a7]  w-[93%]">
            {ownerInfo}
          </span>
        </div>

        {isMenu === true ? (
          <div
            className="w-[35px] h-[35px] bg-[#3d737d]  text-white rounded-full flex justify-center items-center cursor-pointer overflow-hidden"
            onClick={() => {
              setIsMenu(!isMenu);
              setIsProfileMenu(false);
              setIsSettingsMenu(false);
              setNameChangeFlag(false);
              setAboutChangeFlag(false);
            }}
          >
            <RxCross2 className="text-[20px]" />
            {/* <img src={cross} className="w-[25px]"></img> */}
          </div>
        ) : (
          <div
            className="w-[35px] h-[35px]  text-[white] hover:text-black hover:bg-[#3d737d] rounded-full flex justify-center items-center cursor-pointer overflow-hidden"
            onClick={() => {
              setIsMenu(!isMenu);
            }}
          >
            <PiDotsThreeOutlineVerticalFill className="text-[20px]" />
            {/* <img src={three} className="w-[25px]"></img> */}
          </div>
        )}

        {/* <AiTwotoneEdit className="text-white" /> */}
      </div>
      {isMenu === true ? (
        <>
          {isProfileMenu === true ? (
            <div
              className="h-[120px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] mt-[60px] fixed rounded-lg px-[10px]  flex justify-between items-center drop-shadow-lg z-10 text-[#ccd7dc] bg-[#3d737d] backdrop-blur-md font-[nunitosans] "
              style={{ transition: ".3s" }}
            >
              {/* <span
                className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center"
                onClick={() => {
                  setIsProfileMenu(true);
                }}
              >
                <CgProfile className="mr-[10px]" /> Profile
              </span>
              <span
                className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center"
                onClick={() => {
                  setIsSettingsMenu(true);
                }}
              >
                <IoSettingsSharp className="mr-[10px]" /> Settings
              </span>
              <span className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center">
                <FiLogOut className="mr-[10px]" /> Logout
              </span> */}
              {/* <span>Profile</span> */}
              <div className="w-[calc(100%-115px)] h-full py-[10px] pb-[13px] flex flex-col justify-between items-start">
                <span
                  className="text-[12px] text-[#fff] font-normal font-[rubik] ml-[7px] px-[3px] bg-[#3d737d] z-30"
                  // style={{ zIndex: "40" }}
                >
                  Name
                </span>
                <div className="flex">
                  {nameChangeFlag === true ? (
                    <input
                      autoFocus
                      onChange={(e) => setChangeOwnerName(e.target.value)}
                      value={changeOwnerName}
                      className="text-[14px] w-[calc(100%-45px)] outline-none bg-transparent text-[#fff] font-normal border-[1px] border-white px-[10px] mt-[-11px] rounded-[4px] py-[5px] font-[rubik] input z-10"
                      style={{ zIndex: "10" }}
                    ></input>
                  ) : (
                    <input
                      disabled
                      value={ownerName}
                      className="text-[14px] w-[calc(100%-45px)] outline-none bg-transparent text-[#9d9d9d] font-normal border-[1px] border-black px-[10px] mt-[-11px] rounded-[4px] py-[5px] font-[rubik] input"
                      style={{ zIndex: "-5" }}
                    ></input>
                  )}
                  {nameChangeFlag === true ? (
                    <div
                      className="ml-[10px] hover:bg-white hover:text-black cursor-pointer w-[25px] h-[25px] mr-[10px] rounded-full flex justify-center items-center"
                      onClick={() => {
                        const user = firebase.auth().currentUser;

                        const UpdateRef = db
                          .collection("Chat Record")
                          .doc(user.uid);

                        UpdateRef.update({
                          Name: changeOwnerName,
                          // Info: "hello world",
                        });
                        setNameChangeFlag(false);
                        toast.success("Profile Name Changed", {
                          style: {
                            backgroundColor: "#333333",
                            color: "#fff",
                            font: "work",
                            fontWeight: "400",
                          },
                        });
                      }}
                    >
                      ✅{/* <AiTwotoneEdit className="" /> */}
                    </div>
                  ) : (
                    <div
                      className="ml-[10px] hover:bg-[#fff] hover:text-[black] font-normal font-[rubik] text-[white] cursor-pointer w-[25px] h-[25px] mr-[10px] rounded-full flex justify-center items-center"
                      onClick={() => {
                        setChangeOwnerName(ownerName);
                        setNameChangeFlag(true);
                      }}
                    >
                      <AiTwotoneEdit className="" />
                    </div>
                  )}
                </div>
                <span
                  className="text-[12px] text-[#000000] font-normal font-[rubik] ml-[7px] px-[3px] bg-[#3d737d]  "
                  style={{ zIndex: "4" }}
                >
                  About
                </span>
                <div className="flex " style={{ zIndex: "0" }}>
                  {aboutChangeFlag === true ? (
                    <input
                      autoFocus
                      onChange={(e) => setChangeOwnerInfo(e.target.value)}
                      value={changeOwnerInfo}
                      className="text-[14px] w-[calc(100%-45px)] outline-none border-[1px] border-black px-[10px] mt-[-11px] rounded-[4px] py-[5px] bg-transparent text-[#000000] font-normal font-[rubik] input"
                      style={{ zIndex: "-5" }}
                    ></input>
                  ) : (
                    <input
                      disabled
                      value={ownerInfo}
                      className="text-[14px] w-[calc(100%-45px)] outline-none border-[1px] border-black px-[10px] mt-[-11px] rounded-[4px] py-[5px] bg-transparent text-[#9d9d9d] font-normal font-[rubik] input"
                      style={{ zIndex: "-5" }}
                    ></input>
                  )}
                  {aboutChangeFlag === true ? (
                    <div
                      className="ml-[10px] hover:bg-[#fff] hover:text-[#000] cursor-pointer w-[25px] h-[25px] mr-[10px] rounded-full flex justify-center items-center"
                      onClick={() => {
                        const user = firebase.auth().currentUser;

                        const UpdateRef = db
                          .collection("Chat Record")
                          .doc(user.uid);

                        UpdateRef.update({
                          Info: changeOwnerInfo,
                          // Info: "hello world",
                        });
                        setAboutChangeFlag(false);
                        toast.success("Profile Info Changed", {
                          style: {
                            backgroundColor: "#333333",
                            color: "#fff",
                            font: "work",
                            fontWeight: "400",
                          },
                        });
                      }}
                    >
                      ✅{/* <AiTwotoneEdit className="" /> */}
                    </div>
                  ) : (
                    <div
                      className="ml-[10px] hover:bg-white hover:text-black text-white cursor-pointer w-[25px] h-[25px] mr-[10px] rounded-full flex justify-center items-center"
                      onClick={() => {
                        setChangeOwnerInfo(ownerInfo);
                        setAboutChangeFlag(true);
                      }}
                    >
                      <AiTwotoneEdit className="" />
                    </div>
                  )}
                </div>
              </div>
              <div className="group w-[80px] bg-slate-400 h-[80px] rounded-full  flex justify-center items-center">
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
                  className="group-hover:opacity-10 fixed opacity-0 text-white bg-transparent w-[35px] h-[35px] rounded-full z-30 cursor-pointer"
                  onChange={(e) => Image(e)}
                ></input>
                <div
                  // onclick={document.getElementById("getFile").click()}
                  className="group-hover:opacity-100 opacity-0 w-[35px] h-[35px] flex justify-center items-center bg-[#0b0c0b94] fixed rounded-full cursor-pointer z-10"
                >
                  <BsCameraFill className="text-white" />
                </div>
              </div>
              {/* <div className="group w-[80px] h-[80px] rounded-full bg-[#cdd8dd] flex justify-center items-center"> */}
              <button
                className="text-white flex justify-center items-center hover:bg-[white] hover:text-[black] w-[35px] h-[35px] rounded-full"
                onClick={() => {
                  if (image) {
                    uploadImage();
                    setImage();
                    console.log("upload");
                  } else {
                    console.log("not upload");
                    // toast.error("Select Image First");
                    toast("Select Image", {
                      icon: "❌",
                      className: "font-[nunitosans] font-normal",
                      style: {
                        borderRadius: "9px",
                        background: "#333",
                        color: "#cdd8dd",
                      },
                    });
                  }
                }}
              >
                {/* <MdOutlineFileUpload className="text-[20px]" /> */}
                <GrFormUpload className="text-[25px]" />
                {/* <img src={uploadd} className="w-[25px]"></img> */}
              </button>
              {/* </div> */}
            </div>
          ) : isSettingsMenu === true ? (
            <div className="h-[120px] w-[360px] mt-[60px] fixed rounded-lg px-[20px] bg-[#0b0c0b] text-[#cdd8dd] flex flex-col justify-center">
              {/* <span
                className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center"
                onClick={() => {
                  setIsProfileMenu(true);
                }}
              >
                <CgProfile className="mr-[10px]" /> Profile
              </span>
              <span
                className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center"
                onClick={() => {
                  setIsSettingsMenu(true);
                }}
              >
                <IoSettingsSharp className="mr-[10px]" /> Settings
              </span>
              <span className="hover:bg-[#cdd8dd] hover:text-black  cursor-pointer px-[10px] py-[4px] flex justify-start items-center">
                <FiLogOut className="mr-[10px]" /> Logout
              </span> */}
              <span>Settings</span>
            </div>
          ) : (
            <div
              className="h-[120px] w-[170px] mt-[60px] fixed rounded-lg p-[10px] text-[black] bg-[#3d737d]  z-10 flex flex-col justify-center drop-shadow-lg "
              style={{ transition: ".5s" }}
            >
              <span
                style={{ transition: "2s", transitionDelay: ".2s" }}
                className=" opacity-100 cursor-pointer  flex justify-start items-center"
                onClick={() => {
                  setIsProfileMenu(true);
                }}
              >
                {/* <CgProfile className="mr-[10px]" /> */}
                <div
                  className="w-full h-full px-[10px] py-[4px] hover:bg-[#b8dedf] rounded-md  text-[white] font-[rubik] font-light text-[15px]  hover:text-black flex justify-start items-center "
                  // style={{ transition: ".2s" }}
                >
                  <img src={profile} className="w-[25px] mr-[8px]"></img>{" "}
                  Profile
                </div>
              </span>
              <span
                style={{ transition: "2s", transitionDelay: ".6s" }}
                className="opacity-100 cursor-pointer flex justify-start items-center"
                onClick={() => {
                  setIsSettingsMenu(true);
                }}
              >
                <div
                  className="w-full h-full px-[10px] py-[4px] hover:bg-[#b8dedf] rounded-md  text-[white] font-[rubik] font-light text-[15px]  hover:text-black flex justify-start items-center "
                  // style={{ transition: ".2s" }}
                >
                  <img src={settings} className="w-[25px] mr-[8px]"></img>{" "}
                  Settings
                </div>
                {/* <IoSettingsSharp className="mr-[10px]" /> */}
              </span>
              <span
                style={{ transition: "2s", transitionDelay: "1s" }}
                className="opacity-100 cursor-pointer flex justify-start items-center"
                onClick={() => {
                  userSignOut();
                }}
              >
                <div
                  className="w-full h-full px-[10px] py-[4px] hover:bg-[#b8dedf] rounded-md  text-[white] font-[rubik] font-light text-[15px]  hover:text-black flex justify-start items-center "
                  // style={{ transition: ".2s" }}
                >
                  <img src={logout} className="w-[25px] mr-[8px]"></img> Logout
                </div>
                {/* <FiLogOut className="mr-[10px]" /> */}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <div
            className="h-[120px] w-[0] mt-[60px] fixed rounded-lg  text-[white] bg-[#3d737d]    z-10 flex flex-col justify-center"
            style={{ transition: ".5s" }}
          >
            <span
              style={{ transition: ".15s", transitionDelay: "0s" }}
              className="hover:bg-[#cdd8dd] w-0 hover:text-black rounded-md  cursor-pointer opacity-0  flex justify-start items-center"
              onClick={() => {
                setIsProfileMenu(true);
              }}
            >
              {/* <CgProfile className="mr-[10px]" /> */}
              <img src={profile} className="w-[25px] mr-[8px]"></img> Profile
            </span>
            <span
              style={{ transition: ".15s", transitionDelay: "0s" }}
              className="hover:bg-[#cdd8dd] hover:text-black rounded-md  w-0 cursor-pointer opacity-0  flex justify-start items-center"
              onClick={() => {
                setIsSettingsMenu(true);
              }}
            >
              {/* <IoSettingsSharp className="mr-[10px]" /> */}
              <img src={settings} className="w-[25px] mr-[8px]"></img> Settings
            </span>
            <span
              style={{ transition: ".15s", transitionDelay: "0s" }}
              className="hover:bg-[#cdd8dd] hover:text-black rounded-md w-0  cursor-pointer opacity-0  flex justify-start items-center"
              onClick={() => {
                userSignOut();
              }}
            >
              {/* <FiLogOut className="mr-[10px]" /> */}
              <img src={logout} className="w-[25px] mr-[8px]"></img> Logout
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default OwnerDetails;
