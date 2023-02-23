import React, { useState } from "react";

export default function Todo() {
  const [newTask, setnewTask] = useState("");
  const [todos, setTodos] = useState([{ name: "Putzen", done: false }]);
  const [inEdit, setInEdit] = useState(-1);
  const [editValue, setEditValue] = useState("");

  const addTask = () => {
    const copyOfTodos = todos.slice();
    copyOfTodos.push({ name: newTask, done: false });
    setTodos(copyOfTodos);
    setnewTask("");
  };

  const deleteTask = (index) => {
    const copyOfTodos = todos.slice();
    copyOfTodos.splice(index, 1);
    setTodos(copyOfTodos);
  };

  const editTask = (index) => {
    const copyOfTodos = todos.slice();
    const newEditedTask = [];
    for (let i = 0; i < copyOfTodos.length; i++) {
      if (index === i) {
        newEditedTask.push({ name: editValue, done: false });
      } else {
        newEditedTask.push(copyOfTodos[i]);
      }
    }
    setTodos(newEditedTask);
    setInEdit(-1);
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

  if (todos.length)
    return (
      <>
        <div className="todoBox">
        <div className="TodoList">
      <h1>
        Todo List
      </h1>
    </div>
          <div className="container">
            <input type="text" value={newTask} onChange={(event) => setnewTask(event.target.value)} placeholder="New Task" />
            <button onClick={addTask}>Add</button>
          </div>

          <div className="list">
            {todos.map((todo, index) => (
              <span className="todoRow" key={index}>
                {inEdit !== index ? (
                  <>
                    <div className="textInput">
                    <span className={todo.done ? "name-done" : "name"}>{todo.name}</span>
                    </div>
                    <div className="rightButtons">
                    <button onClick={() => deleteTask(index)}>Delete</button>
                    <button onClick={() => setInEdit(index)}>Edit</button>
                    <button onClick={() => setFinished(index)}>Done</button>
                    </div>
                  </>
                ) : (
                  <>
                    <input value={editValue} onChange={(event) => setEditValue(event.target.value)} placeholder="edit Task"/>
                    <button onClick={() => editTask(index)}>Save</button>
                    <button onClick={() => setInEdit(-1)}>Cancel</button>
                  </>
                )}
              </span>
            ))}
          </div>
        </div>
      </>
    );
}