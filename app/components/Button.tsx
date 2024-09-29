import {
  type ButtonType,
  type ChildrenProps,
} from "@/app/components/InterfaceType";

interface ButtonProps extends ChildrenProps {
  type: ButtonType;
}

function Button({ children, type }: ButtonProps) {
  if (type == "orange_button")
    return (
      <div>
        <button
          className={`bg-orange-700 px-7 py-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
        >
          {children}
        </button>
      </div>
    );
  if (type == "orange_submit_button")
    return (
      <div>
        <button
          className={`bg-orange-700 px-12 py-2 ml-56 mt-4 text-black rounded-full hover:border-white transition-all hover:bg-transparent hover:text-white border-2 border-transparent duration-500`}
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
  if (type == "Add_to_cart_homepage")
    return (
      <div>
        <button
          className="bg-transparent text-white px-14 py-3  rounded-full  border-2 border-white  hover:bg-white hover:text-black hover:border-white
          transition-all duration-500"
        >
          {children}
        </button>
      </div>
    );
  if (type === "Add_to_cart_productPage")
    return (
      <div className="w-full ">
        <button
          className="bg-transparent text-white rounded-full border-2 border-white hover:bg-white hover:text-black hover:border-white
              transition-all duration-500 mt-5 w-full py-2 px-4"
        >
          {children}
        </button>
      </div>
    );
}

export default Button;
