import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Error from './pages/Error'
import LogIn from './pages/LogIn'

function App() {


  return (
    <>
    <Navbar />

<Routes>
<Route path="/poemgram" element={ <Home /> }/>
<Route path="/signup" element={ <SignUp /> }/>
<Route path="/login" element={ <LogIn /> }/>

{/* //!errors */}
<Route path="/error" element={ <Error /> }/>

</Routes>
     
    </>
  )
}

export default App
