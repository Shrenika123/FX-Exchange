import moment from 'moment';
import { Item } from 'rc-menu';
import { IDataForModal, SORT_FIELDS, SORT_TYPES } from '../interface';
import { currencyTypes } from './constant';

export const formatDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const isNum = (value: string) => {
  return /\d/.test(value);
};

export const sortDate = (time1: string, time2: string) => {
  return new Date(time1).getTime() - new Date(time2).getTime();
};

export const getCurrencyOptions = () => {
  return currencyTypes.map((item: string) => {
    return { label: item, value: item };
  });
};

export const sortingFunctionality = (
  order: SORT_TYPES,
  type: SORT_FIELDS,
  data: IDataForModal[]
) => {
  switch (type) {
    case SORT_FIELDS.UPDATED_AT:
      return data.sort((item1, item2) =>
        sortDate(
          order === SORT_TYPES.ASC ? item1.updatedAt : item2.updatedAt,
          order === SORT_TYPES.ASC ? item2.updatedAt : item1.updatedAt
        )
      );
    case SORT_FIELDS.RATE:
      return data.sort((item1, item2) => {
        const rate1: string =
          order === SORT_TYPES.ASC ? item1.convertedRate : item2.convertedRate;
        const rate2 =
          order === SORT_TYPES.ASC ? item2.convertedRate : item1.convertedRate;
        return Number(rate1) - Number(rate2);
      });
    case SORT_FIELDS.ALPHABETICALLY:
      return data
        .sort((item1, item2) => {
          const alphabet1: string =
            order === SORT_TYPES.ASC ? item1.fromCurrency : item2.fromCurrency;
          const alphabet2: string =
            order === SORT_TYPES.ASC ? item2.fromCurrency : item1.fromCurrency;
          return alphabet1 > alphabet2 ? 1 : -1;
        })
        .sort((item1, item2) => {
          return order === SORT_TYPES.ASC
            ? item1.fromCurrency > item2.toCurrency
              ? 1
              : -1
            : item1.fromCurrency < item2.toCurrency
            ? 1
            : -1;
        });
    default:
      return data.sort((item1, item2) =>
        sortDate(
          order === SORT_TYPES.ASC ? item1.createdAt : item2.createdAt,
          order === SORT_TYPES.ASC ? item2.createdAt : item1.createdAt
        )
      );
  }
};