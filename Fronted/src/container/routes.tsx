import { lazy } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import AdminGuard from 'components/common/AdminGuard';
import AuthGuard from 'components/common/AuthGuard';

import { ROUTES } from 'utils/constants/routes';

const Layout = lazy(() => import('../components/layout'));
const PageNotFound = lazy(() => import('../pages/PageNotFound'));
const SignIn = lazy(() => import('../pages/Auth/SignIn'));
const Register = lazy(() => import('../pages/Auth/Register'));

const AddProject = lazy(() => import('../components/module/projectManagement/AddProject'));
const ProjectList = lazy(() => import('../pages/ProjectManagement/index'));
const ProjectView = lazy(() => import('../components/module/projectManagement/ViewProject'));

const AddTask = lazy(() => import('../components/module/TaskManagement/TaskAdd'));
const ViewTask = lazy(() => import('../components/module/TaskManagement/TaskView'));

const UserList = lazy(() => import('../pages/UserManagement/index'));
const UserView = lazy(() => import('../components/module/UserManagement/UserView'));
const UserEdit = lazy(() => import('../components/module/UserManagement/UserEdit'));

const ProfileEdit = lazy(() => import('../pages/Profile'));

const Routing = () => {
  return (
    <Routes>
      <Route path={ROUTES.signIn} element={<SignIn />} />
      <Route path={ROUTES.register} element={<Register />} />
      <Route
        path={ROUTES.default}
        element={
          <AuthGuard>
            <Layout />
          </AuthGuard>
        }
      >
        <Route path={ROUTES.pageNotFound} element={<PageNotFound />} />

        <Route path={ROUTES.projectManagement} element={<Outlet />}>
          <Route path={ROUTES.projectManagement} element={<ProjectList />} />
          <Route path={`${ROUTES.projectView}/:id`} element={<ProjectView />} />
          <Route path={`${ROUTES.projectAdd}`} element={<AddProject />} />
          <Route path={`${ROUTES.projectEdit}/:id`} element={<AddProject />} />
          <Route path="*" element={<Navigate to={ROUTES.projectManagement} replace={true} />} />
        </Route>

        <Route path={ROUTES.taskManagement} element={<Outlet />}>
          <Route path={`${ROUTES.taskView}/:id`} element={<ViewTask />} />
          <Route path={`${ROUTES.taskAdd}/:projectId`} element={<AddTask />} />
          <Route path={`${ROUTES.taskEdit}/:id/:projectId`} element={<AddTask />} />
          <Route path="*" element={<Navigate to={ROUTES.taskManagement} replace={true} />} />
        </Route>

        <Route
          path={ROUTES.userManagement}
          element={
            <AdminGuard>
              <Outlet />
            </AdminGuard>
          }
        >
          <Route path={`${ROUTES.userView}/:id`} element={<UserView />} />
          <Route path={`${ROUTES.userEdit}/:id`} element={<UserEdit />} />
          <Route path={`${ROUTES.userList}`} element={<UserList />} />
          <Route path="*" element={<Navigate to={ROUTES.userManagement} replace={true} />} />
        </Route>
        <Route path={`${ROUTES.profile}/:id`} element={<ProfileEdit />} />

        <Route path={ROUTES.default} element={<Navigate replace to={ROUTES.projectManagement} />} />
        <Route path="*" element={<Navigate replace to={ROUTES.pageNotFound} />} />
      </Route>
      <Route path="*" element={<Navigate replace to={ROUTES.default} />} />
    </Routes>
  );
};

export default Routing;
