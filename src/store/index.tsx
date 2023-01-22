import {
  useState,
  createContext,
  useMemo,
  useContext,
  useReducer,
} from 'react';
import { ActionType, IDataForModal } from '../interface';
import { counterReducer } from './reducer';

const AppContext = createContext({
  loading: false,
  error: false,
  currencyConvertorCards: [] as IDataForModal[],
  setLoading: (_loading: boolean) => {},
  setError: (_error: boolean) => {},
  setDashBoardData: (_type: ActionType, _payload: IDataForModal) => {},
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

  const setDashBoardData = (type: ActionType, payload: IDataForModal) => {
    setCurrencyConvertorCards({ type: type, payload: payload });
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
        }),
        [error, loading, currencyConvertorCards, currencyConvertorCards]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
