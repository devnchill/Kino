const pool = require("./pool");

class DataBase {
  static async initDb() {
    const SQL = `
      CREATE TABLE IF NOT EXISTS genre(
        gid BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        gname VARCHAR(255) UNIQUE NOT NULL,
        noofmovies integer
      );

      CREATE TABLE IF NOT EXISTS movies(
        mid bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        mname VARCHAR(255) NOT NULL,
        gid BIGINT REFERENCES genre(gid)
      );

    `;

    await pool.query(SQL);
  }

  static async getAllGenresAndCount() {
    const genreQuery = `SELECT gid, gname FROM genre;`;
    const countQuery = `SELECT COUNT(*)::int AS total FROM genre;`;
    const [genresRes, countRes] = await Promise.all([
      pool.query(genreQuery),
      pool.query(countQuery),
    ]);
    return {
      genres: genresRes.rows,
      totalNoOfGenre: countRes.rows[0].total,
    };
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

  static async getMoviesWithGenre(gid) {
    const SQL = `SELECT mid,mname,gname from movies INNER JOIN genre ON movies.gid = genre.gid WHERE genre.gid=$1`;
    return (await pool.query(SQL, [gid])).rows;
  }

  static async addMovie(mname, gid) {
    const SQL = `INSERT INTO movies(mname,gid) VALUES($1,$2)`;
    await pool.query(SQL, [mname, gid]);
  }

  static async addGenre(gname) {
    const SQL = `INSERT INTO genre(gname,noofmovies) VALUES($1,0) RETURNING gid;`;
    const { rows } = await pool.query(SQL, [gname]);
    return rows.gid;
  }

  static async deleteMovie(mid) {
    const SQL = `DELETE from movies WHERE mid = $1 RETURNING mid;`;
    await pool.query(SQL, [mid]);
  }

  async checkIfGenreIsEmpty(gid) {
    const SQL = `SELECT COUNT(gid) from movies WHERE gid=$1;`;
    const { rows } = await pool.query(SQL, [gid]);
    if (rows !== 0) {
      return false;
    } else return true;
  }

  static async deleteGenre(gid) {
    if (!(await this.checkIfGenreIsEmpty(gid))) {
      const SQL = `SELECT COUNT(*),gname from movies INNER JOIN genre ON movies.gid=genre.gid WHERE movies.gid=$1`;
      const { rows } = await pool.query(SQL, [gid]);
      const { count, gname } = rows[0];
      console.log(`Deleting ${count} Movies present in ${gname}`);
      await pool.query(`DELETE from movies WHERE gid=$1`, [gid]);
    }
    const SQL = `DELETE from genre WHERE gid = $1 RETURNING gid;`;
    const { rows } = await pool.query(SQL, [gid]);
    return rows;
  }
}

module.exports = DataBase;
