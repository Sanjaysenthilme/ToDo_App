import React, { useEffect, useState} from "react";
import Styles from "../Styles/Home.module.css";
import Axios from "axios";

const Home = () => {
  const [Tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({task:''});
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
       Axios.get(`http://localhost:3002/`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(`Error fetching tasks : ${error}`));
  }, [editTask],[Tasks])

  // Add Part:
const sendDataTask = async() =>{
    await Axios.post(`http://localhost:3002/add`,{task:newTask})
    .then((respone) =>setTasks([...Tasks,respone.data]))
    // .then(()=> window.location.reload())
    .catch((error) => console.error(`Error adding task : ${error}`))
}

const HandleInputChange = (e) => {
  if (editTask) {
    setEditTask((pre) => ({ ...pre, TodoMsg: e.target.value }));
  } else {
    setNewTask( e.target.value );
  }
}

const EditTask = (task) => {
  // console.log(task);
  setEditTask({ ...task });
  console.log("editTask._id:", task._id || "editTask._id is not defined");
}

const updateTask = async () => {
  console.log(editTask._id);
  Axios.put(`http://localhost:3002/update/${editTask._id}`,{task:editTask.TodoMsg})
  .then((respone)=>{
    Tasks.filter(task => task._id === editTask._id ? respone.data : task);
    setEditTask(null)
  })
  .catch((error)=> console.error(`Error Upating task : ${error}`))
}

// Delete Part:
const DeleteTask = (id) =>{
    Axios.delete(`http://localhost:3002/delete/${id}`)
    .then(() =>setTasks(Tasks.filter(task => task._id !== id)))
    .catch((error) =>  console.error(`Error Deleting task : ${error}`))
}
  return (
    <div className={Styles.container}>
      <h1 className={Styles.h1Gif}>ToDo List</h1>

      <div className={Styles.inputFields}>
          <input type="text" id={Styles.text}  placeholder={editTask ? "Update Todo" : "Add Todo" } value={editTask ? editTask.TodoMsg : newTask.task} onChange={HandleInputChange}/>
        
          <button type="submit" id={Styles.btn} onClick={editTask ?updateTask : sendDataTask}>
            {editTask ? 'Update' :'Add'}
          </button>
      
      </div>

      <div className={Styles.contentDiv}>
        <div className={Styles.DisplayDiv}> 
            {Tasks.map((task,index)=>
            
              <p key={index} className={Styles.DisplayPara}>
                {task.TodoMsg}

                <button className={Styles.editBtn} onClick={()=> EditTask (task)}>Edit</button>
                <button className={Styles.deleteBtn} onClick={()=> DeleteTask(task._id)}>Delete</button>
              </p>
            )} 
        </div>
      </div>
    </div>
        
  );
};

export default Home;
