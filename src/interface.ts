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

export interface IAppContext {
  loading: boolean;
  error: boolean;
  deleteAll: boolean;
  alertMessage: IAlert;
  currencyConvertorCards: IDataForModal[];
  setLoading: (_loading: boolean) => void;
  setError: (_error: boolean) => void;
  setDashBoardData: (
    _type: ActionType,
    _payload: IDataForModal,
    _completeState?: IDataForModal[]
  ) => void;
  setDeleteAll: (_deleteAll: boolean) => void;
  setAlertMessage: (_alertMessage: IAlert) => void;
  setSortDetails: (_sortDetails: ISortDetails) => void;
  sortDetails: ISortDetails;
}

export const enum SORT_FIELDS {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT',
  RATE = 'RATE',
  ALPHABETICALLY = 'ALPHABETICALLY',
}

export interface ISortDetails {
  field: SORT_FIELDS;
  type: SORT_TYPES;
}
