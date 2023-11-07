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
} from "../utils/chatSlice";
import { onSnapshot, snapshotEqual, where } from "firebase/firestore";
import { query } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";
import { LuSearch } from "react-icons/lu";
import { BsFillCameraFill } from "react-icons/bs";
import { BiSolidSearch } from "react-icons/bi";
import { orderBy } from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

const Friends = (props) => {
  const [userName, setUserName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [lastMsg, setLastMsg] = useState("");
  const [UserUid, setUserUid] = useState("");
  const [Time, setTime] = useState("");
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [chatLength, setChatlength] = useState(0);

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  useEffect(() => {
    setUserUid(props.data.UserId);
    fetchUserName();
  });

  // useEffect(() => {
  //   if (unreadMessages > 0) {
  //     toast.custom((t) => (
  //       <div
  //         className={`${
  //           t.visible ? "animate-enter" : "animate-leave"
  //         } max-w-md w-full bg-[#333333] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
  //       >
  //         <div className="flex-1 w-0 p-4">
  //           <div className="flex items-start">
  //             <div className="flex-shrink-0 pt-0.5">
  //               <img
  //                 className="h-10 w-10 rounded-full"
  //                 src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
  //                 alt=""
  //               />
  //             </div>
  //             <div className="ml-3 flex-1">
  //               <p className="text-sm font-medium text-[#cdd8dd]">{userName}</p>
  //               <p className="mt-1 text-sm text-[#9fa5a7]">{lastMsg}</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex border-l border-gray-200">
  //           <button
  //             onClick={() => toast.dismiss(t.id)}
  //             className="group w-full bg-[#333333] border border-[black] rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-[#cdd8dd] hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //           >
  //             <div className="w-[35px] h-[35px] rounded-full text-white group-hover:bg-[white] group-hover:text-[black] flex justify-center items-center">
  //               <RxCross2 className=" text-[20px] " />
  //             </div>
  //           </button>
  //         </div>
  //       </div>
  //     ));
  //   }
  // }, [unreadMessages]);

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
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer bg-[#cdd8dd] px-[10px] rounded-lg"
            onClick={() => {
              activerChatUser();
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-black">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-black">
                  {/* {props.data.time} */}
                  {Time}
                </span>
              </div>
              <div className="w-full flex h-[23px] items-center">
                {/* {props.data.msg} */}

                {lastMsg === "Image" ? (
                  <>
                    <BsFillCameraFill className="mr-[5px] text-[#474747]" />
                    <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]">
                      {lastMsg}
                    </span>
                  </>
                ) : (
                  <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]">
                    {lastMsg}
                  </span>
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
            className=" group w-full h-[70px] py-[10px] flex justify-center bg-transparent cursor-pointer hover:bg-[#beccd0] px-[10px] rounded-lg"
            onClick={() => activerChatUser()}
          >
            <div className="w-[50px] h-[50px]  rounded-full">
              {photoURL === "nophoto" ? (
                <img
                  src={profile2}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              )}
            </div>
            <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[#cdd8dd]  group-hover:text-black">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-[#cdd8dd] group-hover:text-black">
                  {/* {props.data.time} */}
                  {Time}
                </span>
              </div>
              <div className="w-full flex h-[23px] items-center">
                {lastMsg === "Image" ? (
                  <>
                    <BsFillCameraFill className="mr-[5px] text-[#9fa5a7] group-hover:text-[#474747]" />
                    <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]">
                      {lastMsg}
                    </span>
                  </>
                ) : (
                  <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]">
                    {lastMsg}
                  </span>
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
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer bg-[#cdd8dd] px-[10px] rounded-lg"
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
                  className="w-full h-full rounded-full object-cover"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              )}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-black">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-black">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]">
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
            className=" group w-full h-[70px] py-[10px] flex justify-center cursor-pointer hover:bg-[#beccd0] px-[10px] rounded-lg"
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
                  className="w-full h-full rounded-full object-cover"
                ></img>
              ) : (
                <img
                  src={photoURL}
                  className="w-full h-full rounded-full object-cover"
                ></img>
              )}
            </div>
            <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-white  group-hover:text-black">
                  {/* {props.data.user} */}
                  {userName}
                </span>
                <span className="w-[70px] h-full text-[13px] font-normal  flex justify-end items-center text-white group-hover:text-black">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#d4d4d4] group-hover:text-[#474747]">
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

  const dispatch = useDispatch();
  const UserList = useSelector((store) => store.chat.FriendList);
  const SearchUserList = useSelector((store) => store.chat.SearchFriendList);
  // addFriendList;
  console.log("UserList");
  console.log(UserList);

  useEffect(() => {
    // dispatch(clearFriendList());
    fetchUserList();
    // console.log(SearchUserList);
    // console.log("userList");
    // console.log(userList);
    // console.log("userList[0].id");
    // console.log(userList[0]?.id);
  }, []);
  // useEffect(() => {
  //   console.log("UserList");
  //   console.log(UserList);
  //   setUserList(UserList);
  //   console.log("userList");
  //   console.log(userList);
  // }, [UserList]);

  function fetchUserList() {
    const user = firebase.auth().currentUser;
    console.log("user");
    console.log(user);
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
      console.log("snapshot.docs");
      console.log(snapshot.docs);
      // setUserList(snapshot.docs);
      dispatch(clearFriendList());
      snapshot.docs?.map((user) => {
        console.log(user.id);

        dispatch(addFriendList({ UserId: user.id }));
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
        <div className="w-full flex justify-center items-center  mb-[20px] overflow-hidden">
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
            className="w-[calc(100%-50px)] lg:w-[calc(100%-50px)] md:w-[calc(100%-50px)] min-h-[40px] bg-[#cdd8dd] outline-none rounded-lg pl-[10px] pr-[50px] text-[14px] "
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
                className="ml-[10px] w-[40px] h-[40px] bg-[#cdd8dd] text-[black] rounded-full flex justify-center items-center cursor-pointer hover:bg-white"
                onClick={() => {
                  searchUserFriend();
                  setSearchFlag(true);
                }}
              >
                <LuSearch className="text-[15px]" />
                {/* <BiSolidSearch className="text-[15px]" /> */}
              </div>
            </>
          ) : (
            <>
              <span
                className="w-[30px] h-[30px] rounded-full hover:bg-[white] mr-[10px] ml-[-40px] flex justify-center items-center cursor-pointer"
                onClick={() => setSearchFlag(false)}
              >
                <RxCross2
                  onClick={() => {
                    setSearchUser("");
                  }}
                />
              </span>
              <div
                className="ml-[10px] w-[40px] h-[40px] bg-[#cdd8dd] text-[black] rounded-full flex justify-center items-center cursor-pointer hover:bg-white"
                onClick={() => {
                  searchUserFriend();
                  setSearchFlag(true);
                }}
              >
                <LuSearch className="text-[15px]" />
                {/* <BiSolidSearch className="text-[15px]" /> */}
              </div>
            </>
          )}
        </div>
        {searchFlag === true ? (
          <div className="w-full lg:w-full md:w-full h-[(100%-40px)] overflow-y-scroll">
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
        ) : (
          <div className="w-full lg:w-full md:w-full h-[(100%-40px)] overflow-y-scroll overflow-x-hidden">
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
        )}
      </div>
    </>
  );
};

export default UserList;
