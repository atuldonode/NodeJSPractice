const mongoose = require("mongoose");
Schema = mongoose.Schema


const subCategory = new mongoose.Schema({
    userid: { type: Schema.Types.ObjectId, ref: 'User' },
    categoryid: { type: Schema.Types.ObjectId, ref: 'Category' },
Title:{
type: String,
},
status:{
    type: String,
    default:"active"
}
});

module.exports = mongoose.model("subCategory", subCategory);

