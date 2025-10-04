import { lazy, StrictMode } from 'react';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import shopBuddyIcon from '/shopBuddyIcon.png';
// const App = lazy(()=> import('./App.jsx'))
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import store from "./store";

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
    <Suspense fallback={<div><img src={shopBuddyIcon} width={'80px'} alt="loading icon" /></div>}><App /></Suspense>
      
   
    <Toaster
      toastOptions={{
        position : "top-right",
        style:{
          backgroundColor:'#283046',
          color:'white'
        }
      }}
    />
    </BrowserRouter>
    </Provider>
  ,
)
