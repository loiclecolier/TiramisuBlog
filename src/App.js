import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Footer from './Components/Footer/Footer'
import Home from './Containers/Home/Home'
import AddArticle from './Containers/AddArticle/AddArticle'
import Contact from './Containers/Contact/Contact'
import Article from './Containers/Article/Article'
import About from './Containers/About/About'

function App() {
  return (
    <>
      <Navbar />
      
      <div className="content">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/a-propos" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/ecrire" element={<AddArticle/>}/>
          <Route path="/articles/:slug" element={<Article/>}/>
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;