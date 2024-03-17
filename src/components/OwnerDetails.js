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
import { useSelector } from "react-redux";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { RiSettings3Fill } from "react-icons/ri";

import { TiGroup } from "react-icons/ti";
import { LuSettings2 } from "react-icons/lu";
import { MdGroupAdd } from "react-icons/md";
import { TbPlaystationCircle } from "react-icons/tb";
const OwnerDetails = (props) => {
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
  const [totalUsers, setTotalUsers] = useState(0);
  const [isOnline, setIsOnline] = useState(true);
  const [isAni, setIsAni] = useState();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  useEffect(() => {
    fetchownerInfo();
  }, []);

  useEffect(() => {
    UpdateIsOnline();
  }, [isOnline]);

  useEffect(() => {
    window.addEventListener("offline", function (e) {
      console.log("offline");

      setIsOnline(false);
      setIsAni(true);
      setTimeout(() => {
        // console.log("Hello, World!");
        setIsAni(false);
      }, 2000);
    });
    window.addEventListener("online", function (e) {
      console.log("online");
      setIsOnline(true);
      setIsAni(true);
      setTimeout(() => {
        // console.log("Hello, World!");
        setIsAni(false);
      }, 2000);
    });
    // console.log("navigator.onLine");
    // console.log(navigator.onLine);
  }, []);

  function Transition() {
    setIsAni(true);
    setTimeout(() => {
      // console.log("Hello, World!");
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

  const UpdateIsOnline = () => {
    const user = firebase.auth().currentUser;
    const statusRef = db.collection("Chat Record").doc(user.uid).update({
      Online: isOnline,
    });
  };

  return (
    <>
      <div className="w-full md:w-[400px] lg:w-[400px] h-[80px] bg-[#1B202D] md:bg-[#292f3f] lg:bg-[#292f3f] fixed top-0 flex   justify-between items-center px-[10px] overflow-hidden py-[10px] z-0">
        {ActiveChatUser.length === 0 ? (
          <>
            <div className="text-[18px] font-[google] font-medium text-[#ffffff] bg-[#292f3f] md:bg-[#1B202D] lg:bg-[#1B202D] w-full h-full flex justify-between items-center px-[10px] rounded-xl z-0">
              <div>
                {props.data === "Chat" ? (
                  <span className="flex justify-start items-center">
                    <BsFillChatSquareTextFill className="text-[20px]  text-white mr-[10px]" />
                    Message's ( {totalChats} )
                  </span>
                ) : props.data === "All" ? (
                  <span className="flex justify-start items-center">
                    <MdGroupAdd className="text-[20px]  text-white mr-[10px]" />
                    Total User's ( {totalUsers} )
                  </span>
                ) : props.data === "Status" ? (
                  <span className="flex justify-start items-center">
                    <TbPlaystationCircle className="text-[20px]  text-white mr-[10px]" />
                    Status's ( 1 )
                  </span>
                ) : props.data === "Group" ? (
                  <span className="flex justify-start items-center">
                    <TiGroup className="text-[20px]  text-white mr-[10px]" />
                    Group's ( 0 )
                  </span>
                ) : (
                  <span className="flex justify-start items-center">
                    <LuSettings2 className="text-[20px] mt-[-1px] text-white mr-[10px]" />
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
                          >
                            {/* Back Online */}
                          </span>
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
                          >
                            {/* Oh! Offline */}
                          </span>
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
            <div className="text-[18px] font-[google] font-medium text-[#ffffff] bg-[#292f3f] md:bg-[#1B202D] lg:bg-[#1B202D] w-full h-full hidden md:flex lg:flex justify-between items-center px-[10px] rounded-xl z-0">
              <div>
                {props.data === "Chat" ? (
                  <span className="flex justify-start items-center">
                    <BsFillChatSquareTextFill className="text-[20px]  text-white mr-[10px]" />
                    Message's ( {totalChats} )
                  </span>
                ) : props.data === "All" ? (
                  <span className="flex justify-start items-center">
                    <MdGroupAdd className="text-[20px]  text-white mr-[10px]" />
                    Total User's ( {totalUsers} )
                  </span>
                ) : props.data === "Status" ? (
                  <span className="flex justify-start items-center">
                    <TbPlaystationCircle className="text-[20px]  text-white mr-[10px]" />
                    Status's ( 0 )
                  </span>
                ) : props.data === "Group" ? (
                  <span className="flex justify-start items-center">
                    <TiGroup className="text-[20px]  text-white mr-[10px]" />
                    Group's ( 0 )
                  </span>
                ) : (
                  <span className="flex justify-start items-center">
                    <LuSettings2 className="text-[20px] mt-[-1px] text-white mr-[10px]" />
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
                          >
                            {/* Back Online */}
                          </span>
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
                          >
                            {/* Oh! Offline */}
                          </span>
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* <span className="text-[13px] font-[google] font-normal">RECENT</span> */}

        {/* <div className="w-[10%] h-[40px] text-[#ffffff] rounded-full flex justify-end items-center overflow-hidden">
          <FiSearch className="text-[23px]" /> 
        </div> */}
      </div>
      <div className="w-full md:w-[400px] lg:w-[400px] h-[70px] top-0 flex  bg-transparent justify-between items-center px-[20px]"></div>
    </>
  );
};

export default OwnerDetails;
