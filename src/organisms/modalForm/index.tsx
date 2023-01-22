import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';
import { currencyTypes } from '../../common/constant';
interface IProps {
  visible: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export interface IFormValue {
  fromCurrency: string;
  toCurrency: string;
}

const ModalForm: React.FC<IProps> = ({ visible, onSubmit, onCancel }) => {
  const [fromCurrency, setFromCurrency] = useState<string>('');
  const [toCurrency, setToCurrency] = useState<string>('');
  const [form] = Form.useForm();

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
        return Promise.reject('Cannot have same currency');
      }
    } else {
      return Promise.reject('Please enter correct currency Format');
    }
  };

  const onCancelModal = (event: any) => {
    event.preventDefault();
    onCancel();
    resetForm();
  };

  return (
    <Modal
      open={visible}
      title='Please Enter the Currencies'
      onOk={form.submit}
      onCancel={onCancelModal}
      maskClosable={false}
    >
      <Form form={form} layout='vertical' onFinish={handleSubmit}>
        <Form.Item
          label='From Currency'
          name='fromCurrency'
          rules={[
            {
              validator: (_, value) => validateCurrency(value),
            },
          ]}
        >
          <Input
            onInput={(e) =>
              ((e.target as HTMLInputElement).value = (
                e.target as HTMLInputElement
              ).value.toUpperCase())
            }
            onChange={(e) =>
              setFromCurrency(e.target.value.toLocaleUpperCase())
            }
          />
        </Form.Item>
        <Form.Item
          label='To Currency'
          name='toCurrency'
          rules={[
            {
              validator: (_, value) => validateCurrency(value),
            },
          ]}
        >
          <Input
            onInput={(e) =>
              ((e.target as HTMLInputElement).value = (
                e.target as HTMLInputElement
              ).value.toUpperCase())
            }
            type='textarea'
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value.toLocaleUpperCase())}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
