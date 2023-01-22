import { Card, Col, Input, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { IDataForModal } from '../../interface';
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons';

interface CardProps {
  data: IDataForModal;
}

const CustomCard: React.FC<CardProps> = ({ data }) => {
  const { fromCurrency, toCurrency, updatedAt } = data;
  return (
    <Card>
      <Row>
        <Col span={3}>
          <p>{fromCurrency}</p>
          <img
            src='/bidirectionalArrow.png'
            height={'40px'}
            width={'5%'}
            alt='bidirectionalArrow'
          />
          <p>{toCurrency}</p>
        </Col>
        <Col span={20}>
          <ReloadOutlined />
          <CloseOutlined />
          <Input></Input>
          <Input></Input>
          <p>{`Updated At ${moment(updatedAt).format(
            'YYYY-MM-DD HH:mm:ss'
          )}`}</p>
        </Col>
      </Row>
    </Card>
  );
};
export default CustomCard;
