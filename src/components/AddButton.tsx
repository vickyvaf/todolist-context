import { useTodoContext } from "../context/todo-context";

const AddButton = () => {
  const { dispatch } = useTodoContext();

  return (
    <div className="flex justify-end my-5 border-b-2 pb-5">
      <button
        onClick={() => dispatch({ type: "ADD" })}
        className="bg-blue-600 text-white py-2 px-4 rounded-md font-medium active:scale-[98%]"
      >
        Tambah
      </button>
    </div>
  );
};

export default AddButton;
