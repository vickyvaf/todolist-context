import { useEffect } from "react";
import { toast } from "react-toastify";
import { postsUrl } from "../api";
import { useTodoContext } from "../context/todo-context";

const FormEdit = () => {
  const { state, dispatch } = useTodoContext();

  const data = {
    userId: state.userIdInput,
    title: state.titleInput,
    body: state.bodyInput,
  };

  const promiseEdit = () => {
    return new Promise<void>((resolve, reject) => {
      fetch(postsUrl + "/" + state.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          dispatch({ type: "EDIT_SUCCESS" });
          resolve();
        })
        .catch((err) => {
          dispatch({ type: "EDIT_ERROR", payload: err?.message });
          reject();
        });
    });
  };

  const handleEdit = () => {
    toast.dismiss();
    toast.promise(promiseEdit, {
      pending: "Sedang mengedit",
      success: "Berhasil mengedit",
      error: "Gagal mengedit",
    });
  };

  useEffect(() => {
    switch (state.tag) {
      case "editing":
        handleEdit();
        break;
      default:
        break;
    }
  }, [state.tag]);

  return (
    <>
      {state.tag === "edit" && (
        <div className="w-full bg-slate-600 bg-opacity-90 h-screen flex justify-center top-0 items-center fixed">
          <form
            onSubmit={() => dispatch({ type: "EDIT_SUBMIT" })}
            className="w-[512px] h-fit top-40 border-2 flex flex-col gap-3 p-5 bg-white rounded-md"
          >
            <button
              type="button"
              onClick={() => dispatch({ type: "EDIT_CANCEL" })}
              className="w-fit h-fit ml-auto bg-blue-600 text-white font-medium py-1 px-3 rounded-full mb-5 active:scale-95"
            >
              X
            </button>
            <input
              required
              value={state.userIdInput}
              onChange={(e) =>
                dispatch({ type: "CHANGE_USERID", payload: e.target.value })
              }
              placeholder="user id"
              className="w-full  focus:outline-blue-500 bg-slate-100 py-2 px-4 rounded-md"
            />
            <input
              required
              value={state.titleInput}
              onChange={(e) =>
                dispatch({ type: "CHANGE_TITLE", payload: e.target.value })
              }
              placeholder="title"
              className="w-full  focus:outline-blue-500 bg-slate-100 py-2 px-4 rounded-md"
            />
            <input
              required
              value={state.bodyInput}
              onChange={(e) =>
                dispatch({ type: "CHANGE_BODY", payload: e.target.value })
              }
              placeholder="body"
              className="w-full  focus:outline-blue-500 bg-slate-100 py-2 px-4 rounded-md"
            />
            <button className="py-2 px-4 text-white bg-blue-500 rounded-md font-medium mt-5 active:scale-[99%]">
              Edit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default FormEdit;
