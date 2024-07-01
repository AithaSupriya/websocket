const express = require("express");
const app = express();
const cors = require("cors");
//allows the server to accept requests from different origins
app.use(cors());
//parse the incoming req with json payloads,data available in req.body
app.use(express.json());

const port = 4000;
const server = app.listen(port, () => {
  console.log("server is running at port ", port);
});
//import module and initialize with server and allow connections with any server
io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
//listen to the new socket connection
io.on("connection", (socket) => {
  console.log("connected & socket id is ", socket.id);
  //sends a message with the event name "Data" and the message "Message from backend" to the connected client
 
  

  for (let i = 0; i <= 5; i++) {
    setTimeout(()=> {
      socket.emit("Data", "Message from backend");
      console.log(i);
    }, i * 1000);
  }


  // for(let i=0; i<10; i++){
  //   socket.emit("Data", "Message from backend");
  //   console.log(i);
  // }
  app.use("/temp", (req, res) => {
    socket.emit("Temperature", req.body.temp);
    res.send(200);
  });
  //listens for "Realtime" events from the client.
  socket.on("Realtime", (data) => {
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected, socket id:", socket.id);
  });
});
