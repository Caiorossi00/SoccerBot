import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/scss/leagues.scss";

const Leagues = () => {
  const [ligas, setLigas] = useState([]);

  useEffect(() => {
    const fetchLigas = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leagues");
        setLigas(response.data);
      } catch (error) {
        console.error("Erro ao buscar as ligas:", error);
      }
    };

    fetchLigas();
  }, []);

  return (
    <div id="Leagues">
      <h1>Ligas Disponíveis</h1>

      <div id="leagues-display">
        {ligas.length > 0 ? (
          ligas.map((league) => (
            <div key={league.id} className="league">
              <p>{league.nome}</p>
            </div>
          ))
        ) : (
          <p>Carregando ligas...</p>
        )}
      </div>
    </div>
  );
};

export default Leagues;
