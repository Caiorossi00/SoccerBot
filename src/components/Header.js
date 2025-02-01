import React from "react";
import suarez from "../assets/images/suarez.png";
import "../assets/scss/header.scss";

const Header = () => {
  return (
    <div id="header">
      <div className="header-content">
        <h1>Que Liga quer acompanhar hoje?</h1>
        <input type="text" placeholder="Digite aqui..." />
      </div>

      <div className="header-image">
        <img src={suarez} alt="Imagem do jogador Luis Suarez" />
      </div>
    </div>
  );
};

export default Header;
