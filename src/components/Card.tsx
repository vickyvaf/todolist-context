import { useEffect } from "react";
import { useTodoContext } from "../context/todo-context";
import { Data } from "../context/todo-context";

const Card = () => {
  const { state, dispatch } = useTodoContext();

  const handleDelete = (id: number) => {
    dispatch({ type: "FETCH" });
    fetch((process.env.REACT_APP_POSTS as string) + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => dispatch({ type: "ADDED_SUCCESS" }))
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err?.message }));
  };

  type EditProps = {
    id: number;
    userId: number;
    title: string;
    body: string;
  };

  const edit = (data: EditProps) => {
    dispatch({ type: "EDIT" });
    dispatch({ type: "CHANGE_ID", payload: data.id });
    dispatch({ type: "CHANGE_USERID", payload: data.userId });
    dispatch({ type: "CHANGE_TITLE", payload: data.title });
    dispatch({ type: "CHANGE_BODY", payload: data.body });
  };

  useEffect(() => {
    dispatch({ type: "FETCH" });
    fetch(process.env.REACT_APP_POSTS as string)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          dispatch({ type: "FETCH_EMPTY" });
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: res });
        }
      })
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err?.message }));
  }, []);

  useEffect(() => {
    if (state.tag === "added") {
      dispatch({ type: "FETCH" });
      fetch(process.env.REACT_APP_POSTS as string)
        .then((res) => res.json())
        .then((res) => {
          if (res.length === 0) {
            dispatch({ type: "FETCH_EMPTY" });
          } else {
            dispatch({
              type: "FETCH_SUCCESS",
              payload: res,
            });
          }
        })
        .catch((err) =>
          dispatch({ type: "FETCH_ERROR", payload: err?.message })
        );
    }
  }, [true && state.tag === "loading"]);

  return (
    <div className="card-container">
      {state.tag === "loading" && <p id="loading">Loading...</p>}
      {state.tag === "error" && <p id="loading">{state.errorMessage}</p>}
      {state.tag === "empty" && <p id="loading">Todo Kosong 😴</p>}
      {state.tag === "loaded" || state.tag === "edit" ? (
        state.datas.map((data: Data, i: number) => {
          return (
            <div className="card" key={i}>
              <p>User Id: {data.userId}</p>
              <p>Title: {data.title}</p>
              <p>Body: {data.body}</p>
              <button className="btn-edit" onClick={() => edit(data)}>
                Edit
              </button>
              <button
                className="btn-delete"
                onClick={() => handleDelete(data.id)}
              >
                Delete
              </button>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default Card;
