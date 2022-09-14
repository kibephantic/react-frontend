import React,{useState, useEffect} from 'react'
import { View } from './components/View';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('comments');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const App = () => {

  // main array of objects state || comments state || comments array of objects
  const [comments, setcomments]=useState(getDatafromLS());

  // input field states
  const [customer, setCustomer]=useState('');
  const [resturant, setResturant]=useState('');
  const [reviews, setReviews]=useState('');

  // form submit event
  const handleAddCommentSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let comment={
      customer,
      resturant,
      reviews
    }
    setcomments([...comments,comment]);
    setCustomer('');
    setResturant('');
    setReviews('');
  }

  // delete comment from LS
  const deleteComment=(reviews)=>{
    const filteredComments=comments.filter((element,index)=>{
      return element.reviews !== reviews
    })
    setcomments(filteredComments);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('comments',JSON.stringify(comments));
  },[comments])

  return (
    <div className='wrapper'>
      <h1>Reviews App</h1>
      <p>Add and view Reviews</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddCommentSubmit}>
            <label>Customer</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setCustomer(e.target.value)} value={customer}></input>
            <br></br>
            <label>Resturant</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setResturant(e.target.value)} value={resturant}></input>
            <br></br>
            <label>Reviews#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setReviews(e.target.value)} value={reviews}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {comments.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Reviews#</th>
                    <th>Customer</th>
                    <th>Resturant</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View comments={comments} deleteComment={deleteComment}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setcomments([])}>Remove All</button>
          </>}
          {comments.length < 1 && <div>No comments are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default App