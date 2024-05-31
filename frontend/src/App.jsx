import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './Home'
import { Routes,BrowserRouter, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Login from './components/Login'
import Signup from './components/Signup'
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="Articles" element={<Articles/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="Signup" element={<Signup/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
