import React from "react";
import dp from "../assets/img/dp2.jpg";
import profile2 from "../assets/img/d.png";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import {
  MdBookmarkAdd,
  MdBookmarkRemove,
  MdBugReport,
  MdCall,
  MdDoNotDisturb,
  MdGroupRemove,
  MdOutlineAdd,
  MdPersonRemoveAlt1,
} from "react-icons/md";
import { BiCross, BiSolidVideo } from "react-icons/bi";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { addActiveUser } from "../utils/chatSlice";
import {
  FieldValue,
  arrayRemove,
  arrayUnion,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import back from "../assets/img/back.png";
import call from "../assets/img/call.png";
import videocall from "../assets/img/videocall.png";
import chat from "../assets/img/message.png";
// import back from "../assets/img/back.png";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import { MdChevronRight } from "react-icons/md";
import download from "../assets/img/download.png";
import { saveAs } from "file-saver";
import toast, { Toaster, useToaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import del from "../assets/img/delete2.png";
import { IoIosInformationCircle, IoMdVideocam } from "react-icons/io";
import { LuChevronRight, LuRefreshCw, LuSettings2 } from "react-icons/lu";
import { RiMessage2Fill, RiSettings3Fill } from "react-icons/ri";
import { BsFiletypeJpg, BsFillCameraFill } from "react-icons/bs";
import { BsFiletypePng } from "react-icons/bs";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypePdf } from "react-icons/bs";
import { BsFiletypeDocx } from "react-icons/bs";
import { BsFiletypeXlsx } from "react-icons/bs";
import { BsFiletypePpt } from "react-icons/bs";
import { BsFiletypePptx } from "react-icons/bs";
import { BsFiletypeExe } from "react-icons/bs";
import { BsFiletypeGif } from "react-icons/bs";
import { BsFileEarmark } from "react-icons/bs";
import { BsFileEarmarkZip } from "react-icons/bs";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { BsFileEarmarkPlay } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { TiLockClosed, TiLockOpen, TiUserAdd } from "react-icons/ti";
import { TbAlertTriangle } from "react-icons/tb";
import { BsCameraFill } from "react-icons/bs";
import { uploadBytes } from "firebase/storage";
import { RiEditFill } from "react-icons/ri";
import AddGroupMember from "./AddGroupMember";
import { IoExit } from "react-icons/io5";
import { HiBadgeCheck } from "react-icons/hi";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
// import {MdCall} from "react-icons/md";

// import { FaAngleLeft } from "react-icons/fa6";

// const Media = (props) => {
//   const [url, setUrl] = useState("");
//   const downloadImage = (data) => {
//     // console.log("url");
//     console.log(data);
//     let urll = data;
//     saveAs(urll, "helo.jpg");
//   };
//   return (
//     <>
//       {/* <div className="w-full h-full justify-start items-center  flex"> */}

//       {props.data.mop === "Photos" ? (
//         <>
//           {!props.data.docName ? (
//             <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
//               <img
//                 className="w-full h-full rounded-xl"
//                 src={props.data.url}
//               ></img>
//             </div>
//           ) : (
//             // <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl">
//             //   <img
//             //     className="group-hover:opacity-40 w-full h-full object-cover rounded-xl"
//             //     src={props.data.url}
//             //   ></img>
//             //   <div className="min-w-[90px] lg:min-w-[120px] md:min-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mt-[-90px] lg:mt-[-120px] md:mt-[-120px] rounded-xl flex justify-center items-center bg-[#1f201f]">
//             //     <div
//             //       className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm z-20 cursor-pointer "
//             //       onClick={() => {
//             //         setUrl(props.data.url);
//             //         downloadImage(props.data.url);
//             //         toast("Downloading Image", {
//             //           icon: "⬇️",
//             //           className: "font-[nunitosans] font-normal",
//             //           style: {
//             //             borderRadius: "9px",
//             //             background: "#333",
//             //             color: "#cdd8dd",
//             //           },
//             //         });
//             //       }}
//             //     >
//             //       <img src={download} className="w-[20px]   z-20 "></img>
//             //     </div>
//             //   </div>
//             // </div>
//             <></>
//           )}
//         </>
//       ) : (
//         <></>
//       )}
//       {/* {!props.data.docName ? (
//         <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl">
//           <img
//             className="group-hover:opacity-40 w-full h-full object-cover rounded-xl"
//             src={props.data.url}
//           ></img>
//           <div className="min-w-[90px] lg:min-w-[120px] md:min-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mt-[-90px] lg:mt-[-120px] md:mt-[-120px] rounded-xl flex justify-center items-center bg-[#1f201f]">
//             <div
//               className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm z-20 cursor-pointer "
//               onClick={() => {
//                 setUrl(props.data.url);
//                 downloadImage(props.data.url);
//                 toast("Downloading Image", {
//                   icon: "⬇️",
//                   className: "font-[nunitosans] font-normal",
//                   style: {
//                     borderRadius: "9px",
//                     background: "#333",
//                     color: "#cdd8dd",
//                   },
//                 });
//               }}
//             >
//               <img src={download} className="w-[20px]   z-20 "></img>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl ">
//           <div className="w-full h-full bg-white rounded-xl flex justify-center items-center">
//             <div className="w-[70px] h-[70px] rounded-xl bg-[#e8e8e8] flex justify-center items-center text-black font-[google] font-light ">
//               {props.data.docName
//                 ?.substring(props.data.docName?.indexOf(".") + 1)
//                 .toUpperCase()}
//             </div>
//           </div>
//         </div>
//       )} */}
//       {/* <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
//         <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div>
//         <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
//         <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div> */}
//       {/* </div> */}
//     </>
//   );
// };

const Members = (props) => {
  const [theme, setTheme] = useState(true);
  const [profile, setProfile] = useState(true);
  const [name, setName] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [about, setAbout] = useState(true);
  const [admin, setAdmin] = useState(true);
  const [adminModal, setAdminModal] = useState(false);
  const [me, setMe] = useState(false);
  const [uid, setUid] = useState("");
  const [userAdmin, setUserAdmin] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
    setUid(props?.data);
    const Adref = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      .doc(props?.groupName);
    onSnapshot(Adref, (snapshot) => {
      setUserAdmin(snapshot?.data()?.Admin);
    });
    // console.log("addgroup memberbjhbhbv dvvhisvhsvubosubv");
    // console.log(props);
  }, [props?.data]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(props?.data);
    if (user.uid === props?.data) {
      setMe(true);
    } else {
      setMe(false);
    }
    onSnapshot(ref, (snapshot) => {
      if (user.uid === props?.data) {
        setName("You");
      } else {
        setName(snapshot?.data()?.Name);
      }
      // setName(snapshot?.data()?.Name);
      setAbout(snapshot?.data()?.Info);
      setProfile(snapshot?.data()?.Photo);
    });
    const adminRef = db
      .collection("Chat Record")
      .doc(props?.data)
      .collection("Group")
      .doc(props?.groupName);
    onSnapshot(adminRef, (snapshot) => {
      setAdmin(snapshot?.data()?.Admin);
    });
  }, [props?.data]);

  function makeAdmin() {
    db.collection("Chat Record")
      .doc(props?.data)
      .collection("Group")
      .doc(props?.groupName)
      .update({ Admin: true });
    setAdminModal(false);
  }

  function dismissAdmin() {
    db.collection("Chat Record")
      .doc(props?.data)
      .collection("Group")
      .doc(props?.groupName)
      .update({ Admin: false });
    setAdminModal(false);
  }

  function remove() {
    db.collection("Groups")
      .doc(props?.groupName)
      .update({
        // Member: Member.filter((post) => post !== props?.data),
        Member: arrayRemove(uid),
      });

    db.collection("Chat Record")
      .doc(uid)
      .collection("Group")
      .doc(props?.groupName)
      .delete();

    // dispatch(addActiveUser(""));

    // console.log(uid);
  }

  return (
    <>
      {adminModal === true ? (
        <>
          <div
            className={
              "w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[100svh] fixed right-0 top-0 backdrop-blur-md flex justify-center items-center  z-50" +
              (theme ? " bg-[#17171a25]" : " bg-[#0000008c]")
            }
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
                className="w-full h-[35px] flex justify-start items-center cursor-pointer"
                onClick={() => {
                  // if (!admin) {
                  // makeAdmin();
                  // }

                  dispatch(addActiveUser(uid));
                }}
              >
                <RiMessage2Fill className="text-[18px] mr-[10px]" /> Message{" "}
                {name}
              </div>
              <div
                className={
                  "w-full h-[35px] flex justify-start items-center cursor-pointer" +
                  (!admin ? " " : " text-[#808080c4]")
                }
                onClick={() => {
                  if (!admin) {
                    makeAdmin();
                  }
                }}
              >
                <MdBookmarkAdd className="text-[18px] mr-[10px]" /> Admin {name}
              </div>
              <div
                className={
                  "w-full h-[35px] flex justify-start items-center cursor-pointer" +
                  (admin ? " " : " text-[#808080c4]")
                }
                onClick={() => {
                  if (admin) {
                    dismissAdmin();
                  }
                }}
              >
                <MdBookmarkRemove className="text-[18px] mr-[10px]" /> Dismiss
                as Admin
              </div>
              <div
                className="w-full h-[35px] flex justify-start items-center cursor-pointer"
                onClick={() => {
                  //   if (admin) {
                  remove();
                  //   }
                }}
              >
                <MdPersonRemoveAlt1 className="text-[18px] mr-[10px]" /> Remove{" "}
                {name}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <div className="w-[100%] h-[65px]  py-[10px] flex items-center justify-center cursor-pointer bg-transparent ">
        <div
          className="w-[100%] h-[65px] py-[10px] flex items-center justify-center cursor-pointer     rounded-2xl"
          onClick={() => {
            if (userAdmin === true) {
              setAdminModal(true);
            }
          }}
        >
          <div
            className={
              "w-[45px] h-[45px]   rounded-[18px] " +
              (theme ? " bg-[#ffffff]" : " bg-[#222228]")
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
            className=" w-[calc(100%-55px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start"
            onClick={() => {}}
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
                {name === "You" ? (
                  <>
                    {name}{" "}
                    <HiBadgeCheck className="text-[19px] text-[#8981f7] ml-[5px]" />{" "}
                  </>
                ) : (
                  <>{name}</>
                )}
                {/* {isOnline} */}
              </span>
              <span
                className={
                  "w-[100px]  h-full text-[12px] font-normal font-[google]  flex justify-center rounded-md items-center whitespace-nowrap " +
                  (theme
                    ? admin
                      ? " text-black bg-[#c9c5ff]"
                      : " text-transparent bg-transparent"
                    : admin
                    ? " text-white bg-[#756dedcd]"
                    : " text-transparent bg-transparent")
                }
              >
                {admin ? <>Group Admin</> : <></>}
              </span>
            </div>
            <div className="w-full flex h-[23px]">
              <span
                className={
                  "w-[100%] text-[14px]   mt-[2px] h-[19px] overflow-hidden text-ellipsis line-clamp-1  font-[work] font-normal" +
                  (theme ? " text-[#5f5f5f]" : " text-[#bdbdbd]")
                }
              >
                {about}
              </span>
              {/* <span className="w-[70px] text-[14px] h-full font-normal  flex justify-end items-center"></span> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const MemberName = (props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    fetchMemberName();
  }, []);

  function fetchMemberName() {
    const user = firebase.auth().currentUser;
    if (user.uid === props?.id) {
      setName("You");
    } else {
      const userName = db.collection("Chat Record").doc(props?.id);
      onSnapshot(userName, (snapshot) => {
        setName(snapshot.data().Name);
      });
    }
  }
  return (
    <>
      <div className="text-[14px]  font-[work] font-light   z-20">
        {" "}
        {name},{" "}
      </div>
    </>
  );
};

export const GroupInfo = () => {
  const [chatUserNumber, setChatUserNumber] = useState("");
  const [chatUserName, setChatUserName] = useState("");
  const [chatUserAbout, setChatUserAbout] = useState("");
  const [userSidebar, setUserSidebar] = useState(false);
  const [expand, setExpand] = useState(false);
  const [chatUserPhoto, setChatUserPhoto] = useState("");
  const [media, setMedia] = useState();
  const [delConfirmation, setDelConfirmation] = useState(false);

  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);
  const [chatFlag, setChatFlag] = useState("");
  const [docName, setDocName] = useState("");

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ImageMediaLink = useSelector((store) => store.chat.imageMediaLink);

  const dispatch = useDispatch();

  const allFriends = useSelector((store) => store.chat.FriendList);
  const UserList = useSelector((store) => store.chat.FriendList);

  const [arr, setArr] = useState([]);
  const [timer, setTimer] = useState(false);
  const [theme, setTheme] = useState(true);
  const [mediaOption, setMediaOption] = useState("Documents");
  const [mediaShow, setMediaShow] = useState(false);
  const [chatLockModal, setChatLockModal] = useState(false);
  const [lock, setLock] = useState(false);
  const [inp1, setIn1] = useState("");
  const [inp2, setIn2] = useState("");
  const [inp3, setIn3] = useState("");
  const [inp4, setIn4] = useState("");
  const [reLock, setReLock] = useState();
  const [PassCode, setPassCode] = useState("");
  const [er, setEr] = useState("");
  const [chatUnlockModal, setChatUnlockModal] = useState(false);
  const [settings, setSettings] = useState(false);

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");

  const [member, setMember] = useState();
  const [selected, setSelected] = useState(0);
  const [friends, setFriends] = useState();
  const [nameChangeFlag, setNameChangeFlag] = useState(false);

  const [tempProfileImage, setTempProfileImage] = useState();
  const [availableFriends, setAvaiableFriends] = useState();

  const [exitGroupModal, setExitGroupModal] = useState(false);
  const [reportBug, setReportBug] = useState(false);
  const [bugAbout, setBugAbout] = useState("");
  const [changeDpModal, setChangeDpModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempDescription, setTempDescription] = useState("");
  // const dispatch = useDispatch();

  const [userAdmin, setUserAdmin] = useState(false);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const adminRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      .doc(ActiveChatUser);
    onSnapshot(adminRef, (snapshot) => {
      setUserAdmin(snapshot?.data()?.Admin);
    });
  }, [ActiveChatUser]);

  // useEffect(() => {
  //   const user = firebase.auth().currentUser;
  //   const Adref = db
  //     .collection("Chat Record")
  //     .doc(user.uid)
  //     .collection("Group")
  //     .doc(name);
  //   onSnapshot(Adref, (snapshot) => {
  //     setUserAdmin(snapshot?.data()?.Admin);
  //   });
  // }, []);
  function postBug() {
    const user = firebase.auth().currentUser;
    db.collection("Feedbacks")
      .doc("Bugs")
      .update({
        Bugs: arrayUnion({ Bugs: bugAbout, User: user.uid }),
      });

    setBugAbout("");
  }

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
          db.collection("Groups").doc(name).update({ ProfileURL: url });

          geturl = url;
        });
        // console.log("Uploaded a blob or file!");
      }
    );
    return geturl;
  };

  const uploadProfileImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(
      storage,
      `/group_image/${user.uid}/${user.uid}.${name}`
    );
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
    fetchGroupInfo();
  }, [ActiveChatUser]);

  // useEffect(() => {
  //   console.log(
  //     "memberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  //   );
  //   console.log(member);
  // }, [member]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);
  useEffect(() => {
    fetchNotification();
  }, []);

  function fetchNotification() {
    const user = firebase.auth().currentUser;
    allFriends.map((item) => {
      if (item.UserId !== ActiveChatUser) {
        const userMsg = db
          .collection("Chat Record")
          .doc(user.uid)
          .collection("Chat Friends")
          .doc(item.UserId);

        var tt = "";
        var t = "";
        onSnapshot(userMsg, (snapshot) => {
          setChatFlag(
            snapshot?.data()?.ChatHistory[
              snapshot?.data()?.ChatHistory?.length - 1
            ]?.Flag
          );
          if (
            snapshot?.data()?.ChatHistory[
              snapshot?.data()?.ChatHistory?.length - 1
            ]?.Message.length === 0
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

            const ref = db.collection("Chat Record").doc(item.UserId);
            onSnapshot(ref, (snapshot) => {
              tt = snapshot.data().Name;
              t = snapshot.data()?.Photo;
            });

            setTimer(true);
            setTimeout(() => {
              setTimer(false);
              setArr([]);
            }, 4000);

            setArr([
              {
                last: snapshot?.data()?.ChatHistory[
                  snapshot?.data()?.ChatHistory?.length - 1
                ]?.Message,
                name: tt,
                photo: t,
              },
            ]);
          }
        });
      }
    });
  }

  useEffect(() => {
    fetchChatUserInfo();
    // console.log("urlllllllllllllllllllllllllllllll");
    // console.log(ImageMediaLink);
  }, [ActiveChatUser]);

  useEffect(() => {
    // console.log("fetch media");
    fetchMedia();
  }, [ActiveChatUser]);

  function fetchMedia() {
    const user = firebase.auth().currentUser;
    const listRef = ref(storage, `chats_images/${user.uid}/${ActiveChatUser}/`);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        // console.log("media");
        // console.log(res);
        res.items.forEach((itemRef) => {
          // console.log("item");
          // console.log(itemRef);
          itemRef.getDownloadURL().then((url) => {
            // console.log("media url");
            // console.log(url);
          });
          // console.log(itemRef.getDown)
          // All the items under listRef.
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  }

  function fetchChatUserInfo() {
    if (ActiveChatUser.length !== 0) {
      const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
      // userDoc.get().then((data) => {
      //   setChatUserName(data.data().Name);
      //   setChatUserAbout(data.data().Info);
      // });
      onSnapshot(userDoc, (snapshot) => {
        // console.log("snapshot.docssssssssssssss");
        // console.log(snapshot.data());
        setChatUserName(snapshot?.data()?.Name);
        setChatUserAbout(snapshot?.data()?.Info);
        setChatUserNumber(snapshot?.data()?.Phone);
        // setChatUserPhoto(snapshot?.data()?.Photo);
        if (snapshot.data()?.Photo) {
          setChatUserPhoto(snapshot.data()?.Photo);
        } else {
          setChatUserPhoto("nophoto");
        }
      });
    } else {
      setChatUserName("Select Any User");
    }
  }

  function deleteChats() {
    const user = firebase.auth().currentUser;
    const chatRef = db.collection("Groups").doc(name).update({ Message: [] });
    //   .collection("Chat Friends")
    //   .doc(ActiveChatUser);

    // chatRef.get().then((doc) => {
    //   if (doc.data().ChatHistory.length == 0) {
    //     toast.error("No Chats to Delete", {
    //       style: {
    //         backgroundColor: "#333333",
    //         color: "#fff",
    //         font: "work",
    //         fontWeight: "400",
    //       },
    //     });
    //   } else {
    //     toast.success("Chats Deleted", {
    //       style: {
    //         backgroundColor: "#333333",
    //         color: "#fff",
    //         font: "work",
    //         fontWeight: "400",
    //       },
    //     });
    //     chatRef.set({
    //       ChatHistory: [],
    //       LastUpdated: serverTimestamp(),
    //       LastId: 0,
    //       TotalMessage: 0,
    //       LastMessage: 0,
    //     });
    //   }
    // });
  }

  useEffect(() => {
    setDelConfirmation(false);
  }, [ActiveChatUser]);

  useEffect(() => {
    if (ActiveChatUser.length !== 0) {
      fetchOnlineStatus();
    }
    setLock(false);
    setChatLockModal(false);
    setChatUnlockModal(false);
    setEr("");
  }, [ActiveChatUser]);

  function fetchOnlineStatus() {
    const user = firebase.auth().currentUser;
    const userDoc = db.collection("Chat Record").doc(ActiveChatUser);
    onSnapshot(userDoc, (snapshot) => {
      setIsOnline(snapshot?.data()?.Online);
      // console.log(snapshot?.data()?.Online);
      // setLock(snapshot?.data?.ChatLock);
    });

    const userChatLock = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(ActiveChatUser);
    onSnapshot(userChatLock, (snapshot) => {
      //  setIsOnline(snapshot?.data()?.Online);
      //  console.log(snapshot?.data()?.Online);
      setReLock(snapshot?.data()?.ChatLock);
      setPassCode(snapshot?.data()?.ChatPassCode);
    });
  }

  const [isOnline, setIsOnline] = useState(false);

  function checkInput(data) {
    let last = data.slice(-1);
    setEr("");
    if (inp1.length === 0) {
      setIn1(last);
    } else if (inp2.length === 0) {
      setIn2(last);
    } else if (inp3.length === 0) {
      setIn3(last);
    } else if (inp4.length === 0) {
      setIn4(last);
    }
  }

  function updateChatLock() {
    // let
    const user = firebase.auth().currentUser;
    db.collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(ActiveChatUser)
      .update({
        ChatLock: true,
        ChatPassCode: inp1 + inp2 + inp3 + inp4,
      });
  }

  function checkChatLock() {
    const user = firebase.auth().currentUser;
    if (PassCode === inp1 + inp2 + inp3 + inp4) {
      db.collection("Chat Record")
        .doc(user.uid)
        .collection("Chat Friends")
        .doc(ActiveChatUser)
        .update({
          ChatLock: false,
          ChatPassCode: "",
        });

      setChatUnlockModal(false);
    } else {
      setEr("Wrong PassCode");
    }
  }

  function fetchGroupInfo() {
    const user = firebase.auth().currentUser;
    const grpRef = db.collection("Groups").doc(ActiveChatUser);
    onSnapshot(grpRef, (snapshot) => {
      // console.log("Group Dattaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      // console.log(snapshot.data());
      setDescription(snapshot?.data()?.Description);
      setName(snapshot?.data()?.Name);
      setTempName(snapshot?.data()?.Name);
      setTempDescription(snapshot?.data()?.Description);
      setProfile(snapshot?.data()?.ProfileURL);
      setMember(snapshot?.data()?.Member);
    });

    // const friendRef = db.collection("Chat Record").doc(user.uid).collection("Chat Friends");
    // onSnapshot(friendRef, (snapshot) => {

    // });
  }

  function differenceArray(key) {
    const idSet = new Set(member);

    // console.log(member);
    // console.log(UserList);

    setAvaiableFriends(
      UserList.filter((item) => !member.includes(item.UserId))
    );

    // console.log(UserList.filter((item) => !member.includes(item.UserId)));
  }

  function exitGroup() {
    const user = firebase.auth().currentUser;
    db.collection("Groups")
      .doc(name)
      .update({
        // Member: Member.filter((post) => post !== props?.data),
        Member: arrayRemove(user.uid),
      });

    db.collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      .doc(name)
      .delete();

    dispatch(addActiveUser(""));
  }

  function CamalCaseName() {
    let words = tempName.split(" ");
    for (let i = 0; i < words.length; i++) {
      // Capitalize the first character of the word and make the rest lowercase
      words[i] =
        words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase();
    }
    updateUserName(words.join(" "));
    // setOwnerName(words.join(" "));
  }

  function updateUserInfo() {
    const user = firebase.auth().currentUser;
    db.collection("Groups").doc(name).update({ Description: tempDescription });
    // toast.success("Name Changed");
  }
  function updateUserName(dataName) {
    db.collection("Groups").doc(name).update({ Name: dataName });
    // toast.success("Info Changed");
  }

  return (
    <>
      {nameChangeFlag === true ? (
        <div
          className={
            "w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[100svh]   fixed top-0 right-0 flex justify-center items-center px-[10px] md:px-0 lg:px-0 backdrop-blur-md z-50" +
            (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
          }
          style={{ zIndex: "999" }}
        >
          <div
            className={
              "w-[320px] h-auto rounded-3xl  flex flex-col justify-center items-center p-[20px] drop-shadow-sm" +
              (theme ? " bg-[white]" : " bg-[#222228]")
            }
          >
            <span
              className={
                "font-medium w-full px-[6px] h-[30px]  flex items-start mt-[-5px]  text-[21px] font-[google]" +
                (theme ? " text-black" : " text-white")
              }
            >
              Update Profile
            </span>
            <input
              style={{ transition: ".5s" }}
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
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
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              placeholder="About"
              className={
                "log w-[calc(100%-12px)] bg-transparent h-[35px] font-normal  input tracking-[.4px] font-[google]  border-b-[1.5px]   z-0 outline-none  text-[15px]  mt-[10px]" +
                (theme
                  ? " text-black bg-[#e4eaf1] border-[#545454]"
                  : " text-[white] bg-[#17171a] border-[#c3c3c3]")
              }
            ></input>

            <div className="w-[100%] h-auto px-[6px] flex justify-end items-center font-[google] font-normal text-[15px] mt-[20px]">
              <span
                className={
                  "w-auto  flex items-end h-auto rounded-2xl bg-transparent  z-20" +
                  (theme
                    ? " text-black bg-[#e4eaf1]"
                    : " text-[white] bg-[#17171a]")
                }
                onClick={() => {
                  setTempName(name);
                  setTempDescription(description);
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

      {changeDpModal === true ? (
        <>
          <div
            className={
              " w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[100svh] top-0 right-0 fixed  z-50 backdrop-blur-md flex justify-center items-center" +
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
                {userAdmin ? (
                  <span className=" font-[google] font-light text-[22px] flex justify-start items-center ">
                    <BsFillCameraFill className="text-[25px] " /> &nbsp; Choose
                    any Photo
                  </span>
                ) : (
                  <></>
                )}
              </div>

              {!userAdmin ? (
                <div
                  className={
                    "w-full mt-[10px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                    (theme ? " text-[#343434] " : " text-[#b7b7b7]")
                  }
                >
                  <span className="  font-light ">
                    You can't change this Group's Profile Photo. You must be the
                    admin of this group to do any kind of changes.
                  </span>
                </div>
              ) : (
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
              )}

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
                {userAdmin ? (
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
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {exitGroupModal === true ? (
        <>
          <div
            className={
              " w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[100svh] top-0 right-0 fixed  z-50 backdrop-blur-md flex justify-center items-center" +
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
                <span className=" font-[google] font-light text-[22px] flex justify-start items-center text-[#bb2a23] ">
                  <TbAlertTriangle className="text-[25px] text-[#bb2a23]" />{" "}
                  &nbsp; Exit this Group?
                </span>
              </div>

              <div
                className={
                  "w-full mt-[10px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                  (theme ? " text-[#343434] " : " text-[#b7b7b7]")
                }
              >
                <span className="  font-light ">
                  If you exit the group you will no longer be able to send any
                  messages in this group. Are you sure ?
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
                    // console.log("clicked");
                    setExitGroupModal(false);
                  }}
                >
                  Close
                </button>
                <button
                  className="w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl"
                  onClick={() => {
                    // console.log("clicked");
                    exitGroup();
                    setExitGroupModal(false);
                  }}
                >
                  Exit
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
            className={
              " w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[100svh] top-0 right-0 fixed  z-50 backdrop-blur-md flex justify-center items-center" +
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
                <span className=" font-[google] font-light text-[22px] flex justify-start items-center text-[#bb2a23] ">
                  <MdBugReport className="text-[25px] text-[#bb2a23]" /> &nbsp;
                  Report Bug Form
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
      {ActiveChatUser?.length === 0 ? (
        <></>
      ) : (
        <>
          <div
            className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-[0] fixed bg-[#1b202d] text-[white]  overflow-hidden"
            // style={{ transition: ".5s" }}
          ></div>

          {availableFriends ? (
            <>
              <div
                className={
                  "w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[100svh] fixed top-0 right-0 backdrop-blur-md  z-50 p-[10px]" +
                  (theme ? " bg-[#17171a25]" : " bg-[#17171a25]")
                }
                style={{ zIndex: "999" }}
              >
                <div
                  className={
                    "flex flex-col justify-start items-start w-full p-[20px] px-[10px]  h-full rounded-3xl overflow-y-scroll" +
                    (theme
                      ? " bg-[#ffffff] text-black"
                      : " bg-[#222228] text-white")
                  }
                >
                  {/* <input className="w-full h-[45px] rounded-2xl bg-[#e4eaf1] mb-[10px]"></input> */}
                  <div
                    className={
                      " font-[google] text-[14px] font-normal w-[calc(100%-20px)] md:[calc(100%-420px)]  lg:[calc(100%-420px)] h-[50px] pl-[20px]  rounded-t-3xl flex justify-start items-center fixed top-[10px] right-[10px]" +
                      (theme
                        ? " bg-[#ffffff] text-black"
                        : " bg-[#222228] text-white")
                    }
                  >
                    {availableFriends?.length != 0 ? (
                      <>{selected}&nbsp; Members Selected</>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="w-full min-h-[30px]"></div>
                  {availableFriends?.length != 0 ? (
                    <>
                      {availableFriends?.map((data) => {
                        return (
                          <>
                            <AddGroupMember
                              data={data}
                              groupName={name}
                              sel={selected}
                              selected={setSelected}
                            />
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="w-full min-h-[30px] text-[16px] font-normal font-[google]  flex justify-center items-center">
                        No Friends to Add in the Group
                      </div>
                    </>
                  )}

                  <div className="w-full min-h-[40px] "></div>
                </div>

                <div
                  className={
                    " w-[calc(100%-20px)] md:[calc(100%-420px)]  lg:[calc(100%-420px)] h-[60px] rounded-b-3xl flex justify-center items-center fixed bottom-[10px] right-[10px]" +
                    (theme
                      ? " bg-[#ffffff] text-black"
                      : " bg-[#222228] text-white")
                  }
                >
                  <div
                    className={
                      "w-auto h-[40px] px-[15px] font-[google] flex justify-center items-center font-normal  rounded-3xl" +
                      (theme
                        ? "  text-black bg-[#c9c5ff]"
                        : "  text-white bg-[#756dedcd]")
                    }
                    onClick={() => {
                      setAvaiableFriends();
                      setSelected(0);
                    }}
                  >
                    Done
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {delConfirmation === true ? (
            <div
              className={
                "fixed  w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  h-[100%]  flex justify-center items-center    backdrop-blur-md top-[0px] " +
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
                  " text-[15px] w-[320px]  h-auto  rounded-3xl flex flex-col p-[20px] justify-center items-center " +
                  (theme
                    ? " bg-[#ffffff] text-black"
                    : " bg-[#222228] text-white")
                }
              >
                <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
                  <span className=" font-[google] font-medium text-[22px] flex justify-start text-[#bb2a23] items-center ">
                    <TbAlertTriangle className="text-[25px] text-[#bb2a23]" />{" "}
                    &nbsp; Clear this Chat?
                  </span>
                </div>
                <div
                  className={
                    "w-full mt-[10px] rounded-xl font-[work] flex justify-center items-center px-[6px]" +
                    (theme ? " text-[#343434]" : " text-[#b7b7b7]")
                  }
                >
                  <span className="  font-light font-[google] ">
                    All the chats and media will be deleted. Are you sure?
                  </span>
                </div>
                <div className=" h-auto w-full mt-[20px] flex justify-end items-center px-[6px] rounded-xl">
                  <button
                    className={
                      "w-auto flex items-end  h-auto bg-transparent   cursor-pointer  font-[google] font-light   rounded-2xl" +
                      (theme
                        ? " bg-[#e4eaf1] text-[#000000]"
                        : " bg-[#17171a] text-[#ffffff]")
                    }
                    onClick={() => {
                      // console.log("clicked");
                      setDelConfirmation(false);
                    }}
                  >
                    Close
                  </button>
                  <button
                    className="w-auto flex items-end  h-auto ml-[30px] text-[#bb2a23]   cursor-pointer  font-[google] font-light   rounded-2xl"
                    onClick={() => {
                      // console.log("clicked");
                      setDelConfirmation(false);
                      deleteChats();
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
          {mediaShow === true ? (
            <div
              className={
                "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[calc(100svh-200px)]  top-[190px] flex flex-col justify-start items-center rounded-2xl  pb-[10px] px-[15px] pt-[10px]" +
                (theme ? " bg-[#ffffff]" : " bg-[#222228]")
              }
              style={{ zIndex: "100", transition: ".4s" }}
            >
              <div
                className={
                  "w-full h-[40px] flex justify-center items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] z-10" +
                  (theme ? " text-[black]" : " text-[white]")
                }
              >
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Documents");
                  }}
                >
                  Documents
                </div>
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Photos");
                  }}
                >
                  Photos
                </div>
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Videos");
                  }}
                >
                  Videos
                </div>
              </div>
              <div
                className={
                  "w-full h-[40px] mt-[-50px] flex justify-start items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                  (theme ? " text-[black]" : " text-[white]")
                }
              >
                {mediaOption === "Photos" ? (
                  <div
                    className="w-[calc(100%/3)]  border-[#8981f7] border-b-[2.5px] ml-[calc(100%/3)]  h-full flex justify-center items-center  " // {
                    // +
                    //   (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    // }
                    style={{ transition: ".2s" }}
                  ></div>
                ) : mediaOption === "Videos" ? (
                  <div
                    className="w-[calc(100%/3)] border-[#8981f7] border-b-[2.5px] ml-[calc((100%/3)*2)] h-full flex justify-center items-center  " // {
                    // +
                    //   (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    // }
                    style={{ transition: ".2s" }}
                  ></div>
                ) : (
                  <div
                    className="w-[calc(100%/3)] border-[#8981f7] border-b-[2.5px] h-full flex justify-center items-center  " // {
                    // +
                    //   (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    // }
                    style={{ transition: ".2s" }}
                  ></div>
                )}
              </div>
              <div className="w-full max-h-[calc(100%-60px)] overflow-y-scroll flex justify-start items-start gap-y-0 flex-wrap">
                {ImageMediaLink.map((link) => {
                  return (
                    <>
                      {/* {console.log(link)} */}
                      {mediaOption === "Photos" ? (
                        <>
                          {!link.docName ? (
                            <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
                              <img
                                className={
                                  "object-cover w-full h-full rounded-xl" +
                                  (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                                }
                                src={link?.url}
                              ></img>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : mediaOption === "Videos" ? (
                        <></>
                      ) : (
                        <>
                          {!link.docName ? (
                            <></>
                          ) : (
                            <>
                              <div
                                className={
                                  "w-full h-[50px] font-[google] font-normal flex justify-start items-center text-[15px] px-[5px] rounded-xl  " +
                                  (theme
                                    ? " text-[#b21313] hover:bg-[#e4eaf1]"
                                    : " text-[#04bdb6] hover:bg-[#17171a]")
                                }
                              >
                                {link?.docName
                                  ?.substring(link?.docName?.indexOf(".") + 1)
                                  .toLowerCase() === "png" ? (
                                  <BsFiletypePng className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "jpg" ? (
                                  <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "jpeg" ? (
                                  <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "pdf" ? (
                                  <BsFiletypePdf className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "txt" ? (
                                  <BsFiletypeTxt className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "docx" ? (
                                  <BsFiletypeDocx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "xlsx" ? (
                                  <BsFiletypeXlsx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "ppt" ? (
                                  <BsFiletypePpt className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "pptx" ? (
                                  <BsFiletypePptx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "exe" ? (
                                  <BsFiletypeExe className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "gif" ? (
                                  <BsFiletypeGif className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "rar" ? (
                                  <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "zip" ? (
                                  <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "mp3" ? (
                                  <BsFileEarmarkMusic className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "mp4" ? (
                                  <BsFileEarmarkPlay className="text-[20px] mr-[10px]" />
                                ) : (
                                  <>
                                    <BsFileEarmark className="text-[20px] mr-[10px]" />
                                  </>
                                )}
                                <div
                                  className={
                                    "w-[calc(100%-40px)] flex justify-start items-center  overflow-hidden text-ellipsis line-clamp-1 h-full" +
                                    (theme ? " text-[black]" : " text-[white]")
                                  }
                                >
                                  {link?.docName}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* <Media data={link} mop={mediaOption} /> */}
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              className={
                "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[0px]  top-[190px] flex flex-col justify-start items-center rounded-2xl py-[0px] pb-[0px] px-[15px] overflow-hidden " +
                (theme ? " bg-[#ffffff]" : " bg-[#222228]")
              }
              style={{ zIndex: "100", transition: ".4s" }}
            >
              <div
                className={
                  "w-full h-[40px] flex justify-center items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                  (theme ? " text-[black]" : " text-[white]")
                }
              >
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Documents");
                  }}
                >
                  Documents
                </div>
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Photos");
                  }}
                >
                  Photos
                </div>
                <div
                  className="w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg"
                  onClick={() => {
                    // setUserSidebar(!userSidebar);
                    setMediaOption("Videos");
                  }}
                >
                  Videos
                </div>
              </div>
              <div
                className={
                  "w-full h-[40px] mt-[-50px] flex justify-start items-center font-[google] font-normal text-[15px] mb-[10px] px-[5px] " +
                  (theme ? " text-[black]" : " text-[white]")
                }
              >
                {mediaOption === "Photos" ? (
                  <div
                    className={
                      "w-[calc(100%/3)]  ml-[calc(100%/3)]  h-full flex justify-center items-center rounded-lg " +
                      (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    }
                    style={{ transition: ".2s" }}
                  ></div>
                ) : mediaOption === "Videos" ? (
                  <div
                    className={
                      "w-[calc(100%/3)] ml-[calc((100%/3)*2)] h-full flex justify-center items-center rounded-lg " +
                      (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    }
                    style={{ transition: ".2s" }}
                  ></div>
                ) : (
                  <div
                    className={
                      "w-[calc(100%/3)] h-full flex justify-center items-center rounded-lg " +
                      (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                    }
                    style={{ transition: ".2s" }}
                  ></div>
                )}
              </div>
              <div className="w-full max-h-[calc(100%-60px)] overflow-y-scroll flex justify-start items-start gap-y-0 flex-wrap">
                {ImageMediaLink.map((link) => {
                  return (
                    <>
                      {/* {console.log(link)} */}
                      {mediaOption === "Photos" ? (
                        <>
                          {!link.docName ? (
                            <div className="w-[calc(100%/3)] lg:w-[calc(100%/5)] md:w-[calc(100%/3)] aspect-square rounded-2xl p-[5px]">
                              <img
                                className="object-cover w-full h-full rounded-xl"
                                src={link?.url}
                              ></img>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      ) : mediaOption === "Videos" ? (
                        <></>
                      ) : (
                        <>
                          {!link.docName ? (
                            <></>
                          ) : (
                            <>
                              <div
                                className={
                                  "w-full h-[50px] font-[google] font-normal flex justify-start items-center text-[15px] px-[5px] rounded-xl  " +
                                  (theme ? " text-[black]" : " text-[white]")
                                }
                              >
                                {link?.docName
                                  ?.substring(link?.docName?.indexOf(".") + 1)
                                  .toLowerCase() === "png" ? (
                                  <BsFiletypePng className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "jpg" ? (
                                  <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "jpeg" ? (
                                  <BsFiletypeJpg className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "pdf" ? (
                                  <BsFiletypePdf className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "txt" ? (
                                  <BsFiletypeTxt className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "docx" ? (
                                  <BsFiletypeDocx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "xlsx" ? (
                                  <BsFiletypeXlsx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "ppt" ? (
                                  <BsFiletypePpt className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "pptx" ? (
                                  <BsFiletypePptx className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "exe" ? (
                                  <BsFiletypeExe className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "gif" ? (
                                  <BsFiletypeGif className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "rar" ? (
                                  <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "zip" ? (
                                  <BsFileEarmarkZip className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "mp3" ? (
                                  <BsFileEarmarkMusic className="text-[20px] mr-[10px]" />
                                ) : link?.docName
                                    ?.substring(link?.docName?.indexOf(".") + 1)
                                    .toLowerCase() === "mp4" ? (
                                  <BsFileEarmarkPlay className="text-[20px] mr-[10px]" />
                                ) : (
                                  <>
                                    <BsFileEarmark className="text-[20px] mr-[10px]" />
                                  </>
                                )}
                                <div className="w-[calc(100%-40px)] flex justify-start items-center  overflow-hidden text-ellipsis line-clamp-1 h-full">
                                  {link?.docName}
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}

                      {/* <Media data={link} mop={mediaOption} /> */}
                    </>
                  );
                })}
              </div>
            </div>
          )}

          {settings === true ? (
            <>
              <div
                className={
                  "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[calc(100svh-200px)]  top-[190px] flex flex-col justify-start items-start rounded-2xl  py-[10px] md:py-[30px] lg:py-[30px] px-[15px] md:px-[35px] lg:px-[35px] " +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                style={{ zIndex: "100", transition: ".4s" }}
              >
                <div
                  className="w-full h-[100px] flex justify-start opacity-100 items-center "
                  style={{ transition: ".4s", transitionDelay: ".4s" }}
                >
                  <div className="group w-[80px] h-[80px] rounded-full  flex justify-end items-end">
                    {/* <img
                    src={profileURL}
                    className="w-full h-full rounded-full object-cover"
                  ></img> */}
                    {profile === "nophoto" ? (
                      <img
                        src={profile2}
                        className={
                          "w-full h-full rounded-[28px] object-cover" +
                          (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                        }
                      ></img>
                    ) : (
                      <img
                        src={profile}
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
                        // setChangeDpModal(true)
                        profileImage(e);
                      }}
                    ></input>
                    <label
                      onClick={() => {
                        setChangeDpModal(true);
                      }}
                      // onclick={document.getElementById("getFile").click()}
                      className={
                        " w-[30px] h-[30px]  flex justify-center items-center border-[2px]   fixed rounded-full cursor-pointer z-10" +
                        (theme
                          ? " bg-[#c9c5ff] text-black border-[#ffffff]"
                          : " bg-[#756ded] text-white border-[#222228]")
                      }
                    >
                      <BsCameraFill className=" text-[13px]" />
                    </label>
                  </div>

                  <div className="w-[calc(100%-140px)] h-full  ml-[20px] flex flex-col justify-center  items-start">
                    <div
                      className={
                        " font-[google] font-normal text-[22px] md:text-[22px] lg:text-[22px] w-full " +
                        (theme ? " text-black" : " text-white")
                      }
                    >
                      {name}
                    </div>
                    <div
                      className={
                        " font-[google] max-h-[47px] line-clamp-2 overflow-hidden text-ellipsis mt-[0px] text-[16px] w-full font-light" +
                        (theme ? " text-[#2d2d2d]" : " text-[#bbbbbb]")
                      }
                    >
                      {description}
                    </div>
                  </div>

                  {userAdmin ? (
                    <>
                      <div
                        className="w-[30px] flex justify-end items-center"
                        onClick={() => {
                          setNameChangeFlag(true);
                        }}
                      >
                        <RiEditFill
                          className={
                            "text-[20px] " +
                            (theme ? " text-black" : " text-white")
                          }
                        />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className="w-full h-[70px] flex justify-start opacity-100 items-center"
                  style={{ transition: ".4s", transitionDelay: ".5s" }}
                >
                  <div
                    className={
                      "w-[45px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#e4eaf1]" : " border-[#4c4c4c]")
                    }
                    onClick={() => {
                      // if (userAdmin) {
                      differenceArray();
                      // }
                    }}
                  >
                    <TiUserAdd
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  {/* <div
                    className="w-[45px] ml-[20px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl"
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <MdGroupRemove
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div> */}
                  <div
                    className={
                      "w-[45px] ml-[15px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#e4eaf1]" : " border-[#4c4c4c]")
                    }
                    onClick={() => {
                      // differenceArray();
                      setReportBug(true);
                    }}
                  >
                    <MdBugReport
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  <div
                    className={
                      "w-[45px] ml-[15px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#bb2a235e]" : " border-[#bb2a2387]")
                    }
                    onClick={() => {
                      // differenceArray();

                      setExitGroupModal(true);
                    }}
                  >
                    <IoExit
                      className={
                        "text-[20px]" +
                        (theme ? " text-[#bb2a23]" : " text-[#bb2a23]")
                      }
                    />
                  </div>
                </div>
                <div
                  className={
                    "w-full flex font-[google] text-[14px] font-normal mt-[10px] mb-[5px] justify-start items-center opacity-100" +
                    (theme ? " text-black" : " text-white")
                  }
                  style={{ transition: ".4s", transitionDelay: ".6s" }}
                >
                  {member?.length} Members
                </div>
                <div
                  className="flex flex-col justify-start items-start h-[calc(100%-200px)] w-full overflow-y-scroll opacity-100"
                  style={{ transition: ".4s", transitionDelay: ".7s" }}
                >
                  {member?.map((data) => {
                    return (
                      <>
                        <Members data={data} groupName={name} />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={
                  "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[0]  top-[190px] flex flex-col justify-start items-center rounded-2xl  pb-[0px] px-[15px] pt-[0px] overflow-hidden" +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                style={{ zIndex: "100", transition: ".4s" }}
              >
                <div
                  className="w-full h-[100px] flex justify-start opacity-0 items-center "
                  // style={{ transition: ".4s", transitionDelay: ".5s" }}
                >
                  <div className="group w-[80px] h-[80px] rounded-full  flex justify-end items-end">
                    {/* <img
                    src={profileURL}
                    className="w-full h-full rounded-full object-cover"
                  ></img> */}
                    {profile === "nophoto" ? (
                      <img
                        src={profile2}
                        className={
                          "w-full h-full rounded-[28px] object-cover" +
                          (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                        }
                      ></img>
                    ) : (
                      <img
                        src={profile}
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
                      onChange={(e) => profileImage(e)}
                    ></input>
                    <label
                      for="getFile"
                      // onclick={document.getElementById("getFile").click()}
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
                        " font-[google] font-normal text-[22px] md:text-[22px] lg:text-[22px] w-full " +
                        (theme ? " text-black" : " text-white")
                      }
                    >
                      {name}
                    </div>
                    <div
                      className={
                        " font-[google] max-h-[47px] line-clamp-2 overflow-hidden text-ellipsis mt-[0px] text-[16px] w-full font-light" +
                        (theme ? " text-[#2d2d2d]" : " text-[#bbbbbb]")
                      }
                    >
                      {description}
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
                <div
                  className="w-full h-[70px] flex justify-start opacity-0 items-center"
                  // style={{ transition: ".4s", transitionDelay: ".5s" }}
                >
                  <div
                    className={
                      "w-[45px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#e4eaf1]" : " border-[#4c4c4c]")
                    }
                    onClick={() => {
                      // if (userAdmin) {
                      differenceArray();
                      // }
                    }}
                  >
                    <TiUserAdd
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  {/* <div
                    className="w-[45px] ml-[20px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl"
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <MdGroupRemove
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div> */}
                  <div
                    className={
                      "w-[45px] ml-[20px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#e4eaf1]" : " border-[#4c4c4c]")
                    }
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <IoExit
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  <div
                    className={
                      "w-[45px] ml-[20px] aspect-square cursor-pointer flex justify-center items-center border-[1.5px] rounded-2xl" +
                      (theme ? " border-[#e4eaf1]" : " border-[#4c4c4c]")
                    }
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <MdBugReport
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                </div>
                <div
                  className={
                    "w-full flex font-[google] text-[14px] font-normal mt-[10px] mb-[5px] justify-start items-center opacity-0" +
                    (theme ? " text-black" : " text-white")
                  }
                  // style={{ transition: ".4s", transitionDelay: ".5s" }}
                >
                  {member?.length} Members
                </div>
                <div
                  className="flex flex-col justify-start items-start h-[calc(100%-200px)] w-full overflow-y-scroll opacity-0"
                  // style={{ transition: ".4s", transitionDelay: ".5s" }}
                >
                  {member?.map((data) => {
                    return (
                      <>
                        <Members data={data} groupName={name} />
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          <div
            className={
              "w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] z-30 fixed top-0" +
              (theme ? " h-[80px] bg-[#e4eaf1]" : " h-[80px] bg-[#17171a]")
            }
          ></div>

          <div
            className={
              "w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  z-50  fixed top-0 flex justify-center items-start p-[10px] backdrop-blur-md overflow-visible" +
              (theme
                ? expand
                  ? " h-[100svh] bg-[#e4eaf16d] "
                  : " h-[80px] bg-[#e4eaf1]"
                : expand
                ? " h-[100svh] bg-[#17171a25] "
                : " h-[80px] bg-[#17171a]")
            }
          >
            {expand == true ? (
              <div
                className={
                  "w-full h-[170px] z-50  rounded-2xl  top-0 flex justify-between items-center p-[20px] " +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                style={{ transition: ".4s" }}
              >
                <div
                  className={
                    "w-[0] overflow-hidden lg:w-[0] md:w-[0]  h-[35px] rounded-full   cursor-pointer flex justify-start items-center" +
                    (theme ? " text-[black]" : " text-[white]")
                  }
                  style={{
                    transition: ".4s",
                    transitionDelay: ".4s",
                    // transitionDelay: ".2s",
                  }}
                  onClick={() => {
                    dispatch(addActiveUser(""));
                  }}
                >
                  <FaAngleLeft className="text-[20px] " />
                </div>

                <div
                  className={
                    "w-[130px] h-[130px]  rounded-full cursor-pointer  ml-[-17px]  text-white " +
                    (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
                  }
                  style={{
                    transition: ".4s",
                    transitionDelay: ".4s",
                    // transitionDelay: ".2s",
                  }}
                  onClick={() => {
                    setExpand(!expand);
                    setMediaShow(false);
                    setSettings(false);
                  }}
                >
                  {profile === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  ) : (
                    <img
                      src={profile}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  )}
                </div>
                <div className="w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-full ml-[15px]  flex flex-col justify-center items-start z-20">
                  <span
                    className={
                      "text-[18px]  font-[google] font-normal    z-20" +
                      (theme ? " text-black" : " text-white")
                    }
                    style={{
                      transition: ".4s",
                      transitionDelay: ".4s",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className={
                      "text-[15px] w-full overflow-hidden line-clamp-1 text-ellipsis  font-[work] font-light    z-20 whitespace-nowrap flex justify-start items-center" +
                      (theme ? " text-[#2d2d2d]" : " text-[#b1b1b1]")
                    }
                    style={{
                      transition: ".4s",
                      transitionDelay: ".4s",
                    }}
                  >
                    {member?.map((data) => {
                      return (
                        <>
                          <MemberName id={data} />
                        </>
                      );
                    })}
                  </span>
                  <span
                    className={
                      "text-[14px]  max-h-[50px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[work] font-light   z-20" +
                      (theme ? " text-[#2d2d2d]" : " text-[#8e8e8e]")
                    }
                    style={{ transition: ".4s", transitionDelay: ".4s" }}
                  >
                    {description}
                  </span>

                  <span className="flex justify-start items-center">
                    <span
                      className={
                        "w-auto p-[15px] mt-[10px] h-[30px] rounded-3xl  text-[14px]  font-[google] font-light flex justify-center items-center overflow-hidden" +
                        (theme
                          ? " text-black bg-[#c9c5ff]"
                          : " text-white bg-[#756dedcd]")
                      }
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaShow(!mediaShow);
                        if (settings === true) {
                          setSettings(false);
                        }
                        setMediaOption("Documents");
                      }}
                      style={{
                        transition: ".4s",
                        transitionDelay: ".8s",
                      }}
                    >
                      <span
                        className=" opacity-100"
                        style={{
                          transition: ".4s",
                          transitionDelay: ".8s",
                        }}
                      >
                        {ImageMediaLink.length !== 0 ? (
                          <>{mediaShow === true ? <>Close</> : <>Media</>}</>
                        ) : (
                          <>No Media</>
                        )}
                      </span>
                    </span>
                    <span
                      className={
                        "w-[25px] ml-[15px] mt-[10px] h-[30px] rounded-3xl cursor-pointer text-[14px]  font-[google] font-light flex justify-center items-center overflow-hidden" +
                        (theme ? " text-[black]" : " text-[white]")
                      }
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        // setSettings(!settings);
                        // if (mediaShow === true) {
                        //   setMediaShow(false);
                        // }
                        // setMediaOption("Documents");
                      }}
                      style={{
                        transition: ".4s",
                        transitionDelay: ".8s",
                      }}
                    >
                      <AiOutlineUsergroupDelete className="text-[20px]" />
                    </span>
                    <span
                      className={
                        "w-[25px] ml-[10px] mt-[10px] h-[30px] rounded-3xl cursor-pointer text-[14px]  font-[google] font-light flex justify-center items-center overflow-hidden" +
                        (theme ? " text-[black]" : " text-[white]")
                      }
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setSettings(!settings);
                        if (mediaShow === true) {
                          setMediaShow(false);
                        }
                        // setMediaOption("Documents");
                      }}
                      style={{
                        transition: ".4s",
                        transitionDelay: ".8s",
                      }}
                    >
                      <LuSettings2 className="text-[20px]" />
                    </span>

                    {/* <div
                          className="h-[30px] w-auto flex justify-center items-center"
                          style={{
                            transition: ".4s",
                            transitionDelay: ".8s",
                          }}
                        >
                          {reLock === true ? (
                            <TiLockClosed
                              className={
                                "text-[25px] ml-[10px] mt-[7px] cursor-pointer opacity-100" +
                                (theme ? " text-[black]" : " text-[white]")
                              }
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                              onClick={() => {
                                setChatUnlockModal(!chatLockModal);
                              }}
                            />
                          ) : (
                            <TiLockOpen
                              className={
                                "text-[25px] ml-[10px] mt-[7px] cursor-pointer opacity-100" +
                                (theme ? " text-[black]" : " text-[white]")
                              }
                              style={{
                                transition: ".4s",
                                transitionDelay: ".4s",
                              }}
                              onClick={() => {
                                setChatLockModal(!chatLockModal);
                              }}
                            />
                          )}
                        </div> */}
                  </span>
                </div>
                <span
                  className="cursor-pointer w-[0] lg:w-[0]  md:w-[0] overflow-hidden "
                  style={{
                    transition: ".4s",
                    transitionDelay: ".4s",
                    // transitionDelay: ".2s",
                  }}
                  onClick={() => {
                    setDelConfirmation(true);
                    // deleteChats();
                  }}
                >
                  <div className="group flex justify-end items-center">
                    <div
                      className={
                        "hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal " +
                        (theme
                          ? " bg-[#e4eaf1] text-black"
                          : " bg-[#17171a] text-white")
                      }
                    >
                      Delete Chats
                    </div>
                    <MdDelete
                      className={
                        "text-[20px] " +
                        +(theme ? " bg-[#469422] " : " bg-[#96df73]")
                      }
                    />
                  </div>
                </span>
              </div>
            ) : (
              <div
                className={
                  "w-full h-[60px] z-50  rounded-2xl  top-0 flex justify-between items-center px-[20px]" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#222228] text-[white]")
                }
                style={{ transition: ".4s", transitionDelay: ".4s" }}
                // onClick={() => {
                //   setExpand(!expand);
                // }}
              >
                <div
                  className="w-[35px]  lg:w-[0] md:w-[0]  h-[35px] rounded-full    cursor-pointer flex justify-start items-center"
                  style={{
                    transition: ".4s",
                    transitionDelay: ".4s",
                  }}
                  onClick={() => {
                    dispatch(addActiveUser(""));
                  }}
                >
                  <FaAngleLeft className="text-[20px] " />
                </div>

                <div
                  className={
                    "w-[45px] h-[45px]  rounded-full cursor-pointer  ml-[-17px]   " +
                    (theme
                      ? " bg-[#e4eaf1] text-black"
                      : " bg-[#17171a] text-white")
                  }
                  style={{
                    transition: ".4s",
                    // transitionDelay: ".2s",
                  }}
                  // onClick={() => {
                  //   setUserSidebar(!userSidebar);
                  // }}
                  onClick={() => {
                    setExpand(!expand);
                  }}
                >
                  {profile === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  ) : (
                    <img
                      src={profile}
                      className="w-full h-full rounded-full object-cover"
                    ></img>
                  )}
                </div>

                <div
                  className={
                    "w-[calc(100%-155px)]  lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start z-20" +
                    (theme ? "  text-black" : "  text-white")
                  }
                >
                  <span
                    className="text-[18px]  font-[google] font-normal    z-20"
                    style={{
                      transition: ".4s",
                      transitionDelay: ".2s",
                    }}
                  >
                    {name}
                  </span>
                  <span
                    className={
                      "text-[14px] w-full overflow-hidden line-clamp-1 font-[work] font-light whitespace-nowrap  z-20  " +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#b1b1b1]")
                    }
                    style={{
                      transition: ".4s",
                      transitionDelay: ".2s",
                    }}
                  >
                    {member?.map((data) => {
                      return (
                        <>
                          <MemberName id={data} />
                        </>
                      );
                    })}
                  </span>
                  <span
                    className={
                      "text-[14px]  max-h-[0px] overflow-hidden w-full line-clamp-2 text-ellipsis font-[work] font-light  z-20" +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#8e8e8e] ")
                    }
                    style={{ transition: ".4s", transitionDelay: ".4s" }}
                  >
                    ~ {description}
                  </span>
                </div>

                <span
                  className="cursor-pointer w-[50px]  lg:w-[150px] md:w-[150px] "
                  style={{
                    transition: ".4s",
                    transitionDelay: ".4s",
                  }}
                  onClick={() => {
                    setDelConfirmation(true);
                    // deleteChats();
                  }}
                >
                  <div className="group flex justify-end items-center">
                    <div
                      className={
                        "hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal " +
                        (theme
                          ? " bg-[#e4eaf1] text-black"
                          : " bg-[#17171a] text-white")
                      }
                    >
                      Delete Chats
                    </div>
                    <MdDelete
                      className={
                        "text-[20px]  " +
                        (theme ? "  text-[#000000]" : "  text-[#ffffff] ")
                      }
                    />
                  </div>
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
export default GroupInfo;
