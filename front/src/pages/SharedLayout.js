import { useSelector } from 'react-redux'

import { Link, Outlet } from 'react-router-dom';
import AppBar from '../components/AppBar';

const SharedLayout = () => {

  const userLogin = useSelector((state) => state.userLogin);
  return (
    <>
      <AppBar userInfo={userLogin.userInfo} />
      <Outlet />
    </>
  );
};
export default SharedLayout;
