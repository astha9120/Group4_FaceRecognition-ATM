const mongoose = require("mongoose");
const app = require("./app");

const url="mongodb+srv://grp4:seatm@cluster0.jvxno.mongodb.net/details?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}

mongoose.connect(url,connectionParams).then(()=>{
    console.log("DB connected");
}).catch((err)=>{
    console.log("connection failed");
})

const port = 3000;
const host = "127.0.0.1";
app.listen(port, host, () => {
  console.log(`App running on port 127.0.0.1:3000 ...`);
});
