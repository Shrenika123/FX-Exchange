import { Card, Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { API_METHODS, IDataForModal } from '../../interface';
import { ReloadOutlined, CloseOutlined } from '@ant-design/icons';
import Styles from './card.module.scss';
import { formatDate, isNum, sortingFunctionality } from '../../common/utils';
import { useAppContext } from '../../store';
import utils from '../../API/utils';
import Loader from '../../common/atoms/Loader';
import { labels } from '../../common/constant';
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
  const {
    setDashBoardData,
    setAlertMessage,
    sortDetails,
    currencyConvertorCards,
    setSortDetails,
  } = useAppContext();
  const [loadingCard, setLoadingCard] = useState(false);
  useEffect(() => {
    if (status === STATUS.UPDATE) {
      setDashBoardData('UPDATE', currencyCardData);
    } else if (status === STATUS.DELETE) {
      setDashBoardData('DELETE', currencyCardData);
      setAlertMessage({
        type: 'success',
        message: 'card deleted Successfully!!',
      });
    }
    return () => {
      setStatus(STATUS.NONE);
    };
  }, [status]);

  useEffect(() => {
    if (status === STATUS.NONE) {
      setDashBoardData('SET_COMPLETE_DATA', {} as IDataForModal, [
        ...sortingFunctionality(
          sortDetails.type,
          sortDetails.field,
          currencyConvertorCards
        ),
      ]);
    }
  }, [status]);

  const calculateCurrency = (
    currencyType: CURRENCY,
    currencyValue: string,
    rate: string
  ) => {
    if (currencyValue.length === 0) {
      return currencyValue;
    } else {
      if (currencyType === CURRENCY.TO_CURRENCY) {
        return (Number(currencyValue) * Number(rate)).toFixed(2);
      } else {
        return (Number(currencyValue) / Number(rate)).toFixed(2);
      }
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

  const changeFromAndToCurrency = (
    fromCurrency: string,
    toCurrency: string,
    reload = false
  ) => {
    const { toCurrencyValue, fromCurrencyValue } = currencyCardData;
    console.log(fromCurrency, toCurrency);
    setLoadingCard(true);
    utils
      .fetch(
        `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`,
        {
          method: API_METHODS.GET,
        }
      )
      .then((res) => {
        setStatus(STATUS.UPDATE);
        if (!reload) {
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
            updatedAt: formatDate(new Date()),
          });
        } else {
          setCurrencyCardData({
            ...currencyCardData,
            convertedRate: res.data.result,
            fromCurrencyValue: '',
            toCurrencyValue: '',
            updatedAt: formatDate(new Date()),
          });
        }
      })
      .catch(() => {
        setAlertMessage({
          type: 'error',
          message: `${labels.somethingWentWrong}`,
        });
      })
      .finally(() => {
        setLoadingCard(false);
      });
  };

  return (
    <div className={Styles.cardContainer}>
      <Card>
        {loadingCard && <Loader className={Styles.cardLoader} />}
        <Row>
          <Col span={4}>
            <p>{fromCurrency}</p>
            <img
              src='/bidirectionalArrow.png'
              height={'120px'}
              width={'60px'}
              alt='bidirectionalArrow'
              onClick={() =>
                changeFromAndToCurrency(
                  currencyCardData.toCurrency,
                  currencyCardData.fromCurrency
                )
              }
              className={Styles.arrowStyle}
              data-testid='convertArrow'
            />
            <Col>{toCurrency}</Col>
          </Col>
          <Col className={Styles.currencyRate} span={4}>
            <p>{convertedRate}</p>
          </Col>
          <Col span={16}>
            <div className={Styles.iconContainer}>
              <ReloadOutlined
                onClick={() =>
                  changeFromAndToCurrency(
                    currencyCardData.fromCurrency,
                    currencyCardData.toCurrency,
                    true
                  )
                }
                data-testid='reloadButton'
              />
              <CloseOutlined
                onClick={() => setStatus(STATUS.DELETE)}
                data-testid='closeButton'
              />
            </div>
            <Input
              className={Styles.inputWrapper}
              value={currencyCardData.fromCurrencyValue}
              onChange={changeFromCurrency}
              data-testid='fromCurrencyInput'
            />
            <Input
              className={Styles.inputWrapper}
              value={currencyCardData.toCurrencyValue}
              onChange={changeToCurrency}
              data-testid='toCurrencyInput'
            />
            <p className={Styles.spanUpdated}>Updated At</p>
            <p className={Styles.updatedAtText}>{updatedAt}</p>
          </Col>
        </Row>
      </Card>
    </div>
  );
};  
export default CustomCard;
