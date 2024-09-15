import Faq from './component/Faq';
import Home from './component/Home';
import Login from './component/Login';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Translate from './component/Translate';
import About from './component/About';
import ChatBotPage from './component/ChatBotPage';

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/chat' element={<ChatBotPage/>}/>
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/translate' element={<Translate/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      {/* </Router> */}

      {/* <Login/> */}

    </div>
  );
}

export default App;
