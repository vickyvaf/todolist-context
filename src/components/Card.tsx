import { useEffect } from "react";
import { postsUrl } from "../api";
import { useTodoContext } from "../context/todo-context";
import { Data } from "../context/todo-context";

const Card = () => {
  const { state, dispatch } = useTodoContext();

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

  const handleDelete = (id: number) => {
    fetch(postsUrl + "/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => dispatch({ type: "DELETE_SUCCESS" }))
      .catch((err) =>
        dispatch({ type: "DELETE_ERROR", payload: err?.message })
      );
  };

  useEffect(() => {
    dispatch({ type: "FETCH" });
    fetch(postsUrl!)
      .then((res) => res.json())
      .then((res) => {
        if (res.length === 0) {
          dispatch({ type: "FETCH_EMPTY" });
        } else {
          dispatch({ type: "FETCH_SUCCESS", payload: res });
        }
      })
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err?.message }));
  }, [state.tag === "loading"]);

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
