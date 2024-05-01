const Hapi = require("@hapi/hapi");
const routes = require("./routes");

const PORT = 9000;

const initServer = async () => {
    const server = Hapi.server({
        port: PORT,
        host: "localhost",
        routes: {
            cors: {
                origin: ["*"],
            },
        },
    });

    server.route(routes);

    await server.start();
    console.log(`Server running at ${server.info.uri}`);
};

initServer();
