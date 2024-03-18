"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Todo = {
  id: number;
  title: string;
  delete: boolean;
};

export default function Home() {
  const router = useRouter();
  const [todoList, settodoList] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const getAllData = async () => {
    await axios
      .get("http://localhost:3100/todoList")
      .then((res) => {
        settodoList([...res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addData = async () => {
    if (inputValue) {
      await axios
        .post("http://localhost:3100/todoList", {
          title: inputValue,
          delete: false,
        })
        .then((res) => {
          getAllData();
        });
      router.push("./");
    } else {
      alert("入力してください");
    }
  };

  const deleteData = async (value: any) => {
    const payload = {
      id: value,
    };
    console.log(`${value}`);
    await axios
      .delete(`http://localhost:3100/todoList/${value}`, { data: payload })
      .then(() => {
        getAllData();
      });
  };

  const addTodo = () => {
    addData();
  };
  const deleteTodo = (id: number) => {
    deleteData(id);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <main className="bg-gray">
      <h1 className="text-center text-xl">To Do List</h1>
      <section className="bg-red-200 w-fit p-11 m-auto">
        <ul className="flex flex-col gap-y-5 mb-10">
          {todoList.map((todo, index) => {
            if (!todo.delete) {
              return (
                <li className="flex gap-x-2" key={todo.id}>
                  <p className="bg-white w-fit flex items-center px-2">
                    {todo.title}
                  </p>
                  <button
                    className="bg-red-900 text-white p-2"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    削除する
                  </button>
                </li>
              );
            }
          })}
        </ul>

        <div className="flex gap-x-2">
          {" "}
          <input
            className="px-2"
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            required
          />
          <button
            className="bg-green-700 text-white p-2"
            onClick={() => addTodo()}
          >
            入力する
          </button>
        </div>
      </section>
    </main>
  );
}
