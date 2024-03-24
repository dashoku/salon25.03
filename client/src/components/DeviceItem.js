import React from 'react';
import { Card, Col} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';


const DeviceItem = ({ device }) => {
  const navigate = useNavigate();
  return (
    <Col md={4} className={'mt-5'} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
      <Card style={{ width: 250, cursor: 'pointer' }} border={'light'}>
        <Image width={250} height={300} src={process.env.REACT_APP_API_URL + device.img} />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
            <div>{device.price} грн</div>
        </div>
        <div>{device.name}</div>
      </Card>
    </Col>
  );
};

export default DeviceItem;