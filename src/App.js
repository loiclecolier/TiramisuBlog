
import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import AddArticle from './Containers/AdminPanel/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article'
import About from './Containers/About/About'
import SignIn from './Containers/SignIn/SignIn'
import AdminPanel from './Containers/AdminPanel/AdminPanel'
import NotFound from './Containers/NotFound/NotFound'
import LogOut from './Components/LogOut/LogOut'
import { UserContext } from './context/userContext'
import RedirectUser from './Containers/RedirectUser/RedirectUser'

function App() {

  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser &&
        <LogOut />
      }

      <Navbar />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/a-propos" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/articles/:slug" element={<Article/>}/>
          <Route path="/tb-admin" element={<RedirectUser/>}>
            <Route path="/tb-admin/ecrire" element={<AddArticle/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;