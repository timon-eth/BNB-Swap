import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  

  const notify = () => toast.info(status, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });

  useEffect(() => {
    if (status) {
        notify();
        setStatus(null);
    }
  }, [status]);

  return (
    <div className="App">
      <Header setCurrentWalletAddress={setWalletAddress} setStatus={setStatus} />
      <Content 
        walletAddress={walletAddress} 
        setStatus={setStatus} 
        setIsLoading={setIsLoading} 
      />
      <Footer />
      <ToastContainer />
      {
        isLoading && 
          <div className='fixed top-0 left-0 bottom-0 right-0 flex items-center justify-center bg-slate-200/50'>
            <ReactLoading type="bars" color="#ffe986"/>
          </div>
      }
    </div>
  );
}

export default App;
