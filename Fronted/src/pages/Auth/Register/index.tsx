import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row, message } from 'antd';
import { Wrapper } from 'pages/Auth/Auth.Styled';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {
  RenderPasswordInput,
  RenderSelectInput,
  RenderTextInput
} from 'components/common/FormField';
import FormLayout from 'components/common/FormLayout';

import { IRegisterReq } from 'services/api/auth/types';
import { useRegister } from 'services/hooks/auth';
import { authStore } from 'services/store/auth';

import { IApiError } from 'utils/Types';
import { GENDER_LIST } from 'utils/constants';
import validation from 'utils/constants/pattern';
import { ROUTES } from 'utils/constants/routes';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isLoggedIn } = authStore((state) => state);
  const { mutate, isLoading } = useRegister();

  const onSubmit = (data: IRegisterReq) => {
    mutate(data, {
      onSuccess: () => {
        navigate(ROUTES.projectManagement);
      },

      onError: (err: IApiError) => {
        message.error(err.message);
      }
    });
  };

  if (isLoggedIn) {
    return <Navigate to={ROUTES.projectManagement} />;
  }

  return (
    <>
      <FormLayout>
        <Wrapper>
          <div className="formTitle">
            <h4 className="title">Register</h4>
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
                <RenderPasswordInput
                  col={{ xs: 24 }}
                  name="password"
                  required={true}
                  label="Password"
                  placeholder="Enter your password "
                  type="password"
                  size="middle"
                  prefix={<LockOutlined style={{ color: '#125285' }} />}
                  rules={[
                    () => ({
                      validator: (_: any, value: string) => {
                        if (!value) {
                          return Promise.reject(new Error('Please enter your password'));
                        } else if (!validation.strong_password.test(value)) {
                          return Promise.reject(
                            'Password must be of 8 to 15 characters and contains 1 uppercase, 1 lowercase, 1 number and 1 special character.'
                          );
                        } else {
                          return Promise.resolve();
                        }
                      }
                    })
                  ]}
                />
                <Col xs={24}>
                  <Link to={ROUTES.signIn}>Already have an account?</Link>
                </Col>
                <Col xs={24}>
                  <Button
                    type="primary"
                    size="middle"
                    htmlType="submit"
                    disabled={isLoading}
                    data-testid="login"
                  >
                    Register
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

export default Register;
