const { Router} = require('express');
const router = Router();

const TodoModel = require('../model/model');


router.get('/',async(req,res)=>{
    await TodoModel.find({})
    .then((result) => res.json(result))
    .catch(err => res.status(400).json(`Error : ${err}`))
});

router.post('/add',async(req,res)=>{
    const {task} = req.body;
    console.log('added  '+task);
    const newTask = await TodoModel.create({
        TodoMsg:task
    });
    newTask.save()
    .then(() => res.json(`Task Added Successfully...!`))
    .catch((error) => res.status(400).json(`Error : ${error}`))
});

router.delete('/delete/:id',async (req,res)=>{
        const {id} = req.params;
        await TodoModel.findByIdAndDelete(id)
        .then(() => res.json(`Task Deleted Successfully...!`))
        .catch((error) => res.status(400).json(`Error : ${error}`))
});

router.put('/update/:id',async(req,res)=>{
    const {id} = req.params;
    const {task} = req.body;
    console.log(task);
    const updatedTask = await TodoModel.findByIdAndUpdate(
        id,{TodoMsg : task},{new:true}
    );
    updatedTask.save()
    .then(() => res.json(`Task Updated Successfully...!`))
    .catch((error) => res.status(400).json(`Error : ${error}`))
});




module.exports = router;