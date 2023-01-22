import { IDataForModal } from '../interface';

type ActionType = 'ADD' | 'DELETE' | 'UPDATE' | 'DELETE_ALL';
type Action = { type: ActionType; payload: IDataForModal };

const updateTheArray = (data: IDataForModal[], state: IDataForModal) => {
  const index = data.findIndex((item) => item.id === state.id);
  return [...data.slice(0, index), state, ...data.slice(index + 1)];
};

export function counterReducer(state: IDataForModal[], action: Action) {
  const { type, payload } = action;
  switch (type) {
    case 'ADD': {
      return [...state, payload];
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
    default:
      return state;
  }
}
