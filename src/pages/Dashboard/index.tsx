import { Button, Col, FloatButton, Row } from 'antd';
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import utils from '../../API/utils';
import { API_METHODS } from '../../interface';
import ModalForm, { IFormValue } from '../../organisms/modalForm';
import { nanoid } from 'nanoid';
import Card from '../../organisms/Card';
import Styles from './dashboard.module.scss';
import { formatDate } from '../../common/utils';
import { useAppContext } from '../../store';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const { setDashBoardData, currencyConvertorCards, setLoading } =
    useAppContext();
  const [visible, setVisible] = useState(false);

  const getCurrencyRate = async (currencies: IFormValue) => {
    setLoading(true);
    await utils
      .fetch(
        `https://api.exchangerate.host/convert?from=${currencies.fromCurrency}&to=${currencies.toCurrency}`,
        {
          method: API_METHODS.GET,
        }
      )
      .then((res) => {
        setLoading(false);
        setDashBoardData('ADD', {
          ...currencies,
          id: nanoid(),
          updatedAt: formatDate(new Date()),
          createdAt: formatDate(new Date()),
          convertedRate: res.data.result,
          fromCurrencyValue: '',
          toCurrencyValue: '',
        });
      })
      .catch((e) => {
        setLoading(false);
      });
    await setVisible(false);
  };
  return (
    <>
      <div>
        <Button
          icon={
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p>hi</p>
              <span style={{ display: 'flex', flexDirection: 'column' }}>
                <RightOutlined />
                <RightOutlined />
              </span>
            </div>
          }
          size={'large'}
          type='primary'
        >
          vhhhhgvvhhhh
        </Button>
        <Button>jj</Button>
        <Button></Button>
      </div>
      <FloatButton
        icon={<PlusOutlined height={'3rem'} />}
        type='primary'
        onClick={() => setVisible(!visible)}
      />
      <ModalForm
        visible={visible}
        onSubmit={(data: IFormValue) => {
          getCurrencyRate(data);
        }}
        onCancel={() => setVisible(false)}
      />
      {currencyConvertorCards.length > 0 && (
        <Row className={Styles.rowContainer} gutter={16}>
          {currencyConvertorCards.map((item) => (
            <Col key={item.id} span={8} className={Styles.CardContainer}>
              <Card data={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
export default Dashboard;
