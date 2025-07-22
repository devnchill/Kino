import DataBase from "../db/database";

export default class indexController {
  static async getIndex(req, res) {
    try {
      const { genres, totalNoOfGenre } = await DataBase.getAllGenresAndCount();
      const movies = await DataBase.getAllMovies();
      res.render("index", {
        genres,
        totalNoOfGenre,
        movies,
      });
    } catch (err) {
      console.log("Error fetching genre and movies from Database", err);
      res.status(400).send(err);
    }
  }
}
