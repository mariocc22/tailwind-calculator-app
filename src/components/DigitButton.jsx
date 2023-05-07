// constants
import { ACTIONS } from "../helpers";

// props validator
import PropTypes from "prop-types";

export default function DigitButton({ dispatch, digit }) {
  // props validation
  DigitButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    digit: PropTypes.string.isRequired,
  };

  return (
    <button
      className="p-4 rounded-lg dark:text-white dark:bg-zinc-800 transition-all duration-300 ease-in-out dark:hover:bg-zinc-700"
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
