import {
  IS_LOADING,
  IS_NOT_LOADING,
  UPDATE_DATA,
  UPDATE_DISPLAY_LENGTH,
  UPDATE_PAGE
} from "../actions/tableActions";

export interface TableState<TableData = any> {
  data: TableData[];
  page: number;
  displayLength: number;
  isLoading: boolean;
}

export default function tableReducer(state: any, action: any): TableState {
  switch(action.type) {
    case UPDATE_DATA:
      return { ...state, data: action.value };
    case UPDATE_PAGE:
      return { ...state, page: action.value };
    case UPDATE_DISPLAY_LENGTH:
      return { ...state, displayLength: action.value };
    case IS_LOADING:
      return { ...state, isLoading: true };
    case IS_NOT_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
