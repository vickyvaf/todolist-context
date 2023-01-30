import { createContext, useContext, useReducer } from "react";

type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type TodoProviderProps = {
  children: React.ReactNode;
};

export type Data = { id: number; userId: number; title: string; body: string };

type State = {
  tag: string;
  datas: Array<Data>;
  id: number;
  userIdInput: string;
  titleInput: string;
  bodyInput: string;
  errorMessage: string;
};

type Action = {
  type: string;
  payload?: string | number | [];
};

export const TodoContext = createContext<TodoContextType>({
  state: {
    tag: "idle",
    datas: [],
    id: 0,
    userIdInput: "",
    titleInput: "",
    bodyInput: "",
    errorMessage: "",
  },
  dispatch() {},
});

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const initialState: State = {
    tag: "idle",
    datas: [],
    id: 0,
    userIdInput: "",
    titleInput: "",
    bodyInput: "",
    errorMessage: "",
  };

  const reducer = (state: any, action: Action) => {
    switch (state.tag) {
      case "idle": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "loading": {
        switch (action.type) {
          case "FETCH_SUCCESS": {
            return {
              ...state,
              tag: "loaded",
              datas: action.payload ?? initialState.datas,
            };
          }
          case "FETCH_ERROR": {
            return {
              ...state,
              tag: "error",
              datas: [],
              errorMessage: action.payload,
            };
          }
          case "FETCH_EMPTY": {
            return {
              ...state,
              tag: "empty",
              datas: [],
            };
          }
          case "ADDED_SUCCESS": {
            return {
              ...state,
              tag: "added",
              userIdInput: "",
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          default:
            return state;
        }
      }
      case "loaded": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "CHANGE_ID": {
            return {
              ...state,
              id: action.payload,
            };
          }
          case "CHANGE_USERID": {
            return {
              ...state,
              userIdInput: action.payload,
            };
          }
          case "CHANGE_TITLE": {
            return {
              ...state,
              titleInput: action.payload,
            };
          }
          case "CHANGE_BODY": {
            return {
              ...state,
              bodyInput: action.payload,
            };
          }
          case "EDIT": {
            return {
              ...state,
              tag: "edit",
            };
          }
          default:
            return state;
        }
      }
      case "added": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "CHANGE_ID": {
            return {
              ...state,
              id: action.payload,
            };
          }
          case "CHANGE_USERID": {
            return {
              ...state,
              userIdInput: action.payload,
            };
          }
          case "CHANGE_TITLE": {
            return {
              ...state,
              titleInput: action.payload,
            };
          }
          case "CHANGE_BODY": {
            return {
              ...state,
              bodyInput: action.payload,
            };
          }
          case "EDIT": {
            return {
              ...state,
              tag: "edit",
            };
          }
          default:
            return state;
        }
      }
      case "edit": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "CHANGE_ID": {
            return {
              ...state,
              id: action.payload,
            };
          }
          case "CHANGE_USERID": {
            return {
              ...state,
              userIdInput: action.payload,
            };
          }
          case "CHANGE_TITLE": {
            return {
              ...state,
              titleInput: action.payload,
            };
          }
          case "CHANGE_BODY": {
            return {
              ...state,
              bodyInput: action.payload,
            };
          }
          case "EDIT": {
            return {
              ...state,
              tag: "edit",
            };
          }
          case "CANCEL_EDIT": {
            return {
              ...state,
              tag: "loaded",
              id: 0,
              userIdInput: "",
              titleInput: "",
              bodyInput: "",
            };
          }
          default:
            return state;
        }
      }
      case "empty": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "CHANGE_USERID": {
            return {
              ...state,
              userIdInput: action.payload,
            };
          }
          case "CHANGE_TITLE": {
            return {
              ...state,
              titleInput: action.payload,
            };
          }
          case "CHANGE_BODY": {
            return {
              ...state,
              bodyInput: action.payload,
            };
          }
          default:
            return state;
        }
      }
      case "error": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "CHANGE_USERID": {
            return {
              ...state,
              userIdInput: action.payload,
            };
          }
          case "CHANGE_TITLE": {
            return {
              ...state,
              titleInput: action.payload,
            };
          }
          case "CHANGE_BODY": {
            return {
              ...state,
              bodyInput: action.payload,
            };
          }
          default:
            return state;
        }
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const todoContextValue = {
    state,
    dispatch,
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
