import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const apiUri = 'http://localhost:3000'

const NoteDetailes = ({note}) => {
  const { dispatch } = useNotesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch(`${apiUri}/api/notes/` + note._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
   
    const json = await response.json();

    if (response.ok) {
      dispatch({type:'DELETE_NOTE', payload: json})
    }
  }
  return (
    <div style={{border:'black solid 3px', margin:'3px',padding:'5px', display:'flex'}}>
      <div>
        <p>{note.name}</p>
        <p>{note.lName}</p>
        <p>{note.phone}</p>
        <strong>{formatDistanceToNow(new Date(note.createdAt), {addSuffix: true})}</strong>
      </div>
      <span style={{color:'gray', cursor:'pointer'}} className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default NoteDetailes