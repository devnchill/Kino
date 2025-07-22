const DataBase = require("../db/database.js");

const getIndex = async (req, res) => {
  try {
    const { genres, totalNoOfGenre } = await DataBase.getAllGenresAndCount();
    const movies = await DataBase.getAllMovies();
    res.render("index", { genres, totalNoOfGenre, movies });
  } catch (err) {
    console.error("Error fetching data", err);
    res.status(400).send(err);
  }
};

module.exports = getIndex;
