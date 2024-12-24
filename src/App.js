import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Layout';
import HomeScreen from './Screens/HomeScreen';
import FormScreen from './Screens/FormScreen';

function App() {
  return <BrowserRouter>
  <Routes>
    <Route path='/' element={<Layout Component={HomeScreen}/>} />
    <Route path='/form/:alias' element={<Layout Component={FormScreen}/>} />
  </Routes>
  </BrowserRouter>


}

export default App;
