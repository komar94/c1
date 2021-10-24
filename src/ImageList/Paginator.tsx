import { FC } from "react";

const Paginator: FC<{
  onPreviousClicked: () => void;
  onNextClicked: () => void;
  hasNext: boolean;
  hasPrevious: boolean;
}> = ({ onNextClicked, onPreviousClicked, hasNext, hasPrevious }) => {
  return (
    <>
      <button
        className="mr-2"
        onClick={onPreviousClicked}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <button className="mr-2" onClick={onNextClicked} disabled={!hasNext}>
        Next
      </button>
    </>
  );
};

export default Paginator;
