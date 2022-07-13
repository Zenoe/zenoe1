import { Link, Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar';
const Home = () => {
  return (
    <>
      <AppBar />
      <Outlet />
    </>
  );
};
export default Home;
