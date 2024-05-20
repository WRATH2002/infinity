import React from "react";
import { db } from "../firebase";
import firebase from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { BiCheckDouble, BiSolidLockAlt } from "react-icons/bi";
import { BiSolidSend } from "react-icons/bi";
import { BiSolidMicrophone } from "react-icons/bi";
import { TiArrowLeft, TiAttachment, TiLockClosed } from "react-icons/ti";
import { BsFillStopFill } from "react-icons/bs";
import { MdEmojiEmotions } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import { TbGif } from "react-icons/tb";
import { PiSticker } from "react-icons/pi";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { RiVideoLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import { IoMdDocument } from "react-icons/io";
import { WiStars } from "react-icons/wi";
import { useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import profile2 from "../assets/img/d.png";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Chat = (props) => {
  const [user, setUser] = useState("");
  const [theme, setTheme] = useState(true);
  const [url, setUrl] = useState("");
  const [profile, setProfile] = useState("");
  const [name, setName] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUser(user.uid);
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
      //   setProfile(snapshot?.data()?.Photo);
      //   setName(snapshot?.data()?.Name);
    });
  }, []);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    setUser(user.uid);
    const ref = db.collection("Chat Record").doc(props?.data?.Sender);
    onSnapshot(ref, (snapshot) => {
      //   setTheme(snapshot?.data()?.theme);
      setProfile(snapshot?.data()?.Photo);
      setName(snapshot?.data()?.Name);
    });
  }, []);

  //   useEffect(() => {
  //     const user = firebase.auth().currentUser;
  //     const ref = db.collection("Chat Record").doc(user.uid);
  //     onSnapshot(ref, (snapshot) => {
  //       setTheme(snapshot?.data()?.theme);
  //     });
  //   },[])
  return (
    <>
      {props?.data?.Sender !== user ? (
        <div className="flex justify-start items-start">
          <div className="w-[30px] h-[30px] flex justify-center items-center rounded-full ml-[10px] my-[4px]">
            {profile === "nophoto" ? (
              <img
                src={profile2}
                alt=""
                className="w-full h-full rounded-full object-cover "
              ></img>
            ) : (
              <img
                src={profile}
                alt=""
                className="w-full h-full rounded-full object-cover "
              ></img>
            )}
          </div>
          <div className="w-full  my-[4px] flex text-[15px] justify-start  pl-[10px]">
            {props?.data?.Message?.length != 0 ? (
              <>
                <div
                  className={
                    "w-auto  max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] pt-[5px] px-[8px] pr-[8px] rounded-lg flex flex-col items-start justify-center flex-wrap " +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <div
                    className={
                      "px-[6px] w-auto whitespace-pre-wrap font-[google] text-[14px] text-[#17bbca]  rounded-[4px] font-light" +
                      (theme ? " bg-[#f0f4f9]" : " bg-[#17171a]")
                    }
                  >
                    {name}
                  </div>
                  <div className="px-[6px] w-auto flex justify-end items-end ">
                    <pre className=" max-w-[calc(100%)] whitespace-pre-wrap font-[google] font-light">
                      {props?.data?.Message}
                    </pre>
                    <div
                      className={
                        "ml-auto w-[49px] flex justify-end items-end whitespace-nowrap  font-[google] font-light  text-[10px]  mb-[-5px]  " +
                        (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                      }
                    >
                      {props?.data?.Time}
                    </div>
                  </div>
                </div>
              </>
            ) : props?.data?.Image?.length != 0 ? (
              <div
                className={
                  "group w-auto  max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[1.5px] rounded-lg flex flex-wrap justify-end items-center" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                <img
                  loading="lazy"
                  onLoad={() => {
                    setIsImageLoaded(true);
                    console.log("Loaded Image");
                  }}
                  src={props?.data?.Image}
                  className="rounded-lg w-full h-full object-cover group-hover:opacity-60"
                  onClick={() => {
                    props.temp(props?.data?.Image);
                  }}
                ></img>
                <span className="fixed text-transparent overflow-hidden w-full select-none right-0">
                  {props?.data?.Image}
                </span>

                {isImageLoaded === true ? (
                  <div
                    className={
                      "w-auto bottom-0  h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px]   py-[8px] px-[14px] font-[google] font-light" +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                    }
                  >
                    {props?.data?.Time}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : props?.data?.Video?.length != 0 ? (
              <div className="max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] md:max-h-[370px] w-auto rounded-lg flex justify-start items-center min-w-[25%]">
                <video
                  controls
                  className="w-auto  h-full rounded-lg 
              "
                >
                  <source src={props?.data?.Video}></source>
                </video>
                <span className="fixed text-transparent overflow-hidden w-full select-none right-0">
                  {props?.data?.Video}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={
                    "w-[75%] lg:w-[32%] md:w-[32%]  h-[65px] p-[0px]  rounded-lg  flex justify-center items-center" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <div className="w-full h-full  rounded-lg  flex justify-start items-center ">
                    <div className="w-[55px] h-[55px]  rounded-lg flex justify-center items-center">
                      {/* <img src={doccc} className="w-[40px]"></img> */}
                      <IoMdDocument className=" text-[35px]" />
                    </div>
                    <div className="w-[calc(100%-95px)]  h-full flex flex-col justify-center items-start px-[10px]">
                      <span className="w-full text-[14px]   whitespace-nowrap text-ellipsis overflow-hidden  font-[google] font-light ">
                        {props?.data?.docName}
                      </span>
                      <span className=" font-[google] font-light text-[11px]  ">
                        {props?.data?.docSize > 1024 ? (
                          <>{(props?.data?.docSize / 1024).toFixed(2)} mB</>
                        ) : (
                          <>{props?.data?.docSize} kB</>
                        )}
                      </span>
                    </div>
                    <div className="w-[40px] h-full flex justify-start items-center">
                      <div
                        className={
                          "w-[30px] h-[30px] rounded-full flex justify-center items-center cursor-pointer" +
                          (theme
                            ? " hover:bg-[#e4eaf1]"
                            : " hover:bg-[#17171a]")
                        }
                      >
                        {/* <img src={download} className="w-[20px]"></img> */}
                        <MdDownload
                          className={
                            "text-[25px]  " +
                            (theme ? " text-[#000000]" : " text-[#8981f7]")
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <>
          <div className="w-full  my-[4px] flex text-[15px] justify-end  pr-[10px]">
            {props?.data?.Message?.length != 0 ? (
              <div
                className={
                  "w-auto max-w-[80%] lg:max-w-[60%] md:max-w-[60%]  py-[8px] px-[14px] pr-[8px] rounded-lg flex  flex-wrap justify-between" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                <pre className="max-w-[calc(100%)] whitespace-pre-wrap   font-[google] font-light">
                  {props?.data?.Message}
                </pre>
                <div
                  className={
                    "ml-auto w-[49px] flex justify-end items-end whitespace-nowrap  font-[google] font-light  text-[10px]  mb-[-5px]  " +
                    (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                  }
                >
                  {props?.data?.Time}
                  {/* {props?.data?.id > lastMessageId ? (
                    <BiCheckDouble className="text-[15px] ml-[2px] text-[#747474]" />
                  ) : (
                    <BiCheckDouble className="text-[15px] ml-[2px] text-[#04bdb6]" />
                  )} */}
                </div>
              </div>
            ) : props?.data?.Image?.length != 0 ? (
              <div
                className={
                  "group w-auto  max-w-[75%] lg:max-w-[32%]  md:max-w-[32%] max-h-[320px] lg:max-h-[370px] min-w-[65%] lg:min-w-[25%] md:min-w-[25%] md:max-h-[370px] overflow-hidden font-normal p-[1.5px] rounded-lg flex items-center  flex-wrap justify-center hover:bg-[#1f201f]" +
                  (theme
                    ? " bg-[#ffffff] text-[black]"
                    : " bg-[#282828] text-[white]")
                }
              >
                <img
                  loading="lazy"
                  onLoad={() => {
                    setIsImageLoaded(true);
                    console.log("Loaded Image");
                  }}
                  // onClick={() => {
                  //   setZoomImage(true);
                  // }}
                  src={props?.data?.Image}
                  className="rounded-lg w-full h-full object-cover  group-hover:opacity-60"
                  onClick={() => {
                    props.temp(props?.data?.Image);
                  }}
                ></img>
                <span className="fixed text-transparent overflow-hidden w-full select-none left-0">
                  {props?.data?.Image}
                </span>

                {isImageLoaded === true ? (
                  <div
                    className={
                      "w-[60px]  right-[10px] bottom-0 h-[25px] bg-transparent  fixed flex items-center justify-end whitespace-nowrap text-[10px]  py-[8px] px-[14px]   font-[google] font-light" +
                      (theme ? "  text-[#2d2d2d]" : "  text-[#bcbcbc]")
                    }
                  >
                    {props?.data?.Time}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : props?.data?.Video?.length != 0 ? (
              <div className="max-w-[75%] lg:max-w-[32%] md:max-w-[32%] max-h-[320px] lg:max-h-[370px] md:max-h-[370px] w-auto rounded-lg flex justify-start items-center min-w-[25%]">
                <video
                  controls
                  className="w-auto  h-full rounded-lg 
              "
                >
                  <source src={props?.data?.Video} className="z-50"></source>
                </video>
                <span className="fixed text-transparent overflow-hidden w-full select-none left-0">
                  {props?.data?.Video}
                </span>
              </div>
            ) : (
              <>
                <div
                  className={
                    "w-[75%] lg:w-[32%] md:w-[32%]  h-[65px] p-[2px]  rounded-lg  flex justify-center items-center " +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                >
                  <div className="w-full h-full  rounded-lg  flex justify-start items-center ">
                    <div className="w-[55px] h-[55px]  rounded-lg flex justify-center items-center">
                      <IoMdDocument className=" text-[35px]" />
                      {/* <img src={doccc} className="w-[40px]"></img> */}
                    </div>
                    <div className="w-[calc(100%-95px)]  h-full flex flex-col justify-center items-start px-[10px]">
                      <span className="w-full  font-[google] font-light text-[14px] whitespace-nowrap text-ellipsis overflow-hidden">
                        {props?.data?.docName}
                      </span>
                      <span className=" font-[google] font-light text-[11px]">
                        {props?.data?.docSize > 1024 ? (
                          <>{(props?.data?.docSize / 1024).toFixed(2)} mB</>
                        ) : (
                          <>{props?.data?.docSize} kB</>
                        )}
                      </span>
                    </div>
                    <div className="w-[40px] h-full flex justify-start items-center">
                      <a href={props?.data?.Document} download>
                        <div
                          className={
                            "w-[30px] h-[30px] rounded-full  flex justify-center items-center cursor-pointer" +
                            (theme
                              ? " hover:bg-[#e4eaf1]"
                              : " hover:bg-[#17171a]")
                          }
                        >
                          <MdDownload
                            className={
                              "text-[25px] " +
                              (theme ? " text-[#000000]" : " text-[#8981f7]")
                            }
                          />
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

const GroupMessage = () => {
  //   const [chatMessage, setChatMessage] = useState([]);
  const [Messages, setMessages] = useState("");
  //   const [time, setTime] = useState("");
  //   const [dayFlag, setDayFlag] = useState("");

  //   const [lastIdOne, setLastIdOne] = useState(0);
  //   const [lastIdTwo, setLastIdTwo] = useState(0);
  //   const [LastMessageOne, setLastMessageOne] = useState(0);
  //   const [LastMessageTwo, setLastMessageTwo] = useState(0);
  //   const [send, setSend] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [document, setDocument] = useState(false);

  const [image, setImage] = useState();
  //   const [Doc, setDoc] = useState();
  //   const [DocName, setDocName] = useState("");
  //   const [DocSize, setDocSize] = useState("");
  const [video, setVideo] = useState();
  //   const [profileURL, setProfileURL] = useState("");
  //   const [imageUrl, setImageUrl] = useState("");
  //   const [videoUrl, setVideoUrl] = useState("");
  //   const [documentUrl, setDocumentUrl] = useState("");
  //   const [tempPhotoUrl, setTempPhotoUrl] = useState("");
  const [lastMessageId, setLastMessageId] = useState(0);
  const [chatRecord, setChatRecord] = useState();

  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    console.log("Browser doesn't support speech recognition.");
  }

  const [theme, setTheme] = useState(true);

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Chat Record").doc(user.uid);
    onSnapshot(ref, (snapshot) => {
      setTheme(snapshot?.data()?.theme);
    });
  }, []);

  function sendGroupMessage() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    const user = firebase.auth().currentUser;
    db.collection("Groups")
      .doc(ActiveChatUser)
      .update({
        Message: firebase.firestore.FieldValue.arrayUnion({
          Message: Messages,
          Id: lastMessageId + 1,
          Sender: user.uid,
          Time: hours + ":" + minutes + " " + ampm,
        }),
        MessageId: lastMessageId + 1,
      });

    setLastMessageId(lastMessageId + 1);
  }

  useEffect(() => {
    getMessageInfo();
  }, []);

  function getMessageInfo() {
    const user = firebase.auth().currentUser;
    const ref = db.collection("Groups").doc(ActiveChatUser);
    onSnapshot(ref, (snapshot) => {
      setLastMessageId(snapshot?.data()?.MessageId);
      setChatRecord(snapshot?.data()?.Message);
    });
  }
  return (
    <>
      <div
        className={
          "w-full  md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] right-0 h-[calc(100svh-140px)] top-[80px] fixed" +
          (theme ? " bg-[#d9e1e4]" : " bg-[#17171a]")
        }
      >
        {chatRecord?.map((chats) => {
          return (
            <>
              <Chat data={chats} />
            </>
          );
        })}
      </div>
      <div
        className={
          "w-full md:w-[calc(100%-400px)] lg:w-[calc(100%-400px)] h-[60px] fixed bottom-0 flex flex-col justify-center items-start " +
          (theme ? " bg-[#e4eaf1]" : " bg-[#17171a]")
        }
      >
        {ActiveChatUser.length === 0 ? (
          <></>
        ) : (
          <div className="w-full h-full flex justify-center items-center  py-[5px] ">
            {emoji === true ? (
              <div
                className="w-[30px] h-full ml-[8px] flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                onClick={() => setEmoji(!emoji)}
              >
                <MdEmojiEmotions
                  className={
                    "text-[25px] " +
                    (theme ? " text-[#000000]" : " text-[#ffffff]")
                  }
                />
              </div>
            ) : (
              <div
                className="w-[30px] h-full ml-[8px] flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                onClick={() => {
                  setEmoji(!emoji);
                  setDocument(false);
                }}
              >
                <MdEmojiEmotions
                  className={
                    "text-[25px] " +
                    (theme ? " text-[#000000]" : " text-[#ffffff]")
                  }
                />
              </div>
            )}
            {document === true ? (
              <>
                {/* <OutsideClickHandler
                  onOutsideClick={() => {
                    // alert("You clicked outside of this component!!!");
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                > */}
                <div
                  className="w-[30px] h-full flex justify-center items-center cursor-pointer   rounded-full  z-10 "
                  onClick={() => {
                    setImage();
                    setVideo();

                    setDocument(!document);
                  }}
                >
                  <TiAttachment
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  />
                </div>
                {/* </OutsideClickHandler> */}
              </>
            ) : (
              <>
                {/* <OutsideClickHandler
                  className="w-[30px] h-full flex justify-center items-center"
                  onOutsideClick={() => {
                    // alert("You clicked outside of this component!!!");
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                > */}
                <div
                  className="w-[30px] h-full flex justify-center items-center cursor-pointer   rounded-full  z-10  "
                  onClick={() => {
                    setImage();
                    setVideo();
                    // setDocument();
                    setDocument(!document);
                    setEmoji(false);
                  }}
                >
                  <TiAttachment
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                  />
                </div>
                {/* </OutsideClickHandler> */}
              </>
            )}

            {isListening == true ? (
              <>
                <div
                  className="flex justify-center items-center w-[80px] h-full mr-[-80px] z-50"
                  style={{ transition: ".4s" }}
                >
                  <span class="loader1"></span>
                  <span class="loader"></span>
                  <span class="loader1"></span>
                </div>
                <input
                  onChange={(e) => setMessages(e.target.value)}
                  value={transcript}
                  // ref={textAreaRef}
                  rows="1"
                  placeholder="Write Something .."
                  className={
                    "input  w-[calc(100%-135px)] ml-[10px]   px-[20px] pr-[50px]  outline-none text-[15px] font-[work] font-medium tracking-[.4px] rounded-[15px]   h-[50px]   pl-[60px]" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                  style={{ transition: ".4s" }}
                ></input>
              </>
            ) : (
              <>
                <div
                  className="flex justify-center items-center w-[0] overflow-hidden h-full mr-[-20px] ml-[20px] z-50"
                  style={{ transition: ".4s" }}
                >
                  <span class="loader1"></span>
                  <span class="loader"></span>
                  <span class="loader1"></span>
                </div>
                <input
                  onChange={(e) => setMessages(e.target.value)}
                  value={Messages}
                  // ref={textAreaRef}
                  rows="1"
                  placeholder="Write Something .."
                  className={
                    "input w-[calc(100%-135px)] ml-[10px]   px-[20px] pr-[50px]  outline-none text-[15px] font-[work] font-medium tracking-[.4px] rounded-2xl   h-[45px]   pl-[20px]" +
                    (theme
                      ? " bg-[#ffffff] text-[black]"
                      : " bg-[#282828] text-[white]")
                  }
                  style={{ transition: ".4s" }}
                ></input>
              </>
            )}
            <button
              className="ml-[-43px] mr-[8px] z-10 h-full   w-[35px] flex justify-center items-center cursor-pointer  rounded-full "
              onClick={() => {
                if (Messages.length !== 0) {
                  // var temp = formatAMPM(new Date());
                  // storeToReactStore(
                  //   Messages,
                  //   temp,
                  //   imageUrl,
                  //   videoUrl,
                  //   documentUrl,
                  //   DocName,
                  //   DocSize
                  // );
                  // setSend(true);
                  sendGroupMessage();
                  setMessages("");
                }
              }}
            >
              {Messages.length === 0 ? (
                <BiSolidSend
                  className={
                    "text-[20px] " +
                    (theme
                      ? " bg-[#ffffff] text-[#303030]"
                      : " bg-[#282828] text-[#9b9b9b]")
                  }
                />
              ) : (
                <BiSolidSend
                  className={
                    "text-[20px] " +
                    (theme
                      ? " bg-[#ffffff] text-[#000000]"
                      : " bg-[#282828] text-[#ffffff]")
                  }
                />
              )}
            </button>
            <div className="w-[35px] h-full flex justify-center items-center cursor-pointer rounded-full    z-10  ml-[10px] mr-[10px]   ">
              {isListening === true ? (
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full   pullse">
                  <BsFillStopFill
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                    onClick={() => {
                      setIsListening(false);
                      SpeechRecognition.stopListening();
                      setMessages(transcript);
                      resetTranscript();
                    }}
                  />
                </div>
              ) : (
                <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full  ">
                  <BiSolidMicrophone
                    className={
                      "text-[25px] " +
                      (theme ? " text-[#000000]" : " text-[#ffffff]")
                    }
                    onClick={() => {
                      resetTranscript();
                      setIsListening(true);
                      SpeechRecognition.startListening({
                        continuous: true,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GroupMessage;
