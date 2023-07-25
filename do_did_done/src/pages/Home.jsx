import {React, useState, useEffect} from 'react'
import { useTodoContext } from '../hooks/useTodoContext';
import '../assets/home.css'
import {MdOutlineDoneOutline} from 'react-icons/md';
import {MdDeleteOutline} from 'react-icons/md';
import {LuEdit} from 'react-icons/lu';
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow  from "date-fns/formatDistanceToNow"


export default function Home() {

  const {todos, dispatch} = useTodoContext()
  const {user} = useAuthContext()
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editTodoId, setEditTodoId] = useState('');
 


  useEffect(()=>{
    const fetchData = async ()=>{
      try{
      const response = await fetch('http://localhost:4000/todos',{
        method: 'GET',
        mode: "cors",
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      });

      const json = await response.json();


      if(response.ok){
        dispatch({type:'SET_TODO', payload:json})
        console.log(todos);
      }
    }catch(error){
      console.log(error)
    }
    }
    if(user){
      fetchData();
    }
  }, [dispatch, user])



  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(!user){
      setError('You must be logged in');
    }
    const data = {
      title: title,
      desc: desc,
    };

    try{
      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
      
      if (!response.ok) {
        alert(json.error);
      } else {
        alert('New todo Added');
        setTitle('')
        setDesc('');
        dispatch({type:'CREATE_TODO', payload:json});
      }
    }catch(error){
      console.log(error)
    }
  };
  



  const handleClick = async (todoId) => {
    
    if(!user){
      setError('You must be logged in')
    }
    try{
    const deleteResponse = await fetch(`http://localhost:4000/todos/delete/${todoId}`, {
      
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      },
    });
    const deleteJson = await deleteResponse.json();

    if(deleteResponse.ok){
      dispatch({type: 'DELETE_TODO', payload: deleteJson});
      alert("Todo Deleted");
    }else{
      alert(deleteJson.error);
    }
  }catch(error){
    console.log(error);
  }
  }
  


  const handleDone = async (todoId) => {
    
    if(!user){
      setError('You must be logged in')
    }
    try{
    const deleteResponse = await fetch(`http://localhost:4000/todos/delete/${todoId}`, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${user.token}`
      },
    });
    const deleteJson = await deleteResponse.json();

    if(deleteResponse.ok){
      dispatch({type: 'DELETE_TODO', payload: deleteJson});
      alert("Congrats! You have done it.");
    }else{
      alert(deleteJson.error);
    }
  }catch(error){
    console.log(error)
  }
  }
  


  const handlePatch = async(todoId) =>{

    if(!user){
      setError('You must be logged in')
    }
    setEditTodoId(todoId);

    const data = {
      title: title,
      desc: desc
    }

    console.log(data)
    console.log(title)
    console.log(desc)
    console.log(editTodoId)
    try{
    const updateResponse = await fetch(`http://localhost:4000/todos/update/${editTodoId.toString()}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
         // Set the Content-Type header
      },
      body: JSON.stringify(data)    
    });
    
    const updateJson = await updateResponse.json();

    if(updateResponse.ok){
      dispatch({type: 'UPDATE_TODO', payload: updateJson});
      alert("Your new job is updated");
      setTitle('')
      setDesc('');
    }else{
      alert(updateJson.error);
    }
  }catch(error){
    console.log(error)
  }
  }



  const handleUpdate = async (todoId) => {
    
    if(!user){
      setError('You must be logged in');
    }
    setEditTodoId(todoId);
    try{
      const todoToUpdate = todos.find(todo => todo._id === todoId);
    
      if (todoToUpdate) {
        setTitle(todoToUpdate.title);
        setDesc(todoToUpdate.desc);
      }
    }catch(error){
      console.log(error);
    }

  }

return (
    <div className="home">
      <div className="main">
        <ul>
          {todos && todos.map(data => (
            <li key={data._id}>
              <div className="todoData">
              <div className="todo">
                <strong>To Do: {data.title}</strong>
                <p className='desc'>{data.desc}</p>
                <p className='time'>{formatDistanceToNow (new Date(data.createdAt), {addSuffix: true})}</p>
              </div>
              <div className="buttons">
                <button onClick={() => handleDone(data._id)} className='done'>Did It <MdOutlineDoneOutline/></button>
                <button onClick={() => handleUpdate(data._id)} className='edit'>Edit <LuEdit/></button>
                <button className='delete' onClick={() => handleClick(data._id)}>Delete <MdDeleteOutline/></button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>


      <div className="form">
      <form onSubmit={editTodoId ? handlePatch : handleSubmit}>
        <label htmlFor="title">What to Do:</label>
        <br />
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />

        <label htmlFor="desc">About:</label>
        <br />
        <input
          type="text"
          name="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <br />

        <button className="doIt">
          {editTodoId ? 'Update' : "Let's Do It"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
    </div>
  )
}