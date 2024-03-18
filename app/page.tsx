"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

type Todo = {
  id: number;
  title: string;
  edit: boolean;
  deadline: string;
};

export default function Home() {
  const [todoList, settodoList] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const apiURL = "http://localhost:3100/todoList";

  const getAllData = async () => {
    await axios
      .get(apiURL)
      .then((res) => {
        settodoList([...res.data]);
      })
      .catch(() => {
        alert("データの取得に失敗しました");
      });
  };

  const addData = async () => {
    if (inputValue) {
      await axios
        .post(apiURL, {
          title: inputValue,
          delete: false,
        })
        .then(() => {
          getAllData();
          setInputValue("");
        });
    } else {
      alert("入力してください");
    }
  };

  const deleteData = async (id: any) => {
    const payload = {
      id: id,
    };
    console.log(`${apiURL}/${id}`);
    await axios
      .delete(`${apiURL}/${id}`, { data: payload })
      .then(() => {
        getAllData();
      })
      .catch(() => {
        alert("削除に失敗しました");
      });
  };

  const editData = async (id: any) => {
    await axios
      .put(`${apiURL}/${id}`, {
        edit: true,
      })
      .then(() => {
        getAllData();
      })
      .catch(() => {
        alert("編集に失敗しました");
      });
  };

  const editDataEnd = async (id: any) => {
    await axios
      .put(`${apiURL}/${id}`, {
        edit: false,
      })
      .then(() => {
        getAllData();
      })
      .catch(() => {
        alert("編集に失敗しました");
      });
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main className="bg-zinc-100 h-screen">
      <h1 className="text-white bg-indigo-700 text-center text-xl w-full font-bold py-2">
        To Do List
      </h1>
      <section className="bg-indigo-200 w-fit p-11 m-auto my-10">
        <ul className="flex flex-col gap-y-5 mb-10">
          {todoList.map((todo) => {
            return (
              <li className="" key={todo.id}>
                <div className="flex gap-x-2">
                  {todo.edit ? (
                    <input
                      className="min-w-96 bg-cyan-100 w-fit flex items-center px-2"
                      type="text"
                      value={todo.title}
                      placeholder="入力しやがれ"
                    />
                  ) : (
                    <p className="min-w-96 bg-white w-fit flex items-center px-2">
                      {todo.title}
                    </p>
                  )}

                  {todo.edit ? (
                    <input
                      type="date"
                      value={todo.deadline}
                      className="bg-cyan-100  w-fit flex items-center px-2"
                    />
                  ) : (
                    <p className="bg-white w-fit flex items-center px-2">
                      {todo.deadline}
                    </p>
                  )}

                  {todo.edit ? (
                    <button
                      className="bg-stone-600 text-white p-2 shadow-md"
                      onClick={() => editDataEnd(todo.id)}
                    >
                      編集完了
                    </button>
                  ) : (
                    <button
                      className="bg-teal-600 text-white p-2 shadow-md"
                      onClick={() => editData(todo.id)}
                    >
                      編集する
                    </button>
                  )}

                  <button
                    className="bg-pink-600 text-white p-2 shadow-md"
                    onClick={() => deleteData(todo.id)}
                  >
                    削除する
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="w-fit m-auto bg-white p-6">
          <h2 className="text-center text-lg font-bold text-indigo-700">
            新規登録
          </h2>
          <div className="flex gap-x-2 w-fit m-auto">
            <input
              className="px-2 min-w-96 border-2 border-gray-300"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="入力しやがれ"
              required
            />
            <input
              className="px-2 min-w-40 border-2 border-gray-300"
              type="date"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="入力しやがれ"
              required
            />
            <button
              className="bg-indigo-700 text-white p-2 shadow-md"
              onClick={() => addData()}
            >
              入力する
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
