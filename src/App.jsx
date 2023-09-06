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
import AllPoems from './pages/poems/AllPoems'
import PoemDetails from './pages/poems/PoemDetails'
import EditPoem from './pages/poems/EditPoem'
import IsPrivate from './pages/IsPrivate'
import FavouritePoet from './pages/poets/FavouritePoet'


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
<Route path="/user/:userId/profile" element={<IsPrivate><Profile /></IsPrivate>  }/>
<Route path="/user/:userId/edit-profile" element={<IsPrivate><EditProfile/></IsPrivate>}/>
<Route path="/user/:userId/profile/edit-image" element={<IsPrivate><EditImage/></IsPrivate>}/>


 {/* //!POET */}
 <Route path="/poet/new-poet" element={<IsPrivate><NewPoet/> </IsPrivate> }/>
 <Route path="/poet/all-poets" element={<IsPrivate><AllPoets/></IsPrivate>  }/>
 <Route path="/poet/:poetId/details" element={<IsPrivate><PoetDetails/></IsPrivate>  }/>
 <Route path="/poet/:poetId/edit-details" element={<IsPrivate><EditPoet/></IsPrivate>}/>
 <Route path="/poet/:poetId/details/edit-image" element={<IsPrivate><EditPoetImage/></IsPrivate>}/>
 <Route path="/poet/:poetId/add-to-favourite" element={<IsPrivate><FavouritePoet/></IsPrivate>}/>

  {/* //!POEM */}
  <Route path="/poem/new-poem" element={<IsPrivate><NewPoem/> </IsPrivate> }/>
  <Route path="/poem/all-poems" element={ <IsPrivate><AllPoems/></IsPrivate> }/>
  <Route path="/poem/:poemId/details" element={ <IsPrivate><PoemDetails/></IsPrivate> }/>
  <Route path="/poem/:poemId/edit-details" element={<IsPrivate><EditPoem/></IsPrivate>}/>
  <Route path="/poem/:poemId/add-to-favourite" element={<IsPrivate><FavouritePoet/></IsPrivate>}/>
{/* //!errors */}
<Route path="/error" element={ <Error /> }/>

</Routes>
     
    </>
  )
}

export default App
