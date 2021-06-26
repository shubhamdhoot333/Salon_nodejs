const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://system:03032000@cluster0.ih2aj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}
).then( () => {
console.log(" connection is successful");
}).catch((e) => { console.log("no connection")})