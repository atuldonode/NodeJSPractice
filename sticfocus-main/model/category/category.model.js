const mongoose = require("mongoose");
Schema = mongoose.Schema


const Category = new mongoose.Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
Title:{
type: String,
},
status:{
    type: String,
    default:"active"
}
});

module.exports = mongoose.model("Category", Category);

