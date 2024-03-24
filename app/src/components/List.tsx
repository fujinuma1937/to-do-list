import Button from "../parts/Button";

type Todo = {
  id: string;
  title: string;
  edit: boolean;
  deadline: string;
};

type Props = {
  todoList: Array<Todo>;
  editArray: Array<Boolean>;
  editingText: string;
  setEditingText: React.Dispatch<React.SetStateAction<string>>;
  editingDate: string;
  setEditingDate: React.Dispatch<React.SetStateAction<string>>;
  editEnd: Function;
  editStart: Function;
  deleteData: Function;
};

const List: React.FC<Props> = ({
  todoList,
  editArray,
  editingText,
  setEditingText,
  editingDate,
  setEditingDate,
  editEnd,
  editStart,
  deleteData,
}) => {
  return (
    <ul className="flex flex-col gap-y-4">
      <li className="flex gap-x-2 ">
        <p className="min-w-96 text-pink-700 text-lg">やること</p>
        <p className="min-w-40 text-pink-700 text-lg">締め切り</p>
      </li>
      {todoList ? (
        todoList.map((todo, index) => {
          return (
            <li className="flex gap-x-2" key={todo.id}>
              {editArray[index] ? (
                <input
                  className="min-w-96 bg-cyan-100 w-fit flex items-center px-2"
                  type="text"
                  defaultValue={todo.title}
                  value={editingText}
                  placeholder="入力してください"
                  onChange={(event) => setEditingText(event.target.value)}
                  required
                />
              ) : (
                <p className="min-w-96 bg-white w-fit flex items-center px-2">
                  {todo.title}
                </p>
              )}

              {editArray[index] ? (
                <input
                  type="date"
                  defaultValue={todo.deadline}
                  value={editingDate}
                  className="bg-cyan-100 min-w-40  w-fit flex items-center px-2"
                  onChange={(event) => setEditingDate(event.target.value)}
                />
              ) : (
                <p className="bg-white min-w-40 w-fit flex items-center px-2">
                  {todo.deadline.replace('T',' ')}
                </p>
              )}

              {editArray[index] ? (
                <Button
                  type="editEnd"
                  innerText="編集完了"
                  action={() => editEnd(index, todo.id)}
                />
              ) : (
                <Button
                  type="editStart"
                  innerText="編集する"
                  action={() => editStart(index)}
                />
              )}
              <Button
                type="delete"
                innerText="削除する"
                action={() => deleteData(todo.id)}
              />
            </li>
          );
        })
      ) : (
        <li className="text-center text-white">表示できる項目がありません</li>
      )}
    </ul>
  );
};

export default List;
