import { ChangeEvent, useState } from "react";
import { TextField } from "@mui/material";
import { debounce } from "lodash";
import { useCallback } from "react";

import { SearchProps } from "@/types";

const Search: React.FC<SearchProps> = (props: SearchProps) => {
  const { onChange } = props;
  const [search, setSearch] = useState<string>("");

  const debounceFn = useCallback(debounce(onChange, 400), []);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(event.target.value);
    debounceFn(event.target.value);
  };

  return (
    <TextField
      sx={{
        "& .MuiInputBase-root": {
          color: "#FFE81F"
        },
        "& label": {
          color: "#FFE81F",
          fontWeight: 500
        },
        "& label.Mui-focused": {
          color: "#FFE81F"
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: "#FFE81F"
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#FFE81F"
          },
          "&:hover fieldset": {
            borderColor: "#FFE81F"
          },
          "&.Mui-focused fieldset": {
            borderColor: "#FFE81F"
          }
        }
      }}
      label='Search'
      variant='outlined'
      size='small'
      value={search}
      onChange={(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        handleChange(event)
      }
    />
  );
};

export default Search;
