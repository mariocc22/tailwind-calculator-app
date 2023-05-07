// constants
import { ACTIONS } from "../helpers";

// props validator
import PropTypes from "prop-types";

const OperationButton = ({ operation, dispatch }) => {
  // props validation
  OperationButton.propTypes = {
    dispatch: PropTypes.func.isRequired,
    operation: PropTypes.string.isRequired,
  };

  return (
    <button
      className="text-red-500  p-4  rounded-lg dark:bg-zinc-800 transition-all duration-300 ease-in-out dark:hover:bg-zinc-700"
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
};

export default OperationButton;
