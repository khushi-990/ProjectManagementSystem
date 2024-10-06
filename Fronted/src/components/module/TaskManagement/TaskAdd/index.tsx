import { useQueryClient } from '@tanstack/react-query';
import { Button, Col, Form, Row, message } from 'antd';
import { Wrapper } from 'pages/Auth/Auth.Styled';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { RenderSelectInput, RenderTextInput } from 'components/common/FormField';
import FormLayout from 'components/common/FormLayout';

import { IAddTaskReq } from 'services/api/task/types';
import { taskKeys } from 'services/hooks/queryKeys';
import { useCreteTask, useTaskDetail, useUpdateTask } from 'services/hooks/task';

import { IApiError } from 'utils/Types';
import { TASK_PRIORITY, TASK_STATUS, TASK_STATUS_ENUM, TASK_PRIORITY_ENUM } from 'utils/constants';

const AddTask: React.FC = () => {
  const { id, projectId } = useParams();
  console.log("🚀 ~ projectId:", projectId)
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createTask } = useCreteTask();
  const { mutate: updateTask } = useUpdateTask();
  const [form] = Form.useForm();

  const { data } = useTaskDetail(id ?? '');

  useEffect(() => {
    if (!data && !id) return;
    form.setFieldsValue({
      ['name']: data?.name ?? '',
      ['status']: TASK_STATUS_ENUM[data?.status as keyof typeof TASK_STATUS_ENUM] ?? '',
      ['priority']: TASK_PRIORITY_ENUM[data?.priority as keyof typeof TASK_PRIORITY_ENUM] ?? '',
      ['description']: data?.description ?? ''
    });
  }, [form, data, id]);

  const onSubmit = (values: IAddTaskReq) => {
    if (id) {
      updateTask(
        { ...values, _id: id },
        {
          onSuccess: (res) => {
            message.success(res.message ?? 'Task added successfully');
            queryClient.invalidateQueries(taskKeys.taskList({ limit: 10, page: 1, projectId }));
            queryClient.invalidateQueries(taskKeys.taskDetail(id));
            navigate(-1);
          },

          onError: (err: IApiError) => {
            message.error(err.message);
          }
        }
      );
    } else {
      createTask(
        { ...values, projectId: projectId ?? '' },
        {
          onSuccess: (res) => {
            message.success(res.message ?? 'Task added successfully');
            queryClient.invalidateQueries(taskKeys.taskList({ limit: 10, page: 1,projectId }));
            navigate(-1);
          },

          onError: (err: IApiError) => {
            message.error(err.message);
          }
        }
      );
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
                  name="name"
                  placeholder="Enter task name "
                  label="Task Name"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your task name.'
                    }
                  ]}
                />

                <RenderTextInput
                  col={{ xs: 24 }}
                  name="description"
                  placeholder="Enter task description"
                  label="Task Description"
                  allowClear="allowClear"
                  size="large"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your task description.'
                    }
                  ]}
                />
                <RenderSelectInput
                  col={{ xs: 24 }}
                  name="priority"
                  placeholder="Select Priority"
                  label="Select Priority"
                  optionLabel={TASK_PRIORITY}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your priority.'
                    }
                  ]}
                />

                <RenderSelectInput
                  col={{ xs: 24 }}
                  name="status"
                  placeholder="Select Status"
                  label="Select Status"
                  optionLabel={TASK_STATUS}
                  rules={[
                    {
                      required: true,
                      message: 'Please select your priority.'
                    }
                  ]}
                />

                <Col xs={24}>
                  <Button type="primary" size="middle" htmlType="submit" data-testid="add">
                    {id ? 'Update' : 'Add'} Task
                  </Button>
                  <Button
                    className="ml-5"
                    type="default"
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

export default AddTask;
