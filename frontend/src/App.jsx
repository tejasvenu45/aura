import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './Home'
import { Routes,BrowserRouter, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import PublicQNA from './components/PublicQNA'
import CreateFormFields from './components/CreateFormFields'
import DynamicForm from './components/DynamicForm'
import Events from './components/Events'
// import CreateFormFields from './components/CreateFormFields'
function App() {
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="Articles" element={<Articles/>}/>
          <Route path="Form" element={<CreateFormFields/>}/>

          <Route path="Login" element={<Login/>}/>
          <Route path="CreateForm" element={<CreateFormFields/>}/>
          <Route path="DynamicForm/:id" element={<DynamicForm/>}/>

          <Route path="Signup" element={<Signup/>}/>
          <Route path="Chat" element={<Chat/>}/>
          <Route path="PublicQNA" element={<PublicQNA/>}/>
          <Route path="Events" element={<Events/>}/>

        </Route>
      </Routes>
    </BrowserRouter>
      

    </>
  )
}

export default App
