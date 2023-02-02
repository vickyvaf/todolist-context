import { TodoProvider } from "./context/todo-context";
import { ToastContainer } from "react-toastify";
import AddButton from "./components/AddButton";
import FormCreate from "./components/FormCreate";
import Container from "./layouts/Container";
import Card from "./components/Card";
import FormEdit from "./components/FormEdit";

const App = () => {
  return (
    <TodoProvider>
      <Container>
        <ToastContainer />
        <AddButton />
        <Card />
      </Container>
      <FormCreate />
      <FormEdit />
    </TodoProvider>
  );
};

export default App;
