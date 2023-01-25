import {
  useState,
  createContext,
  useMemo,
  useContext,
  useReducer,
  useEffect,
} from 'react';
import { ActionType, IAlert, IDataForModal } from '../interface';
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
        }),
        [error, loading, currencyConvertorCards, deleteAll, alertMessage]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
