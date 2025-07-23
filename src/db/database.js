const pool = require("./pool");

class DataBase {
  static async initDb() {
    const SQL = `
      CREATE TABLE IF NOT EXISTS genre(
        gid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        gname VARCHAR(255) UNIQUE NOT NULL
      );

      CREATE TABLE IF NOT EXISTS movies(
        mid bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        mname VARCHAR(255) NOT NULL,
        gid BIGINT REFERENCES genre(gid) ON DELETE CASCADE
      );

    `;

    await pool.query(SQL);
  }

  static async seedDb() {
    const insertGenresSQL = `
    INSERT INTO genre (gname) 
    VALUES 
      ('Horror'), 
      ('Thriller'), 
      ('Comedy'), 
      ('Sci-fi'), 
      ('Drama')
    ON CONFLICT (gname) DO NOTHING;
  `;
    await pool.query(insertGenresSQL);

    const genreNames = ["Horror", "Thriller", "Comedy", "Sci-fi", "Drama"];
    const genreIds = {};

    for (const gname of genreNames) {
      const { rows } = await pool.query(
        `SELECT gid FROM genre WHERE gname = $1`,
        [gname],
      );

      if (!rows.length) {
        throw new Error(`Genre "${gname}" not found while seeding.`);
      }

      genreIds[gname] = rows[0].gid;
    }

    const movies = [
      { mname: "The Conjuring", genre: "Horror" },
      { mname: "Inception", genre: "Sci-fi" },
      { mname: "The Hangover", genre: "Comedy" },
    ];

    for (const { mname, genre } of movies) {
      await pool.query(
        `INSERT INTO movies (mname, gid) 
       VALUES ($1, $2)`,
        [mname, genreIds[genre]],
      );
    }

    console.log("Database seeded successfully 🚀");
  }

  static async getAllGenres() {
    const SQL = `SELECT gid, gname FROM genre;`;
    const { rows } = await pool.query(SQL);
    return { genres: rows, totalNoOfGenres: rows.length };
  }

  static async getAllMovies() {
    const SQL = `
      SELECT mid,mname from movies;
    `;
    return (await pool.query(SQL)).rows;
  }

  static async getMovieOfAGenre(gid) {
    const SQL = `SELECT mid,mname from movies WHERE gid = $1;`;
    return (await pool.query(SQL, [gid])).rows;
  }

  static async addMovie(mname, gid) {
    const SQL = `INSERT INTO movies(mname,gid) VALUES($1,$2)`;
    await pool.query(SQL, [mname, gid]);
  }

  static async addGenre(gname) {
    const SQL = `INSERT INTO genre(gname) VALUES($1);`;
    await pool.query(SQL, [gname]);
  }

  static async deleteMovie(mid) {
    const SQL = `DELETE from movies WHERE mid = $1 ;`;
    await pool.query(SQL, [mid]);
  }

  static async deleteGenre(gid) {
    const SQL = `DELETE FROM genre WHERE gid = $1 RETURNING gid;`;
    await pool.query(SQL, [gid]);
  }
}

module.exports = DataBase;
