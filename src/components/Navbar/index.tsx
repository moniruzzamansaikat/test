import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  const [page, setPage] = useState('')
  const location = useLocation()

  useEffect(() => {
    const {pathname} = location;
    setPage(pathname === '/' ? 'home' : pathname.slice(1));
    }, [location,page])
  
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link className={styles.logo} to='/'>
          <img src="/logo.png" alt="" />
        </Link>
        
        <ul className={styles.navmenu}>
          <li><Link to='/' className={page === 'home' ? styles.active : ''}>Home</Link></li>
          <li><Link to='/favourite' className={page === 'favourite' ? styles.active : ''}>Favourite</Link></li>
          <li><Link to='/contact' className={page === 'contact' ? styles.active : ''}>Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar