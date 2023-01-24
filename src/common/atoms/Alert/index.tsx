import { Alert, AlertProps } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useAppContext } from '../../../store';
import Styles from './index.module.scss';

const AlertComponent: React.FC = () => {
  const { setAlertMessage, alertMessage } = useAppContext();
  const alertRef = useRef<HTMLDivElement>(null);
  const { type, message } = alertMessage;
  const handleClose = () => {
    setAlertMessage({ type: 'none', message: '' });
  };

  useEffect(() => {
    if (message.length > 0) {
      alertRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [message]);

  useEffect(() => {
    const timeId = setTimeout(() => {
      setAlertMessage({ type: 'none', message: '' });
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [message]);

  return (
    <>
      {alertMessage.message.length > 0 && (
        <div className={Styles.alertContainer} ref={alertRef}>
          <Alert
            message={message}
            type={type as AlertProps['type']}
            showIcon
            closable
            afterClose={handleClose}
          />
        </div>
      )}
    </>
  );
};
export default AlertComponent;
