
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import  Home  from './pages/home'
import  Signup  from './pages/signup'
import Login from './pages/login'
import EditProfile from './pages/profile'

function App() {

  return (
      <BrowserRouter>
      <div className='bg-white'>
     <Routes>
        <Route path="/" element={<Home/>} />
         <Route path="/signup" element={<Signup/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<EditProfile/>} />
        </Routes>
        </div>

      </BrowserRouter>
  )
}

export default App
