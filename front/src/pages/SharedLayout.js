import { Link, Outlet } from 'react-router-dom';
import StyledNavbar from '../components/StyledNavbar';
import AppBar from '../components/AppBar';
const Home = () => {
  return (
    <>
      {/* <StyledNavbar /> */}
      <AppBar />
      <Outlet />
    </>
  );
};
export default Home;
