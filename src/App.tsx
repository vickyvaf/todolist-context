import { TodoProvider } from "./context/todo-context";
import Container from "./layouts/Container";
import Form from "./components/Form";
import Card from "./components/Card";

function App() {
  return (
    <TodoProvider>
      <Container>
        <Form />
        <Card />
      </Container>
    </TodoProvider>
  );
}

export default App;
