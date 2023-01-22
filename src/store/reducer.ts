import { IDataForModal } from '../interface';

type ActionType =
  | 'ADD'
  | 'DELETE'
  | 'UPDATE'
  | 'DELETE_ALL'
  | 'SET_COMPLETE_DATA';
type Action = {
  type: ActionType;
  payload: IDataForModal;
  completeState?: IDataForModal[];
};

const updateTheArray = (data: IDataForModal[], state: IDataForModal) => {
  const index = data.findIndex((item) => item.id === state.id);
  return [...data.slice(0, index), state, ...data.slice(index + 1)];
};

export function counterReducer(state: IDataForModal[], action: Action) {
  const { type, payload, completeState } = action;
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
    case 'SET_COMPLETE_DATA': {
      return [...completeState!];
    }
    default:
      return state;
  }
}
