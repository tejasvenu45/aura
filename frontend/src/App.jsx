import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './Home'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Articles from './components/Articles'
import Login from './components/Login'
import Signup from './components/Signup'
import Chat from './components/Chat'
import PublicQNA from './components/PublicQNA'
import CreateFormFields from './components/CreateFormFields'
import DynamicForm from './components/DynamicForm'
import Events from './components/Events'
<<<<<<< HEAD
// import CreateFormFields from './components/CreateFormFields'
=======

import { Provider } from 'react-redux';
import store from './store';
>>>>>>> 95b8b0bba7386480d30855e7102f8f2d14b6825e
function App() {


  return (
    <>
      <Provider store ={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="Articles" element={<Articles />} />
              <Route path="Login" element={<Login />} />
              <Route path="CreateForm" element={<CreateFormFields />} />
              <Route path="DynamicForm/:id" element={<DynamicForm />} />

              <Route path="Signup" element={<Signup />} />
              <Route path="Chat" element={<Chat />} />
              <Route path="PublicQNA" element={<PublicQNA />} />
              <Route path="Events" element={<Events />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>

    </>
  )
}

export default App;
