"use client";

import { memo, useCallback, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

function valuetext(value: number) {
  return value.toString();
}

// Create a custom styled Slider
const WhiteSlider = styled(Slider)({
  color: "white",
  "& .MuiSlider-thumb": {
    backgroundColor: "white",
  },
  "& .MuiSlider-track": {
    backgroundColor: "white",
  },
  "& .MuiSlider-rail": {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
});

interface RangeSliderProps {
  onValueChange?: (value: number[]) => void;
}

function RangeSlider({ onValueChange }: RangeSliderProps) {
  const [value, setValue] = useState<number[]>([0, 130]);
  const [displayMin, setDisplayMin] = useState(0);
  const [displayMax, setDisplayMax] = useState(130);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const newValueArray = newValue as number[];
      setValue(newValueArray);
      if (onValueChange) {
        onValueChange(newValueArray);
      }
    },
    [onValueChange]
  );

  const handleChangeCommitted = useCallback(
    (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        const [newMinPrice, newMaxPrice] = newValue;
        console.log("Final value:", newValue);
        console.log("Min Price:", newMinPrice, "Max Price:", newMaxPrice);
        setDisplayMin(newMinPrice);
        setDisplayMax(newMaxPrice);
      }
    },
    []
  );

  return (
    <Box sx={{ width: 220 }}>
      <WhiteSlider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
      <div className="flex justify-between">
        <span>${displayMin}</span>
        <span>${displayMax}</span>
      </div>
    </Box>
  );
}

const MemoizedRangeSlider = memo(RangeSlider);
MemoizedRangeSlider.displayName = "RangeSlider";

export default MemoizedRangeSlider;
