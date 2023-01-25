import { Button, Col, FloatButton, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import utils from '../../API/utils';
import { API_METHODS, IDataForModal, SORT_TYPES } from '../../interface';
import ModalForm, { IFormValue } from '../../organisms/modalForm';
import { nanoid } from 'nanoid';
import Card from '../../organisms/Card';
import Styles from './index.module.scss';
import { formatDate, sortDate } from '../../common/utils';
import { useAppContext } from '../../store';
import SortButton from '../../common/atoms/SortButton';
import { labels } from '../../common/constant';

const enum SORT_FIELDS {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  RATE = 'RATE',
}

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

  const sortingFunctionality = (order: SORT_TYPES, type: SORT_FIELDS) => {
    switch (type) {
      case SORT_FIELDS.CREATED_AT:
        setDashBoardData('SET_COMPLETE_DATA', {} as IDataForModal, [
          ...currencyConvertorCards.sort((item1, item2) =>
            sortDate(
              order === SORT_TYPES.ASC ? item1.createdAt : item2.createdAt,
              order === SORT_TYPES.ASC ? item2.createdAt : item1.createdAt
            )
          ),
        ]);
        break;
      case SORT_FIELDS.UPDATED_AT:
        setDashBoardData('SET_COMPLETE_DATA', {} as IDataForModal, [
          ...currencyConvertorCards.sort((item1, item2) =>
            sortDate(
              order === SORT_TYPES.ASC ? item1.updatedAt : item2.updatedAt,
              order === SORT_TYPES.ASC ? item2.updatedAt : item1.updatedAt
            )
          ),
        ]);
        break;
      case SORT_FIELDS.RATE:
        setDashBoardData('SET_COMPLETE_DATA', {} as IDataForModal, [
          ...currencyConvertorCards.sort((item1, item2) => {
            const rate1: string =
              order === SORT_TYPES.ASC
                ? item1.convertedRate
                : item2.convertedRate;
            const rate2 =
              order === SORT_TYPES.ASC
                ? item2.convertedRate
                : item1.convertedRate;
            return Number(rate1) - Number(rate2);
          }),
        ]);
    }
  };

  const onClickClearAll = () => {
    setDashBoardData('DELETE_ALL', {} as IDataForModal);
    setAlertMessage({
      type: 'success',
      message: `${labels.allCardsDeletedSuccessfully}`,
    });
  };

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
    await setVisible(false);
  };
  console.log(currencyConvertorCards);
  return (
    <>
      {currencyConvertorCards.length > 0 && (
        <div className={Styles.buttonContainer} data-testid='buttonContainer'>
          <div className={Styles.buttonLeftContainer}>
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingFunctionality(SORT_TYPES.ASC, SORT_FIELDS.CREATED_AT);
              }}
              onDecClick={() => {
                sortingFunctionality(SORT_TYPES.DSC, SORT_FIELDS.CREATED_AT);
              }}
              title={labels.SortByCreated}
            />
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingFunctionality(SORT_TYPES.ASC, SORT_FIELDS.UPDATED_AT);
              }}
              onDecClick={() => {
                sortingFunctionality(SORT_TYPES.DSC, SORT_FIELDS.UPDATED_AT);
              }}
              title={labels.SortByUpdated}
            />
            <SortButton
              className={Styles.sortButton}
              onAscClick={() => {
                sortingFunctionality(SORT_TYPES.ASC, SORT_FIELDS.RATE);
              }}
              onDecClick={() => {
                sortingFunctionality(SORT_TYPES.DSC, SORT_FIELDS.RATE);
              }}
              title={labels.SortByRate}
            />
          </div>
          <Button onClick={onClickClearAll} className={Styles.clearButton}>
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
          {currencyConvertorCards.length > 0 && <p>wow</p>}
        </Row>
      )}
    </>
  );
};
export default Dashboard;
