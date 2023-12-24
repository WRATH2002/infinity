import { useEffect, useState } from "react";
import dp from "../assets/img/dp2.jpg";
import profile from "../assets/img/profile.jpg";
import profile2 from "../assets/img/d.png";
import tick from "../assets/img/tick.png";
// import { auth } from "../firebase";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  addFriendList,
  clearFriendList,
  addActiveUser,
  toggleSendFlag,
  addSearchFriendList,
  clearSearchFriendList,
  clearAllFriendList,
  addAllFriendList,
  addAllGroup,
  clearAllGroup,
  addAllGroupMembers,
  clearAllGroupMembers,
} from "../utils/chatSlice";
import {
  onSnapshot,
  serverTimestamp,
  snapshotEqual,
  where,
} from "firebase/firestore";
import { query } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsFillCameraFill } from "react-icons/bs";
import { BiCamera, BiSolidSearch } from "react-icons/bi";
import { orderBy } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import searchh from "../assets/img/searchh.png";
import cross from "../assets/img/cross.png";
import { MdGroups2 } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { IoMdDocument } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { BsCameraFill } from "react-icons/bs";
import AllGroupList from "./AllGroupList";
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
// import { LuSearch } from "react-icons/lu";
// import { RxCross2 } from "react-icons/rx";
import { TbPlaystationCircle } from "react-icons/tb";
import { MdGroups } from "react-icons/md";
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { PiChatCircleTextFill } from "react-icons/pi";
// import { FaPlus } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TiGroup } from "react-icons/ti";

const Friends = (props) => {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);
  const [chatFlag, setChatFlag] = useState("");
  const [docName, setDocName] = useState("");

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  function fetchUserName() {
    const user = firebase.auth().currentUser;

    const userName = db.collection("Chat Record").doc(props.data.UserId);
    // .onSnapshot((data) => {
    //   setUserName(data.data().Name);
    // });

    onSnapshot(userName, (snapshot) => {
      setUserName(snapshot.data().Name);
      if (snapshot.data().Photo) {
        setPhotoURL(snapshot.data().Photo);
      } else {
        setPhotoURL("nophoto");
      }
    });

    const userMsg = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(props.data.UserId);
    // .onSnapshot((doc) => {
    //   setLastMsg(
    //     doc?.data()?.ChatHistory[doc?.data()?.ChatHistory?.length - 1]
    //       ?.Message
    //   );
    // });

    onSnapshot(userMsg, (snapshot) => {
      setChatlength(snapshot?.data()?.ChatHistory.length);
      setTime(
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Time
      );
      setUnreadMessages(
        snapshot?.data()?.TotalMessage - snapshot?.data()?.LastMessage
      );
      setChatFlag(
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Flag
      );
      if (
        snapshot?.data()?.ChatHistory[snapshot?.data()?.ChatHistory?.length - 1]
          ?.Message.length === 0
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
      }
    });

    if (props.data.UserId === ActiveChatUser) {
      userMsg.update({
        LastMessage: chatLength,
      });
    }
  }

  function activerChatUser() {
    console.log("props.data.UserId");
    console.log(props.data.UserId);
    dispatch(addActiveUser(props.data.UserId));
  }

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      {ActiveChatUser === UserUid && UserUid != "" ? (
        <>
          <div
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer  bg-[#3d737d]  px-[10px] border-t-[1px] border-[#404040] "
            onClick={() => {
              activerChatUser();
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-white  font-[rubik] font-normal  ">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-white   font-[rubik] font-light">
                  {/* {props.data.time} */}
                  {Time}
                </span>
              </div>
              <div className="w-full flex h-[23px] justify-between items-center">
                {/* {props.data.msg} */}

                {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <BsFillCameraFill className="mr-[5px] text-[#bcbcbc] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[rubik] font-light">
                      {lastMsg}
                    </span>
                  </>
                ) : lastMsg === "Video" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <TiVideo className="mr-[5px] text-[#bcbcbc] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[rubik] font-light">
                      {lastMsg}
                    </span>
                  </>
                ) : lastMsg === "Document" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <IoMdDocument className="mr-[5px] text-[#bcbcbc] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[rubik] font-light">
                      {docName}
                    </span>
                  </>
                ) : (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#fff]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#bcbcbc]   font-[rubik] font-light">
                      {lastMsg}
                    </span>
                  </>
                )}
                {/* </span> */}
                <span className="w-[70px] text-[15px] h-full font-normal  text-[white] flex justify-end items-center">
                  {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#000000] text-[#ffffff]">
                        {unreadMessages}
                      </span>
                    </>
                  )}
                </span>
              </div>
              {/* <span className="text-[15px]">Hello! How Are you</span> */}
            </div>
          </div>
        </>
      ) : (
        <div
          className="px-[20px] bor group w-full h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer   hover:bg-[#fce9ed]  "
          onClick={() => activerChatUser()}
        >
          <div className="w-[50px] h-[50px]  rounded-full">
            {photoURL === "nophoto" ? (
              <img
                src={profile2}
                className="w-full h-full rounded-full object-cover "
              ></img>
            ) : (
              <img
                src={photoURL}
                className="w-full h-full rounded-full object-cover "
              ></img>
            )}
          </div>
          <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
            <div className="w-full font-semibold flex h-[23px]">
              <span
                className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[black]    font-[rubik] font-normal "
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.user} */}
                {userName}
              </span>
              <span
                className="w-[70px] h-full text-[11px] flex justify-end items-center text-[#8e9396]   font-[rubik] font-light"
                // style={{ transition: ".9s" }}
              >
                {/* {props.data.time} */}
                {Time}
              </span>
            </div>
            <div className="w-full  flex h-[23px] justify-between items-center">
              {lastMsg === "Image" ? (
                <>
                  {chatFlag === 1 ? (
                    <>
                      <span
                        className="w-[35px] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]   group-hover:text-[#8e9396]  font-[rubik] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        you:
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  <BsFillCameraFill
                    className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                    // style={{ transition: ".5s" }}
                  />
                  <span
                    className="w-[calc(100%-105px)] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[rubik] font-light"
                    // style={{ transition: ".5s" }}
                  >
                    {lastMsg}
                  </span>
                </>
              ) : lastMsg === "Video" ? (
                <>
                  {chatFlag === 1 ? (
                    <>
                      <span
                        className="w-[35px] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[rubik] font-light group-hover:text-[#8e9396]"
                        // style={{ transition: ".5s" }}
                      >
                        you:
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  <TiVideo
                    className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                    // style={{ transition: ".5s" }}
                  />
                  <span
                    className="w-[calc(100%-105px)] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[rubik] font-light"
                    // style={{ transition: ".5s" }}
                  >
                    {lastMsg}
                  </span>
                </>
              ) : lastMsg === "Document" ? (
                <>
                  {chatFlag === 1 ? (
                    <>
                      <span
                        className="w-[35px] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[rubik] font-light group-hover:text-[#8e9396]"
                        // style={{ transition: ".5s" }}
                      >
                        you:
                      </span>
                    </>
                  ) : (
                    <></>
                  )}
                  <IoMdDocument
                    className="mr-[5px] text-[#8e9396] group-hover:text-[#8e9396] "
                    // style={{ transition: ".5s" }}
                  />
                  <span
                    className="w-[calc(100%-105px)] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[rubik] font-light"
                    // style={{ transition: ".5s" }}
                  >
                    {docName}
                  </span>
                </>
              ) : (
                <>
                  {chatFlag === 1 ? (
                    <>
                      <span
                        className="w-[30px] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396]  font-[rubik] font-light group-hover:text-[#8e9396]"
                        // style={{ transition: ".5s" }}
                      >
                        you:
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="w-[100%] text-[13px]  leading-[13px] whitespace-nowrap  text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[rubik] font-light"
                        // style={{ transition: ".5s" }}
                      >
                        Messages are end-to-end encrypted.
                      </span>
                    </>
                  )}
                  <span
                    className="w-[calc(100%-100px)] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] group-hover:text-[#8e9396]   font-[rubik] font-light"
                    // style={{ transition: ".5s" }}
                  >
                    {lastMsg}
                  </span>
                </>
              )}
              {/* <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]">
                  {lastMsg}
                </span> */}
              <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                {unreadMessages === 0 ? (
                  <></>
                ) : (
                  <>
                    <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#6946c2] text-[white]">
                      {unreadMessages}
                    </span>
                  </>
                )}
              </span>
            </div>
            {/* <span className="text-[15px]">Hello! How Are you</span> */}
          </div>
        </div>
      )}
    </>
  );
};

const SearchFriends = (props) => {
  const [userName, setUserName] = useState("");
  const [info, setInfo] = useState("");
  // const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  // const [Time, setTime] = useState("");
  // const [unreadMessages, setUnreadMessages] = useState(0);
  // const [chatLength, setChatlength] = useState(0);

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  function fetchUserName() {
    const user = firebase.auth().currentUser;
    const userName = db.collection("Chat Record").doc(props.data.UserId);
    onSnapshot(userName, (snapshot) => {
      setUserName(snapshot?.data()?.Name);
      setInfo(snapshot?.data()?.Info);
      setPhotoURL(snapshot?.data()?.Photo);
    });
    const userMsg = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(props.data.UserId);
  }

  function activerChatUser() {
    console.log("props.data.UserId");
    console.log(props.data.UserId);
    dispatch(addActiveUser(props.data.UserId));
  }

  function addToFriendList() {
    const user = firebase.auth().currentUser;

    const tete = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .doc(UserUid);

    tete.get().then((doc) => {
      if (doc.data()) {
        console.log("frinds");
      } else {
        console.log("not frinds");
        tete.set({
          ChatHistory: [],
          LastUpdated: serverTimestamp(),
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
        });
      }
    });
  }

  return (
    <>
      <div
        className="borrr group w-[100%] h-[75px] px-[20px] py-[10px] flex items-center justify-center cursor-pointer bg-transparent hover:bg-[#fce9ed]   "
        onClick={() => {
          activerChatUser();
          addToFriendList();
          // setSearchFlag(false);
          // dispatch(toggleSendFlag(true));
        }}
      >
        <div
          className="w-[50px] h-[50px]  rounded-full z-20"
          style={{ zIndex: "10" }}
        >
          {photoURL === "nophoto" ? (
            <img
              src={profile2}
              className="w-full h-full rounded-full object-cover drop-shadow-sm z-20"
            ></img>
          ) : (
            <img
              src={photoURL}
              className="w-full h-full rounded-full object-cover drop-shadow-sm"
            ></img>
          )}
        </div>
        <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
          <div className="w-full font-semibold flex h-[23px]">
            <span
              className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-black   drop-shadow-sm  font-[rubik] font-normal"
              // style={{ transition: ".9s" }}
            >
              {/* {props.data.user} */}
              {userName}
            </span>
            <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-white group-hover:text-black drop-shadow-md">
              {/* {props.data.time} */}
              {/* {Time} */}
            </span>
          </div>
          <div className="w-full flex h-[23px]">
            <span
              className="w-[calc(100%-70px)] text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#8e9396] drop-shadow-sm  font-[rubik] font-light"
              // style={{ transition: ".9s" }}
            >
              {/* {props.data.msg} */}
              {info}
            </span>
            <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
              {/* {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[white] text-black">
                        {unreadMessages}
                      </span>
                    </>
                  )} */}
            </span>
          </div>
          {/* <span className="text-[15px]">Hello! How Are you</span> */}
        </div>
      </div>
    </>
  );
};

// const Dummy = [
//   {
//     user: "Himadri Purkait",
//     msg: "Hello how Are you ! 😊",
//     no: "1",
//     time: "10.15",
//   },
//   {
//     user: "Sourav Poddar",
//     msg: "Here are few more travel destinations around europe, united states of america, japan, southern america, south africa, congo, sri lanka, west indies, green land and australia",
//     no: "5",
//     time: "12.23",
//   },
//   {
//     user: "Anirban Mandal",
//     msg: "https://upload.wikimedia.org/wikipedia/commons/b/be/Top_of_Atmosphere.jpg",
//     no: "3",
//     time: "2.15",
//   },
//   { user: "Ankan Maiti", msg: "Please Help Me ", no: "10", time: "10.15" },
//   {
//     user: "Anirban Das",
//     msg: "Will you help me to do my home work ? Pleaseeeeeeeeeee ",
//     no: "2",
//     time: "7.48",
//   },
// ];

const UserList = () => {
  // const [SearchUserList, setSearchUserList] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [searchFlag, setSearchFlag] = useState(false);
  const [section, setSection] = useState("Chat");

  const dispatch = useDispatch();
  const UserList = useSelector((store) => store.chat.FriendList);
  const AllUserList = useSelector((store) => store.chat.AllFriendList);
  const SearchUserList = useSelector((store) => store.chat.SearchFriendList);
  const GroupList = useSelector((store) => store.chat.allGroup);

  const [statusModal, setStatusModal] = useState(false);
  const [groupModal, setGroupModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  // const [createGroup, setCreateGroup] = useState("");

  const [ownerName, setOwnerName] = useState("");
  const [profileURL, setProfileURL] = useState("");
  const [isStatus, setIsStatus] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [statusCount, setStatusCount] = useState(0);
  const [statusTimestamp, setStatusTimestamp] = useState("");

  const [isSearchBar, setIsSearchBar] = useState(false);

  const [statusImage, setStatusImage] = useState();
  const [statusTextModal, setStatusTextModal] = useState(false);
  const [statusImageUrl, setStatusImageUrl] = useState("");
  // addFriendList;
  console.log("UserList");
  console.log(UserList);

  useEffect(() => {
    fetchownerInfo();
    fetchUserList();
    fetchAllGroups();
  }, []);

  function fetchownerInfo() {
    const user = firebase.auth().currentUser;

    const userDoc = db.collection("Chat Record").doc(user.uid);
    onSnapshot(userDoc, (snapshot) => {
      // console.log("snapshot.docssssssssssssss");
      // console.log(snapshot.data());
      setOwnerName(snapshot?.data()?.Name);
      setIsStatus(snapshot?.data()?.Status);
      setStatusImageUrl(snapshot?.data()?.Status);
      setStatusCount(snapshot?.data()?.Status.length);
      setProfileURL(snapshot?.data()?.Photo);
      setStatusTimestamp(snapshot?.data()?.LastStatus);
    });
  }

  function fetchUserList() {
    const user = firebase.auth().currentUser;
    const userDoc = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Chat Friends")
      .orderBy("LastUpdated", "desc");

    // userDoc.get().then((snapshot) => {
    //   console.log("snapshot.docs");
    //   console.log(snapshot);
    //   // setUserList(snapshot.docs);
    //   dispatch(clearFriendList());
    //   snapshot.docs?.map((user) => {
    //     console.log(user.id);

    //     dispatch(addFriendList({ UserId: user.id }));
    //   });
    // });
    onSnapshot(userDoc, (snapshot) => {
      console.log("Last Updated User Message");
      console.log(snapshot.docs);
      // setUserList(snapshot.docs);
      dispatch(clearFriendList());
      snapshot.docs?.map((user) => {
        dispatch(addFriendList({ UserId: user.id }));
      });
    });
  }

  function allUserList() {
    const users = firebase.auth().currentUser;
    const userDoc = db.collection("Chat Record").orderBy("Name", "desc");
    onSnapshot(userDoc, (snapshot) => {
      console.log("Last Updated User Message");
      console.log(snapshot.docs);
      // setUserList(snapshot.docs);
      dispatch(clearAllFriendList());
      snapshot.docs?.map((user) => {
        // console.log(typeof user.id);
        // console.log(typeof users.uid);
        if (user.id !== users.uid) {
          // console.log("Same user");
          dispatch(addAllFriendList({ UserId: user.id }));
        } else {
          // console.log("different user");
        }
      });
    });
  }

  // useEffect(() => {
  //   if (searchUser.length !== 0) {
  //     searchUserFriend();
  //   }
  // }, [searchUser]);

  function searchUserFriend() {
    console.log("USers--------");
    const UserRef = db.collection("Chat Record");

    const queryRef = UserRef.where("Name", "==", searchUser);
    queryRef.get().then((data) => {
      console.log(data.docs);
      // setSearchUserList(data.docs);
      dispatch(clearSearchFriendList());
      data.docs.forEach((userId) => {
        console.log(userId.id);
        dispatch(addSearchFriendList({ UserId: userId.id }));
        // SearchUserList.push(userId.id);
      });
    });
  }

  function createGroup() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const grpRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      // .doc(user.uid)
      .doc(groupName)
      // .doc(user.uid)
      .set({
        chat: "hello",
      });
  }

  function fetchAllGroups() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    const grpRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group");
    // .doc(user.uid);

    onSnapshot(grpRef, (snapshot) => {
      console.log("Group Naemeeeee");
      console.log(snapshot.docs);

      dispatch(clearAllGroup());
      snapshot.docs.forEach((name) => {
        console.log("name---------------------------");
        console.log(name.id);
        dispatch(addAllGroup({ GroupName: name.id }));
      });
      // dispatch(clearAllFriendList());
      // snapshot.docs?.map((user) => {
      //   if (user.id !== users.uid) {
      //     dispatch(addAllFriendList({ UserId: user.id }));
      //   } else {
      //   }
      // });
    });
  }

  function Image(e) {
    console.log(e.target.files[0]);
    setStatusImage(e.target.files[0]);
    uploadImage();
    //  setImageLength(e.target.files.length);
  }

  const uploadImageGetUrl = async (fileRef) => {
    const user = firebase.auth().currentUser;
    var geturl = await uploadBytes(fileRef, statusImage).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        const statusRef = db.collection("Chat Record").doc(user.uid).update({
          Status: url,
        });
        // var temp = formatAMPM(new Date());
        // storeToReactStore(
        //   Messages,
        //   temp,
        //   url,
        //   videoUrl,
        //   documentUrl,
        //   DocName,
        //   DocSize
        // );
        // setMessages("");
        geturl = url;
      });
      console.log("Uploaded a blob or file!");
    });
    return geturl;
  };

  const uploadImage = async () => {
    const user = firebase.auth().currentUser;
    const fileRef = ref(storage, `/status_image/${user.uid}/${user.uid}/`);
    const myPromise = uploadImageGetUrl(fileRef);
    toast.promise(
      myPromise,
      {
        loading: "Uploading Status",
        success: "Status Updated",
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

  // function set

  return (
    <>
      <div className="w-full  lg:w-full md:w-full h-[calc(100%-160px)] md:h-[calc(100%-70px)] lg:h-[calc(100%-70px)]  flex flex-col items-end bg-[#d9e1e4] pt-[0px]">
        {/* yserlist */}

        <div className="w-full min-h-[40px] hidden md:flex lg:flex font-semibold text-[white] justify-evenly items-center font-[work] text-[15px] overflow-hidden">
          {section === "All" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full text-white border-[#a93cee]">
              All
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSearchFlag(false);
                allUserList();
                setSection("All");
                setStatusModal(false);
              }}
            >
              All
            </span>
          )}
          {section === "Chat" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full text-white border-[#a93cee]">
              Chats
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSearchFlag(false);
                fetchUserList();
                setSection("Chat");
                setIsSearchBar(false);
                setStatusModal(false);
              }}
            >
              Chats
            </span>
          )}
          {section === "Group" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full text-white border-[#a93cee]">
              Group
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSearchFlag(false);
                setSection("Group");
                setIsSearchBar(false);
                setStatusModal(false);
              }}
            >
              Group
            </span>
          )}
          {section === "Status" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full text-white border-[#a93cee]">
              Status
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSearchFlag(false);
                setSection("Status");
                setIsSearchBar(false);
              }}
            >
              Status
            </span>
          )}
        </div>
        {searchFlag === true ? (
          <>
            <div className="min-h-[70px] w-full  flex justify-center items-center">
              <div className="w-full flex justify-start px-[10px] items-center min-h-[45px]  overflow-hidden">
                <input
                  style={{ transition: ".5s" }}
                  value={searchUser}
                  onKeyDown={(e) => {
                    if (
                      e.nativeEvent.key === "Enter" &&
                      searchUser.length !== 0
                    ) {
                      searchUserFriend();
                      setSearchFlag(true);
                    }
                  }}
                  onChange={(e) => setSearchUser(e.target.value)}
                  onClick={() => {
                    // setIsSearchBar(!isSearchBar);
                  }}
                  placeholder="Search Friends"
                  className="input w-full h-[45px]  text-[black] bg-[white] font-[work] font-medium text-[17px] tracking-[.4px] border-none z-0 outline-none  pl-[20px] pr-[50px]  drop-shadow-md rounded-full "
                ></input>
                <div
                  className="w-[35px] h-[35px] ml-[-40px] bg-[#0b0c0b] hover:bg-[#3b3b3b] rounded-full flex justify-center items-center z-5 drop-shadow-md hover:text-white text-white cursor-pointer"
                  onClick={() => {
                    // if (searchUser.length !== 0) {
                    //   searchUserFriend();
                    //   setSearchFlag(true);
                    // }
                    setSearchUser("");
                    setSearchFlag(false);
                    setIsSearchBar(false);
                  }}
                >
                  <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center ">
                    <RxCross2 className="text-[20px]  drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll">
              {SearchUserList.length === 0 ? (
                <>
                  <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[white] ">
                    <span>No Users Found</span>
                  </div>
                </>
              ) : (
                <>
                  {SearchUserList.map((friends) => {
                    return <SearchFriends data={friends} />;
                  })}
                </>
              )}
            </div>
          </>
        ) : section === "All" ? (
          <>
            {isSearchBar === false ? (
              <>
                <div className="fixed bottom-[90px] md:bottom-[10px] lg:bottom-[10px]  w-full md:w-[400px] lg:w-[400px] flex justify-end pl-[5px] pr-[15px] items-center min-h-[45px]  overflow-hidden">
                  <input
                    disabled
                    style={{ transition: ".5s" }}
                    value={searchUser}
                    onKeyDown={(e) => {
                      if (
                        e.nativeEvent.key === "Enter" &&
                        searchUser.length !== 0
                      ) {
                        searchUserFriend();
                        setSearchFlag(true);
                      }
                    }}
                    onChange={(e) => setSearchUser(e.target.value)}
                    onClick={() => {
                      // setIsSearchBar(!isSearchBar);
                    }}
                    // placeholder="Search Friends"
                    className="w-[45px] h-[45px]  text-[black] bg-[white] font-[work] font-semibold border-none  z-0 outline-none  text-[14px] drop-shadow-md rounded-full"
                  ></input>
                  <div
                    className="w-[35px] h-[35px] ml-[-40px]  hover:bg-[black] rounded-full flex justify-center items-center z-5 drop-shadow-md hover:text-white text-black cursor-pointer"
                    onClick={() => {
                      // if (searchUser.length !== 0) {
                      //   searchUserFriend();
                      //   setSearchFlag(true);
                      // }
                      setIsSearchBar(true);
                    }}
                  >
                    <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center ">
                      <RiSearch2Line className="text-[20px]  drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="fixed bottom-[90px] md:bottom-[10px] lg:bottom-[10px] mr-[20px] md:mr-0 lg:mr-0 sm:w-full md:w-[400px] lg:w-[400px] flex justify-end pl-[5px] pr-[15px] items-center min-h-[45px]  overflow-hidden">
                  <input
                    style={{ transition: ".5s", zIndex: "60" }}
                    value={searchUser}
                    onKeyDown={(e) => {
                      if (
                        e.nativeEvent.key === "Enter" &&
                        searchUser.length !== 0
                      ) {
                        searchUserFriend();
                        setSearchFlag(true);
                      }
                    }}
                    onChange={(e) => setSearchUser(e.target.value)}
                    onClick={() => {
                      // setIsSearchBar(!isSearchBar);
                    }}
                    placeholder="Search Friends"
                    className="input w-full h-[45px] z-50  text-[black] bg-[white] font-[work] font-medium text-[17px] tracking-[.4px] border-none  outline-none  pl-[20px] pr-[50px]  drop-shadow-md rounded-full "
                  ></input>
                  <div
                    className="w-[35px] h-[35px] ml-[-40px] bg-[#0b0c0b] hover:bg-[#3b3b3b] rounded-full flex justify-center items-center z-5 drop-shadow-md hover:text-white text-white cursor-pointer"
                    onClick={() => {
                      // if (searchUser.length !== 0) {
                      //   searchUserFriend();
                      //   setSearchFlag(true);
                      // }
                      setSearchUser("");
                      setIsSearchBar(false);
                    }}
                  >
                    <div className="w-[35px] h-[35px] rounded-full flex justify-center items-center ">
                      <RxCross2 className="text-[20px]  drop-shadow-md" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {/* </div> */}
            <div className="borr w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden mr-0">
              {AllUserList.length === 0 ? (
                <>No Users Yet</>
              ) : (
                <>
                  {AllUserList?.map((friends) => {
                    return <SearchFriends data={friends} />;
                  })}
                </>
              )}
            </div>
          </>
        ) : section === "Chat" ? (
          <div className="borr w-full lg:w-full md:w-full h-[(100%-110px)] ">
            {UserList.length === 0 ? (
              <>
                <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work]   px-[10px]  text-[white] ">
                  <span>No Friends Yet</span>
                </div>
              </>
            ) : (
              <>
                {UserList?.map((friends) => {
                  return <Friends data={friends} />;
                })}
              </>
            )}
          </div>
        ) : section === "Group" ? (
          <>
            {groupModal === true ? (
              <div
                className="fixed  bottom-[20px] w-[40px] h-[40px]  rounded-full bg-[white] text-black  flex justify-center items-center rotate-[135deg] cursor-pointer"
                onClick={() => {
                  setGroupModal(!groupModal);
                }}
                style={{ transition: ".4s" }}
              >
                <FaPlus className="text-[17px]" />
              </div>
            ) : (
              <div
                className="fixed  bottom-[20px] w-[40px] h-[40px]  rounded-full hover:bg-[white] hover:text-black text-white flex justify-center items-center  cursor-pointer"
                onClick={() => {
                  setGroupModal(!groupModal);
                }}
                style={{ transition: ".4s" }}
              >
                <FaPlus className="text-[17px]" />
              </div>
            )}

            {groupModal === true ? (
              <div className="fixed bottom-[80px]  h-[400px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bg-[#ffffff] rounded-lg drop-shadow-lg flex-col flex justify-center items-center">
                {/* hello */}
                <div className="group w-[130px] h-[130px] rounded-full bg-slate-500 flex  justify-center items-center ">
                  <input
                    className="hidden"
                    type="file"
                    id="groupDp"
                    accept="image/*"
                  ></input>
                  <label
                    className="group-hover:opacity-100 opacity-0 cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[#000000a9] text-white "
                    for="groupDp"
                  >
                    <BsCameraFill className="text-[17px]" />
                  </label>
                </div>
                <div className="w-[65%]">
                  <input
                    value={groupName}
                    onChange={(e) => {
                      setGroupName(e.target.value);
                    }}
                    className="input mt-[30px] w-full border-b-[2px] font-[rubik] font-normal text-[15px] py-[5px] border-b-black outline-none"
                    placeholder="Community Name"
                  ></input>
                </div>
                <div className="w-[65%]">
                  <input
                    className="input w-full  mt-[20px] flex justify-start items-start border-b-[2px] font-[rubik] font-normal text-[15px] py-[5px] border-b-black outline-none"
                    placeholder="Community Descritption"
                  ></input>
                </div>
                {groupName.length === 0 ? (
                  <div className="w-[40px] opacity-50 h-[40px] mt-[40px] rounded-full bg-[#2db82d] ">
                    <img src={tick} className="w-full"></img>
                  </div>
                ) : (
                  <div
                    className="w-[40px] h-[40px] opacity-100 mt-[40px] cursor-pointer rounded-full bg-[#2db82d] "
                    onClick={() => {
                      createGroup();
                      setGroupModal(false);
                    }}
                  >
                    <img src={tick} className="w-full"></img>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}

            {/* <div className=" group w-full h-[70px] py-[10px] flex justify-start items-center cursor-pointer font-[rubik] font-normal hover:bg-[#8171f3] px-[10px]  text-[#ffffff] hover:text-[white]">
              <div className="w-[50px] h-[50px] rounded-full flex justify-center items-center mr-[15px]">
                <MdGroups2 className="  text-[25px]" />
              </div>
              <FaPlus className="mr-[8px]   text-[17px]" />

              <span className="">Create New Group</span>
            </div> */}
            <div className=" w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden">
              {GroupList.length === 0 ? (
                <>No Groups Yet</>
              ) : (
                <>
                  {GroupList?.map((friends) => {
                    return <AllGroupList data={friends} />;
                  })}
                </>
              )}
            </div>
            {/* <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work] bg-slate-400  px-[10px]  text-[white] ">
              <span>No Friends Yet</span>
            </div>
            <div className=" group w-full h-[70px] py-[10px] flex justify-center items-center cursor-pointer font-[work] bg-slate-600  px-[10px]  text-[white] ">
              <span>No Friends Yet</span>
            </div> */}
          </>
        ) : (
          <>
            {showStatus === true ? (
              // <div className="fixed">
              <div className=" z-30 fixed bottom-0 h-[100svh] w-[400px] lg:w-[400px] md:w-[360px] mr-0 md:mr-[-20px] lg:mr-[-20px] bg-[#1f201f] drop-shadow-lg flex-col flex justify-center items-center">
                {/* Cross ------------------------- */}
                <div
                  className="fixed right-0 top-[25px] w-[40px] h-[40px]  rounded-full hover:bg-[white] hover:text-black text-white flex justify-center items-center  cursor-pointer rotate-45 z-40"
                  onClick={() => {
                    setShowStatus(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>
                {/* Profile ---------------------- */}
                <div
                  className=" group w-full h-[90px] py-[10px] flex justify-start items-center cursor-pointer font-[rubik] font-normal  px-[20px]  text-[#ffffff]  fixed top-0 border-b-[1px] border-[#404040]"
                  onClick={() => {
                    // setShowStatus(true);
                  }}
                >
                  <div className="w-[50px] h-[50px] border-[2.4px] border-[#5bd150] rounded-full">
                    {profileURL === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    ) : (
                      <img
                        src={profileURL}
                        className="w-full h-full rounded-full object-cover "
                      ></img>
                    )}
                  </div>
                  <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                    <div className="w-full font-semibold flex h-[23px]">
                      <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[rubik] font-normal  ">
                        {/* {props.data.user} */}
                        {/* {ownerName} */}
                        My Status
                      </span>
                      <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[rubik] font-light">
                        {/* {props.data.time} */}
                        {/* {Time} */}
                        {/* {statusCount} */}
                      </span>
                    </div>
                    <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[rubik] font-light">
                      {statusTimestamp}
                    </div>
                    {/* <span className="text-[15px]">Hello! How Are you</span> */}
                  </div>
                </div>
                <div className=" z-30 fixed bottom-0 h-[calc(100svh-90px)] w-full lg:w-[360px] md:w-[360px] bg-[#1f201f] rounded-lg drop-shadow-lg flex-col flex justify-center items-center">
                  {/* Left Arrow ------------------------- */}
                  <div className="fixed w-[40px] h-[40px] rounded-full bg-[#00000083] hover:bg-[black] cursor-pointer text-[white] flex justify-center items-center left-0">
                    <FaAngleLeft className="text-[17px]" />
                  </div>
                  {/* Right Arrow ------------------------- */}
                  <div className="fixed w-[40px] h-[40px] rounded-full bg-[#00000083] hover:bg-[black] cursor-pointer text-[white] flex justify-center items-center right-0">
                    <FaAngleRight className="text-[17px]" />
                  </div>

                  {/* Status ------------------------- */}
                  <img className="w-full rounded-xl" src={statusImageUrl}></img>
                  {/* Status Count Indication ------------------------- */}
                  <div className="fixed bottom-[10px] flex ">
                    {Array(3)
                      .fill()
                      .map((count) => {
                        return (
                          <div className="w-[10px] mx-[2px] h-[4px] bg-white rounded-full"></div>
                        );
                      })}
                  </div>
                </div>
              </div>
            ) : (
              // </div>
              <></>
            )}
            {statusModal === true ? (
              <>
                <div
                  className="fixed z-20 bottom-[20px] w-[40px] h-[40px]  rounded-full bg-[white] text-black  flex justify-center items-center rotate-[135deg] cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                    setStatusTextModal(false);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>
                {/* Camera ---------------------- */}

                <input
                  className="hidden"
                  type="file"
                  id="groupDp"
                  accept="image/*"
                  onChange={(e) => {
                    Image(e);
                  }}
                ></input>
                <label
                  className="fixed z-20 opacity-100 bottom-[20px] mr-[50px] w-[40px] h-[40px]  rounded-full bg-white hover:bg-[white] hover:text-black text-black flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    // setStatusModal(!statusModal);
                    setStatusTextModal(false);
                  }}
                  style={{ transition: ".4s" }}
                  for="groupDp"
                >
                  <BsCameraFill className="text-[17px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed z-20 opacity-100 bottom-[70px] mr-[0] w-[40px] h-[40px]  rounded-full bg-white hover:bg-[white] hover:text-black text-black flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusTextModal(!statusTextModal);
                  }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  {statusTextModal === true ? (
                    <img src={tick} className="w-full"></img>
                  ) : (
                    <FaPen className="text-[17px]" />
                  )}
                </div>
              </>
            ) : (
              <>
                <div
                  className="fixed z-20 bottom-[20px] w-[40px] h-[40px]  rounded-full hover:bg-[white] hover:text-black text-white flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPlus className="text-[17px]" />
                </div>

                {/* Camera ---------------------- */}
                <input
                  className="hidden"
                  type="file"
                  id="groupDp"
                  accept="image/*"
                ></input>
                <label
                  className="fixed z-20 opacity-0 bottom-[20px] mr-[0] w-[40px] h-[40px]  rounded-full bg-white hover:bg-[white] hover:text-black text-black flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s", transitionDelay: ".1s" }}
                >
                  <BsCameraFill className="text-[17px]" />
                </label>

                {/* write ---------------------- */}

                <div
                  className="fixed z-10 opacity-0 bottom-[20px] mr-[0] w-[40px] h-[40px]  rounded-full bg-white hover:bg-[white] hover:text-black text-black flex justify-center items-center  cursor-pointer"
                  onClick={() => {
                    setStatusModal(!statusModal);
                  }}
                  style={{ transition: ".4s" }}
                >
                  <FaPen className="text-[17px]" />
                </div>
              </>
            )}
            {statusTextModal === true ? (
              <>
                <textarea
                  className="h-[120px] resize-none py-[10px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bottom-[70px] fixed opacity-100 bg-[white] rounded-3xl outline-none px-[20px] font-[rubik] font-normal text-[14px] input"
                  placeholder="Enter Text"
                  // type="textarea"
                  style={{ transition: ".4s" }}
                ></textarea>
              </>
            ) : (
              // <div
              //   className="fixed bottom-[70px]  h-[40px] w-[calc(100%-40px)] lg:w-[360px] md:w-[360px] bg-[#ffffff] rounded-full   flex justify-end items-center"
              //   style={{ transition: ".4s" }}
              // >
              //   {groupName.length === 0 ? (
              //     <div className="w-[40px] z-40 opacity-50 h-[40px] mr-0 fixed rounded-full bg-[#2db82d] ">
              //       <img src={tick} className="w-full"></img>
              //     </div>
              //   ) : (
              //     <div
              //       className="w-[40px] z-40 h-[40px] opacity-100 mr-0 fixed cursor-pointer rounded-full bg-[#2db82d] "
              //       onClick={() => {
              //         createGroup();
              //         setGroupModal(false);
              //       }}
              //     >
              //       <img src={tick} className="w-full"></img>
              //     </div>
              //   )}
              // </div>
              <>
                <textarea
                  className="h-[40px] resize-none py-[10px] w-0 bottom-[70px] fixed opacity-0 bg-[white] rounded-3xl outline-none px-[20px] font-[rubik] font-normal text-[14px] input"
                  placeholder="Enter Text"
                  // type="textarea"
                  style={{ transition: ".4s" }}
                ></textarea>
                {/* <div
                  className="fixed bottom-[70px]  h-[40px] w-0 bg-[#ffffff] rounded-full   flex justify-end items-center"
                  style={{ transition: ".4s" }}
                >
                  {groupName.length === 0 ? (
                    <div className="w-[40px] z-40 opacity-50 h-[40px] mr-0 fixed rounded-full bg-[#2db82d] ">
                      <img src={tick} className="w-full"></img>
                    </div>
                  ) : (
                    <div
                      className="w-[0] z-40 h-[40px] opacity-100 mr-0 fixed cursor-pointer rounded-full bg-[#2db82d] "
                      onClick={() => {
                        createGroup();
                        setGroupModal(false);
                      }}
                    >
                      <img src={tick} className="w-full"></img>
                    </div>
                  )}
                </div> */}
              </>
            )}

            {isStatus ? (
              <div
                className=" group w-full h-[70px] py-[10px] flex justify-start items-center cursor-pointer font-[rubik] font-normal hover:bg-[#ffffffe1] px-[10px]  text-[#ffffff] hover:text-[#000000] border-t-[1px] border-b-[1px] border-[#404040]"
                onClick={() => {
                  setShowStatus(true);
                }}
              >
                <div className="w-[50px] h-[50px] border-[2.4px] border-[#a7ff2e] rounded-full">
                  {profileURL === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  ) : (
                    <img
                      src={profileURL}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  )}
                </div>
                <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                  <div className="w-full font-semibold flex h-[23px]">
                    <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis    font-[rubik] font-normal  ">
                      {/* {props.data.user} */}
                      {/* {ownerName} */}
                      My Status
                    </span>
                    <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[rubik] font-light">
                      {/* {props.data.time} */}
                      {/* {Time} */}
                      {/* {statusCount} */}
                    </span>
                  </div>
                  <div className="w-full flex h-[23px] justify-between items-center text-[13px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#9fa5a7]   font-[rubik] font-light">
                    {statusTimestamp}
                  </div>
                  {/* <span className="text-[15px]">Hello! How Are you</span> */}
                </div>
              </div>
            ) : (
              <div className=" group w-full h-[70px] py-[10px] flex justify-start items-center cursor-pointer font-[rubik] font-normal hover:bg-[#ffffffe1] px-[10px]  text-[#ffffff] hover:text-[#000000] border-t-[1px] border-b-[1px] border-[#404040]">
                <div className="w-[50px] h-[50px]  rounded-full">
                  {profileURL === "nophoto" ? (
                    <img
                      src={profile2}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  ) : (
                    <img
                      src={profileURL}
                      className="w-full h-full rounded-full object-cover "
                    ></img>
                  )}
                </div>
                <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                  <div className="w-full font-semibold flex h-[23px]">
                    <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-[#ffffff]  font-[rubik] font-normal  ">
                      {/* {props.data.user} */}
                      {/* {ownerName} */}
                      My Status
                    </span>
                    <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[rubik] font-light">
                      {/* {props.data.time} */}
                      {/* {Time} */}
                    </span>
                  </div>
                  <div className="w-full flex h-[23px] justify-between items-center"></div>
                  {/* <span className="text-[15px]">Hello! How Are you</span> */}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* <div className="w-full h-[80px] md:hidden lg:hidden   fixed bottom-[80px] flex items-center justify-center ">
        {section === "All" ? (
          <div className="w-[50px] h-[50px] rounded-full text-[black] bg-[#b8dedf] drop-shadow-md flex justify-center items-center">
            <BsFillPersonPlusFill className="text-[23px]" />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <BsFillPersonPlusFill
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                allUserList();
                setSection("All");
                setStatusModal(false);
              }}
            />
          </div>
        )}

        {section === "Group" ? (
          <div className="w-[50px] h-[50px] rounded-full text-[black] bg-[#b8dedf] drop-shadow-md flex justify-center items-center">
            <TiGroup className="text-[23px]" />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <TiGroup
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                setSection("Group");
                setIsSearchBar(false);
                setStatusModal(false);
              }}
            />
          </div>
        )}

        {section === "Chat" ? (
          <div className="w-[50px] h-[50px] rounded-full text-[black] bg-[#b8dedf] drop-shadow-md flex justify-center items-center">
            <PiChatCircleTextFill className="text-[23px]" />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <PiChatCircleTextFill
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                fetchUserList();
                setSection("Chat");
                setIsSearchBar(false);
                setStatusModal(false);
              }}
            />
          </div>
        )}

        {section === "Status" ? (
          <div className="w-[50px] h-[50px] rounded-full text-[black] bg-[#b8dedf] drop-shadow-md flex justify-center items-center">
            <TbPlaystationCircle className="text-[23px]" />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <TbPlaystationCircle
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                setSection("Status");
                setIsSearchBar(false);
              }}
            />
          </div>
        )}

        {section === "Setting" ? (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <MdSettings className="text-[23px]" />
          </div>
        ) : (
          <div className="w-[50px] h-[50px] rounded-full text-[white] drop-shadow-md flex justify-center items-center">
            <MdSettings
              className="text-[23px]"
              onClick={() => {
                setSearchFlag(false);
                setSection("Setting");
                setIsSearchBar(false);
              }}
            />
          </div>
        )}
      </div> */}

      <div className="w-full h-[80px] md:hidden lg:hidden  overflow-hidden fixed bottom-0 flex items-center justify-center bg-[#d9e1e4] text-[black]">
        <div className="fixed w-[50px] h-[50px] rounded-full text-[black] bg-[#1f3239] drop-shadow-md"></div>
        {section === "All" ? (
          <div
            className="w-full h-full  flex  items-center ml-[0]"
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[white]"
              style={{ transitionDelay: ".25s" }}
            >
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : section === "Group" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-40%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[white]"
              style={{ transitionDelay: ".25s" }}
            >
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : section === "Chat" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-80%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[white]"
              style={{ transitionDelay: ".25s" }}
            >
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : section === "Status" ? (
          <div
            className="w-full h-full  flex  items-center ml-[-120%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[white]"
              style={{ transitionDelay: ".25s" }}
            >
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        ) : (
          <div
            className="w-full h-full  flex  items-center ml-[-160%] "
            style={{ transition: ".5s" }}
          >
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>

            {/*  */}

            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TbPlaystationCircle
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Status");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div
              className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center text-[white]"
              style={{ transitionDelay: ".25s" }}
            >
              <MdSettings
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Setting");
                  setIsSearchBar(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <BsFillPersonPlusFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  allUserList();
                  setSection("All");
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <TiGroup
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  setSection("Group");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
            <div className="min-w-[20%] h-[40px] drop-shadow-md flex justify-center items-center">
              <PiChatCircleTextFill
                className="text-[23px]"
                onClick={() => {
                  setSearchFlag(false);
                  fetchUserList();
                  setSection("Chat");
                  setIsSearchBar(false);
                  setStatusModal(false);
                }}
              />
            </div>
          </div>
        )}
        {/* <div className="w-full h-full bg-slate-800"></div> */}
      </div>
      {/* import {TbPlaystationCircle} from "react-icons/tb"; import {MdGroups} from
      "react-icons/md"; import {BsFillChatSquareTextFill} from "react-icons/bs";
      // import {FaPlus} from "react-icons/fa6"; import {MdSettings} from
      "react-icons/md"; */}
    </>
  );
};

export default UserList;
