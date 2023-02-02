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
  userId: string;
  title: string;
  body: string;
}

type State = {
  tag:
    | "idle"
    | "fetching"
    | "submitting"
    | "editing"
    | "deleting"
    | "success"
    | "empty"
    | "error"
    | "add"
    | "edit";
  datas: Array<Data>;
  id: number;
  userIdInput: string;
  titleInput: string;
  bodyInput: string;
  errorMessage: string;
};

type Action =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: Array<Data> }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "FETCH_EMPTY" }
  | { type: "ADD" }
  | { type: "ADD_CANCEL" }
  | { type: "SUBMIT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; payload: string }
  | { type: "EDIT"; payload: Data }
  | { type: "EDIT_CANCEL" }
  | { type: "EDIT_SUBMIT" }
  | { type: "EDIT_SUCCESS" }
  | { type: "EDIT_ERROR"; payload: string }
  | { type: "DELETE"; payload: number }
  | { type: "DELETE_SUCCESS" }
  | { type: "DELETE_ERROR"; payload: string }
  | { type: "CHANGE_ID"; payload: number }
  | { type: "CHANGE_USERID"; payload: string }
  | { type: "CHANGE_TITLE"; payload: string }
  | { type: "CHANGE_BODY"; payload: string };

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

  const reducer = (state: State, action: Action): State => {
    switch (state.tag) {
      case "idle": {
        switch (action.type) {
          case "FETCH": {
            return {
              ...state,
              tag: "fetching",
            };
          }
          default: {
            return state;
          }
        }
      }
      case "fetching": {
        switch (action.type) {
          case "FETCH_SUCCESS": {
            return {
              ...state,
              tag: "success",
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
      case "submitting": {
        switch (action.type) {
          case "SUBMIT_SUCCESS": {
            return {
              ...state,
              tag: "fetching",
              userIdInput: "",
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
          default:
            return state;
        }
      }
      case "editing": {
        switch (action.type) {
          case "EDIT_SUCCESS": {
            return {
              ...state,
              tag: "fetching",
              userIdInput: "",
              titleInput: "",
              bodyInput: "",
              errorMessage: "",
            };
          }
          case "EDIT_ERROR": {
            return {
              ...state,
              tag: "error",
            };
          }
          default:
            return state;
        }
      }
      case "deleting": {
        switch (action.type) {
          case "DELETE_SUCCESS": {
            return {
              ...state,
              tag: "fetching",
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
      case "success": {
        switch (action.type) {
          case "ADD": {
            return {
              ...state,
              tag: "add",
            };
          }
          case "DELETE": {
            return {
              ...state,
              tag: "deleting",
              id: action.payload,
            };
          }
          case "EDIT": {
            return {
              ...state,
              tag: "edit",
              id: action.payload.id,
              userIdInput: action.payload.userId,
              titleInput: action.payload.title,
              bodyInput: action.payload.body,
            };
          }
          default:
            return state;
        }
      }
      case "empty": {
        switch (action.type) {
          case "ADD": {
            return {
              ...state,
              tag: "add",
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
              tag: "fetching",
            };
          }
          case "ADD": {
            return {
              ...state,
              tag: "add",
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
      case "add": {
        switch (action.type) {
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
          case "SUBMIT": {
            return {
              ...state,
              tag: "submitting",
            };
          }
          case "ADD_CANCEL": {
            switch (state.datas.length) {
              case 0: {
                return {
                  ...state,
                  tag: "empty",
                  userIdInput: "",
                  titleInput: "",
                  bodyInput: "",
                };
              }
            }
            return {
              ...state,
              tag: "success",
              userIdInput: "",
              titleInput: "",
              bodyInput: "",
            };
          }
          default:
            return state;
        }
      }
      case "edit": {
        switch (action.type) {
          case "EDIT_CANCEL": {
            return {
              ...state,
              tag: "success",
              id: 0,
              userIdInput: "",
              titleInput: "",
              bodyInput: "",
            };
          }
          case "EDIT_SUBMIT": {
            return {
              ...state,
              tag: "editing",
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
