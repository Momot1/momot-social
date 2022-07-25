import React from "react";

function MessageElement({ message }) {
  return (
    <div>
      <p>{message.message}</p>
    </div>
  );
}

export default MessageElement;
