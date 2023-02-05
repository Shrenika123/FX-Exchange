import Axios from 'axios';
import { API_METHODS } from '../interface';

interface IAPIOptions<dataType> {
  method?: API_METHODS;
  data?: dataType;
  baseUrl?: string;
  headers?: any;
}

const utils = {
  fetch: <dataType>(
    url: string,
    options?: IAPIOptions<dataType>
  ): Promise<any> => {
    return Axios({
      method: options?.method,
      url: url,
      data: options?.data,
    });
  },
};

export default utils;
