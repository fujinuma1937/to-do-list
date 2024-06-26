import Button from "../parts/Button";

type Props = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputDate: string;
  setInputDate: React.Dispatch<React.SetStateAction<string>>;
  addData: Function;
  clearData: Function;
};

const Register: React.FC<Props> = ({
  inputValue,
  setInputValue,
  inputDate,
  setInputDate,
  addData,
  clearData,
}) => {
  return (
    <div className="w-full m-auto bg-white p-6">
      <h2 className="text-center text-xl font-bold text-pink-700 mb-3">
        新規登録
      </h2>

      <div className="flex flex-col gap-y-2 w-fit m-auto">
        <div className="flex gap-x-2 w-fit">
          <p className=" min-w-96 text-pink-700 text-lg">やること</p>
          <p className="min-w-40 text-pink-700 text-lg">締め切り</p>
        </div>
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
            type="datetime-local"
            value={inputDate}
            onChange={(event) => setInputDate(event.target.value)}
            required
          />
          <Button type="input" innerText="入力する" action={() => addData()} />
          <Button
            type="clear"
            innerText="クリアする"
            action={() => clearData()}
          />
        </div>
      </div>
    </div>
  );
};
export default Register;
