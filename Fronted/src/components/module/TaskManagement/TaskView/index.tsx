import { DetailWrapper } from './style';

import { Button, Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { TASK_STATUS_ENUM, TASK_PRIORITY_ENUM } from 'utils/constants';


import { useTaskDetail } from 'services/hooks/task';

const ViewTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: taskDetail } = useTaskDetail(id ?? '');
  return (
    <>
      <div className="shadow-paper">
        <DetailWrapper>
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h2>Task Details</h2>
            </Col>
            <Col>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Task Title</h4>
              <p> {taskDetail?.name ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Task Description</h4>
              <p>{taskDetail?.description ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Task Priority</h4>
              <p>{TASK_PRIORITY_ENUM[taskDetail?.priority as keyof typeof TASK_PRIORITY_ENUM] ??  '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Task Status</h4>
              <p>{TASK_STATUS_ENUM[taskDetail?.status as keyof typeof TASK_STATUS_ENUM] ??  '-'}</p>
            </Col>
          </Row>
        </DetailWrapper>
      </div>
    </>
  );
};

export default ViewTask;
