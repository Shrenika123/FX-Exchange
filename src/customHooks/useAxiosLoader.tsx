import axios from 'axios';
// import React, { useEffect, useState } from 'react';

import { useCallback, useEffect, useMemo, useState } from 'react';

// export const useAxiosLoader = () => {
//   const [counter, setCounter] = useState(0);
//   useEffect(() => {
//     const inc = (mod: number) => setCounter((c) => c + mod);

//     const handleRequest = (config: any) => (inc(1), config);
//     const handleResponse = (response: any) => (inc(-1), response);
//     const handleError = (error: any) => (inc(-1), Promise.reject(error));

//     // add request interceptors
//     const reqInterceptor = axios.interceptors.request.use(
//       handleRequest,
//       handleError
//     );
//     // add response interceptors
//     const resInterceptor = axios.interceptors.response.use(
//       handleResponse,
//       handleError
//     );
//     return () => {
//       // remove all intercepts when done
//       axios.interceptors.request.eject(reqInterceptor);
//       axios.interceptors.response.eject(resInterceptor);
//     };
//   }, []);

//   return counter > 0;
// };

const ax = axios.create(); // export this and use it in all your components

export const useAxiosLoader = () => {
  const [counter, setCounter] = useState(0);

  const inc = useCallback(
    () => setCounter((counter) => counter + 1),
    [setCounter]
  ); // add to counter
  const dec = useCallback(
    () => setCounter((counter) => counter - 1),
    [setCounter]
  ); // remove from counter

  const interceptors = useMemo(
    () => ({
      request: (config: any) => {
        inc();
        return config;
      },
      response: (response: any) => {
        dec();
        return response;
      },
      error: (error: any) => {
        dec();
        return Promise.reject(error);
      },
    }),
    [inc, dec]
  ); // create the interceptors

  useEffect(() => {
    // add request interceptors
    const r = ax.interceptors.request.use(
      interceptors.request,
      interceptors.error
    );
    // add response interceptors
    const r1 = ax.interceptors.response.use(
      interceptors.response,
      interceptors.error
    );
    return () => {
      // remove all intercepts when done
      ax.interceptors.request.eject(r);
      ax.interceptors.request.eject(r1);
    };
  }, [interceptors]);

  return [counter > 0];
};
