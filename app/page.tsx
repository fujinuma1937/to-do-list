"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [todoList, settodoList] = useState([
    { title: "やること", delete: false },
  ]);
  const [inputValue, setInputValue] = useState("ああああ");
  const addTodo = () => {
    settodoList([...todoList, { title: inputValue, delete: false }]);
  };
  const deleteTodo = (number: number) => {
    settodoList(todoList.filter((todo, index) => index !== number));
  };
  return (
    <main className="">
      <h1 className="text-center">To Do List</h1>
      <ul className="flex flex-col gap-y-2">
        {todoList.map((todo, index) => {
          if (!todo.delete) {
            return (
              <li key={index}>
                {todo.title}
                <button onClick={() => deleteTodo(index)}>削除する</button>
              </li>
            );
          }
        })}
      </ul>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button onClick={() => addTodo()}>入力する</button>
      </div>
    </main>
  );
}
