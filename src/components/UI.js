import React from "react";
import Header from "./Header";
import "../assets/scss/UI.scss";
import Leagues from "./Leagues";
import Info from "./Info";
import Table from "./Table";

const UI = () => {
  return (
    <div id="UI">
      <div className="left-side">
        <Header />
        <div>
          <Leagues />
          <Info />
        </div>
      </div>

      <div className="right-side">
        <Table />
      </div>
    </div>
  );
};

export default UI;
