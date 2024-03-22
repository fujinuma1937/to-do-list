type Props = {
  type: string;
  innerText: string;
  action: Function;
};

const Button: React.FC<Props> = ({ type, innerText, action }) => {
  let style = "";
  switch (type) {
    case "edit":
      style = "bg-cyan-600";
    case "delete":
      style = "bg-pink-600";
  }
};
return (
  <button className={" text-white p-2 shadow-md"} onClick={() => action}>
    {innerText}
  </button>
);

export default Button;
