import { useState, createContext, useMemo, useContext } from 'react';

const AppContext = createContext({
  loading: false,
  error: false,
  setLoading: (_loading: boolean) => {},
  setError: (_error: boolean) => {},
});

export const WithAppContext = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  return (
    <AppContext.Provider
      value={useMemo(
        () => ({
          setError,
          setLoading,
          error,
          loading,
        }),
        [error, loading]
      )}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
