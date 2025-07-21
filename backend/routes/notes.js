const express=require('express')
const router=express.Router()
const fetchuser = require('../middleware/fetchuser');
const Note=require('../models/Note')
const { validationResult, body } = require('express-validator');
//fetcch all notes
router.get('/fetchnotes',fetchuser,async (req, res) => {
   const notes=await Note.find({user:req.user.id})
    res.json(notes)
})

//add a new note
router.post('/addnotes',fetchuser,[
     body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters'),
],async (req, res) => {
    try{
  const {title,description,tag}=req.body;
   const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
const note=new Note({
    title,description,tag,user:req.user.id
})
const savednote=await note.save()
    res.json(savednote)
}catch(error){
    console.error(error.message);
    res.status(500).send("Some error occurred");
  
}
})

//update note
router.put('/updatenotes/:id',fetchuser,[
],async (req, res) => {
     const {title,description,tag}=req.body;
     const newNote={};
     if(title){newNote.title=title}
      if(description){newNote.description=description}
       if(tag){newNote.tag=tag}
       let note=await Note.findById(req.params.id)
       if(!note){return res.status(500).send("Not Found")}
       if(note.user.toString()!==req.user.id)
        {return res.status(500).send("Not Allowed")}
       note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
       res.json({note});
})

//delete note
router.delete('/deletenotes/:id',fetchuser,[
],async (req, res) => {
    
       let note=await Note.findById(req.params.id)
       if(!note){return res.status(500).send("Not Found")}
       if(note.user.toString()!==req.user.id)
        {return res.status(500).send("Not Allowed")}
       note=await Note.findByIdAndDelete(req.params.id);
       res.json({"success": "note has been deleted",note:note});
})
module.exports=router