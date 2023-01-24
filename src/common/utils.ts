import moment from 'moment';

export const formatDate = (date: Date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const isNum = (value: string) => {
  return /\d/.test(value);
};


export const sortDate = (time1: string, time2: string) => {
  return new Date(time1).getTime() - new Date(time2).getTime();
};