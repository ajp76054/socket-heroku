const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const documents = {};

io.on('connection', socket => {
    let previousId;
    const safeJoin = currentId => {
        socket.leave(previousId);
        socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
        previousId = currentId;
    }

    socket.on('operationAprilOne', msg => {
        io.emit('opOne', msg);
    });

    console.log(`Socket ${socket.id} has connected`);
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

http.listen(3000, () => {
    console.log('Listening on port 3000');
});