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

export type ActionType =
  | 'ADD'
  | 'DELETE'
  | 'UPDATE'
  | 'DELETE_ALL'
  | 'SET_COMPLETE_DATA';
export type Action = {
  type: ActionType;
  payload: IDataForModal;
  completeState?: IDataForModal[];
};

export enum SORT_TYPES {
  ASC = 'ASC',
  DSC = 'DSC',
}

export interface IAlert {
  type: 'success' | 'info' | 'warning' | 'error' | 'none';
  message: string;
}