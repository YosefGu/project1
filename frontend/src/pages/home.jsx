import React from "react";
import { useEffect } from "react"
import { useNotesContext } from "../hooks/useNotesContext";
import { useAuthContext } from '../hooks/useAuthContext';

// componenets
import NoteDetailes from "../components/noteDetailes";
import NoteForm from "../components/noteForm";


const apiUri = 'http://localhost:3000'

const Home = () => {
  const {notes, dispatch} = useNotesContext();
  const {user} = useAuthContext();

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await fetch(`${apiUri}/api/notes`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json() ;

      if (response.ok) {
        dispatch({type: 'SET_NOTES', payload: json})
      }
    }
    if (user) {
      fetchUsers()
    }
  },[dispatch, user])
  return (
    <>
    <h1>Notes</h1>
      <div style={{width:'90%', display:'flex', flexFlow:'wrap'}}>
        <div style={{display:'flex', width:'100%', direction:'colomn'}}>
          {notes && notes.map((note) => (
            <NoteDetailes key={note._id} note={note}/>
          ))}
        </div>
        <NoteForm />
      </div>
    </>
  )
}

export default Home
