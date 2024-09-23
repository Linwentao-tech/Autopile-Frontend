import { type ChildrenProps } from "./InterfaceType";

type ButtonType = "orange_button" | "transparent-button";

interface ButtonProps extends ChildrenProps {
  type: ButtonType;
}

function Button({ children, type }: ButtonProps) {
  if (type == "orange_button")
    return (
      <div>
        <button
          className={`bg-orange-700 px-5 py-3 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
        >
          {children}
        </button>
      </div>
    );
  if (type == "transparent-button")
    return (
      <div>
        <button
          className="bg-transparent text-white px-8 py-3  rounded-full  border-2 border-white  hover:bg-orange-700 hover:text-black hover:border-orange-700 
        transition-all duration-500"
        >
          {children}
        </button>
      </div>
    );
}

export default Button;
