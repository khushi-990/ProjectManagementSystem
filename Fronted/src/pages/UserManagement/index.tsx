import { Wrapper } from './style';

import { SearchOutlined } from '@ant-design/icons';
import { Form } from 'antd';

import { RenderTextInput } from 'components/common/FormField';
import { useTableParams } from 'components/custom-hooks/useTableParams';
import UserManagementTable from 'components/module/UserManagement/UserManagementTable';

const UserManagement = () => {
  const [form] = Form.useForm();

  const { searchDebounce, args, setArgs, onChange } = useTableParams();

  return (
    <Wrapper>
      <div className="shadow-paper">
        <div className="pageHeader">
          <h2 className="pageTitle">User Management</h2>
          <div className="d-flex">
            <Form form={form}>
              <RenderTextInput
                size="middle"
                placeholder="Search user"
                allowClear
                prefix={<SearchOutlined style={{ color: '#125285' }} />}
                onChange={onChange}
              />
            </Form>
          </div>
        </div>
        <UserManagementTable searchDebounce={searchDebounce} args={args} setArgs={setArgs} />
      </div>
    </Wrapper>
  );
};

export default UserManagement;
