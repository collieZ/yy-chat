var app = require("http").createServer(handle);     // 创建http  web服务器
var io = require("socket.io").listen(app);      //引入socket模块 
var fs = require('fs');

app.listen(3000,"127.0.0.1");

function handle(req, res) {
    fs.readFile('./index.html', 
    function (err, data) {
        
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

        res.writeHead(200);
        res.end(data);
    });
}

io.sockets.on("connection", function (socket) {     // 服务器端连接触发事件
    
    socket.broadcast.emit('news', "有人进入聊天室"); // 广播
    // socket.on('other event', function (data) {  // 监听other event事件
    //     console.log(data);
    // });
    socket.on("message", function (msg) {   // 后端监听前端发过来的消息并广播给全体
        
        io.emit("message", msg); 
    });

    socket.on("disconnect", function () {     // socket断开事件
       console.log("咨询结束" + socket.id);
    });
});

// io.sockets.on("message", function(data) {   // 

//     socket
// });