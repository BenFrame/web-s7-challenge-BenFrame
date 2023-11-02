import React from 'react'
import Home from './Home'
import Form from './Form'
import {Routes, Route, Link, useLocation} from 'react-router-dom'

function App() {
  const location = useLocation();
  const currentRoute = location.pathname;
  return (
    <div id="app">
      <nav>
        {/* NavLinks here */}
        <Link to= '/' class={ currentRoute === '/' ? 'active' : ''}>Home</Link>
        <Link to='/order' class={ currentRoute === '/order' ? 'active' : ''}>Order</Link>
      </nav>
      {/* Route and Routes here */}
    <Routes>
      <Route path='/' element = {<Home />}/>
      <Route path='/order' element = {<Form />}/>
    </Routes>
    </div>
  )
}

export default App
