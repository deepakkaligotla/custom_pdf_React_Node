const app = require("./app");
const http = require("http");
const server = http.createServer(app);

const apiRoute = require('./api')
app.use(apiRoute)

server.listen(4000, () => {
    console.log(`Server running on port 4000`);
});