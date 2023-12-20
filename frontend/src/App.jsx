import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"

// componenets
import Home from './pages/home'
import Navbar from './components/navbar'
import Login from "./pages/login"
import Signup from "./pages/signup"

function App() {
  const { user } = useAuthContext();

  return (
    <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
          path='/'
          element={ user ? <Home /> : <Navigate to='/login' />}
        />
        <Route 
          path='/login'
          element={ !user ? <Login /> : <Navigate to='/' />}
        />
        <Route 
          path='/signup'
          element={ !user ? <Signup /> : <Navigate to='/' />}
        />
      </Routes>      
    </BrowserRouter>
    </>
  )
}

export default App
