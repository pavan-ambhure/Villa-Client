import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Nav from './components/common/Nav';
import Home from './components/home/Home';
import CreateVilla from './components/createVilla/CreateVilla';
import CreateVillaNumber from './components/createVillaNumber/CreateVillaNumber';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          {/* <Route element={<Authenticate />}> */}
          <Route path='/' element={<Nav />}>
            <Route path='/Home' element={<Home />} />
            <Route path='/CreateVilla' element={<CreateVilla />} />
            <Route path='/CreateVillaNumber' element={<CreateVillaNumber />} />
          </Route>
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
