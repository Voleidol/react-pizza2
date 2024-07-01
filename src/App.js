import { Route, Router, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';


function App() {
  const [seacrchValue, setSearchValue] = useState('');

  return (
    <div className="wrapper">
      <Header seacrchValue={seacrchValue} setSearchValue={setSearchValue}/>
      <div className="content">
          <Routes>
            <Route path='/' element={<Home seacrchValue={seacrchValue}/>}/>
            <Route path='/cart' element={<Cart />}/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </div>
    </div>
  );
}

export default App;
