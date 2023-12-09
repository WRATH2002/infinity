import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const AllGroupList = (props) => {
  const dispatch = useDispatch();
  const ActiveChatUser = useSelector((store) => store.chat.ActiveUser);

  return (
    <>
      {false ? (
        <>
          <div
            className="w-full h-[70px] py-[10px] flex justify-center cursor-pointer  bg-[white]  px-[10px]"
            onClick={() => {
              // activerChatUser();
              // dispatch(toggleSendFlag(true));
            }}
          >
            <div className="w-[50px] h-[50px] bg-slate-500  rounded-full">
              {/* {photoURL === "nophoto" ? (
                <img
                  // src={profile2}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              ) : (
                <img
                  // src={photoURL}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              )} */}
            </div>
            <div className="w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis  text-black  font-[rubik] font-normal  ">
                  {/* {props.data.user} */}
                  {props.data.name}
                </span>
                <span className="w-[70px] h-full text-[11px]  flex justify-end items-center text-black   font-[rubik] font-light">
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full flex h-[23px] justify-between items-center">
                {/* {props.data.msg} */}

                {/* {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <BsFillCameraFill className="mr-[5px] text-[#474747] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]   font-[rubik] font-light">
            
                    </span>
                  </>
                ) : lastMsg === "Video" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <TiVideo className="mr-[5px] text-[#474747] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]   font-[rubik] font-light">
                    
                    </span>
                  </>
                ) : lastMsg === "Document" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}

                    <IoMdDocument className="mr-[5px] text-[#474747] " />
                    <span className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]   font-[rubik] font-light">
                     
                    </span>
                  </>
                ) : (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#202020]  font-[rubik] font-light">
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#474747]   font-[rubik] font-light">
                      
                    </span>
                  </>
                )} */}
                {/* </span> */}
                {/* <span className="w-[70px] text-[15px] h-full font-normal  text-[white] flex justify-end items-center">
                  {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#000000] text-[#ffffff]">
                        {unreadMessages}
                      </span>
                    </>
                  )}
                </span> */}
              </div>
              {/* <span className="text-[15px]">Hello! How Are you</span> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* btn from-left */}
          <div
            className=" group w-full h-[70px] py-[10px] flex justify-center bg-transparent  cursor-pointer  px-[10px]  hover:bg-[#ffffffe1] border-t-[1px] border-[#404040] "
            // onClick={() => activerChatUser()}
          >
            <div className="w-[50px] h-[50px] bg-slate-500 rounded-full">
              {/* {photoURL === "nophoto" ? (
                <img
                  // src={profile2}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              ) : (
                <img
                  // src={photoURL}
                  className="w-full h-full rounded-full object-cover "
                ></img>
              )} */}
            </div>
            <div className=" w-[calc(100%-65px)] h-[50px] ml-[15px]  flex flex-col justify-center items-start">
              <div className="w-full font-semibold flex h-[23px]">
                <span
                  className="w-[calc(100%-70px)] text-[16px] h-full  flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-[white]  group-hover:text-[black]   font-[rubik] font-normal "
                  // style={{ transition: ".9s" }}
                >
                  {/* {props.data.user} */}
                  {props.data.GroupName}
                </span>
                <span
                  className="w-[70px] h-full text-[11px] flex justify-end items-center text-[white] group-hover:text-[black]  font-[rubik] font-light"
                  // style={{ transition: ".9s" }}
                >
                  {/* {props.data.time} */}
                  {/* {Time} */}
                </span>
              </div>
              <div className="w-full  flex h-[23px] justify-between items-center">
                {/* {lastMsg === "Image" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7]   group-hover:text-[#202020]  font-[rubik] font-light"
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <BsFillCameraFill
                      className="mr-[5px] text-[#9fa5a7] group-hover:text-[#474747] "
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]   font-[rubik] font-light"
                      // style={{ transition: ".5s" }}
                    >
                      
                    </span>
                  </>
                ) : lastMsg === "Video" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7]  font-[rubik] font-light group-hover:text-[#202020]"
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <TiVideo
                      className="mr-[5px] text-[#9fa5a7] group-hover:text-[#474747] "
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]   font-[rubik] font-light"
                      // style={{ transition: ".5s" }}
                    >
                   
                    </span>
                  </>
                ) : lastMsg === "Document" ? (
                  <>
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[35px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7]  font-[rubik] font-light group-hover:text-[#202020]"
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <IoMdDocument
                      className="mr-[5px] text-[#9fa5a7] group-hover:text-[#474747] "
                      // style={{ transition: ".5s" }}
                    />
                    <span
                      className="w-[calc(100%-105px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]   font-[rubik] font-light"
                      // style={{ transition: ".5s" }}
                    >
           
                    </span>
                  </>
                ) : (
                  <>
                    {" "}
                    {chatFlag === 1 ? (
                      <>
                        <span
                          className="w-[30px] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7]  font-[rubik] font-light group-hover:text-[#202020]"
                          // style={{ transition: ".5s" }}
                        >
                          you:
                        </span>
                      </>
                    ) : (
                      <></>
                    )}
                    <span
                      className="w-[calc(100%-100px)] text-[14px]  leading-[13px] whitespace-nowrap overflow-hidden text-ellipsis flex items-center h-full text-[#9fa5a7] group-hover:text-[#474747]   font-[rubik] font-light"
                      // style={{ transition: ".5s" }}
                    >
                    
                    </span>
                  </>
                )} */}
                {/* <span className="w-[70px] text-[15px] h-full font-normal  flex justify-end items-center">
                  {unreadMessages === 0 ? (
                    <></>
                  ) : (
                    <>
                      <span className="w-[18px] h-[18px] text-[11px] flex justify-center items-center rounded-full bg-[#ffffff] text-black">
                        {unreadMessages}
                      </span>
                    </>
                  )}
                </span> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllGroupList;
