import React, { useState, useEffect } from "react";

export default function Todo() {
  const [newTask, setnewTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [inEdit, setInEdit] = useState();
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (!todos.length) {
      const savedTodos = localStorage.getItem("todos");
      if (savedTodos) {
        setTodos(JSON.parse(savedTodos));
      }
    } else {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]); // Was muss geändert werden damit useEffect ausgeführt wird

  const addTask = () => {
    if (!newTask.length) {
      return alert("Eingabefeld leer!");
    }
    const copyOfTodos = todos.slice();
    copyOfTodos.push({ name: newTask, done: false });
    setTodos(copyOfTodos);
    setnewTask("");
  };

  const deleteTask = (index) => {
    const copyOfTodos = todos.slice();
    if (copyOfTodos.length === 1) {
      setTodos([]);
    }
    copyOfTodos.splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(copyOfTodos));
    setTodos(copyOfTodos);
  };

  const editTask = (index) => {
    const copyOfTodos = todos.slice();
    const newEditedTask = [];
    for (let i = 0; i < copyOfTodos.length; i++) {
      if (index === i) {
        newEditedTask.push({ name: editValue, done: todos[index].done });
      } else {
        newEditedTask.push(copyOfTodos[i]);
      }
    }
    setTodos(newEditedTask);
    setInEdit(null);
  };

  const setFinished = (index) => {
    const copyOfTodos = todos.slice();
    const newEditedTask = [];
    for (let i = 0; i < copyOfTodos.length; i++) {
      if (index === i) {
        newEditedTask.push({ name: copyOfTodos[i].name, done: true });
      } else {
        newEditedTask.push(copyOfTodos[i]);
      }
    }
    setTodos(newEditedTask);
  };

  return (
    <>
      <div className="todoBox">
        <div className="TodoList">
          <h1>Todo List</h1>
        </div>
        <div className="container">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setnewTask(event.target.value)}
            placeholder="New Task"
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="list">
          {todos.map((todo, index) => (
            <span className="todoRow" key={index}>
              {inEdit !== index ? (
                <>
                  <div className="textInput">
                    <div className={todo.done ? "name-done" : "name"}>
                      {todo.name}
                    </div>
                  </div>
                  <div className="rightButtons">
                    <button onClick={() => deleteTask(index)}>Delete</button>
                    <button onClick={() => setInEdit(index)}>Edit</button>
                    <button onClick={() => setFinished(index)}>Done</button>
                  </div>
                </>
              ) : (
                <>
                  <input
                    value={editValue}
                    onChange={(event) => setEditValue(event.target.value)}
                    placeholder="edit Task"
                  />
                  <button onClick={() => editTask(index)}>Save</button>
                  <button onClick={() => setInEdit(null)}>Cancel</button>
                </>
              )}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
