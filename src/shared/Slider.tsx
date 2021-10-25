import React, { FC } from "react";

export type SliderProps = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

const Slider: FC<SliderProps> = (props) => {
  return <input type="range" {...props} />;
};

export default Slider;
