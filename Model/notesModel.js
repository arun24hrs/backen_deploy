const mongoose = require("mongoose");

const notesSchema = mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    author: {type: String, required: true},
    category: {type: String, required: true},
    authorId: {type: String, required: true}
})

const notesModel = mongoose.model("note", notesSchema);

module.exports = notesModel