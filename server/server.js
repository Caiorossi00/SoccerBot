require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Servidor do FutebolChatbot está funcionando!");
});

app.get("/api/leagues", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/leagues",
      {
        headers: {
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    if (response.data && response.data.response) {
      res.json(response.data.response);
    } else {
      res.status(404).json({ message: "Nenhuma liga encontrada." });
    }
  } catch (error) {
    console.error("Erro ao buscar ligas", error);
    res.status(500).json({ message: "Erro ao buscar ligas da API de futebol" });
  }
});

app.get("/api/games/:leagueId", async (req, res) => {
  const leagueId = req.params.leagueId;
  const date = new Date().toISOString().split("T")[0];

  try {
    const response = await axios.get(
      "https://api-football-v1.p.rapidapi.com/v3/fixtures",
      {
        params: {
          league: leagueId,
          season: 2025,
          date: date,
        },
        headers: {
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        },
      }
    );

    if (response.data && response.data.response) {
      res.json(response.data.response);
    } else {
      res
        .status(404)
        .json({ message: "Nenhum jogo encontrado para essa liga." });
    }
  } catch (error) {
    console.error("Erro ao buscar jogos", error);
    res.status(500).json({ message: "Erro ao buscar dados da API de futebol" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
