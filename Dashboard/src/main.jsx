import { lazy, StrictMode } from 'react';
import { Suspense } from 'react';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx';
import shopBuddyIcon from '/shopBuddyIcon.png';
// const App = lazy(()=> import('./App.jsx'))
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthState } from "./context/role_management.jsx";

createRoot(document.getElementById('root')).render(
  
    <BrowserRouter>
    <AuthState>
      <Toaster
        toastOptions={{
          position: "top-right",
          style: {
            backgroundColor: '#283046',
            color: 'white'
          }
        }}
      />
      <Suspense fallback={<div><img src={shopBuddyIcon} width={'80px'} alt="loading icon" /></div>}><App /></Suspense>


      
      </AuthState>
    </BrowserRouter>
  
  ,
)
