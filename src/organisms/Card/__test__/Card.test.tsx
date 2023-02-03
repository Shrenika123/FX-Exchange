import { render, cleanup, prettyDOM, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import Card from '..';
import {
  allTextPresentInDOMByText,
  AppContextVAlue,
  changeInput,
  checkCountOfElementsPresent,
  checkElementPresentInDomByTestId,
  checkInputValue,
  clickElementByTestId,
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
    fromCurrency: 'INR',
    fromCurrencyValue: '',
    id: 'iSVsScmZFKkWuLvyKL_dh1',
    toCurrency: 'USD',
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
const RenderCard = () => {
    return (
      <WithMockContext
        value={{
                ...AppContextVAlue,
            loading:false
        }}
      >
        <Card data={mockCardData} />
      </WithMockContext>
    );
  };

axios.get = jest.fn()

const mockCardData:IDataForModal={
    convertedRate: '0.012363',
    createdAt: '2023-01-24 23:35:31',
    fromCurrency: 'INR',
    fromCurrencyValue: '',
    id: 'iSVsScmZFKkWuLvyKL_dh1',
    toCurrency: 'USD',
    toCurrencyValue: '',
    updatedAt: '2023-01-27 23:35:00',
  }

describe('Card Component', () => {
    beforeAll(() => {
        (axios.get as jest.Mock).mockResolvedValue({
            data: {
                result: {
                    rate: 1.0123
                }
            }
        })
    });
    test('Card Component', async () => {
        

    render(<RenderCard/>)
    await changeInput('fromCurrencyInput', '2');
    await checkInputValue('toCurrencyInput', '0.02');
    await changeInput('toCurrencyInput', '3');
    await checkInputValue('fromCurrencyInput', '242.66');
    act(() => {
        /* fire events that update state */
         clickElementByTestId('convertArrow')
    });
  });
});
