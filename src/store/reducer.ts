import { sortDate } from '../common/utils';
import { Action, IDataForModal } from '../interface';

const updateTheArray = (data: IDataForModal[], state: IDataForModal) => {
  const index = data.findIndex((item) => item.id === state.id);
  return [...data.slice(0, index), state, ...data.slice(index + 1)];
};

export function currencyCardsReducer(state: IDataForModal[], action: Action) {
  const { type, payload, completeState } = action;
  switch (type) {
    case 'ADD': {
      return [
        ...[...state, payload].sort((item1, item2) =>
          sortDate(item2.createdAt, item1.createdAt)
        ),
      ];
    }
    case 'DELETE': {
      return [...state.filter((item) => item.id !== payload.id)];
    }
    case 'UPDATE': {
      return updateTheArray(state, payload);
    }
    case 'DELETE_ALL': {
      return [];
    }
    case 'SET_COMPLETE_DATA': {
      return [...completeState!];
    }
    default:
      return state;
  }
}
