import { useEffect } from "react";
import { postsUrl } from "../api";
import { Data, useTodoContext } from "../context/todo-context";
import { toast } from "react-toastify";
import Skeleton from "./Skeleton";
import Empty from "./Empty";

const Card = () => {
  const { state, dispatch } = useTodoContext();

  const promiseDelete = () => {
    return new Promise<void>((resolve, reject) => {
      fetch(postsUrl + "/" + state.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          dispatch({ type: "DELETE_SUCCESS" });
          resolve();
        })
        .catch((err) => {
          dispatch({ type: "DELETE_ERROR", payload: err?.message });
          reject();
        });
    });
  };

  const handleDelete = () => {
    toast.dismiss();
    toast.promise(promiseDelete, {
      pending: "Sedang menghapus",
      success: "Berhasil menghapus",
      error: "Gagal menghapus",
    });
  };

  useEffect(() => {
    switch (state.tag) {
      case "idle":
        dispatch({ type: "FETCH" });
        break;
      case "fetching":
        fetch(postsUrl)
          .then((res) => res.json())
          .then((res) => {
            if (res.length === 0) {
              dispatch({ type: "FETCH_EMPTY" });
            } else {
              dispatch({ type: "FETCH_SUCCESS", payload: res });
            }
          })
          .catch((err) =>
            dispatch({ type: "FETCH_ERROR", payload: err.message })
          );
        break;
      case "deleting":
        handleDelete();
        break;
      default:
        break;
    }
  }, [state.tag]);

  return (
    <div className="flex flex-col-reverse gap-3">
      {state.tag === "empty" && <Empty />}
      {state.tag === "fetching" ? (
        <Skeleton />
      ) : (
        state.datas.map((data: Data, i: number) => {
          return (
            <div key={i} className="border-2 rounded-md max-w-full p-5">
              <p className="font-medium">User Id : {data.userId}</p>
              <h1 className="font-medium">Title : {data.title}</h1>
              <p className="font-medium">Body : {data.body}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    dispatch({
                      type: "EDIT",
                      payload: {
                        id: data.id,
                        userId: data.userId,
                        title: data.title,
                        body: data.body,
                      },
                    });
                  }}
                  className="bg-yellow-500 text-white h-fit text-sm px-3 py-1 rounded-md font-medium active:scale-[98%]"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    dispatch({ type: "DELETE", payload: data.id });
                  }}
                  className="flex items-center gap-2 bg-red-600 text-white h-fit text-sm px-3 py-1 rounded-md font-medium active:scale-[98%]"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Card;
