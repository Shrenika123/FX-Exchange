import moment from 'moment';

export const formatDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const isNum = (value: string) => {
  return /\d/.test(value);
};
