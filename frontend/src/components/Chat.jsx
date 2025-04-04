import React, { useContext, useEffect, useState } from "react";
import { MessageContext } from './../../context/MessageContext';

const Chat = ({ senderId, receiverId, receiverName, closeChat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const { sendMessage, getMessages } = useContext(MessageContext);

  useEffect(() => {
    const fetchMessages = async () => {
      if (receiverId) {
        const fetchedMessages = await getMessages(receiverId);
        setMessages(fetchedMessages || []);
      }
    };
    fetchMessages();
  }, [receiverId, getMessages]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result); // base64 string
        setPreviewUrl(URL.createObjectURL(file)); // for preview
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !selectedImage) return;

    const sentMessage = await sendMessage({
      receiverId,
      text: newMessage.trim(),
      image: selectedImage,
    });

    if (sentMessage) {
      setMessages([...messages, sentMessage]);
      setNewMessage("");
      setSelectedImage(null);
      setPreviewUrl(null);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 w-80 bg-gray-900 text-white p-4 rounded-lg shadow-lg z-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">{receiverName}</h2>
        <button className="text-red-400" onClick={closeChat}>✖</button>
      </div>

      {/* Messages */}
      <div className="chat-box h-60 overflow-y-auto p-2 border border-gray-700 rounded bg-gray-800 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.senderId === senderId ? "text-right" : "text-left"
            }`}
          >
            {msg.text && (
              <p className={msg.senderId === senderId ? "text-blue-400" : "text-gray-300"}>
                {msg.text}
              </p>
            )}
            {msg.image && (
              <img
                src={msg.image}
                alt="Sent"
                className="max-w-[150px] rounded mt-1 inline-block"
              />
            )}
          </div>
        ))}
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="mb-2 relative">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 object-cover rounded"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 py-0.5 text-xs"
          >
            ✖
          </button>
        </div>
      )}

      {/* Input */}
      <form className="mt-3 flex flex-col gap-2" onSubmit={handleSendMessage}>
        <div className="flex">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow px-3 py-2 bg-gray-800 rounded-l-lg outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-r-lg"
          >
            Send
          </button>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-sm"
          />
        </div>
      </form>
    </div>
  );
};

export default Chat;
