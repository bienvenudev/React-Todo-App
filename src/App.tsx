import { useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import "./App.css";

// render todo item in jsx

type Todo = {
  task: string;
  completed: boolean;
}

function App() {
  const [todoItem, setTodoItem] = useState<Todo[]>([
    // { task: "Wash dishes", completed: false },
    // { task: "Walk the dog", completed: false },
    // { task: "Clean the house", completed: false },
  ]);

  function addTodo(formData: FormData) {
    const newTodo = formData.get("todo-input");
    if (newTodo && typeof newTodo === 'string') {
      setTodoItem((prev) => {
        return [...prev, { task: newTodo, completed: false }];
      });
    }
  }

  function toggleTodo(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const checkedStatus = e.currentTarget.checked;
    setTodoItem((prev) => {
      return prev.map((todo, i) => {
        if (i == index) return { ...todo, completed: checkedStatus };
        return todo;
      });
    });
  }

  // useEffect(() => {
  //   console.log("item", todoItem);
  // }, [todoItem]);

  function deleteTodo(index: number) {
    setTodoItem((prev) => {
      return prev.filter((_, i) => {
        return i !== index
      });
    });
  }

  const todoItemsList = todoItem.map((todo, index) => (
    <div className="flex justify-between" key={index}>
      <div className="mb-4">
        <input
          aria-checked={todo.completed}
          checked={todo.completed}
          onChange={(e) => toggleTodo(e, index)}
          type="checkbox"
          id={`todo-${index}`}
          name={`todo`}
        />
        <label
          className={`ml-4 ${
            todo.completed ? "line-through text-gray-500" : ""
          }`}
          htmlFor={`todo-${index}`}
        >
          {todo.task}
        </label>
      </div>
      <button className="cursor-pointer" onClick={() => deleteTodo(index)} aria-label="delete task">
        <MdDelete className="inline-block text-red-700" size={24} />
      </button>
    </div>
  ));

  return (
    <main>
      <h1 className="mb-4">Todos</h1>
      <form
        action={addTodo}
        className="shadow-2xl bg-zinc-700 rounded-3xl px-6 py-2 flex justify-between mb-6"
      >
        <input
          className="w-full"
          id="todo-input"
          name="todo-input"
          type="text"
          placeholder="Add todo..."
          aria-label="Add a task"
        />
        <button aria-label="Add task" className="text-[#065892]">
          <IoAddCircleSharp size={24} />
        </button>
      </form>
      <section id="todo-list">{todoItemsList}</section>
    </main>
  );
}

export default App;
