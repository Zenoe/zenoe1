// assets
import { DesktopOutlined } from '@ant-design/icons'
// icons

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const devices = {
  id: 'group-devices',
  title: '设备',
  type: 'group',
  children: [
    {
      id: 'devices',
      title: '设备管理',
      type: 'item',
      url: '/devices',
      icon: DesktopOutlined,
      breadcrumbs: false
    }
  ]
}

export default devices
