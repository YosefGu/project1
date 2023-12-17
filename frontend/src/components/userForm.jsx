import { useState } from "react"
import { useUsersContext } from "../hooks/useUsersContext";

const apiUri = 'http://localhost:3000'

const UserForm = () => {
    const { dispatch } = useUsersContext();

    const [name, setName] = useState('');
    const [lName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const haedelSubmit = async (e) => {
        e.preventDefault()

        const user = {name, lName, phone};

        const response = await fetch(`${apiUri}/api/users`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
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
            console.log('New user added', json)
            dispatch({type: 'CREATE_USER', payload: json})
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
            <button>Add user</button>
            {error && <div>{error}</div>}
        </form>
    </>
  )
}

export default UserForm