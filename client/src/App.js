import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'
import Logout from './components/Logout'
import Error404 from './components/Error404'
import { AuthProvider } from './components/AuthContext'


const Routing = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/:id' element={<Error404/>} />
      </Routes>
    </>
  )
}

const App = () => {

  return (
    <>
      <AuthProvider>
        <Navbar/>
        <Routing/>
      </AuthProvider>
    </>
  )
}

export default App