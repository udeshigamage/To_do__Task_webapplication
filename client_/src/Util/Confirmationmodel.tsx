import React, { FC } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoIosWarning } from "react-icons/io";

type prop = {
  handlemodelclose: () => void;
  handledit: () => void;
};
const Confirmationmodel: FC<prop> = ({ handlemodelclose, handledit }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center ">
      <div className="flex flex-col gap-3 w-[400px] h-[220px] bg-slate-700 border-red-500 border-4 text-white opacity-95 rounded-lg">
        <div className="flex flex-row justify-end text-black">
          <button onClick={() => handlemodelclose()}>
            <IoIosCloseCircle size={40} color="white" className="m-2" />
          </button>
        </div>
        <div className="flex flex-row justify-center text-white">
          <IoIosWarning size={40} color="red" />
        </div>
        <div className="flex flex-row justify-center text-white mt-1">
          <h1>Are you Sure you want to make it as completed</h1>
        </div>

        <div className="flex flex-row position:relative gap-3 justify-center  mt-2">
          <button
            type="submit"
            className="px-6 py-1  bg-white text-black rounded-lg hover:bg-red-400 "
            onClick={() => {
              handledit();
            }}
          >
            yes
          </button>
          <button
            className="px-6 py-1 bg-white text-black rounded-lg hover:bg-red-400 "
            onClick={handlemodelclose}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmationmodel;
