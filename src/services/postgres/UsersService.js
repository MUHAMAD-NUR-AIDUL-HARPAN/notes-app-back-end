// const { nanoid } = require("nanoid");
// const { Pool } = require("pg");
// const bcrypt = require("bcrypt");
// const InvariantError = require("../../exceptions/InvariantError");

// class UsersService {
//   constructor() {
//     this._pool = new Pool();
//   }
//   async addUser({ username, password, fullname }) {
//     await this.verifyNewUsername(username);

//     const id = `user-${nanoid(16)}`;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = {
//       text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
//       values: [id, username, hashedPassword, fullname],
//     };

//     const result = await this._pool.query(query);

//     if (!result.rows.length) {
//       throw new InvariantError("User gagal ditambahkan");
//     }
//     return result.rows[0].id;

//     const id = `user-${nanoid(16)}`;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const query = {
//       text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
//       values: [id, username, hashedPassword, fullname],
//     };

//     const result = await this._pool.query(query);
//   }
//   async verifyNewUsername(username) {
//     const query = {
//       text: "SELECT username FROM users WHERE username = $1",
//       values: [username],
//     };

//     const result = await this._pool.query(query);

//     if (result.rows.length > 0) {
//       throw new InvariantError(
//         "Gagal menambahkan user. Username sudah digunakan."
//       );
//     }
//   }

//   async getUserById(userId) {
//     const query = {
//       text: "SELECT id, username, fullname FROM users WHERE id = $1",
//       values: [userId],
//     };

//     const result = await this._pool.query(query);
//     if (!result.rows.length) {
//       throw new NotFoundError("User tidak ditemukan");
//     }
//     return result.rows[0];
//   }
// }
// module.exports = UsersService;

const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError"); // Pastikan ini ada jika dipakai di method lain

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  // METHOD: ADD USER (Sudah Diperbaiki)
  async addUser({ username, password, fullname }) {
    await this.verifyNewUsername(username);

    // [1] Deklarasi hanya sekali
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id",
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError("User gagal ditambahkan");
    }
    // [2] Mengembalikan ID user yang baru dibuat
    return result.rows[0].id;
  }

  // METHOD: VERIFY NEW USERNAME
  async verifyNewUsername(username) {
    const query = {
      text: "SELECT username FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length > 0) {
      throw new InvariantError(
        "Gagal menambahkan user. Username sudah digunakan."
      );
    }
  }

  // METHOD: GET USER BY ID
  async getUserById(userId) {
    const query = {
      text: "SELECT id, username, fullname FROM users WHERE id = $1",
      values: [userId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError("User tidak ditemukan");
    }
    return result.rows[0];
  }
}

module.exports = UsersService;
