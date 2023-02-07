import { render } from '@testing-library/react';
import Dashboard from '..';
import {
  allTextPresentInDOMByText,
  AppContextVAlue,
  checkElementNotPresentInDomByTestId,
  checkElementPresentInDomByTestId,
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
  },
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
  test('Dashboard', async () => {
    await render(
      <RenderDashBoard currencyConvertorCards={mockCurrencyCards} />
    );
    await allTextPresentInDOMByText('0.012363', 2);
    await clickElementByTestId('updatedAt');
    await checkElementPresentInDomByTestId('rowContainer');
  });

  test('Dashboard no data', async () => {
    await render(<RenderDashBoard currencyConvertorCards={[]} />);
    await checkElementNotPresentInDomByTestId('rowContainer');
    await checkElementPresentInDomByTestId('noData');
  });
});
