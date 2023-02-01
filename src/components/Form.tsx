import { postsUrl } from "../api";
import { useTodoContext } from "../context/todo-context";

const Form = () => {
  const { state, dispatch } = useTodoContext();

  const data = {
    userId: state.userIdInput,
    title: state.titleInput,
    body: state.bodyInput,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(postsUrl!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => dispatch({ type: "SUBMIT_SUCCESS" }))
      .catch((error) => {
        dispatch({ type: "SUBMIT_ERROR", payload: error?.message });
      });
  };

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(postsUrl + "/" + state.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        dispatch({ type: "SUBMIT_SUCCESS" });
      })
      .catch((err) =>
        dispatch({ type: "SUBMIT_ERROR", payload: err?.message })
      );
  };

  const handleCancelEdit = () => {
    dispatch({ type: "CANCEL_EDIT" });
  };

  return (
    <form>
      <div className="input">
        <label>User Id</label>
        <input
          value={state.userIdInput}
          onChange={(e) =>
            dispatch({ type: "CHANGE_USERID", payload: Number(e.target.value) })
          }
          type="number"
          placeholder="user id"
          required
        />
      </div>
      <div className="input">
        <label>Title</label>
        <input
          value={state.titleInput}
          onChange={(e) =>
            dispatch({ type: "CHANGE_TITLE", payload: e.target.value })
          }
          type="text"
          placeholder="title"
          required
        />
      </div>
      <div className="input">
        <label>Body</label>
        <input
          value={state.bodyInput}
          onChange={(e) =>
            dispatch({ type: "CHANGE_BODY", payload: e.target.value })
          }
          type="text"
          placeholder="body"
          required
        />
      </div>
      {state.tag !== "edit" && (
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {state.tag === "edit" && (
        <>
          <button type="submit" onClick={handleEdit}>
            Edit
          </button>
          <button type="submit" onClick={handleCancelEdit}>
            Batal
          </button>
        </>
      )}
    </form>
  );
};

export default Form;
