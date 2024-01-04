import './App.css';
import Home from './component/home';
import Info from './component/info';
import Login from './component/login';
import Posts from './component/posts';
import Todos from './component/todos';
import { Route, Routes, Navigate } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Navigate to='login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home/:userName' element={<Home />} />
        <Route path='/home/:userName/Posts' element={<Posts/>} />
        <Route path='/home/:userName/Todos' element={<Todos/>} />
        <Route path='/home/:userName/Info' element={<Info/>} />
      </Routes>
    </div>
  );
}

export default App;
