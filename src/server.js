// require("dotenv").config();

// const Hapi = require("@hapi/hapi");
// const notes = require("./api/notes");
// const NotesService = require("./services/postgres/NotesService");
// const NotesValidator = require("./validator/notes");

// // users
// const users = require("./api/users");
// const UsersService = require("./services/postgres/UsersService");
// const UsersValidator = require("./validator/users");

// const init = async () => {
//   const notesService = new NotesService();
//   const usersService = new UsersService();

//   await server.register([
//     {
//       plugin: notes,
//       options: {
//         service: notesService,
//         validator: NotesValidator,
//       },
//     },
//     {
//       plugin: users,
//       options: {
//         service: usersService,
//         validator: UsersValidator,
//       },
//     },
//   ]);

//   const server = Hapi.server({
//     port: process.env.PORT,
//     host: process.env.HOST,
//     routes: {
//       cors: {
//         origin: ["*"],
//       },
//     },
//   });

//   await server.register({
//     plugin: notes,
//     options: {
//       service: notesService,
//       validator: NotesValidator,
//     },
//   });

//   await server.start();
//   console.log(`Server berjalan pada ${server.info.uri}`);
// };

// init();

require("dotenv").config();

const Hapi = require("@hapi/hapi");
// NOTES
const notes = require("./api/notes");
const NotesService = require("./services/postgres/NotesService");
const NotesValidator = require("./validator/notes");

// USERS
const users = require("./api/users");
const UsersService = require("./services/postgres/UsersService");
const UsersValidator = require("./validator/users");

const init = async () => {
  // [PERBAIKAN 1]: Deklarasikan dan inisialisasi server terlebih dahulu
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const notesService = new NotesService();
  const usersService = new UsersService();

  // [PERBAIKAN 2]: Hapus blok server.register yang berulang (hanya perlu register sekali)
  await server.register([
    {
      plugin: notes,
      options: {
        service: notesService,
        validator: NotesValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
