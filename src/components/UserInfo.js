import React from "react";
import dp from "../assets/img/dp2.jpg";
import profile2 from "../assets/img/d.png";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { BiSolidVideo } from "react-icons/bi";
import { PiChatCenteredTextFill } from "react-icons/pi";
import { addActiveUser } from "../utils/chatSlice";
import { onSnapshot, serverTimestamp } from "firebase/firestore";
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

// import { FaAngleLeft } from "react-icons/fa6";

const Media = (props) => {
  const [url, setUrl] = useState("");
  const downloadImage = (data) => {
    // console.log("url");
    console.log(data);
    let urll = data;
    saveAs(urll, "helo.jpg");
  };
  return (
    <>
      {/* <div className="w-full h-full justify-start items-center  flex"> */}
      <div className="group min-w-[90px] lg:min-w-[120px] md:min-w-[120px] max-w-[90px] lg:max-w-[120px] md:max-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mx-[3px] lg:mx-[5px] md:mx-[5px] rounded-xl">
        <img
          className="group-hover:opacity-40 w-full h-full object-cover rounded-xl"
          src={props.data.url}
        ></img>
        <div className="min-w-[90px] lg:min-w-[120px] md:min-w-[120px] h-[90px] lg:h-[120px] md:h-[120px] mt-[-90px] lg:mt-[-120px] md:mt-[-120px] rounded-xl flex justify-center items-center bg-[#1f201f]">
          <div
            className="group-hover:flex  hidden w-[35px] h-[35px] rounded-full justify-center items-center bg-[#e3e3e35f] backdrop-blur-sm z-20 cursor-pointer "
            onClick={() => {
              setUrl(props.data.url);
              downloadImage(props.data.url);
              toast("Downloading Image", {
                icon: "⬇️",
                className: "font-[nunitosans] font-normal",
                style: {
                  borderRadius: "9px",
                  background: "#333",
                  color: "#cdd8dd",
                },
              });
            }}
          >
            <img
              src={download}
              className="w-[20px]   z-20 drop-shadow-md"
            ></img>
          </div>
        </div>
        {/* url :{props.link.url} */}
      </div>
      {/* <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-300"><img className="w-full object-cover" src={}></img></div>
        <div className="min-w-[120px] h-[120px] bg-slate-200"><img className="w-full object-cover" src={}></img></div> */}
      {/* </div> */}
    </>
  );
};

export const UserInfo = () => {
  const [chatUserName, setChatUserName] = useState("");
  const [chatUserAbout, setChatUserAbout] = useState("");
  const [userSidebar, setUserSidebar] = useState(false);
  const [chatUserPhoto, setChatUserPhoto] = useState("");
  const [media, setMedia] = useState();
  const [delConfirmation, setDelConfirmation] = useState(false);

  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const ImageMediaLink = useSelector((store) => store.chat.imageMediaLink);

  const dispatch = useDispatch();

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
        // setChatUserPhoto(snapshot?.data()?.Photo);
        if (snapshot.data().Photo) {
          setChatUserPhoto(snapshot.data().Photo);
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

  return (
    <>
      {userSidebar === false ? (
        <>
          {ActiveChatUser.length === 0 ? (
            <>
              {" "}
              <div
                className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-0 fixed bg-slate-500 text-white z-30 overflow-hidden"
                // style={{ transition: ".5s" }}
              ></div>
              <div className="w-full px-[20px] pt-[20px] h-[90px] bg-[#0b0c0b] text-[white]">
                <div className="w-full h-full pb-[20px] flex justify-center items-center">
                  <div className="w-[50px] h-[50px] rounded-full"></div>
                  <div className="w-[calc(100%-105px)] lg:w-[calc(100%-65px)] md:w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start"></div>

                  <div className="w-[35px] lg:w-[0] md:w-[0] h-[35px] rounded-full  text-black flex justify-center items-center">
                    {/* <FaAngleLeft className="text-[20px]" /> */}
                    <img src={back} className="w-[25px] drop-shadow-lg "></img>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <div
                className="w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)] h-0 fixed bg-slate-500 text-white z-30 overflow-hidden"
                // style={{ transition: ".5s" }}
              ></div>
              <div className="w-full px-[10px] pt-[20px] h-[75px] lg:h-[90px] md:h-[90px] bg-[#1f201f] text-[white]">
                <div className="w-full h-full pb-[20px] flex justify-center items-center">
                  <div
                    className="w-[35px] lg:w-[0] md:w-[0]  h-[35px] rounded-full  text-white flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      dispatch(addActiveUser(""));
                    }}
                  >
                    <FaAngleLeft className="text-[20px]" />
                    {/* <img src={back} className="w-[25px] drop-shadow-lg "></img> */}
                  </div>

                  <div
                    className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-slate-400 ml-[10px] lg:ml-0 md:ml-0"
                    onClick={() => {
                      setUserSidebar(!userSidebar);
                    }}
                  >
                    {chatUserPhoto === "nophoto" ? (
                      <img
                        src={profile2}
                        className="w-full h-full rounded-full object-cover"
                      ></img>
                    ) : (
                      <img
                        src={chatUserPhoto}
                        className="w-full h-full rounded-full object-cover"
                      ></img>
                    )}
                  </div>
                  <div className="w-[calc(100%-160px)] lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                    <span className="text-[16px] font-semibold text-[#cdd8dd]">
                      {chatUserName}
                    </span>
                    <span className="text-[15px] font-normal text-[#9fa5a7]">
                      +91 8100524419
                    </span>
                  </div>

                  <span
                    className="cursor-pointer w-[50px] lg:w-[150px] md:w-[150px] "
                    onClick={() => {
                      setDelConfirmation(true);
                      // deleteChats();
                    }}
                  >
                    {/* <MdDelete className="text-[20px] text-[white] hover:text-[#b54848]" /> */}
                    <div className="group flex justify-end items-center">
                      <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal bg-[#505050]">
                        Delete Chats
                      </div>
                      <MdDelete className="text-[20px]" />
                      {/* <img
                        src={del}
                        className=" w-[25px] drop-shadow-lg "
                      ></img> */}
                    </div>
                  </span>
                </div>
              </div>
              {delConfirmation === true ? (
                <div className="fixed  w-full lg:w-[calc(100%-400px)] md:w-[calc(100%-400px)]  h-[calc(100%-155px)] lg:h-[calc(100%-170px)] md:h-[calc(100%-170px)]  flex justify-center items-center z-30 bg-[#1f201f92]">
                  <div className="bg-[#1f201f] w-[320px] lg:w-[450px] md:w-[450px] h-[190px] rounded-xl flex flex-col">
                    <div className="w-full h-[110px] rounded-xl  flex justify-center items-center px-[30px]">
                      <span className="font-[work] font-semibold text-white">
                        ⚠️ Are you sure? you want to delete all chats!
                      </span>
                    </div>
                    <div className=" h-[80px] w-full flex justify-between items-center px-[30px] rounded-xl">
                      <button
                        className="w-[115px] lg:w-[165px] md:w-[165px] h-[45px] text-white cursor-pointer font-[work] bg-[#494949] hover:bg-[#303030] rounded-xl"
                        onClick={() => {
                          // console.log("clicked");
                          setDelConfirmation(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="w-[115px] lg:w-[165px] md:w-[165px] h-[45px] text-white cursor-pointer font-[work] bg-[#494949] hover:bg-[#303030] rounded-xl"
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
            </>
          )}
        </>
      ) : (
        <>
          <div
            className="w-full lg:w-[40%] md:w-[40%] h-[100vh] fixed bg-[#1f201fae]   backdrop-blur-md  text-white z-30 overflow-hidden flex flex-col justify-center items-center px-[50px] right-0 drop-shadow-xl"
            // style={{ transition: ".5s" }}
          >
            <div className="w-full h-[100px] flex justify-start items-center ">
              <div
                className="w-[35px] h-[35px] rounded-full  text-black flex justify-center items-center cursor-pointer"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                {/* <FaAngleLeft className="text-[20px]" /> */}
                <img src={back} className="w-[25px] drop-shadow-lg"></img>
              </div>
            </div>
            <div className="w-full h-[calc(100%-100px)]  flex flex-col justify-center items-center">
              <div className="w-[150px] lg:w-[200px] md:w-[200px] h-[150px] lg:h-[200px] md:h-[200px] rounded-full bg-[#cdd8dd]  drop-shadow-lg">
                {/* <span>Photo</span> */}
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="flex flex-col justify-center items-center mt-[20px]">
                <span className="text-[22px] font-normal text-[#cdd8dd] drop-shadow-lg">
                  {chatUserName}
                </span>
                <span className="text-[17px] font-normal text-[#9fa5a7] drop-shadow-lg">
                  +91 8100524419
                </span>
              </div>
              <div className="mt-[20px] w-full flex justify-center items-start h-[26px] overflow-hidden text-ellipsis">
                <span className="text-[16px]  font-normal text-[#cdd8dd] drop-shadow-lg">
                  ~ {chatUserAbout}
                </span>
              </div>
              <div className="w-full flex justify-center items-center mt-[20px] ">
                <span className="w-[50px] h-[50px] rounded-full gradintss hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  {/* <MdCall className="text-[30px]" /> */}
                  <img src={call} className="w-[35px] drop-shadow-lg"></img>
                </span>
                <span className="w-[50px] h-[50px] rounded-full gradintss hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  {/* <BiSolidVideo className="text-[30px]" /> */}
                  <img
                    src={videocall}
                    className="w-[35px] drop-shadow-lg"
                  ></img>
                </span>
                <span className="w-[50px] h-[50px] rounded-full gradintss hover:text-[black] text-[#cdd8dd] flex justify-center items-center mx-[10px]">
                  {/* <PiChatCenteredTextFill className="text-[30px]" /> */}
                  <img src={chat} className="w-[35px] drop-shadow-lg "></img>
                </span>
              </div>
              <span className="font-[work] font-normal text-[16px] w-full flex justify-start items-center mt-[20px] text-[#a0a0a0]">
                Media, Links & Docs{" "}
                <div className="ml-[10px]  w-[20px] h-[20px] flex justify-center items-center text-[14px] font-semibold text-black rounded-full bg-[#b8dedf]">
                  {ImageMediaLink.length}{" "}
                </div>
                <MdChevronRight className="text-[#a0a0a0] text-[25px] ml-[5px]" />
              </span>
              <div className="w-full h-[200px]  flex overflow-x-scroll mt-[5px] ">
                {ImageMediaLink.map((link) => {
                  return (
                    <>
                      <Media data={link} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="w-full px-[10px] pt-[20px] h-[75px] lg:h-[90px] md:h-[90px] bg-[#1f201f] text-[white]">
            <div className="w-full h-full pb-[20px] flex justify-center items-center">
              <div
                className="w-[35px] lg:w-[0] md:w-[0]  h-[35px] rounded-full  text-black flex justify-center items-center cursor-pointer"
                onClick={() => {
                  dispatch(addActiveUser(""));
                }}
              >
                {/* <FaAngleLeft className="text-[20px]" /> */}
                <img src={back} className="w-[25px] drop-shadow-lg "></img>
              </div>
              <div
                className="w-[50px] h-[50px]  rounded-full cursor-pointer bg-slate-400 ml-[10px] lg:ml-0 md:ml-0"
                onClick={() => {
                  setUserSidebar(!userSidebar);
                }}
              >
                {chatUserPhoto === "nophoto" ? (
                  <img
                    src={profile2}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                ) : (
                  <img
                    src={chatUserPhoto}
                    className="w-full h-full rounded-full object-cover"
                  ></img>
                )}
              </div>
              <div className="w-[calc(100%-160px)] lg:w-[calc(100%-215px)] md:w-[calc(100%-215px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start ">
                <span className="text-[16px] font-semibold text-[#cdd8dd]">
                  {chatUserName}
                </span>
                <span className="text-[15px] font-normal text-[#9fa5a7]">
                  +91 8100524419
                </span>
              </div>

              <span
                className="cursor-pointer w-[50px] lg:w-[150px] md:w-[150px] "
                onClick={() => {
                  deleteChats();
                }}
              >
                {/* <MdDelete className="text-[20px] text-[white] hover:text-[#b54848]" /> */}
                <div className="group flex justify-end items-center">
                  <div className="hidden justify-center items-center group-hover:flex z-30 overflow-hidden w-[0] lg:w-[100px] md:w-[100px] mr-[10px] rounded-lg h-[30px]  text-[14px] font-[work] font-normal bg-[#505050]">
                    Delete Chats
                  </div>
                  <img src={del} className=" w-[25px] drop-shadow-lg "></img>
                </div>
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UserInfo;
