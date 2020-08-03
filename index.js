const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const { exec } = require("child_process")

app.get("/", (req, res) => {
  res.send("<h1>Hello world</h1>")
})

io.on("connection", (socket) => {
  console.log("new connection")

  // if we recieved a katarina event w git pull form the repo
  socket.on("katarina", () => {
    exec("git pull", (err, stdout, stderr) => {
      if (err) {
        // node couldn't execute the command
        return
      }

      // the *entire* stdout and stderr (buffered)
      console.log(`stdout: ${stdout}`)
      console.log(`stderr: ${stderr}`)
    })
  })
})

// yes siiiir
// let's add this line from browser for KATARINA !!
// an other one

http.listen(3000, () => {
  console.log("listening on *:3000")
})
