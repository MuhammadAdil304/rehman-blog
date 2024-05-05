import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import MAHeader from './components/MAHeader'
import MAFooter from './components/MAFooter'
import MAPrivateRoute from './components/MAPrivateRoute'
import MAOnlyAdminPrivateRoute from './components/MAOnlyAdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import "react-circular-progressbar/dist/styles.css";

export default function AppRouter() {
  return (
    <div>
      <Router>
        <MAHeader />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route element={<MAPrivateRoute />}>
            <Route path='/dashboard' element={<Dashboard />} />
          </Route>   
          <Route element={<MAOnlyAdminPrivateRoute />}>
            <Route path='/create-post' element={<CreatePost />} />
          </Route>
          <Route path='/projects' element={<Projects />} />
        </Routes>
        <MAFooter />
      </Router>
    </div>
  )
}
