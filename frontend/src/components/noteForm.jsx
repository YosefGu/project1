import { useState } from "react"
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from "../hooks/useAuthContext";

const apiUri = 'http://localhost:3000'

const NoteForm = () => {
    const { dispatch } = useNotesContext();
    const { user } = useAuthContext();

    const [name, setName] = useState('');
    const [lName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const haedelSubmit = async (e) => {
        e.preventDefault()
        
        if (!user) {
            setError('You must be logged in');
            return
        }
        const note = {name, lName, phone};

        const response = await fetch(`${apiUri}/api/notes`, {
            method: 'POST',
            body: JSON.stringify(note),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }
        if (response.ok) {
            setName('');
            setLastName('');
            setPhone('');
            setError(null);
            setEmptyFields([])
            console.log('New note added', json)
            dispatch({type: 'CREATE_NOTE', payload: json})
        }
    }
  return (
    <>
        <form onSubmit={haedelSubmit}>
            <label>Name:</label>
            <input type="text" 
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
            onChange={(e) => setName(e.target.value)}
            />
            <label>Last Name:</label>
            <input type="text" 
            value={lName}
            className={emptyFields.includes('lName') ? 'error' : ''}
            onChange={(e) => setLastName(e.target.value)}
            />
            <label>Phone:</label>
            <input type="number" 
            value={phone}
            className={emptyFields.includes('phone') ? 'error' : ''}
            onChange={(e) => setPhone(e.target.value)}
            />
            <button>Add note</button>
            {error && <div>{error}</div>}
        </form>
    </>
  )
}

export default NoteForm