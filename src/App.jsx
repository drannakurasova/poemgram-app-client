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
import NewPoet from './pages/poets/NewPoet'
import AllPoets from './pages/poets/AllPoets'
import PoetDetails from './pages/poets/PoetDetails'
import EditPoet from './pages/poets/EditPoet'
import EditImage from './pages/user/EditImage'
import EditPoetImage from './pages/poets/EdiPoetImage'
import NewPoem from './pages/poems/NewPoem'


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
<Route path="/user/:userId/profile/edit-image" element={<EditImage/>}/>


 {/* //!POET */}
 <Route path="/poet/new-poet" element={ <NewPoet/> }/>
 <Route path="/poet/all-poets" element={ <AllPoets/> }/>
 <Route path="/poet/:poetId/details" element={ <PoetDetails/> }/>
 <Route path="/poet/:poetId/edit-details" element={<EditPoet/>}/>
 <Route path="/poet/:poetId/details/edit-image" element={<EditPoetImage/>}/>

  {/* //!POEM */}
  <Route path="/poem/new-poem" element={ <NewPoem/> }/>

{/* //!errors */}
<Route path="/error" element={ <Error /> }/>

</Routes>
     
    </>
  )
}

export default App
