import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('@/pages/Dashboard')));

// render - utilities
const TestCase2RF = Loadable(lazy(() => import('@/pages/testcase2rf')));
const DeviceParamConverter = Loadable(lazy(() => import('@/pages/deviceparamconverter')));
const RFSyntaxCheck = Loadable(lazy(() => import('@/pages/rfsyntaxcheck')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    ,
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'testcase2rf',
      element: <TestCase2RF />
    },
    {
      path: 'deviceparamconverter',
      element: <DeviceParamConverter />
    },
    {
      path: 'rfsyntaxcheck',
      element: <RFSyntaxCheck />
    }
  ]
};

export default MainRoutes;
