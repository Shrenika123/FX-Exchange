import { render, cleanup, prettyDOM, waitFor, act } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import Card from '..';
import utils from '../../../API/utils';
import {
  allTextPresentInDOMByText,
  AppContextVAlue,
  changeInput,
  checkCountOfElementsPresent,
  checkElementNotPresentInDomByTestId,
  checkElementPresentInDomByTestId,
  checkInputValue,
  clickElementByTestId,
  textNotPresentInDOM,
  textPresentInDOM,
  WithMockContext,
} from '../../../common/testHelper';
import { IDataForModal } from '../../../interface';

beforeAll(() => {
  global.matchMedia =
    global.matchMedia ||
    function () {
      return {
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    };
});
const axiosMock = axios as unknown;
const mockCurrencyCards: IDataForModal[] = [
  {
    convertedRate: '0.012363',
    createdAt: '2023-01-26 23:35:31',
    fromCurrency: 'INR',
    fromCurrencyValue: '',
    id: 'iSVsScmZFKkWuLvyKL_dh',
    toCurrency: 'USD',
    toCurrencyValue: '',
    updatedAt: '2023-01-26 23:35:31',
  },
  {
    convertedRate: '0.012363',
    createdAt: '2023-01-24 23:35:31',
    fromCurrency: 'ZAR',
    fromCurrencyValue: '',
    id: 'iSVsScmZFKkWuLvyKL_dh1',
    toCurrency: 'EUR',
    toCurrencyValue: '',
    updatedAt: '2023-01-27 23:35:00',
  }
];

// const RenderDashBoard = ({
//   currencyConvertorCards,
// }: {
//   currencyConvertorCards: IDataForModal[];
// }) => {
//   return (
//     <WithMockContext
//       value={{
//         ...AppContextVAlue,
//         currencyConvertorCards: currencyConvertorCards,
//       }}
//     >
//       <Dashboard />
//     </WithMockContext>
//   );
// };
interface AxiosMock extends AxiosStatic {
  mockResolvedValue: Function
  mockRejectedValue: Function
}


jest.mock('axios')
const mockAxios = axios as AxiosMock

const mockCardData:IDataForModal={
  convertedRate: '0.012363',
  createdAt: '2023-01-24 23:35:31',
  fromCurrency: 'ZAR',
  fromCurrencyValue: '',
  id: 'iSVsScmZFKkWuLvyKL_dh1',
  toCurrency: 'EUR',
  toCurrencyValue: '',
  updatedAt: '2023-01-27 23:35:00',
}

const RenderCard = () => {
    return (
      <WithMockContext
        value={{
          ...AppContextVAlue,
          currencyConvertorCards: mockCurrencyCards, 
            loading:false
        }}
      >
        <Card data={mockCardData} />
      </WithMockContext>
    );
  };

axios.get = jest.fn()

describe('Card Component', () => {
  beforeAll(() => {
      utils.fetch = jest.fn(() => Promise.resolve({
        data: {
          result: {
          rate:1.203
        }
      }}));

    })
    test('Card Component while changing input and deleting the card', async () => {
    render(<RenderCard/>)
    await changeInput('fromCurrencyInput', '2');
    await checkInputValue('toCurrencyInput', '0.02');
    await changeInput('toCurrencyInput', '3');
    await checkInputValue('fromCurrencyInput', '242.66');
    await changeInput('fromCurrencyInput', '3');
    await checkInputValue('toCurrencyInput', '0.04');
      // eslint-disable-next-line testing-library/await-async-utils
    waitFor(async () => {
        await clickElementByTestId('closeButton');
      await textNotPresentInDOM('ZAR');
    })
    });
  
    test.skip('Card Component while reloading', async () => {
      await render(<RenderCard/>)
        // eslint-disable-next-line testing-library/await-async-utils
     await waitFor(async () => {
          await clickElementByTestId('reloadButton');
          await checkInputValue('fromCurrencyInput', '');
        })
    });
});
