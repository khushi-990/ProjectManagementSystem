import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { authStore } from 'services/store/auth';

import { ROUTES } from 'utils/constants/routes';

import { StyledLayout } from '../Layout.Styled';

const createMenuItem = (link?: string, label?: string, key?: any, icon?: any, type?: any, children?: any) => {
  return {
    link,
    key,
    icon,
    children,
    label,
    type,
  };
};

const compareLinkAndReturnKey = (items: any, currentPath: any): any => {
  let activeLinkKey = '';
  for (const item of items) {
    if (item?.children && Array.isArray(item?.children) && item.children.length > 0) {
      activeLinkKey = compareLinkAndReturnKey(item.children, currentPath);
    } else if (
      item.link === currentPath ||
      item.link === currentPath.split('/').splice(0, 2).join('/') ||
      currentPath.includes(item)
    ) {
      activeLinkKey = item.key;
      break;
    } else {
      continue;
    }
  }
  return activeLinkKey;
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userData: { userType, _id },
    actions: { authFail },
  } = authStore((state) => state);

  const items = [
    createMenuItem(ROUTES.projectManagement, 'Project Management', '2', <ProjectOutlined />, 'project_management'),
    createMenuItem(ROUTES.userList, 'User Management', '3', <UserOutlined />, 'user_management'),
    createMenuItem(`${ROUTES.profile}/${_id}`, 'User Profile', '5', <UserAddOutlined />, 'user_profile'),
    createMenuItem(ROUTES.logout, 'Logout', '4', <LogoutOutlined />, 'logout'),
  ].filter((item) => {
    if (userType === 'User' && item.type === 'user_management') {
      return false;
    }
    return true;
  });

  const [collapsed, setCollapsed] = useState(true);
  const [menu, setMenu] = useState('1');

  const activeTab = useMemo(() => {
    const activeLinkKey = compareLinkAndReturnKey(items, location.pathname);
    if (!activeLinkKey) {
      setMenu('');
    }
    if (activeLinkKey) {
      setMenu(activeLinkKey);
      return [activeLinkKey];
    } else {
      return [items?.find((item) => item?.link?.split('/')[1] === location?.pathname?.split('/')[1])?.key ?? '1'];
    }
  }, [location.pathname]);

  const onSelect = (item: any) => {
    if (item.props.link !== ROUTES.logout) {
      navigate(item.props.link);
    } else {
      console.log('cal');
      authFail();
    }
  };

  return (
    <StyledLayout.Sider
      collapsible
      breakpoint="lg"
      collapsed={collapsed}
      width={290}
      collapsedWidth={72}
      onCollapse={(collapsed) => {
        setCollapsed(collapsed);
      }}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
    >
      <Menu
        className="sidebarMenu"
        theme="dark"
        defaultSelectedKeys={activeTab}
        mode="inline"
        selectedKeys={[menu]}
        onSelect={({ item }: any) => onSelect(item)}
        items={items}
      />
    </StyledLayout.Sider>
  );
};

export default Sidebar;
