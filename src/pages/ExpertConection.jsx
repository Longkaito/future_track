import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import { Send } from "lucide-react";

export default function ExpertConection() {
  const [messages, setMessages] = useState({}); // { [userPeerId]: [{from, text}] }
  const [input, setInput] = useState("");
  const [connections, setConnections] = useState({}); // { [peerId]: connection }
  const [activeUser, setActiveUser] = useState(null); // peerId của user đang xem chat
  const [userList, setUserList] = useState([]); // danh sách peerId user đang chat
  const [conn, setConn] = useState(null); // For user
  const messagesEndRef = useRef(null);

  // Lấy userInfo từ localStorage
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const isExpert = Number(userInfo.id) === 100;
  const peerRef = useRef(null);

  useEffect(() => {
    const peerId = isExpert ? "expert-100" : `user-${userInfo.id}`;
    const peer = new Peer(peerId, {
      host: "localhost",
      port: 3000,
      path: "/myapp",
      secure: false,
    });
    peerRef.current = peer;

    if (isExpert) {
      peer.on("connection", (connection) => {
        const userPeerId = connection.peer;
        setConnections((prev) => ({ ...prev, [userPeerId]: connection }));
        setUserList((prev) =>
          prev.includes(userPeerId) ? prev : [...prev, userPeerId]
        );
        setActiveUser((prev) => prev || userPeerId); // auto chọn user đầu tiên

        connection.on("data", (data) => {
          setMessages((msgs) => ({
            ...msgs,
            [userPeerId]: [
              ...(msgs[userPeerId] || []),
              { from: userPeerId, text: data },
            ],
          }));
        });
      });
    } else {
      const connection = peer.connect("expert-100");
      setConn(connection);
      connection.on("open", () => {});
      connection.on("data", (data) => {
        setMessages((msgs) => ({
          ...msgs,
          expert: [...(msgs.expert || []), { from: "expert", text: data }],
        }));
      });
    }

    return () => {
      peer.destroy();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeUser]);

  const sendMessage = () => {
    if (!input.trim()) return;
    if (isExpert && activeUser && connections[activeUser]) {
      connections[activeUser].send(input);
      setMessages((msgs) => ({
        ...msgs,
        [activeUser]: [...(msgs[activeUser] || []), { from: "me", text: input }],
      }));
    } else if (!isExpert && conn) {
      conn.send(input);
      setMessages((msgs) => ({
        ...msgs,
        expert: [...(msgs.expert || []), { from: "me", text: input }],
      }));
    }
    setInput("");
  };

  // Danh sách user đang chat (chỉ chuyên gia mới có)
  const renderUserList = () =>
    userList.length === 0 ? (
      <div className="text-gray-400 text-center py-4">Chưa có user nào</div>
    ) : (
      userList.map((peerId) => (
        <button
          key={peerId}
          className={`block w-full text-left px-4 py-2 rounded-lg mb-2 ${
            activeUser === peerId
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-800"
          }`}
          onClick={() => setActiveUser(peerId)}
        >
          {peerId}
        </button>
      ))
    );

  // Tin nhắn của luồng đang chọn
  const currentMessages = isExpert
    ? messages[activeUser] || []
    : messages.expert || [];

  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-blue-50 to-white">
      <div className="flex flex-1 w-full max-w-lg mx-auto relative">
        {isExpert && (
          <div className="w-1/3 min-w-[120px] max-w-[160px] bg-white border-r border-blue-100 p-2 overflow-y-auto">
            <div className="font-bold mb-2">User đang chat</div>
            {renderUserList()}
          </div>
        )}
        <div className={`flex-1 flex flex-col ${isExpert ? "w-2/3" : "w-full"}`}>
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md p-3 border-b border-blue-100 flex flex-col">
            <h2 className="text-lg sm:text-2xl font-bold text-blue-700 flex items-center gap-2">
              {isExpert
                ? activeUser
                  ? `👨‍💼 Chuyên gia chat với ${activeUser}`
                  : "👨‍💼 Chuyên gia"
                : "💬 Chat với chuyên gia"}
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              {isExpert
                ? "Bạn là chuyên gia, có thể chat với nhiều người dùng."
                : "Bạn chỉ có thể chat với chuyên gia."}
            </p>
          </div>
          {/* Chat box */}
          <div
            className="flex-1 overflow-y-auto px-2 py-3 bg-white rounded-t-xl shadow-md"
            style={{
              minHeight: 0,
              marginBottom: "80px",
            }}
          >
            {currentMessages.length === 0 && (
              <div className="text-center text-gray-400 mt-10 text-base">
                Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!
              </div>
            )}
            {currentMessages.map((msg, idx) => {
              const isMe = msg.from === "me";
              return (
                <div
                  key={idx}
                  className={`flex mb-2 ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80vw] px-4 py-2 rounded-2xl shadow-sm text-base sm:text-base
                      ${isMe
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                      }
                    `}
                  >
                    <div className="text-xs font-semibold mb-1 opacity-70">
                      {isMe
                        ? "Bạn"
                        : msg.from === "expert"
                          ? "Chuyên gia"
                          : msg.from}
                    </div>
                    <div className="break-words">{msg.text}</div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          {/* Input box cố định dưới cùng */}
          <form
            className="fixed bottom-0 left-0 w-full max-w-lg mx-auto bg-white/95 border-t border-blue-100 flex gap-2 px-2 py-3 items-center z-20"
            style={{
              boxShadow: "0 -2px 16px 0 rgba(0,0,0,0.04)",
              touchAction: "none",
            }}
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              className="flex-1 input input-bordered input-primary rounded-full focus:outline-none text-base px-4 py-3 text-black"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Nhập tin nhắn..."
              autoComplete="off"
              style={{
                minHeight: 44,
                background: "#f8fafc",
              }}
            />
            <button
              type="submit"
              className="btn btn-primary rounded-full px-4 py-2 min-w-[44px] min-h-[44px] flex items-center gap-1 text-base"
              disabled={!input.trim() || (isExpert && !activeUser)}
              style={{ boxShadow: "0 2px 8px 0 rgba(59,130,246,0.08)" }}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}