export interface IDataForModal {
  fromCurrency: string;
  toCurrency: string;
  updatedAt?: Date;
  id: string;
  convertedRate: string;
}

export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
