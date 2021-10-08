import app from "./app";
const PORT = process.env.PORT || 3100;
const server = app.listen(PORT, ()=> {
    console.log(`Ouvindo a porta ${PORT}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
let connections: Array<any> = [];
server.on('connection', (connection) => {
    connections.push(connection);
    connection.on('close', () => {
        connections = connections.filter((curr) => curr !== connection);
    });
});
function shutDown() {
    console.log('Received kill signal, shutting down gracefully');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });
    setTimeout(() => {
        console.log('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 10000);
}