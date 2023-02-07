import { Button, Col, FloatButton, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import utils from '../../API/utils';
import {
  API_METHODS,
  IDataForModal,
  SORT_FIELDS,
  SORT_TYPES,
} from '../../interface';
import ModalForm, { IFormValue } from './organisms/modalForm';
import { nanoid } from 'nanoid';
import Card from './organisms/Card';
import Styles from './index.module.scss';
import { formatDate, sortingFunctionality } from '../../common/utils';
import { useAppContext } from '../../store';
import SortButton from '../../common/atoms/SortButton';
import { labels } from '../../common/constant';

const Dashboard: React.FC = () => {
  const {
    setDashBoardData,
    currencyConvertorCards,
    setLoading,
    setDeleteAll,
    setAlertMessage,
  } = useAppContext();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (currencyConvertorCards.length > 0) {
      setDeleteAll(false);
    } else {
      setDeleteAll(true);
    }
  }, [currencyConvertorCards]);

  const sortingField = (order: SORT_TYPES, type: SORT_FIELDS) => {
    setDashBoardData('SET_COMPLETE_DATA', {} as IDataForModal, [
      ...sortingFunctionality(order, type, currencyConvertorCards),
    ]);
  };

  const onClickClearAll = () => {
    setDashBoardData('DELETE_ALL', {} as IDataForModal);
    setAlertMessage({
      type: 'success',
      message: `${labels.allCardsDeletedSuccessfully}`,
    });
  };

  const checkIfCardPresent = (currencies: IFormValue) => {
    const duplicateCard = currencyConvertorCards
      .filter(
        (item) =>
          currencies.fromCurrency === item.fromCurrency ||
          currencies.fromCurrency === item.toCurrency
      )
      .filter(
        (item) =>
          currencies.toCurrency === item.fromCurrency ||
          currencies.toCurrency === item.toCurrency
      );
    return duplicateCard.length > 0;
  };

  const getCurrencyRate = async (currencies: IFormValue) => {
    if (checkIfCardPresent(currencies)) {
      setAlertMessage({
        type: 'info',
        message: `${labels.duplicateCard}`,
      });
    } else {
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
          setAlertMessage({
            type: 'success',
            message: `${labels.cardAddedSuccessfully}`,
          });
        })
        .catch((e) => {
          setAlertMessage({
            type: 'error',
            message: `${labels.somethingWentWrong}`,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
    setVisible(false);
  };

  return (
    <>
      {currencyConvertorCards.length > 0 && (
        <div className={Styles.buttonContainer} data-testid='buttonContainer'>
          <div className={Styles.buttonLeftContainer}>
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingField(SORT_TYPES.ASC, SORT_FIELDS.CREATED_AT);
              }}
              onDecClick={() => {
                sortingField(SORT_TYPES.DSC, SORT_FIELDS.CREATED_AT);
              }}
              title={labels.SortByCreated}
              testId='createdAt'
            />
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingField(SORT_TYPES.ASC, SORT_FIELDS.UPDATED_AT);
              }}
              onDecClick={() => {
                sortingField(SORT_TYPES.DSC, SORT_FIELDS.UPDATED_AT);
              }}
              title={labels.SortByUpdated}
              testId='updatedAt'
            />
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingField(SORT_TYPES.ASC, SORT_FIELDS.RATE);
              }}
              onDecClick={() => {
                sortingField(SORT_TYPES.DSC, SORT_FIELDS.RATE);
              }}
              title={labels.SortByRate}
              testId='rate'
            />
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingField(SORT_TYPES.ASC, SORT_FIELDS.ALPHABETICALLY);
              }}
              onDecClick={() => {
                sortingField(SORT_TYPES.DSC, SORT_FIELDS.ALPHABETICALLY);
              }}
              title={labels.SortAlphabetically}
              testId='rate'
            />
          </div>
          <Button
            onClick={onClickClearAll}
            className={Styles.clearButton}
            data-testid='clearAll'
          >
            {labels.ClearAll}
          </Button>
        </div>
      )}
      <FloatButton
        icon={<PlusOutlined height={'3rem'} />}
        type='primary'
        onClick={() => setVisible(!visible)}
        className={Styles.floatButton}
        data-testid='floatBotton'
      />
      <ModalForm
        visible={visible}
        onSubmit={(data: IFormValue) => {
          getCurrencyRate(data);
        }}
        onCancel={() => setVisible(false)}
      />
      {currencyConvertorCards.length === 0 && (
        <>
          <img
            src='./no-data.png'
            className={Styles.noData}
            data-testid='noData'
          />
          <p>{labels.noCardPresent}</p>
        </>
      )}
      {currencyConvertorCards.length > 0 && (
        <Row
          className={Styles.rowContainer}
          gutter={16}
          data-testid='rowContainer'
        >
          {currencyConvertorCards.map((item) => (
            <Col
              key={item.id}
              span={8}
              className={Styles.CardContainer}
              data-testid='colContainer'
            >
              <Card data={item} data-testid='cardContainerWrapper' />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
export default Dashboard;
