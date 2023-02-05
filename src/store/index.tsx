import {
  useState,
  createContext,
  useMemo,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import {
  ActionType,
  IAlert,
  IDataForModal,
  ISortDetails,
  SORT_FIELDS,
  SORT_TYPES,
} from '../interface';
import { counterReducer } from './reducer';

export const AppContext = createContext({
  loading: false,
  error: false,
  deleteAll: false,
  currencyConvertorCards: [] as IDataForModal[],
  setLoading: (_loading: boolean) => {},
  setError: (_error: boolean) => {},
  setDashBoardData: (
    _type: ActionType,
    _payload: IDataForModal,
    _completeState?: IDataForModal[]
  ) => {},
  setDeleteAll: (_deleteAll: boolean) => {},
  setAlertMessage: (_alertMessage: IAlert) => {},
  alertMessage: { type: '', message: '' },
  setSortDetails: (_sortDetails: ISortDetails) => {},
  sortDetails: {
    type: SORT_TYPES.ASC,
    field: SORT_FIELDS.CREATED_AT,
  },
});

export const WithAppContext = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [currencyConvertorCards, setCurrencyConvertorCards] = useReducer(
    counterReducer,
    []
  );
  const [deleteAll, setDeleteAll] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<IAlert>({
    type: 'success',
    message: '',
  });
  const [sortDetails, setSortDetails] = useState<ISortDetails>({
    type: SORT_TYPES.DSC,
    field: SORT_FIELDS.CREATED_AT,
  });

  useEffect(() => {
    localStorage.setItem('DELETE_ALL', JSON.stringify(deleteAll));
  }, [deleteAll]);

  useEffect(() => {
    if (currencyConvertorCards.length > 0 || deleteAll)
      localStorage.setItem(
        'DASHBOARD_STATE',
        JSON.stringify(currencyConvertorCards)
      );
  }, [currencyConvertorCards, deleteAll]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('DASHBOARD_STATE') || '[]');
    if (items) {
      setCurrencyConvertorCards({
        type: 'SET_COMPLETE_DATA',
        payload: {} as IDataForModal,
        completeState: items,
      });
    }
  }, []);

  const setDashBoardData = (
    type: ActionType,
    payload: IDataForModal,
    completeData?: IDataForModal[]
  ) => {
    setCurrencyConvertorCards({
      type: type,
      payload: payload,
      completeState: completeData,
    });
  };

  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          setError,
          setLoading,
          error,
          loading,
          currencyConvertorCards,
          setDashBoardData,
          setDeleteAll,
          deleteAll,
          setAlertMessage,
          alertMessage,
          sortDetails,
          setSortDetails,
        }),
        [
          error,
          loading,
          currencyConvertorCards,
          deleteAll,
          alertMessage,
          sortDetails,
        ]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
