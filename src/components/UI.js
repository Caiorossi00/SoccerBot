import React, { useState } from "react";
import Header from "./Header";
import Table from "./Table";
import "../assets/scss/UI.scss";
import Leagues from "./Leagues";
import Info from "./Info";

const UI = () => {
  const [messages, setMessages] = useState([
    {
      text: "Partidas do Dia",
      user: false,
    },
  ]);
  const [games, setGames] = useState([]);

  const handleSendMessage = (message, gamesData) => {
    if (message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, user: false },
      ]);
    } else {
      setGames(gamesData);
    }
  };

  return (
    <div id="UI">
      <div className="left-side">
        <Header onSendMessage={handleSendMessage} />
        <div>
          <Leagues />
          <Info />
        </div>
      </div>
      <div id="right-side">
        <Table games={games} messages={messages} />
      </div>
    </div>
  );
};

export default UI;
