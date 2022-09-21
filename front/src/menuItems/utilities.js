// assets
import {
  AppstoreAddOutlined,
  AntDesignOutlined,
  BarcodeOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  LoadingOutlined,
  SnippetsOutlined,
  ToolOutlined,
  CheckOutlined,
} from '@ant-design/icons';

// icons
const icons = {
  FontSizeOutlined,
  BarcodeOutlined,
  AntDesignOutlined,
  LoadingOutlined,
  AppstoreAddOutlined,
  CheckOutlined,
  SnippetsOutlined,
  ToolOutlined,
};
<SnippetsOutlined />
// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'utilTestCase2Rf',
      title: '测试用例转RF',
      type: 'item',
      url: '/testcase2rf',
      icon: icons.SnippetsOutlined
    },

    {
      id: 'utilDeviceParameterConverter',
      title: '设备传参工具',
      type: 'item',
      url: '/deviceparamconverter',
      icon: icons.ToolOutlined
    },
    {
      id: 'util-typography',
      title: '脚本语法检查',
      type: 'item',
      url: '/rfsyntaxcheck',
      icon: icons.CheckOutlined
    },
    // {
    //     id: 'util-shadow',
    //     title: 'Shadow',
    //     type: 'item',
    //     url: '/shadow',
    //     icon: icons.BarcodeOutlined
    // },
    // {
    //     id: 'ant-icons',
    //     title: 'Ant Icons',
    //     type: 'item',
    //     url: '/icons/ant',
    //     icon: icons.AntDesignOutlined,
    //     breadcrumbs: false
    // }
  ]
};

export default utilities;
