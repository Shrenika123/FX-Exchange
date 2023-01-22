import { Col, FloatButton, Row } from 'antd';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import utils from '../../API/utils';
import { API_METHODS, IDataForModal } from '../../interface';
import ModalForm, { IFormValue } from '../../organisms/modalForm';
import { nanoid } from 'nanoid';
import Card from '../../organisms/Card';
import Styles from './dashboard.module.scss';

type ActionType = 'ADD' | 'DELETE' | 'UPDATE' | 'DELETE_ALL';
type Action = { type: ActionType; payload: IDataForModal };
const Dashboard: React.FC = () => {
  const [createdCardCurrencyRate, setCreatedCardCurrencyRate] =
    useState<number>();

  function counterReducer(state: IDataForModal[], action: Action) {
    const { type, payload } = action;
    switch (type) {
      case 'ADD': {
        return [...state, payload];
      }
      case 'DELETE': {
        return [...state.filter((item) => item.id !== payload.id)];
      }
      case 'DELETE_ALL': {
        return [];
      }
      default:
        return state;
    }
  }

  const [currencyConvertorCards, setCurrencyConvertorCards] = useReducer(
    counterReducer,
    []
  );

  const [visible, setVisible] = useState(false);

  const getCurrencyRate = async (currencies: IFormValue) => {
    await utils
      .fetch(
        `https://api.exchangerate.host/convert?from=${currencies.fromCurrency}&to=${currencies.toCurrency}`,
        {
          method: API_METHODS.GET,
        }
      )
      .then((res) => {
        setCurrencyConvertorCards({
          type: 'ADD',
          payload: {
            ...currencies,
            id: nanoid(),
            updatedAt: new Date(),
            convertedRate: res.data.result,
          },
        });
        setCreatedCardCurrencyRate(res.data.result);
      });
    setVisible(false);
  };

  return (
    <>
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
        <Row>
          {currencyConvertorCards.map((item) => (
            <Col key={item.id} span={6} className={Styles.CardContainer}>
              <Card data={item} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
export default Dashboard;
