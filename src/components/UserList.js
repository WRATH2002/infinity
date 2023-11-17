import { useEffect, useState } from "react";
import dp from "../assets/img/dp2.jpg";
import profile from "../assets/img/profile.jpg";
import profile2 from "../assets/img/d.png";
// import { auth } from "../firebase";
import { auth } from "../firebase";
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
} from "../utils/chatSlice";
import { onSnapshot, snapshotEqual, where } from "firebase/firestore";
import { query } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsFillCameraFill } from "react-icons/bs";
import { BiSolidSearch } from "react-icons/bi";
import { orderBy } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import searchh from "../assets/img/searchh.png";
import cross from "../assets/img/cross.png";

const Friends = (props) => {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);
  const [chatFlag, setChatFlag] = useState("");

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
        setLastMsg("Image");
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
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer  bg-[#b8dedf]  px-[10px]"
            onClick={() => {
              activerChatUser();
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-black drop-shadow-lg font-[work] ">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px]  flex justify-end items-center text-black drop-shadow-lg  font-[work] font-normal">
                  {/* {props.data.time} */}
                  {Time}
                </span>
              </div>
              <div className="w-full flex h-[23px] items-center">
                {/* {props.data.msg} */}

                {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020] drop-shadow-lg font-[work] font-normal">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <BsFillCameraFill className="mr-[5px] text-[#474747] drop-shadow-lg" />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747] drop-shadow-lg font-[work] font-normal">
                      {lastMsg}
                    </span>
                  </>
                ) : (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020] drop-shadow-lg font-[work] font-normal">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747] drop-shadow-lg font-[work] font-normal">
                      {lastMsg}
                    </span>
                  </>
                )}
                {/* </span> */}
                <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                  {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#cdd8dd] text-black">
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
        <>
          <div
            className=" group w-full h-[70px] py-[10px] flex justify-center bg-transparent  cursor-pointer  px-[10px]  btn from-left "
            onClick={() => activerChatUser()}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              )}
            </div>
            <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[white]  group-hover:text-[black] drop-shadow-lg font-[work] "
                  style={{ transition: ".9s" }}
                >
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span
                  className="w-[70px] h-full text-[13px]   flex justify-end items-center text-[white] group-hover:text-[black] drop-shadow-lg font-[work] font-normal"
                  style={{ transition: ".9s" }}
                >
                  {/* {props.data.time} */}
                  {Time}
                </span>
              </div>
              <div className="w-full flex h-[23px] items-center">
                {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] drop-shadow-lg font-[work] font-normal group-hover:text-[#202020]"
                          style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <BsFillCameraFill
                      className="mr-[5px] text-[#9fa5a7] group-hover:text-[#474747] drop-shadow-lg"
                      style={{ transition: ".5s" }}
                    />
                    <span
                      className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747] drop-shadow-lg font-[work] font-normal"
                      style={{ transition: ".5s" }}
                    >
                      {lastMsg}
                    </span>
                  </>
                ) : (
                  <>
                    {" "}
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] drop-shadow-lg font-[work] font-normal group-hover:text-[#202020]"
                          style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span
                      className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747] drop-shadow-lg font-[work] font-normal"
                      style={{ transition: ".5s" }}
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
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[white] text-black">
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
          LastUpdated: "",
          LastId: 0,
          TotalMessage: 0,
          LastMessage: 0,
        });
      }
    });
  }

  return (
    <>
      {ActiveChatUser === UserUid ? (
        <>
          <div
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer bg-[#b8dedf] px-[10px] "
            onClick={() => {
              activerChatUser();
              addToFriendList();
              // setSearchFlag(false);
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-black drop-shadow-lg">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-black drop-shadow-lg">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747] drop-shadow-lg">
                  {/* {props.data.msg} */}
                  {info}
                </span>
                <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                  {/* {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#cdd8dd] text-black">
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
      ) : (
        <>
          <div
            className=" group w-full h-[70px] py-[10px] flex justify-center cursor-pointer hover:bg-[#b8dedf] px-[10px] "
            onClick={() => {
              activerChatUser();
              addToFriendList();
              // setSearchFlag(false);
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover drop-shadow-lg"
                ></img>
              )}
            </div>
            <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-white  group-hover:text-black drop-shadow-lg"
                  // style={{ transition: ".9s" }}
                >
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-white group-hover:text-black drop-shadow-lg">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full flex h-[23px]">
                <span
                  className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#d4d4d4] group-hover:text-[#474747] drop-shadow-lg"
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
      )}
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
  // addFriendList;
  console.log("UserList");
  console.log(UserList);

  useEffect(() => {
    fetchUserList();
  }, []);

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
  return (
    <>
      <div className="w-full lg:w-full md:w-full h-[calc(100%-70px)] pt-[20px] flex flex-col items-center ">
        {/* yserlist */}
        <div className="w-full flex justify-center items-center min-h-[50px] mb-[20px] overflow-hidden">
          <input
            value={searchUser}
            onKeyDown={(e) => {
              if (e.nativeEvent.key === "Enter" && searchUser.length !== 0) {
                searchUserFriend();
                setSearchFlag(true);
              }
            }}
            onChange={(e) => setSearchUser(e.target.value)}
            placeholder="Search Friends"
            className="w-[100%] lg:w-[100%] md:w-[100%] h-full  text-[black] bg-[#b8dedf] font-[work] font-semibold border border-[#ccd7dc1f]   z-0 outline-none  pl-[20px] pr-[50px] text-[14px] drop-shadow-md "
          ></input>

          {/* <span
            onClick={() => {
              searchUserFriend();
              setSearchFlag(true);
            }}
            className="text-white"
          >
            Search
          </span> */}

          {searchUser.length === 0 ? (
            <>
              <div
                className="ml-[-40px] w-[40px] h-[40px]  text-[black] rounded-full flex justify-center items-center cursor-pointer "
                onClick={() => {
                  searchUserFriend();
                  setSearchFlag(true);
                }}
              >
                {/* <LuSearch className="text-[15px]" /> */}
                <img src={searchh} className="w-[25px] drop-shadow-md"></img>
                {/* <BiSolidSearch className="text-[15px]" /> */}
              </div>
            </>
          ) : (
            <>
              <span
                className="w-[30px] h-[30px] rounded-full  mr-[10px] ml-[-40px] flex justify-center items-center cursor-pointer z-[2]"
                onClick={() => setSearchFlag(false)}
              >
                {/* <RxCross2
                  onClick={() => {
                    setSearchUser("");
                  }}
                /> */}
                <img
                  src={cross}
                  className="w-[25px] drop-shadow-md"
                  onClick={() => {
                    setSearchUser("");
                  }}
                ></img>
              </span>
              <div
                className="ml-[10px] w-[40px] h-[40px]  text-[black] rounded-full flex justify-center items-center cursor-pointer "
                onClick={() => {
                  searchUserFriend();
                  setSearchFlag(true);
                }}
              >
                <img src={searchh} className="w-[25px] drop-shadow-md"></img>
                {/* <BiSolidSearch className="text-[15px]" /> */}
              </div>
            </>
          )}
        </div>
        <div className="w-full min-h-[40px] font-semibold text-[white] flex justify-evenly items-center font-[work] text-[15px] overflow-hidden">
          {section === "All" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full bg-[#b8dedf] text-black border-[#b8dedf]">
              All
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                allUserList();
                setSection("All");
              }}
            >
              All
            </span>
          )}
          {section === "Chat" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full bg-[#b8dedf] text-black border-[#b8dedf]">
              Chats
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                fetchUserList();
                setSection("Chat");
              }}
            >
              Chats
            </span>
          )}
          {section === "Group" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full bg-[#b8dedf] text-black border-[#b8dedf]">
              Group
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSection("Group");
              }}
            >
              Group
            </span>
          )}
          {section === "Status" ? (
            <span className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full bg-[#b8dedf] text-black border-[#b8dedf]">
              Status
            </span>
          ) : (
            <span
              className="px-[10px] w-[25%] flex justify-center items-center border-b-[2.5px] h-full border-transparent text-[#aaaaaa] cursor-pointer hover:text-[white]"
              onClick={() => {
                setSection("Status");
              }}
            >
              Status
            </span>
          )}
        </div>
        {searchFlag === true ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll">
            {SearchUserList.length === 0 ? (
              <>No users</>
            ) : (
              <>
                {SearchUserList.map((friends) => {
                  return <SearchFriends data={friends} />;
                })}
              </>
            )}
          </div>
        ) : section === "All" ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden">
            {AllUserList.length === 0 ? (
              <>No Friends Yet</>
            ) : (
              <>
                {AllUserList?.map((friends) => {
                  return <SearchFriends data={friends} />;
                })}
              </>
            )}
          </div>
        ) : section === "Chat" ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-110px)] overflow-y-scroll overflow-x-hidden">
            {UserList.length === 0 ? (
              <>No Friends Yet</>
            ) : (
              <>
                {UserList?.map((friends) => {
                  return <Friends data={friends} />;
                })}
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default UserList;
