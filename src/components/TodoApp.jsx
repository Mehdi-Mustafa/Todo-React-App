import { useState } from "react";

const FILTERS = ["All", "Active", "Completed"];

export default function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Read a book", completed: true },
  ]);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos([...todos, { id: Date.now(), text: trimmed, completed: false }]);
    setInput("");
  };

  const deleteTodo = (id) => setTodos(todos.filter((t) => t.id !== id));

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditText(todo.text);
  };

  const saveEdit = (id) => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
    setEditId(null);
  };

  const clearCompleted = () => setTodos(todos.filter((t) => !t.completed));

  const filtered = todos.filter((t) => {
    if (filter === "Active") return !t.completed;
    if (filter === "Completed") return t.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center pt-12 px-4">
      <div className="bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-8" style={{ height: "fit-content" }}>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-6"> Tasks To Do</h1>

        {/* Add Input */}
        <div className="flex gap-2 mb-5">
          <input
            className="flex-1 border border-gray-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-purple-500 bg-gray-800 text-white placeholder-gray-500"
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors"
            onClick={addTodo}
          >
            + Add
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2 mb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1 rounded-full text-sm font-medium border transition-colors ${filter === f
                  ? "bg-purple-600 text-white border-purple-600"
                  : "bg-transparent text-gray-400 border-gray-600 hover:border-purple-500"
                }`}
            >
              {f}
            </button>
          ))}
        </div>

        <hr className="mb-3 border-gray-700" />

        {/* Todo List */}
        <ul className="flex flex-col gap-2 mb-4">
          {filtered.length === 0 && (
            <li className="text-center text-gray-600 py-6 text-sm">No tasks here</li>
          )}
          {filtered.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2"
            >
              {editId === todo.id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    className="flex-1 border border-gray-600 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-purple-500 bg-gray-700 text-white"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") saveEdit(todo.id);
                      if (e.key === "Escape") setEditId(null);
                    }}
                    autoFocus
                  />
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                    onClick={() => saveEdit(todo.id)}
                  >
                    Save
                  </button>
                  <button
                    className="text-gray-500 hover:text-gray-300 text-lg leading-none"
                    onClick={() => setEditId(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <>
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${todo.completed
                        ? "bg-green-500 border-green-500 text-white"
                        : "border-gray-600 bg-transparent"
                      }`}
                  >
                    {todo.completed && (
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>

                  {/* Text */}
                  <span
                    className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-600" : "text-gray-200"
                      }`}
                  >
                    {todo.text}
                  </span>

                  {/* Actions */}
                  <button
                    onClick={() => startEdit(todo)}
                    className="text-purple-400 hover:text-purple-300 p-1 rounded transition-colors"
                    title="Edit"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 012.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-red-500 hover:text-red-400 p-1 rounded transition-colors"
                    title="Delete"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m2 0a1 1 0 00-1-1h-4a1 1 0 00-1 1m-4 0h10" />
                    </svg>
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>

        <hr className="mb-3 border-gray-700" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">
            {remaining} task{remaining !== 1 ? "s" : ""} left
          </span>
          {todos.some((t) => t.completed) && (
            <button
              onClick={clearCompleted}
              className="text-xs text-red-500 hover:text-red-400 transition-colors"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
