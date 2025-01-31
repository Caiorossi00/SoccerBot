import React, { useState } from "react";
import axios from "axios";
import "../assets/scss/chatbot.scss";

const leagueIds = {
  "premier league": 39,
  brasileirão: 71,
  "la liga": 140,
  "serie a": 135,
  bundesliga: 78,
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "Fala, parceiro! Em que liga de futebol você está interessado hoje? É só me dizer e eu te mando todos os jogos do dia!",
      user: false,
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, user: true },
    ]);

    const leagueId = leagueIds[inputValue.toLowerCase()];

    if (!leagueId) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Liga não encontrada. Tente novamente.", user: false },
      ]);
      setInputValue("");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/games/${leagueId}`
      );

      const games = response.data;
      console.log("Jogos encontrados:", games);

      if (games.length === 0) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Nenhum jogo encontrado para hoje.", user: false },
        ]);
      } else {
        const gameMessages = games.map((game) => ({
          text: `${game.teams.home.name} vs ${
            game.teams.away.name
          } - ${new Date(game.fixture.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}`,
          user: false,
        }));

        setMessages((prevMessages) => [...prevMessages, ...gameMessages]);
      }
    } catch (error) {
      console.error("Erro ao buscar os jogos", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "Erro ao buscar os jogos. Tente novamente mais tarde.",
          user: false,
        },
      ]);
    }

    setInputValue("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user ? "user" : "bot"}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite uma opção..."
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};

export default Chatbot;
