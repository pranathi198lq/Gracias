const io= require("socket.io")(5000, {
    cors:{
        origin: "http://localhost:3000 ",
    }
});

console.log("Server on port 5000")

//socket id is different each time it is refreshed so we cannot use socket id
let users=[];

//if we directly push in users for addUser then it will keep adding the same user again and agian whenever the application is connected, so filter it first
const addUser= (userId, socketId)=>{
    //check if the same user is already there in the users array
    !users.some((user)=>user.userId === userId) &&
        users.push({userId, socketId});
};

//remove the user from users array upon disconnecting
const removeUser=(socketId)=>{
    users= users.filter((user)=>user.socketId !== socketId)
};

//to send, we need receiverid:
const getUser=(userId)=>{
    return users.find((user)=>user.userId===userId);
}

io.on("connection", (socket) => {
    //Connected:
    console.log("User connected")
    // io.emit("hello", "Hello, from socket server"); - to all clients
    
    //take userId and socketId from user:
    socket.on("addUser", userId=>{
        addUser(userId, socket.id);
        io.emit("getUsers", users); //send the users to all the users so that we can see all the ones that are online
    });

    //send and get message:
    socket.on("sendMessage", ({senderId, receiverId, text})=>{
        const user= getUser(receiverId);
        io.to(user.socketId).emit("getMessage", { //socketid if of the receiver
            senderId, 
            text
        })
    })

    //Disconnected:
    socket.on("disconnect", ()=>{
        console.log("User disconnected")
        removeUser(socket.id);
        io.emit("getUsers", users);
    })
});
