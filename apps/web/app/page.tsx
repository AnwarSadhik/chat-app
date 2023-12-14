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
    <main className="p-4 text-center">
      <div>
        <input
          type="text"
          value={userName}
          placeholder="enter your name"
          className="border py-2 px-6 pl-2 rounded-3xl mr-4"
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

      <div className="mt-11 flex flex-col space-y-4 items-start h-auto w-auto md:max-w-[768px] mx-auto">
        {messages?.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0
                ? "justify-start relative left-10"
                : "justify-end relative right-21"
            } w-full`}
          >
            <section
              className={`max-w-[70%] ${
                index % 2 === 0 ? "mr-auto" : "ml-auto"
              }`}
            >
              <span className="font-semibold px-[2px] py-[3px]">{msg.user}: </span>
              <span
                className={`inline-block py-[3px] px-6 rounded-full rounded-bl-md ${
                  index % 2 === 0
                    ? "bg-[#4dbbfa] text-black"
                    : "bg-[#f08080] text-black"
                } relative`}
              >
                {msg.message}
              </span>
            </section>

          </div>
        ))}
      </div>
    </main>
  );
}
