import { COMPLETE_ONE_TODO, DELETE_ONE_TODO, LOAD_ALL_DATA, PENDING_ONE_TODO, SAVE_TODOS, UPDATE_ONE_TODO } from './action';
import { onSetAllDataToLocalStorage } from './storage.local';

export const initialState = {
    allTodos: [],
    isLoading: true
}
export default (state = initialState, action: any) => {
    switch (action.type) {
        case LOAD_ALL_DATA:
            onSetAllDataToLocalStorage({
                ...state,
                ...action.data,
            })
            return {
                ...state,
                ...action.data,
                isLoading: false
            }
        case SAVE_TODOS:
            onSetAllDataToLocalStorage({
                ...state,
                allTodos: action.data
            })
            return {
                ...state,
                allTodos: action.data,
                isLoading: false
            }
        case DELETE_ONE_TODO:
            const filteredTodos = state.allTodos.filter((item: any) => item.id !== action.id);
            onSetAllDataToLocalStorage({
                ...state,
                allTodos: filteredTodos
            })
            return {
                ...state,
                allTodos: filteredTodos,
                isLoading: false
            }
        case COMPLETE_ONE_TODO:
            const completeUpdatedList = state.allTodos.map((item: any) => {
                if (item.id == action.id) {
                    return {
                        ...item,
                        status: "COMPLETED"
                    }
                }
                return item;
            });
            onSetAllDataToLocalStorage({
                ...state,
                allTodos: completeUpdatedList
            })
            return {
                ...state,
                allTodos: completeUpdatedList,
                isLoading: false
            }
        case PENDING_ONE_TODO:
            const pendingUpdatedList = state.allTodos.map((item: any) => {
                if (item.id == action.id) {
                    return {
                        ...item,
                        status: "PENDING"
                    }
                }
                return item;
            });
            onSetAllDataToLocalStorage({
                ...state,
                allTodos: pendingUpdatedList
            })
            return {
                ...state,
                allTodos: pendingUpdatedList,
                isLoading: false
            }
        case UPDATE_ONE_TODO:
            const updatedList = state.allTodos.map((item: any) => {
                if (item?.id == action?.data?.id) {
                    return {
                        ...action.data
                    }
                }
                return item;
            });
            onSetAllDataToLocalStorage({
                ...state,
                allTodos: updatedList
            })
            return {
                ...state,
                allTodos: updatedList,
                isLoading: false
            }
        default:
            return state;
    }
}



