import { DetailWrapper } from './style';

import { Button, Col, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

import { useUserDetail } from 'services/hooks/users';

import { USER_GENDER } from 'utils/constants';

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: userDetails } = useUserDetail(id ?? '');
  return (
    <>
      <div className="shadow-paper">
        <DetailWrapper>
          <Row className="d-flex justify-content-between align-items-center">
            <Col>
              <h2>User Details</h2>
            </Col>
            <Col>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>First Name</h4>
              <p> {userDetails?.firstName ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Last Name</h4>
              <p>{userDetails?.lastName ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Email</h4>
              <p>{userDetails?.email ?? '-'}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h4>Gender</h4>
              <p>{USER_GENDER[userDetails?.gender as keyof typeof USER_GENDER] ?? '-'}</p>
            </Col>
          </Row>
        </DetailWrapper>
      </div>
    </>
  );
};

export default ViewUser;
