"use client";

import { memo, useCallback, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

function valuetext(value: number) {
  return value.toString();
}

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

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (displayMin === 0 && displayMax === 130) {
      const params = new URLSearchParams(searchParams);
      params.delete("minPrice");
      params.delete("maxPrice");
      const newPath = params.toString()
        ? `${pathName}?${params.toString()}`
        : pathName;
      router.replace(newPath, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("minPrice", displayMin.toString());
      params.set("maxPrice", displayMax.toString());
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [displayMin, displayMax, pathName, router, searchParams]);

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
        setDisplayMin(newMinPrice);
        setDisplayMax(newMaxPrice);
      }
    },
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <WhiteSlider
        getAriaLabel={() => "Price range"}
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        min={0}
        max={130}
      />
      <div className="flex justify-between text-sm sm:text-base">
        <span>${displayMin}</span>
        <span>${displayMax}</span>
      </div>
    </Box>
  );
}

const MemoizedRangeSlider = memo(RangeSlider);
MemoizedRangeSlider.displayName = "RangeSlider";

export default MemoizedRangeSlider;
