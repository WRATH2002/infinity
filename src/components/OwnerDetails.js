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

  useEffect(() => {
    fetchownerInfo();
  }, []);

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

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="w-full md:w-[400px] lg:w-[400px] h-[70px]  fixed top-0 flex  bg-[#1c1f2f] justify-between items-center px-[20px] overflow-hidden">
        <div className="text-[18px] w-[90%] font-[google] font-medium text-[#ffffff] flex flex-col justify-center items-start">
          {props.data === "Chat" ? (
            <span>Message's ( {totalChats} )</span>
          ) : props.data === "All" ? (
            <span>Total User's ( {totalUsers} )</span>
          ) : props.data === "Status" ? (
            <span>Status's ( 3 )</span>
          ) : props.data === "Group" ? (
            <span>Group's ( 0 )</span>
          ) : (
            <></>
          )}
          {/* <span className="text-[13px] font-[google] font-normal">RECENT</span> */}
        </div>
        <div className="w-[10%] h-[40px] text-[#ffffff] rounded-full flex justify-end items-center overflow-hidden">
          {/* <FiSearch className="text-[23px]" /> */}
        </div>
      </div>
      <div className="w-full md:w-[400px] lg:w-[400px] h-[70px] top-0 flex  bg-transparent justify-between items-center px-[20px]"></div>
    </>
  );
};

export default OwnerDetails;
