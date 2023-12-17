import React from "react";
import { useEffect } from "react"
import { useUsersContext } from "../hooks/useUsersContext";
// componenets
import UserDetailes from "../components/userDetailes";
import UserForm from "../components/userForm";


const apiUri = 'http://localhost:3000'

const Home = () => {
  const {users, dispatch} = useUsersContext();

  useEffect(() => {
    const fetchUsers = async() => {
      // const apiuri = process.env.REACT_APP_API_BASE_URL
      // console.log(apiuri)
      const response = await fetch(`${apiUri}/api/users`);
      const json = await response.json() ;

      if (response.ok) {
        dispatch({type: 'SET_USERS', payload: json})
      }
    }
    fetchUsers()
  },[])
  return (
    <>
    <h1>Users</h1>
    <div style={{width:'90%', display:'flex', flexFlow:'wrap'}}>
      <div style={{display:'flex', width:'100%', direction:'colomn'}}>
        {users && users.map((user) => (
        <UserDetailes key={user._id} user={user}/>
        ))}
        </div>
        <UserForm />
    </div>
    </>
  )
}

export default Home
