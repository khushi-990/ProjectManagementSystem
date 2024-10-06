import { Wrapper } from './style';

import { SearchOutlined } from '@ant-design/icons';
import { Button, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

import { RenderTextInput } from 'components/common/FormField';
import { useTableParams } from 'components/custom-hooks/useTableParams';
import ProjectManagementTable from 'components/module/projectManagement/ProjectManagementTable';

import { authStore } from 'services/store/auth';

import { ROUTES } from 'utils/constants/routes';

const ProjectManagement = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {
    userData: { userType }
  } = authStore((state) => state);
  const { onChange, searchDebounce, args, setArgs } = useTableParams();

  return (
    <Wrapper>
      <div className="shadow-paper">
        <div className="pageHeader">
          <h2 className="pageTitle">Project Management</h2>
          <div className="d-flex">
            <Form form={form}>
              <RenderTextInput
                size="middle"
                placeholder="Search project"
                allowClear
                prefix={<SearchOutlined style={{ color: '#125285' }} />}
                onChange={onChange}
              />
            </Form>
            {userType === 'Admin' && (
              <Button className="ml-5" type="primary" onClick={() => navigate(ROUTES.projectAdd)}>
                Add Project
              </Button>
            )}
          </div>
        </div>
        <ProjectManagementTable searchDebounce={searchDebounce} args={args} setArgs={setArgs} />
      </div>
    </Wrapper>
  );
};

export default ProjectManagement;
