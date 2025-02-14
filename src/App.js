import './App.css';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home';
import Detail from './pages/detail/Detail';
import Catalog from './pages/Catalog';
import Cast from './pages/detail/Casts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// require('dotenv').config()
function App() {
  console.log(process.env.REACT_APP_BASEURL)
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={'kategori/:category'} element={<Catalog />} />
        <Route path={'kategori/:category/search/:keyword'} element={<Catalog />} />
        <Route path={'kategori/:category/genre/:namegenre/:idgenre'} element={<Catalog />} />
        <Route path={'detail/:category/:id'} element={<Detail />} />
        <Route path={'cast/:person/:id'} element={<Cast />} />
      </Routes>
      {/* <Footer /> */}
    </Router>

    // <div className="App">
    //   <header className="App-header">
    //     Nonton
    //   </header>
    // </div>
  );
}

export default App;
