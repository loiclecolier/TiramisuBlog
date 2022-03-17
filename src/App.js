
import React, { useContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import AddArticle from './Containers/AdminPanel/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article'
import About from './Containers/About/About'
import NotFound from './Containers/NotFound/NotFound'
import LogOut from './Components/LogOut/LogOut'
import { UserContext } from './context/userContext'
import RedirectUser from './Containers/RedirectUser/RedirectUser'
import HomeAdmin from './Containers/AdminPanel/HomeAdmin/HomeAdmin'
import ArticlesAdmin from './Containers/AdminPanel/ArticlesAdmin/ArticlesAdmin'
import EditArticle from './Containers/AdminPanel/EditArticle/EditArticle'

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
            <Route path="/tb-admin/home" element={<HomeAdmin/>}/>
            <Route path="/tb-admin/ecrire" element={<AddArticle/>}/>
            <Route path="/tb-admin/articles" element={<ArticlesAdmin/>}/>
            <Route path="/tb-admin/edit-article/:slug" element={<EditArticle/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;