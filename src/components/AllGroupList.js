import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, storage } from "../firebase";
import { db } from "../firebase";
import firebase from "../firebase";
import { onSnapshot } from "firebase/firestore";
import profile2 from "../assets/img/d.png";
import { MdDelete } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { addActiveUser } from "../utils/chatSlice";

export const AllGroupList = (props) => {
  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [profile, setProfile] = useState("");
  const [theme, setTheme] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    fetchGroupInfo();
  }, [props?.data?.GroupName]);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  function deleteChatUser() {
    const user = firebase.auth().currentUser;
    // console.log(user.uid);
    // console.log(UserUid);
    // var docRef = doc(db,"")
    var delRef = db
      .collection("Chat Record")
      .doc(user.uid)
      .collection("Group")
      .doc(name)
      .delete();

    var delRef2 = db.collection("Groups").doc(name).delete();
    // deleteDoc(delRef).then(() => {
    //   console.log("chat deleted");
    // });
    // dispatch(addActiveUser(""));
  }

  function activerChatUser() {
    // console.log("props.data.UserId");
    // console.log(props.data.UserId);
    dispatch(addActiveUser(name));
  }

  function fetchGroupInfo() {
    const user = firebase.auth().currentUser;
    const grpRef = db.collection("Groups").doc(props?.data?.GroupName);
    onSnapshot(grpRef, (snapshot) => {
      // console.log("Group Dattaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      // console.log(snapshot.data());
      setDescription(snapshot?.data()?.Description);
      setName(snapshot?.data()?.Name);
      setProfile(snapshot?.data()?.ProfileURL);
    });
  }

  return (
    <>
      <>
        {confirmDelete === true ? (
          <div className=" w-full md:w-[400px] lg:w-[400px] h-[100svh] top-0 left-0 fixed bg-[#17171a25] z-50 backdrop-blur-md flex justify-center items-center">
            <div
              className={
                " text-[15px] w-[320px]  h-auto p-[20px] rounded-3xl flex flex-col justify-center items-center " +
                (theme
                  ? " bg-[#ffffff] text-black"
                  : " bg-[#222228] text-white")
              }
            >
              {/* <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
              <span
                className={
                  " font-[work]  font-normal flex justify-start items-center text-[20px] mt-[5px]" +
                  (theme ? "  text-black" : "  text-white")
                }
              >
                {photoURL === "nophoto" ? (
                  <img
                    src={profile2}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover mr-[10px] "
                  ></img>
                ) : (
                  <img
                    src={photoURL}
                    alt=""
                    className="w-[40px] h-[40px] rounded-full object-cover mr-[10px] "
                  ></img>
                )}{" "}
                {userName}
              </span>
            </div> */}
              <div className="w-full rounded-xl  flex justify-start items-center px-[6px]">
                <span className=" font-[google] font-light text-[22px] flex justify-start items-center text-[#bb2a23] ">
                  <TbAlertTriangle className="text-[25px] text-[#bb2a23]" />{" "}
                  &nbsp; Delete this Contact?
                </span>
              </div>

              <div
                className={
                  "w-full mt-[10px] rounded-xl font-[google]  flex justify-center items-center px-[6px]" +
                  (theme ? " text-[#343434] " : " text-[#b7b7b7]")
                }
              >
                <span className="  font-light ">
                  All the chat's history and media with this contact will be
                  deleted. Are you sure?
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
                    setConfirmDelete(false);
                  }}
                >
                  Close
                </button>
                <button
                  className="w-auto flex items-end ml-[30px] h-auto text-[#bb2a23]   cursor-pointer  font-[google] font-light  rounded-2xl"
                  onClick={() => {
                    // console.log("clicked");
                    deleteChatUser();
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
        <div className="group px-[10px] md:px-[20px] lg:px-[20px]  group w-full h-[75px] py-[10px] flex justify-center items-center bg-transparent  cursor-pointer    z-10 ">
          <div
            className={
              " group w-full h-[75px] py-[10px] border-b-[1px]  flex justify-center items-center bg-transparent  cursor-pointer   z-10  " +
              (theme ? " border-[#d9dde1]" : " border-[#25262f]")
            }
          >
            <div
              className={
                "w-[45px] h-[45px]  rounded-[18px]" +
                (theme ? " bg-[#ffffff]" : " bg-[#222228]")
              }
              // onClick={() => props.setProfileZoom(photoURL)}
            >
              {profile === "nophoto" ? (
                <img
                  src={profile2}
                  alt=""
                  className="w-full h-full rounded-[18px] object-cover "
                ></img>
              ) : (
                <img
                  src={profile}
                  alt=""
                  className="w-full h-full rounded-[18px] object-cover "
                ></img>
              )}
            </div>
            <div
              className=" w-[calc(100%-55px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start"
              onClick={() => activerChatUser()}
            >
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className={
                    "w-[calc(100%-70px)] text-[17px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis font-[google] font-normal " +
                    (theme ? " text-[#000000]" : " text-[#ffffff]")
                  }
                  // style={{ transition: ".9s" }}
                >
                  {/* {props.data.user} */}
                  {name}
                </span>
                <span
                  className={
                    "w-[70px] h-full group-hover:mr-[25px] text-[14px] flex justify-end items-center  font-[work] font-light z-50" +
                    (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                  }

                  // style={{ transition: ".9s" }}
                >
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              {/* <div className="w-full  flex h-[23px] justify-between items-center">
                {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className={
                            "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work] " +
                            (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                          }
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <BsFillCameraFill
                      className={
                        "mr-[5px]  " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className={
                        "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
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
                          className={
                            "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
                            (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                          }
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <TiVideo
                      className={
                        "mr-[5px]   " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className={
                        "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full     font-[work] " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
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
                          className={
                            "w-[35px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
                            (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                          }
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <IoMdDocument
                      className={
                        "mr-[5px] " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className={
                        "w-[calc(100%-105px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
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
                          className={
                            "w-[30px] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full   font-[work]  " +
                            (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                          }
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span
                      className={
                        "w-[calc(100%-70px)] text-[14px]    whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full    font-[work] " +
                        (theme ? " text-[#5f5f5f]" : " text-[#8e9396]")
                      }
                      // style={{ transition: ".5s" }}
                    >
                      {!lastMsg ? (
                        <>Messages are end-to-end encrypted.</>
                      ) : (
                        <>{lastMsg}</>
                      )}
                    </span>
                  </>
                )}
                
                <span className="w-[70px] text-[14px] h-full font-normal  flex justify-end items-center">
                  {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[20px] h-[20px] text-[11px] font-[google] font-semibold flex justify-center items-center rounded-full bg-[#8981f7] text-[#ffffff]">
                        {unreadMessages}
                      </span>
                    </>
                  )}
                </span>
              </div> */}
              {/* <span className="text-[15px]">Hello! How Are you</span> */}
            </div>
          </div>
          <span
            className="group-hover:flex hidden justify-center items-start pt-[5px] h-full w-[20px] ml-[-20px] z-40"
            onClick={() => {
              setConfirmDelete(true);
              console.log("clickeddddddd");
            }}
          >
            <MdDelete
              className={
                "text-[17px] " + (theme ? " text-black" : " text-white")
              }
            />
          </span>
        </div>

        {/* <div className="w-full h-[100svh] backdrop-blur-md fixed"></div> */}
      </>
    </>
  );
};

export default AllGroupList;
