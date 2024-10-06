import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { Wrapper } from 'pages/Auth/Auth.Styled';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import FormLayout from 'components/common/FormLayout';

import { IAddProjectReq } from 'services/api/projects/types';
import { useCreteProject, useProjectDetail, useUpdateProject } from 'services/hooks/project';
import { projectKeys } from 'services/hooks/queryKeys';
import { useUserAllList } from 'services/hooks/users';

import { IApiError } from 'utils/Types';
import { ROUTES } from 'utils/constants/routes';

const AddProject: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { mutate: addProjectMutate } = useCreteProject();
  const { mutate: updateProjectMutate } = useUpdateProject();
  const { data } = useProjectDetail(id ?? '');
  const { data: allUsers } = useUserAllList();

  useEffect(() => {
    if (!data && !id) return;
    form.setFieldsValue({
      ['title']: data?.title ?? '',
      ['description']: data?.description ?? '',
      ['userIds']: data?.userIds ?? ''
    });
  }, [form, data, id]);

  const onSubmit = (values: IAddProjectReq) => {
    if (id) {
      const removeIds = data?.userIds.filter(item => !values.userIds.includes(item)) ?? [];
      updateProjectMutate(
        { ...values,removeIds, _id: id },
        {
          onSuccess: (res) => {
            navigate(ROUTES.projectManagement);
            queryClient.invalidateQueries(projectKeys.projectList({ limit: 10, page: 1 }));
            queryClient.invalidateQueries(projectKeys.projectDetail(id));
            message.success(res.message ?? 'Project updated successfully');
          },

          onError: (err: IApiError) => {
            message.error(err.message);
          }
        }
      );
    } else {
      addProjectMutate(values, {
        onSuccess: (res) => {
          navigate(ROUTES.projectManagement);
          queryClient.invalidateQueries(projectKeys.projectList({ limit: 10, page: 1 }));
          message.success(res.message ?? 'Project added successfully');
        },
        onError: (err: IApiError) => {
          message.error(err.message);
        }
      });
    }
  };

  return (
    <>
      <FormLayout>
        <Wrapper>
          <div className="formTitle">
            <h4 className="title">Add Project</h4>
            <Form onFinish={onSubmit} form={form} autoComplete="off" className="signInForm">
              <Row gutter={[0, 30]}>
                <RenderTextInput
                  col={{ xs: 24 }}
                  name="title"
                  placeholder="Enter project name "
                  label="Project Name"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your project name.'
                    }
                  ]}
                />

                <RenderTextInput
                  col={{ xs: 24 }}
                  name="description"
                  placeholder="Enter project description"
                  label="Project Description"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your project description.'
                    }
                  ]}
                />

                <RenderSelectInput
                  mode={'multiple'}
                  col={{ xs: 24 }}
                  name="userIds"
                  placeholder="Assign to"
                  label="Assign To"
                  optionLabel={allUsers?.map((user) => ({
                    label: `${user.firstName} ${user.lastName}`,
                    value: user._id
                  }))}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your priority.'
                    }
                  ]}
                />

                <Col xs={24}>
                  <Button type="primary" size="middle" htmlType="submit" data-testid="add">
                    {id ? 'Update' : 'Add'} Project
                  </Button>
                  <Button
                    type="default"
                    className="ml-5"
                    size="middle"
                    htmlType="button"
                    onClick={() => navigate(-1)}
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

export default AddProject;
