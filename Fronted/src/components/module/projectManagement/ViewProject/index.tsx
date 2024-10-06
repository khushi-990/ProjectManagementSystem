import { DetailWrapper } from './style';

import { Button, Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { useTableParams } from 'components/custom-hooks/useTableParams';
import TaskManagementTable from 'components/module/TaskManagement/TaskManagementTable';

import { useProjectDetail } from 'services/hooks/project';

import { ROUTES } from 'utils/constants/routes';

const ViewProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { args, setArgs } = useTableParams();

  const { data } = useProjectDetail(id ?? '');
  return (
    <>
      <div className="shadow-paper">
        <DetailWrapper>
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h2>Project Details</h2>
            </Col>
            <Col>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Project Title</h4>
              <p> {data?.title ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Project Description</h4>
              <p>{data?.description ?? '-'}</p>
            </Col>
          </Row>
        </DetailWrapper>
      </div>
      <div className="mt-16">
        <div className="shadow-papers d-flex justify-content-between">
          <h4>Task List</h4>
          <Button onClick={() => navigate(`${ROUTES.taskAdd}/${data?._id}`)}>Add Task</Button>
        </div>
        <TaskManagementTable projectId={data?._id ?? ''} args={args} setArgs={setArgs} />
      </div>
    </>
  );
};

export default ViewProject;
