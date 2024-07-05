import { React, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import authservice from "./appwrite/auth"
import { login, logout } from './Features/AuthSlice';
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import ParticlesBg from './Components/ParticlesBg';

function App() {

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    authservice.GetCurrentUser()
      .then((UserData) => {
        if (UserData) {
          dispatch(login({UserData}));
        } else {
          dispatch(logout());
        }
      })
      .catch(error => {
        console.error('Error fetching current user:', error);
        dispatch(logout());
        // Handle error as needed
      })
      .finally(() => setLoading(false));
  }, [dispatch]);


  //Conditional Rendering ->
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between'>
      <div className='w-full'>
        <Header />
        <main>
      <ParticlesBg /> 
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>) : (null)
}

export default App
