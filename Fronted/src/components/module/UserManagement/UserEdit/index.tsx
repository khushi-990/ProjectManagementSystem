import { UserOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { Wrapper } from 'pages/Auth/Auth.Styled';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import FormLayout from 'components/common/FormLayout';

import { IEditUserReq } from 'services/api/user/types';
import { userKeys } from 'services/hooks/queryKeys';
import { useUpdateUser, useUserDetail } from 'services/hooks/users';

import { IApiError } from 'utils/Types';
import { GENDER_LIST, USER_GENDER } from 'utils/constants';
import { ROUTES } from 'utils/constants/routes';

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateUser();
  const { data } = useUserDetail(id ?? '');

  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({
      ['firstName']: data?.firstName ?? '',
      ['lastName']: data?.lastName ?? '',
      ['email']: data?.email ?? '',
      ['gender']: USER_GENDER[data?.gender as keyof typeof USER_GENDER] ?? ''
    });
  }, [form, data]);

  const onSubmit = (data: IEditUserReq) => {
    mutate(
      { ...data, _id: id ?? '' },
      {
        onSuccess: (res) => {
          navigate(ROUTES.projectManagement);
          queryClient.invalidateQueries(userKeys.userList({ limit: 10, page: 1 }));
          message.success(res.message ?? 'User updated successfully');
        },

        onError: (err: IApiError) => {
          message.error(err.message);
        }
      }
    );
  };

  return (
    <>
      <FormLayout>
        <Wrapper>
          <div className="formTitle">
            <h4 className="title">Edit User</h4>
            <Form onFinish={onSubmit} form={form} autoComplete="off" className="signInForm">
              <Row gutter={[0, 30]}>
                <RenderTextInput
                  col={{ xs: 24 }}
                  name="firstName"
                  placeholder="Enter your first name "
                  label="First Name"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter first name'
                    }
                  ]}
                />
                <RenderTextInput
                  col={{ xs: 24 }}
                  name="lastName"
                  placeholder="Enter your last name "
                  label="Last Name"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your last name'
                    }
                  ]}
                />
                <RenderTextInput
                  col={{ xs: 24 }}
                  name="email"
                  placeholder="Enter your email id "
                  label="Email ID"
                  allowClear="allowClear"
                  size="large"
                  disabled
                  prefix={<UserOutlined style={{ color: '#125285' }} />}
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your email'
                    },
                    {
                      type: 'email',
                      message: 'Please enter valid email'
                    }
                  ]}
                />
                <RenderSelectInput
                  col={{ xs: 24 }}
                  name="gender"
                  placeholder="Select your gender"
                  label="Select Gender"
                  optionLabel={GENDER_LIST}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your priority.'
                    }
                  ]}
                />
                <Col xs={24}>
                  <Button type="primary" size="middle" htmlType="submit" disabled={isLoading}>
                    Save
                  </Button>
                  <Button
                    className="ml-5"
                    type="default"
                    size="middle"
                    htmlType="button"
                    onClick={() => navigate(-1)}
                    disabled={isLoading}
                  >
                    Back
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Wrapper>
      </FormLayout>
    </>
  );
};

export default UserEdit;
