"use client";
import Image from "next/image";
import axios from "axios";
import { use, useEffect, useState } from "react";

type Todo = {
  id: string;
  title: string;
  edit: boolean;
  deadline: string;
};

export default function Home() {
  const [todoList, settodoList] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [editArray, setEditArray] = useState<boolean[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [editingDate, setEditingDate] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  const generateID = () => {
    const length = 12;
    const strings = "abcdefghijklmnopqrstuvwxyz0123456789";
    let newID = "";
    for (let i = 0; i < length; i++) {
      newID += strings[Math.floor(Math.random() * strings.length)];
    }
    return newID;
  };

  const getAllData = async () => {
    await axios
      .get(API_URL)
      .then((res) => {
        const newEdit = [];
        for (let i = 0; i < res.data.length; i++) {
          newEdit[i] = false;
        }
        setEditArray(newEdit);
        settodoList([...res.data]);
      })
      .catch(() => {
        alert("データの取得に失敗しました");
      });
  };

  const addData = async () => {
    if (inputValue) {
      await axios
        .post(API_URL, {
          id: generateID(),
          title: inputValue,
          deadline: false,
        })
        .then(() => {
          getAllData();
          setInputValue("");
        })
        .catch(() => {
          alert("追加に失敗しました");
        });
    } else {
      alert("入力してください");
    }
  };

  const deleteData = async (id: string) => {
    const payload = {
      id: id,
    };
    await axios
      .delete(`${API_URL}/${id}`, { data: payload })
      .then(() => {
        getAllData();
      })
      .catch(() => {
        alert("削除に失敗しました");
      });
  };

  const updateData = async (id: string) => {
    const payload = {
      id: id,
      title: editingText,
      deadline: editingDate,
    };
    await axios
      .put(`${API_URL}/${id}`, payload)
      .then(() => {
        getAllData();
      })
      .catch(() => {
        alert("編集に失敗しました");
      });
  };

  const editStart = (index: number) => {
    if (!isEditing) {
      setIsEditing((prev) => !prev);
      setEditArray(
        editArray.map((edit, number) => (number === index ? !edit : edit))
      );
      setEditingText(todoList[index].title);
      setEditingDate(todoList[index].deadline);
    }
  };

  const editEnd = (index: number, id: string) => {
    setIsEditing((prev) => !prev);
    setEditArray(
      editArray.map((edit, number) => (number === index ? !edit : edit))
    );
    updateData(id);
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <main className="">
      <section className="bg-indigo-200 w-fit p-11 m-auto my-10">
        <ul className="flex flex-col gap-y-5 mb-10">
          {todoList.map((todo, index) => {
            return (
              <li className="" key={todo.id}>
                <div className="flex gap-x-2">
                  {editArray[index] ? (
                    <input
                      className="min-w-96 bg-cyan-100 w-fit flex items-center px-2"
                      type="text"
                      defaultValue={todo.title}
                      placeholder="入力してください"
                      onChange={(event) => setEditingText(event.target.value)}
                    />
                  ) : (
                    <p className="min-w-96 bg-white w-fit flex items-center px-2">
                      {todo.title}
                    </p>
                  )}

                  {editArray[index] ? (
                    <input
                      type="date"
                      value={todo.deadline}
                      className="bg-cyan-100  w-fit flex items-center px-2"
                      onChange={(event) => setEditingDate(event.target.value)}
                    />
                  ) : (
                    <p className="bg-white w-fit flex items-center px-2">
                      {todo.deadline}
                    </p>
                  )}

                  {editArray[index] ? (
                    <button
                      className="bg-stone-600 text-white p-2 shadow-md"
                      onClick={() => editEnd(index, todo.id)}
                    >
                      編集完了
                    </button>
                  ) : (
                    <button
                      className="bg-teal-600 text-white p-2 shadow-md"
                      onClick={() => editStart(index)}
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
          <h2 className="text-center text-lg font-bold text-indigo-700 mb-3">
            新規登録
          </h2>
          <div className="flex gap-x-2 w-fit m-auto">
            <input
              className="px-2 min-w-96 border-2 border-gray-300"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="入力してください"
              required
            />
            <input
              className="px-2 min-w-40 border-2 border-gray-300"
              type="date"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder="入力してください"
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
