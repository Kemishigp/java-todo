import { useEffect, useState } from "react";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  const API_URL = "http://localhost:8080/todos";

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const res = await fetch(API_URL);
    const data = await res.json();
    setTodos(data);
  }

  async function addTodo(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await fetch(`${API_URL}?title=${encodeURIComponent(title)}`, {
      method: "POST",
    });

    setTitle("");
    fetchTodos();
  }

  async function completeTodo(id) {
    await fetch(`${API_URL}/${id}/complete`, {
      method: "PUT",
    });

    fetchTodos();
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Spring Boot Todo</h1>

        <form onSubmit={addTodo} className="flex gap-2 mb-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New todo"
            className="flex-1 border rounded-xl px-3 py-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 rounded-xl"
          >
            Add
          </button>
        </form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border rounded-xl px-3 py-2"
            >
              <span
                className={todo.completed ? "line-through text-gray-400" : ""}
              >
                {todo.title}
              </span>
              {!todo.completed && (
                <button
                  onClick={() => completeTodo(todo.id)}
                  className="text-sm text-green-600"
                >
                  Complete
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
