import { lazy } from 'react';

// project import
import Loadable from '@/components/Loadable';
import MainLayout from '@/layout/MainLayout';

const DashboardDefault = Loadable(lazy(() => import('@/pages/Dashboard')));

const TestCase2RF = Loadable(lazy(() => import('@/pages/testcase2rf')));
const AutoRF = Loadable(lazy(() => import('@/pages/autorf')));
const DeviceParamConverter = Loadable(lazy(() => import('@/pages/deviceparamconverter')));
const RFSyntaxCheck = Loadable(lazy(() => import('@/pages/rfsyntaxcheck')));
const RFKeyGen = Loadable(lazy(() => import('@/pages/rfkeygen')));
const RFCTool = Loadable(lazy(() => import('@/pages/rfctool')));

const Devices = Loadable(lazy(() => import('@/pages/devices')));

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
      path: 'autorf',
      element: <AutoRF />
    },
    {
      path: 'deviceparamconverter',
      element: <DeviceParamConverter />
    },
    {
      path: 'rfsyntaxcheck',
      element: <RFSyntaxCheck />
    },
    {
      path: 'rfkeygen',
      element: <RFKeyGen />
    },
    {
      path: 'rfctool',
      element: <RFCTool />
    },
    {
      path: 'devices',
      element: <Devices />
    }
  ]
};

export default MainRoutes;
