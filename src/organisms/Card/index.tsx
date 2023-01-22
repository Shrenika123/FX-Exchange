import { Card, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_METHODS, IDataForModal } from '../../interface';
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import Styles from './card.module.scss';
import { formatDate, isNum } from '../../common/utils';
import { useAppContext } from '../../store';
import utils from '../../API/utils';
import Loader from '../../atoms/Loader';
interface CardProps {
  data: IDataForModal;
}

enum CURRENCY {
  FROM_CURRENCY = 'fromCurrency',
  TO_CURRENCY = 'toCurrency',
  NONE = '',
}

enum STATUS {
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  NONE = '',
}

const CustomCard: React.FC<CardProps> = ({ data }) => {
  const { fromCurrency, toCurrency, updatedAt, convertedRate } = data;
  const [currencyCardData, setCurrencyCardData] = useState<IDataForModal>(data);
  const [status, setStatus] = useState<STATUS>(STATUS.NONE);
  const [lastChanged, setLastChanged] = useState<CURRENCY>(
    CURRENCY.FROM_CURRENCY
  );
  const { setDashBoardData } = useAppContext();
  const [loadingCard, setLoadingCard] = useState(false);

  useEffect(() => {
    if (status === STATUS.UPDATE) setDashBoardData('UPDATE', currencyCardData);
    else if (status === STATUS.DELETE) {
      setDashBoardData('DELETE', currencyCardData);
    }
  }, [currencyCardData, status]);

  const calculateCurrency = (
    currencyType: CURRENCY,
    currencyValue: string,
    rate: string
  ) => {
    if (currencyType === CURRENCY.TO_CURRENCY) {
      return (Number(currencyValue) * Number(rate)).toFixed(2);
    } else {
      return (Number(currencyValue) / Number(rate)).toFixed(2);
    }
  };

  const resetCurrencies = () => {
    setStatus(STATUS.UPDATE);
    setCurrencyCardData({
      ...currencyCardData,
      fromCurrencyValue: '',
      toCurrencyValue: '',
      updatedAt: formatDate(new Date()),
    });
  };

  const changeToCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastChanged(CURRENCY.TO_CURRENCY);
    let currentVal = e.target.value;
    if (isNum(currentVal)) {
      setStatus(STATUS.UPDATE);
      setCurrencyCardData({
        ...currencyCardData,
        toCurrencyValue: currentVal,
        fromCurrencyValue: calculateCurrency(
          CURRENCY.FROM_CURRENCY,
          currentVal,
          convertedRate
        ),
        updatedAt: formatDate(new Date()),
      });
    } else {
      resetCurrencies();
    }
  };

  const changeFromCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastChanged(CURRENCY.FROM_CURRENCY);
    let currentVal = e.target.value;
    if (isNum(currentVal)) {
      setStatus(STATUS.UPDATE);
      setCurrencyCardData({
        ...currencyCardData,
        toCurrencyValue: calculateCurrency(
          CURRENCY.TO_CURRENCY,
          currentVal,
          convertedRate
        ),
        fromCurrencyValue: currentVal,
        updatedAt: formatDate(new Date()),
      });
    } else {
      resetCurrencies();
    }
  };

  const changeFromAndToCurrency = () => {
    const { toCurrencyValue, fromCurrencyValue } = currencyCardData;
    setLoadingCard(true);
    utils
      .fetch(
        `https://api.exchangerate.host/convert?from=${currencyCardData.toCurrency}&to=${currencyCardData.fromCurrency}`,
        {
          method: API_METHODS.GET,
        }
      )
      .then((res) => {
        setStatus(STATUS.UPDATE);
        setCurrencyCardData({
          ...currencyCardData,
          convertedRate: res.data.result,
          fromCurrency: currencyCardData.toCurrency,
          toCurrency: currencyCardData.fromCurrency,
          fromCurrencyValue:
            lastChanged === CURRENCY.FROM_CURRENCY
              ? currencyCardData.fromCurrencyValue
              : calculateCurrency(
                  CURRENCY.FROM_CURRENCY,
                  toCurrencyValue,
                  res.data.result
                ),
          toCurrencyValue:
            lastChanged === CURRENCY.TO_CURRENCY
              ? currencyCardData.toCurrencyValue
              : calculateCurrency(
                  CURRENCY.TO_CURRENCY,
                  fromCurrencyValue,
                  res.data.result
                ),
        });
      })
      .catch((e) => {})
      .finally(() => {
        setLoadingCard(false);
      });
  };

  return (
    <div className={Styles.cardContainer}>
      {loadingCard && <Loader />}
      <Card>
        <Row>
          <Col span={4}>
            <p>{fromCurrency}</p>
            <img
              src='/bidirectionalArrow.png'
              height={'120px'}
              width={'60px'}
              alt='bidirectionalArrow'
              onClick={changeFromAndToCurrency}
            />
            <Col>{toCurrency}</Col>
          </Col>
          <Col className={Styles.currencyRate} span={4}>
            <p>{convertedRate}</p>
          </Col>
          <Col span={16}>
            <div className={Styles.iconContainer}>
              <ReloadOutlined onClick={resetCurrencies} />
              <CloseOutlined onClick={() => setStatus(STATUS.DELETE)} />
            </div>
            <Input
              className={Styles.inputWrapper}
              value={currencyCardData.fromCurrencyValue}
              onChange={changeFromCurrency}
            ></Input>
            <Input
              className={Styles.inputWrapper}
              value={currencyCardData.toCurrencyValue}
              onChange={changeToCurrency}
            ></Input>
            <p className={Styles.spanUpdated}>Updated At</p>
            <p className={Styles.updatedAtText}>{updatedAt}</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default CustomCard;
