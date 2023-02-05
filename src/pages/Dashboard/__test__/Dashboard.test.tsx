import { render, cleanup, prettyDOM, waitFor } from '@testing-library/react';
import Dashboard from '..';
import {
  allTextPresentInDOMByText,
  AppContextVAlue,
  clickElementByTestId,
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

const RenderDashBoard = ({
  currencyConvertorCards,
}: {
  currencyConvertorCards: IDataForModal[];
}) => {
  return (
    <WithMockContext
      value={{
        ...AppContextVAlue,
        currencyConvertorCards: currencyConvertorCards,
      }}
    >
      <Dashboard />
    </WithMockContext>
  );
};

describe('Dashboard Page', () => {
  // axiosMock.mockResolvedValue(mockApi);
  test('Dasboard', async () => {
    // eslint-disable-next-line testing-library/render-result-naming-convention
    render(
      <RenderDashBoard currencyConvertorCards={mockCurrencyCards} />
    );
    // eslint-disable-next-line testing-library/no-debugging-utils
    // screen.debug(undefined, 300000)  
    // let matchs = screen.queryAllByText('0.012363')
    // expect(matchs).toHaveLength(2);
    // textPresentInDOM('0.012363sdsd')
    await allTextPresentInDOMByText('0.012363', 2)
    await clickElementByTestId('updatedAt');
  });
});
