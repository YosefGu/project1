import { useUsersContext } from "../hooks/useUsersContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const apiUri = 'http://localhost:3000'

const UserDetailes = ({user}) => {
  const { dispatch } = useUsersContext();

  const handleClick = async () => {
    const response = await fetch(`${apiUri}/api/users/` + user._id, {
      method: 'DELETE'
    });
   
    const json = await response.json();

    if (response.ok) {
      dispatch({type:'DELETE_USER', payload: json})
    }
  }
  return (
    <div style={{border:'black solid 3px', margin:'3px',padding:'5px', display:'flex'}}>
      <div>
        <p>{user.name}</p>
        <p>{user.lName}</p>
        <p>{user.phone}</p>
        <strong>{formatDistanceToNow(new Date(user.createdAt), {addSuffix: true})}</strong>
      </div>
      <span style={{color:'gray', cursor:'pointer'}} className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default UserDetailes