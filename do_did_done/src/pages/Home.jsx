import {React, useState, useEffect} from 'react'
import { useTodoContext } from '../hooks/useTodoContext';
import '../assets/home.css'
import {MdOutlineDoneOutline} from 'react-icons/md';
import {MdDeleteOutline} from 'react-icons/md';
import {LuEdit} from 'react-icons/lu';
export default function Home() {

  const {todos, dispatch} = useTodoContext()
  // const [todos, setTodos] = useState(null);
  
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  // const  [quote, setQuote] = useState(null);
  const [error, setError] =useState(null);
  useEffect(()=>{
    const fetchData = async ()=>{
  
      
      const response = await fetch('http://localhost:4000/todos',{
        method: 'GET',
        mode: "cors",
      });
      // const quoteResponse = await fetch("https://type.fit/api/quotes")
      const json = await response.json();
      // const quotesJson = quoteResponse.json();


      if(response.ok){
        // setTodos(json);
        dispatch({type:'SET_TODO', payload:json})
        console.log(todos);
      }
      // if(quoteResponse.ok){
      //   setQuote(quotesJson)
      //   console.log(quote);
      // }
    }
    fetchData();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      title: title,
      desc: desc,
    };
    // console.log(data);
    // console.log(title);
    // console.log(desc);

      const response = await fetch('http://localhost:4000/todos', {
        method: 'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
      });
  
      const json = await response.json();
      
      if (!response.ok) {
        setError(json.error);
        alert(json.error);
      } else {
        setError(null);
        alert('New todo Added');
        e.target.reset(); // Reset the form fields
        dispatch({type:'CREATE_TODO', payload:json});
      }
  };
  
  const handleClick = async (todoId) => {
    
    const deleteResponse = await fetch(`http://localhost:4000/todos/delete/${todoId}`, {
      method: 'DELETE',
    
    });
    const deleteJson = await deleteResponse.json();

    if(deleteResponse.ok){
      dispatch({type: 'DELETE_TODO', payload: deleteJson});
      alert("Todo Deleted");
    }else{
      alert(deleteJson.error);
    }
  }
return (
    <div className="home">
      <div className="main">
        <ul>
          {todos && todos.map(data => (
            <li key={data._id}>
              <strong>To Do: {data.title} <span className='deleteLogo'><MdDeleteOutline  onClick={() => handleClick(data._id)} /></span></strong>
              <p>{data.desc}</p>
              <p>{data.createdAt}</p>
            </li>
          ))}
        </ul>
      </div>


      <div className="form">
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">What to Do:</label><br />
            <input type="text" name="title" onChange={(e)=> setTitle(e.target.value)} required/> <br />
            
            <label htmlFor="desc">About:</label><br />
            <input type="text" name="desc" onChange={(e)=> setDesc(e.target.value)} required/> <br />
            <button>Let's Do It</button>
          </form>
          {/* <h3>Random Quotes</h3>
          <p>Random Quote Here</p> */}
      </div>
    </div>
  )
}
