import { NavLink } from 'react-router-dom';

import styles from '@/index.css'

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <NavLink
        to='/'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Home
      </NavLink>
      <NavLink
        to='/about'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        About
      </NavLink>
      <NavLink
        to='/products'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Products
      </NavLink>
      <NavLink
        to='/login'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        Login
      </NavLink>
      <NavLink
        to='/wordcount'
        className={({ isActive }) => (isActive ? 'link active' : 'link')}
      >
        WordCount
      </NavLink>

    </nav>
  );
};
export default Navbar;
