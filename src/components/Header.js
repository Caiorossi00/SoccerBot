import React, { useState } from "react";
import suarez from "../assets/images/suarez.png";
import axios from "axios";
import "../assets/scss/header.scss";

const leagueIds = {
  "premier league": 39,
  brasileirão: 71,
  "la liga": 140,
  "serie a": 135,
  bundesliga: 78,
};

const Header = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const leagueId = leagueIds[inputValue.toLowerCase()];

    if (!leagueId) {
      onSendMessage("Liga não encontrada. Tente novamente.");
      setInputValue("");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/games/${leagueId}`
      );

      const gamesData = response.data;

      if (gamesData.length === 0) {
        onSendMessage("Nenhum jogo encontrado para hoje.");
      }

      onSendMessage(null, gamesData);
    } catch (error) {
      onSendMessage("Erro ao buscar os jogos. Tente novamente mais tarde.");
    }

    setInputValue("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div id="header">
      <div className="header-content">
        <h1>Que Liga quer acompanhar hoje?</h1>
        <div className="header-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite aqui..."
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>

      <div className="header-image">
        <img src={suarez} alt="Imagem do jogador Luis Suarez" />
      </div>
    </div>
  );
};

export default Header;
