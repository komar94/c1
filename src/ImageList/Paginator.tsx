import { FC } from "react";
import usePagination from "./hooks/usePagination";

const Paginator: FC<{
  onPreviousClicked: () => void;
  onNextClicked: () => void;
}> = ({ onNextClicked, onPreviousClicked }) => {
  return (
    <>
      <button onClick={onPreviousClicked}>Previous</button>
      <button onClick={onNextClicked}>Next</button>
    </>
  );
};

export default Paginator;
