import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Page from './components/Page';
import { Connection } from './metamask';

function App() {
  const [isLogin, setLogin] = useState(false);
  const [isWalletLogin, setWalletLogin] = useState(false)
  


  return (
    <div className="App bg-BackroundColor h-full relative">
      <Header isLogin={isLogin} isWalletLogin={isWalletLogin} setLogin={setLogin} setWalletLogin={setWalletLogin}/>
      <Page isLogin={isLogin} setLogin={setLogin}/>
    </div>
  );
}

export default App;
