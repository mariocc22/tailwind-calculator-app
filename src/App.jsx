// hooks
import { useReducer, useState } from "react";

// components
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

// constants
import { ACTIONS } from "./helpers";

// library
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

function formatOperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div
      className={` ${
        darkMode ? "dark bg-zinc-900" : ""
      } calculator-grid bg-white w-[90%] mx-auto my-10 rounded-[2rem] overflow-hidden max-w-[400px] transition-all duration-300  ease-in-out`}
    >
      <div
        className={`${
          darkMode ? "bg-zinc-800" : "bg-gray-100"
        } text-center flex gap-2 justify-center items-center w-fit rounded-2xl mx-auto my-5`}
      >
        <button
          onClick={() => setDarkMode(false)}
          className="py-3 px-4 rounded-2xl cursor-pointer"
        >
          <SunIcon className="w-8 h-8 dark:text-gray-400 transition-all duration-300 ease-in-out" />
        </button>
        <button
          onClick={() => setDarkMode(true)}
          className="py-3 px-4 rounded-2xl cursor-pointer"
        >
          <MoonIcon className="w-8 h-8 text-gray-300 dark:text-white transition-all duration-300 ease-in-out" />
        </button>
      </div>
      <div className="output px-8 min-h-3 flex flex-col justify-end items-end gap-2 mb-6">
        <div className="previous-operand text-2xl font-semibold dark:text-white  ">
          {formatOperand(previousOperand)}{" "}
          <span className="text-red-400">{operation}</span> {currentOperand}
        </div>
        <div className="current-operand text-6xl font-bold dark:text-white">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <div className="input grid grid-cols-4 gap-7 bg-gray-100 text-2xl py-8 px-8 rounded-t-[3rem] dark:bg-zinc-800 transition-all duration-300 ease-in-out ">
        <button
          className="col-span-2 text-green-400 p-4  rounded-lg text-lg dark:bg-zinc-750 transition-all duration-300 ease-in-out dark:hover:bg-zinc-700 "
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
        >
          AC
        </button>
        <button
          className=" p-4 text-lg text-orange-400 rounded-lg dark:bg-zinc-800 transition-all duration-300 ease-in-out dark:hover:bg-zinc-700"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <OperationButton operation="÷" dispatch={dispatch} />
        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />
        <OperationButton operation="x" dispatch={dispatch} />
        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />
        <OperationButton operation="+" dispatch={dispatch} />
        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />
        <OperationButton operation="-" dispatch={dispatch} />
        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button
          className="span-two col-span-2 text-red-500  rounded-lg dark:bg-zinc-800 transition-all duration-300 ease-in-out dark:hover:bg-zinc-700"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
