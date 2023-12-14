"use client";

import React from "react";
import { useSocketContext } from "../context/SocketProvider";

export default function Home() {
  const { sendMessage, messages, userName, setUserName } = useSocketContext();
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (userName && message) {
      sendMessage(userName, message);
    } else {
      alert("Please require all fields");
    }
    if (inputRef?.current) {
      inputRef.current.value = "";
    }
  };

  console.log("ALL MSGS", messages);
  // console.log(userName)

  return (
    <main className="p-4">
      <div className="flex md:justify-center">
        <input
          type="text"
          value={userName}
          placeholder="enter your name"
          className="border py-2 md:px-3 pl-2 rounded-3xl md:mr-4 md:w-[15%]"
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="text"
          ref={inputRef}
          placeholder="enter your message"
          className="border py-2 px-6 pl-2 rounded-3xl w-1/4"
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="h-[38px] w-[38px] bg-green-300 font-bold rounded-full ml-2"
        >
          {">"}
        </button>
      </div>

      <div className="mt-11 flex flex-col items-start h-auto w-auto md:max-w-[768px] mx-auto">
        {messages?.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0
                ? "justify-start relative left-4"
                : "justify-end relative right-21"
            } w-full`}
          >
            <section
              className={`max-w-[70%] ${
                index % 2 === 0 ? "mr-auto" : "ml-auto"
              }`}
            >
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold px-[2px] py-[3px]">
                  {msg.user}:{" "}
                </span>
                <span
                  className={`inline-block py-[3px] px-6 rounded-full ${
                    index % 2 === 0
                      ? "bg-[#4dbbfa] text-black"
                      : "bg-[#e4e3e8] text-black"
                  } relative`}
                >
                  {msg.message}
                </span>
              </div>
            </section>
          </div>
        ))}
      </div>
    </main>
  );
}
