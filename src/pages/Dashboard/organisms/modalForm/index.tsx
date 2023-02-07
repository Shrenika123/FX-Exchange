import React, { useState } from 'react';
import { Modal, Form, AutoComplete } from 'antd';
import { currencyTypes, labels } from '../../../../common/constant';
import { useAppContext } from '../../../../store';
import { getCurrencyOptions } from '../../../../common/utils';
interface IProps {
  visible: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export interface IFormValue {
  fromCurrency: string;
  toCurrency: string;
}

export interface IOptions {
  label: string;
  value: string;
}

const ModalForm: React.FC<IProps> = ({ visible, onSubmit, onCancel }) => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [fromCurrencyOptions, setFromCurrencyOptions] = useState<IOptions[]>(
    getCurrencyOptions()
  );
  const [toCurrencyOptions, setToCurrencyOptions] = useState<IOptions[]>(
    getCurrencyOptions()
  );

  const [form] = Form.useForm();
  const { loading } = useAppContext();
  const resetForm = () => {
    form.resetFields();
    setFromCurrency('');
    setToCurrency('');
  };

  const handleSubmit = (values: IFormValue) => {
    onSubmit(values);
    resetForm();
  };

  const validateCurrency = (value: any) => {
    if (value && currencyTypes.includes(value as string)) {
      if (fromCurrency !== toCurrency) {
        return Promise.resolve();
      } else {
        return Promise.reject(labels.SameCurrencyError);
      }
    } else {
      return Promise.reject(labels.CurrencyError);
    }
  };

  const onCancelModal = (event: any) => {
    event.preventDefault();
    onCancel();
    resetForm();
  };

  const onSearchCurrency = (data: string, fromCurrency = true) => {
    const currencies = getCurrencyOptions();
    let filteredCurrencies = currencies.filter((item) =>
      item.value.includes(data)
    );
    fromCurrency
      ? setFromCurrencyOptions(filteredCurrencies ?? currencies)
      : setToCurrencyOptions(filteredCurrencies ?? currencies);
  };

  return (
    <Modal
      open={visible}
      title={labels.EnterCurrency}
      onOk={form.submit}
      onCancel={onCancelModal}
      maskClosable={false}
      confirmLoading={loading}
      closable={false}
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label={labels.FromCurrency}
          name='fromCurrency'
          rules={[
            {
              validator: (_, value) => validateCurrency(value),
            },
          ]}
        >
          <AutoComplete
            options={fromCurrencyOptions}
            onSelect={(data) => setFromCurrency(data)}
            placeholder='Please Select From Currency'
            onSearch={(data) => onSearchCurrency(data.toLocaleUpperCase())}
          />
        </Form.Item>
        <Form.Item
          label={labels.ToCurrency}
          name='toCurrency'
          rules={[
            {
              validator: (_, value) => validateCurrency(value),
            },
          ]}
        >
          <AutoComplete
            options={toCurrencyOptions}
            onSelect={(data) => setToCurrency(data)}
            onSearch={(data) =>
              onSearchCurrency(data.toLocaleUpperCase(), false)
            }
            placeholder='Please Select To Currency'
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
