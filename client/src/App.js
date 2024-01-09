import { useState } from 'react';
import './App.css';
import Home from './component/home';
import Info from './component/info';
import Login from './component/login';
import Posts from './component/posts';
import Todos from './component/todos';
import { Route, Routes, Navigate } from 'react-router-dom';



function App() {
  const [isLog, setIsLog]= useState(false);
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to='login' />} />
        <Route path='/login' element={<Login isLog={isLog} setIsLog={setIsLog}/>} />
        <Route path='/home/:userName' element={<Home />} />
        <Route path='/home/:userName/Posts' element={<Posts/>} />
        <Route path='/home/:userName/Todos' element={<Todos/>} />
        <Route path='/home/:userName/Info' element={<Info/>} />
      </Routes>
    </div>
  );
}

export default App;
