const DataBase = require("../db/database.js");

const getIndex = async (req, res) => {
  try {
    const { genres, totalNoOfGenres } = await DataBase.getAllGenres();
    const movies = await DataBase.getAllMovies();
    res.render("index", { genres, totalNoOfGenres, movies });
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(400).send(err);
  }
};

module.exports = getIndex;
