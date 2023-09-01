import { useState } from 'react'
import './App.css'

import { Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Error from './pages/Error'
import LogIn from './pages/LogIn'
import Profile from './pages/user/Profile'
import EditProfile from './pages/user/EditProfile'

function App() {


  return (
    <>
    <Navbar />

<Routes>
{/* //!GLOBAL */}
<Route path="/poemgram" element={ <Home /> }/>
<Route path="/signup" element={ <SignUp /> }/>
<Route path="/login" element={ <LogIn /> }/>

 {/* //!USER */}
<Route path="/user/:userId/profile" element={ <Profile /> }/>
<Route path="/user/:userId/edit-profile" element={<EditProfile/>}/>

{/* //!errors */}
<Route path="/error" element={ <Error /> }/>

</Routes>
     
    </>
  )
}

export default App
