import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from "../Index"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

function Header() {
  const authstatus = useSelector((state) => state.Auth.status);

  const location = useLocation()
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }

  //Array of nav items (navbar)
  const navItems = [

    {
      name: 'Home',
      slug: '/',
      active: true
    },

    {
      name: "Login",
      slug: '/login',
      active: !authstatus
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authstatus
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authstatus
    },
    {
      name: "Add Post",
      slug: "add-posts",
      active: authstatus
    }
  ]

  return (
    <header className='py-3 bg-[#0e1012] text-white fixed top-0 w-full
    bg-opacity-10 backdrop-blur-2xl rounded-lg shadow-lg p-6 border-b-[1px] border-b-[#cccccc5a] z-[1000]'>
      <Container>
        <nav className='flex flex-wrap items-center justify-between'>

          {/* logo */}
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='120px' />
            </Link>
          </div>

          {/* menu button */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-white'>
              <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'} fa-2x text-white`}></i>
            </button>
          </div>

          {/* navlist */}
          <ul className={`flex-col items-center md:ml-auto gap-4 
            ${menuOpen ? 'block' : 'hidden'} md:flex md:flex-row md:gap-4 
            absolute md:relative top-[60px] right-0 bg-[#0e1012] 
            bg-opacity-80 backdrop-blur-md backdrop-filter md:bg-transparent 
            md:top-auto md:left-auto md:right-auto p-4 md:p-0 shadow-lg
             md:shadow-none rounded-lg`}>

            {navItems.map((item) => (
              item.active ? (
                <li key={item.name}>
                  <button onClick={() => navigate(item.slug)}
                    className={`inline-block px-6 py-2 duration-200 hover:shadow-md
                         hover:shadow-cyan-500 rounded-full
                         ${location.pathname === item.slug ? 'bg-pink-600 text-white' : ''
                      }`}

                  >{item.name}</button>
                </li>
              ) : null
            ))}

            {authstatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header