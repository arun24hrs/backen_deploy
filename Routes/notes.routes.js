const {Router} = require("express");
const notesModel = require("../Model/notesModel");
const UserModel = require("../Model/userModel");


const notesRouter = Router();


notesRouter.post("/create", async(req, res)=>{
    const note = new notesModel(req.body);
    await note.save();
    res.status(200).send({msg: "New note has been created."})
});

notesRouter.get("/", async(req, res)=>{
    const notes = await notesModel.find({authorId: req.body.authorId});
    res.status(200).send(notes)
});

notesRouter.patch("/update/:noteId", async(req, res)=>{
    const {noteId} = req.params;
    const note = await notesModel.findOne({_id: noteId})
    try {
        if(req.body.authorId!=note.authorId){
            res.status(200).send({msg:"You are not authorized to perform this action."})
        }else {
            await notesModel.findByIdAndUpdate({_id: noteId}, req.body);
        }
    res.status(200).send({msg: `Note with id: ${noteId} has been updated.`})
    } catch (error) {
    res.status(400).send(error)
    }
});

notesRouter.delete("/delete/:noteId", async(req, res)=>{
    const {noteId} = req.params;
    const note = await notesModel.findOne({_id: noteId})
    try {
        if(req.body.authorId!=note.authorId){
            res.status(200).send({msg:"You are not authorized to perform this action."})
        } else {
            await notesModel.findByIdAndDelete({_id: noteId});
        }
    res.status(200).send({msg: `Note with id: ${noteId} has been deleted.`})
    } catch (error) {
    res.status(400).send(error)
    }
})


module.exports = notesRouter;