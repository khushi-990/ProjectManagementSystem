import { Content } from 'antd/es/layout/layout';
import { Suspense, lazy } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from 'components/common/loader';

import { StyledLayout } from './Layout.Styled';

const Sidebar = lazy(() => import('./sidebar'));

const Layout = () => {
  return (
    <StyledLayout className="siteLayout">
      <StyledLayout>
        <Content>
          <Sidebar />
          <div className="content-body">
            <div className="content-wrap">
              <Suspense fallback={<Loader />}>
                <Outlet />
              </Suspense>
            </div>
          </div>
        </Content>
      </StyledLayout>
    </StyledLayout>
  );
};

export default Layout;
