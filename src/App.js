import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import Routers from './Routes/Routers';

function App() {
  return (
    <div className="">
      <RouterProvider router={Routers}></RouterProvider>
    </div>
  );
}

export default App;
