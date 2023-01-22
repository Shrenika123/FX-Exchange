export interface IDataForModal {
  fromCurrency: string;
  toCurrency: string;
  updatedAt: string;
  id: string;
  convertedRate: string;
  createdAt: string;
  fromCurrencyValue: string;
  toCurrencyValue: string;
}

export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type ActionType = 'ADD' | 'DELETE' | 'UPDATE' | 'DELETE_ALL';
export type Action = { type: ActionType; payload: IDataForModal };