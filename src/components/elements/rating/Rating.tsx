import React, { memo } from "react";
import ReactStars from "react-rating-stars-component";

export interface IRatingProps {
  activeColor?: string;
  count?: number;
  size?: number;
  onChange?: (newRating: number) => void;
  value?:number
}

const RatingComponent: React.FC<IRatingProps> = ({
  activeColor,
  count,
  size,
  onChange,
  value
}) => {
  return (
    <ReactStars
      activeColor={activeColor}
      count={count}
      size={size}
      onChange={onChange}
      isHalf={true}
      value={value}
    />
  );
};

export const Rating = memo(RatingComponent);