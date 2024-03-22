"use client";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";

import Register from "./src/components/Register";
import List from "./src/components/List";
import catImage from "../public/cat-image.png";
import goatImage from "../public/goat-image.png";

type Todo = {
  id: string;
  title: string;
  edit: boolean;
  deadline: string;
};

export default function Home() {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [editArray, setEditArray] = useState<boolean[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingText, setEditingText] = useState("");
  const [editingDate, setEditingDate] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

  const generateID = (length: number) => {
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
        setTodoList([...res.data]);
      })
      .catch(() => {
        alert("データの取得に失敗しました");
      });
  };

  const addData = async () => {
    if (!isEditing) {
      if (inputValue && inputDate) {
        await axios
          .post(API_URL, {
            id: generateID(12),
            title: inputValue,
            deadline: inputDate,
          })
          .then(() => {
            getAllData();
            setInputValue("");
            setInputDate("");
          })
          .catch(() => {
            alert("追加に失敗しました");
          });
      } else if (!inputValue) {
        alert("やることを入力してね！");
      } else if (!inputDate) {
        alert("日時を入力してね！");
      }
    } else {
      alert("編集中は入力できないよ！");
    }
  };

  const deleteData = async (id: string) => {
    if (!isEditing) {
      const payload = {
        id: id,
      };
      await axios
        .delete(`${API_URL}/${id}`, { data: payload })
        .then(() => {
          getAllData();
        })
        .catch(() => {
          alert("削除に失敗しちゃった…");
        });
    } else {
      alert("編集中は削除できないよ！");
    }
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
    } else {
      alert("入力中は編集できないよ！");
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
  }, []); // eslint-disable-line

  return (
    <main
      className={
        isEditing
          ? "bg-stone-500  h-full grid items-center"
          : " h-full" + " " + " grid items-center"
      }
    >
      <section className="relative bg-pink-200 w-fit p-11 m-auto flex flex-col gap-y-10">
        <Image
          className="absolute top-[-56px] left-[-56px] w-24"
          src={catImage}
          alt="猫ミーム"
        />
        <Image
          className="absolute bottom-[-56px] right-[-56px] w-24"
          src={goatImage}
          alt="ヤギ"
        />
        <Register
          inputValue={inputValue}
          setInputValue={setInputValue}
          inputDate={inputDate}
          setInputDate={setInputDate}
          addData={() => {
            addData();
          }}
        />
        <List
          todoList={todoList}
          editArray={editArray}
          editingText={editingText}
          setEditingText={setEditingText}
          editingDate={editingDate}
          setEditingDate={setEditingDate}
          editEnd={editEnd}
          editStart={editStart}
          deleteData={deleteData}
        />
      </section>
      {isEditing ? (
        <p className="fixed bottom-20 left-0 right-0 m-auto text-white text-lg w-fit">
          編集中です…
        </p>
      ) : (
        ""
      )}
    </main>
  );
}
