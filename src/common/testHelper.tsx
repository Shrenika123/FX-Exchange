import { IAppContext, IDataForModal } from '../interface';
import { AppContext } from '../store';
import { fireEvent, screen } from '@testing-library/react';

export const WithMockContext = ({
  children,
  value,
}: {
  children: JSX.Element;
  value: IAppContext;
}): JSX.Element => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const AppContextVAlue: IAppContext = {
  loading: false,
  error: false,
  deleteAll: false,
  alertMessage: { type: 'none', message: '' },
  currencyConvertorCards: {} as IDataForModal[],
  setLoading: jest.fn,
  setAlertMessage: jest.fn,
  setDashBoardData: jest.fn,
  setDeleteAll: jest.fn,
  setError: jest.fn,
};

export const checkElementPresentInDomByTestId = async (testId: string) => {
  const element = await screen.findByTestId(testId);
  expect(element).toBeInTheDocument();
};

export const textNotPresentInDOM = async (text: string) => {
  const elementText = screen.queryByText(text);
  expect(elementText).not.toBeInTheDocument();
};

export const textPresentInDOM = async (text: string) => {
  const element = screen.queryByText(text);
  expect(element).toBeInTheDocument();
};

export const allTextPresentInDOMByText = async (text: string,count:number) => {
  const element = screen.queryAllByText(text);
  expect(element).toHaveLength(count)
};

export const checkCountOfElementsPresent = async (
  testId: string,
  count: number
) => {
  const elemntCount = await screen.findAllByTestId(testId);
  expect(elemntCount).toHaveLength(count);
};

export const checkElementNotPresentInDomByTestId = async (testId: string) => {
  const element = screen.queryByTestId(testId);
  expect(element).toBeNull();
};

export const clickElementByTestId = async (testId: string) => {
  const element = screen.findByTestId(testId);
  (await element).click();
};


export const changeInput = async (testId:string,value:string) => {
  const input = screen.getByTestId(testId)
  await fireEvent.change(input, { target: { value: value } })
}


export const checkInputValue = async (testId:string,value:string) => {
  const input = screen.getByTestId(testId)
  expect(input).toHaveValue(value)
  
}
