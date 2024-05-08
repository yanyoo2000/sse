var http = require("http");

var server = http.createServer(function (req, res) {
    var fileName = "." + req.url;

    if (fileName === "./stream") {
        res.writeHead(200, {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "Access-Control-Allow-Origin": '*',
        });

        let send = () => {
            let time = new Date().getTime()
            res.write("event: event1\n");
            res.write("retry: 10000\n");
            res.write("id: " + time + "\n");
            res.write("data: " + JSON.stringify({ time: time }) + "\n\n");

            res.write("event: event2\n");
            res.write("retry: 10000\n");
            res.write("id: " + time + "\n");
            res.write("data: " + JSON.stringify({ time: time }) + "\n\n");
        }

        send()
        var interval = setInterval(function () {
            send()
        }, 1000);

        req.on("close", function () {
            clearInterval(interval);
        });
    }
});

server.timeout = 0; // Disable automatic timeout
server.listen(8844, "127.0.0.1");
