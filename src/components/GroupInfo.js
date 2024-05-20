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
  MdPersonRemoveAlt1,
} from "react-icons/md";
import { BiCross, BiSolidVideo } from "react-icons/bi";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { addActiveUser } from "../utils/chatSlice";
import {
  FieldValue,
  arrayRemove,
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
import { LuChevronRight, LuRefreshCw } from "react-icons/lu";
import { RiMessage2Fill, RiSettings3Fill } from "react-icons/ri";
import { BsFiletypeJpg } from "react-icons/bs";
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
  const [uid, setUid] = useState("");
  const [userAdmin, setUserAdmin] = useState(false);

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
    console.log("addgroup memberbjhbhbv dvvhisvhsvubosubv");
    console.log(props);
  }, []);

  useEffect(() => {
    const ref = db.collection("Chat Record").doc(props?.data);
    onSnapshot(ref, (snapshot) => {
      setName(snapshot?.data()?.Name);
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

    console.log(uid);
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
              <div className="w-full h-[35px] flex justify-start items-center cursor-pointer">
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
          className="w-[100%] h-[65px] py-[10px] flex items-center justify-center cursor-pointer    "
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
                {name}
                {/* {isOnline} */}
              </span>
              <span
                className={
                  "w-[100px]  h-full text-[12px] font-normal font-[google]  flex justify-center rounded-md items-center whitespace-nowrap " +
                  (admin
                    ? " text-black bg-[#c9c5ff]"
                    : " text-transparent bg-transparent")
                }
              >
                {admin ? <>Group Admin</> : <></>}
              </span>
            </div>
            <div className="w-full flex h-[23px]">
              <span
                className={
                  "w-[100%] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis line-clamp-1 flex items-center h-full    font-[work] font-normal" +
                  (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
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
        {name},&nbsp;
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

  function profileImage(e) {
    console.log(e.target.files[0]);
    setTempProfileImage(e.target.files[0]);

    //  setImageLength(e.target.files.length);
  }

  useEffect(() => {
    if (tempProfileImage) {
      uploadProfileImage();
    }
  }, [tempProfileImage]);

  const uploadProfileImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    var geturl = await uploadBytes(fileRef, tempProfileImage).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(url);
          db.collection("Groups").doc(name).update({ ProfileURL: url });

          geturl = url;
        });
        console.log("Uploaded a blob or file!");
      }
    );
    return geturl;
  };

  const uploadProfileImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/users/${user.uid}/Profile Photo`);
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

  useEffect(() => {
    console.log(
      "memberrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
    );
    console.log(member);
  }, [member]);

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
    console.log("fetch media");
    fetchMedia();
  }, [ActiveChatUser]);

  function fetchMedia() {
    const user = firebase.auth().currentUser;
    const listRef = ref(storage, `chats_images/${user.uid}/${ActiveChatUser}/`);

    // Find all the prefixes and items.
    listAll(listRef)
      .then((res) => {
        console.log("media");
        console.log(res);
        res.items.forEach((itemRef) => {
          console.log("item");
          console.log(itemRef);
          itemRef.getDownloadURL().then((url) => {
            console.log("media url");
            console.log(url);
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
    const chatRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(ActiveChatUser);

    chatRef.get().then((doc) => {
      if (doc.data().ChatHistory.length == 0) {
        toast.error("No Chats to Delete", {
          style: {
            backgroundColor: "#333333",
            color: "#fff",
            font: "work",
            fontWeight: "400",
          },
        });
      } else {
        toast.success("Chats Deleted", {
          style: {
            backgroundColor: "#333333",
            color: "#fff",
            font: "work",
            fontWeight: "400",
          },
        });
        chatRef.set({
          ChatHistory: [],
          LastUpdated: serverTimestamp(),
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
        });
      }
    });
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
      console.log(snapshot?.data()?.Online);
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
      console.log("Group Dattaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      console.log(snapshot.data());
      setDescription(snapshot?.data()?.Description);
      setName(snapshot?.data()?.Name);
      setProfile(snapshot?.data()?.ProfileURL);
      setMember(snapshot?.data()?.Member);
    });

    // const friendRef = db.collection("Chat Record").doc(user.uid).collection("Chat Friends");
    // onSnapshot(friendRef, (snapshot) => {

    // });
  }

  function differenceArray(key) {
    const idSet = new Set(member);

    console.log(member);
    console.log(UserList);

    setAvaiableFriends(
      UserList.filter((item) => !member.includes(item.UserId))
    );

    console.log(UserList.filter((item) => !member.includes(item.UserId)));
  }

  return (
    <>
      {ActiveChatUser.length === 0 ? (
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
                className="w-full md:[calc(100%-400px)]  lg:[calc(100%-400px)] h-[100svh] fixed top-0 right-0 backdrop-blur-md bg-[#17171a25] z-50 p-[10px]"
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
                  <div className="w-full flex font-[google] text-[14px] font-normal px-[10px] mb-[5px] justify-start items-center">
                    {selected}&nbsp; Members Selected
                  </div>
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
                </div>
                <div className="w-full md:[calc(100%-400px)]  lg:[calc(100%-400px)] h-[60px] rounded-b-3xl flex justify-center items-center fixed bottom-[10px]">
                  <div
                    className={
                      "w-auto h-[40px] px-[15px] font-[google] flex justify-center items-center font-normal bg-[#c9c5ff] rounded-3xl" +
                      (theme ? "  text-black" : "  text-white")
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
                      {console.log(link)}
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
                      {console.log(link)}
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
                  "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[calc(100svh-200px)]  top-[190px] flex flex-col justify-start items-start rounded-2xl  pb-[10px] px-[15px] pt-[10px]" +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                style={{ zIndex: "100", transition: ".4s" }}
              >
                <div className="w-full h-[100px] flex justify-start items-center ">
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
                <div className="w-full h-[70px] flex justify-start items-center">
                  <div
                    className="w-[50px] aspect-square cursor-pointer bg-[#c9c5ff] flex justify-center items-center rounded-2xl"
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <TiUserAdd
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  <div
                    className="w-[50px] ml-[10px] aspect-square cursor-pointer bg-[#c9c5ff] flex justify-center items-center rounded-2xl"
                    onClick={() => {
                      differenceArray();
                    }}
                  >
                    <MdGroupRemove
                      className={
                        "text-[20px]" + (theme ? " text-black" : " text-white")
                      }
                    />
                  </div>
                  <div
                    className="w-[50px] ml-[10px] aspect-square cursor-pointer bg-[#c9c5ff] flex justify-center items-center rounded-2xl"
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
                    className="w-[50px] ml-[10px] aspect-square cursor-pointer bg-[#c9c5ff] flex justify-center items-center rounded-2xl"
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
                <div className="w-full flex font-[google] text-[14px] font-normal mt-[10px] mb-[5px] justify-start items-center">
                  {member.length} Members
                </div>
                <div className="flex flex-col justify-start items-start h-[calc(100%-200px)] w-full overflow-y-scroll">
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
                  "w-[calc(100%-20px)] md:w-[calc(100%-420px)] lg:w-[calc(100%-420px)] right-[10px] fixed h-[0]  top-[190px] flex flex-col justify-start items-center rounded-2xl  pb-[0px] px-[15px] pt-[0px]" +
                  (theme ? " bg-[#ffffff]" : " bg-[#222228]")
                }
                style={{ zIndex: "100", transition: ".4s" }}
              ></div>
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
                  (theme ? " bg-[#ffffff]" : " bg-[#282828]")
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
                      "text-[15px]  font-[work] font-light    z-20 whitespace-nowrap flex justify-start items-center" +
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
                      className="w-auto p-[15px] mt-[10px] h-[30px] rounded-3xl bg-[#8981f7] text-white text-[14px]  font-[google] font-light flex justify-center items-center overflow-hidden"
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setMediaShow(!mediaShow);
                        setMediaOption("Documents");
                      }}
                      style={{
                        transition: ".4s",
                        transitionDelay: ".8s",
                      }}
                    >
                      {/* <span
                            className=" opacity-100"
                            style={{
                              transition: ".4s",
                              transitionDelay: ".8s",
                            }}
                          >
                            {ImageMediaLink.length !== 0 ? (
                              <>
                                {mediaShow === true ? <>Close</> : <>Media</>}
                              </>
                            ) : (
                              <>No Media</>
                            )}
                          </span> */}
                    </span>
                    <span
                      className={
                        "w-[30px] ml-[15px] mt-[10px] h-[30px] rounded-3xl cursor-pointer text-[14px]  font-[google] font-light flex justify-center items-center overflow-hidden" +
                        (theme ? " text-[black]" : " text-[white]")
                      }
                      onClick={() => {
                        // setUserSidebar(!userSidebar);
                        setSettings(!settings);
                        // setMediaOption("Documents");
                      }}
                      style={{
                        transition: ".4s",
                        transitionDelay: ".8s",
                      }}
                    >
                      <RiSettings3Fill className="text-[20px]" />
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
                    : " bg-[#282828] text-[white]")
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
                      "text-[14px]  font-[work] font-light   z-20 whitespace-nowrap flex justify-start items-center" +
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
