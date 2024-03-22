type Props = {
  type: string;
  innerText: string;
  action: React.MouseEventHandler<HTMLButtonElement>;
};
type colorType = {
  [K in string]: string;
};
const color: colorType = {
  input: "bg-teal-700",
  editStart: "bg-cyan-600",
  editEnd: "bg-stone-600 ",
  delete: "bg-pink-600",
};

const Button: React.FC<Props> = ({ type, innerText, action }) => {
  return (
    <button
      className={color[type] + " " + "text-white p-2 shadow-md"}
      onClick={action}
    >
      {innerText}
    </button>
  );
};

export default Button;
