import { createContext, useContext, useReducer } from "react";

type TodoContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

type TodoProviderProps = {
  children: React.ReactNode;
};

export interface Data {
  id: number;
  userId: number;
  title: string;
  body: string;
}

type State = {
  tag: string;
  datas: Array<Data>;
  id: number;
  userIdInput: number;
  titleInput: string;
  bodyInput: string;
  errorMessage: string;
};

type Action =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: Array<Data> }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_EMPTY" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR"; payload: string }
  | { type: "CHANGE_ID"; payload: number }
  | { type: "CHANGE_USERID"; payload: number }
  | { type: "CHANGE_TITLE"; payload: string }
  | { type: "CHANGE_BODY"; payload: string }
  | { type: "EDIT" }
  | { type: "CANCEL_EDIT" };

export const TodoContext = createContext<TodoContextType>({
  state: {
    tag: "idle",
    datas: [],
    id: 0,
    userIdInput: 0,
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
    userIdInput: 0,
    titleInput: "",
    bodyInput: "",
    errorMessage: "",
  };

  const reducer = (state: State, action: Action) => {
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
              datas: action.payload,
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
          default:
            return state;
        }
      }
      case "loaded": {
        switch (action.type) {
          case "SUBMIT_SUCCESS": {
            return {
              ...state,
              tag: "loading",
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          case "SUBMIT_ERROR": {
            return {
              ...state,
              tag: "error",
            };
          }
          case "DELETE_SUCCESS": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "DELETE_ERROR": {
            return {
              ...state,
              tag: "error",
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
      case "empty": {
        switch (action.type) {
          case "SUBMIT_SUCCESS": {
            return {
              ...state,
              tag: "loading",
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          case "SUBMIT_ERROR": {
            return {
              ...state,
              tag: "error",
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
      case "edit": {
        switch (action.type) {
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
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
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
          case "SUBMIT_SUCCESS": {
            return {
              ...state,
              tag: "loading",
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          case "SUBMIT_ERROR": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "DELETE_SUCCESS": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "DELETE_ERROR": {
            return {
              ...state,
              tag: "error",
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
          case "SUBMIT_SUCCESS": {
            return {
              ...state,
              tag: "loading",
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          case "SUBMIT_ERROR": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "DELETE_SUCCESS": {
            return {
              ...state,
              tag: "loading",
            };
          }
          case "DELETE_ERROR": {
            return {
              ...state,
              tag: "error",
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
              userIdInput: 0,
              titleInput: "",
              bodyInput: "",
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
