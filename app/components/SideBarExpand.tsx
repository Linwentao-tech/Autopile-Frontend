"use client";

import { memo, useCallback, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/_lib/hooks";
import { setPriceRange } from "@/app/_lib/filterSlice";
import { RootState } from "@/app/_lib/store";
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

function RangeSlider() {
  const dispatch = useAppDispatch();
  const { minPrice, maxPrice } = useAppSelector(
    (state: RootState) => state.filter
  );
  const [value, setValue] = useState<number[]>([minPrice, maxPrice]);

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (minPrice === 0 && maxPrice === 130) {
      const params = new URLSearchParams(searchParams);
      params.delete("minPrice");
      params.delete("maxPrice");
      const newPath = params.toString()
        ? `${pathName}?${params.toString()}`
        : pathName;
      router.replace(newPath, { scroll: false });
    } else {
      const params = new URLSearchParams(searchParams);
      params.set("minPrice", minPrice.toString());
      params.set("maxPrice", maxPrice.toString());
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [minPrice, maxPrice, pathName, router, searchParams]);

  const handleChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const newValueArray = newValue as number[];
      setValue(newValueArray);
    },
    []
  );

  const handleChangeCommitted = useCallback(
    (event: React.SyntheticEvent | Event, newValue: number | number[]) => {
      if (Array.isArray(newValue)) {
        dispatch(
          setPriceRange({
            minPrice: newValue[0],
            maxPrice: newValue[1],
          })
        );
      }
    },
    [dispatch]
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
        <span>${minPrice}</span>
        <span>${maxPrice}</span>
      </div>
    </Box>
  );
}

export default memo(RangeSlider);
