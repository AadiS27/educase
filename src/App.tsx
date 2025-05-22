
import { BrowserRouter, Route, Routes, } from 'react-router-dom'
import  Home  from './pages/home'
import  Signup  from './pages/signup'
import Login from './pages/login'
import EditProfile from './pages/profile'

function App() {

  return (
      <BrowserRouter>
     <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<EditProfile/>} />
        </Routes>
       </BrowserRouter>

      
  )
}

export default App
