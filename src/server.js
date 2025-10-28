const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      // <-- TAMBAHKAN BAGIAN INI
      cors: {
        origin: ["https://notesapp-v1.dicodingacademy.com"], // Izinkan domain frontend
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
