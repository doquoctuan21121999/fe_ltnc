import React, { useEffect, useState } from "react";
import { Select } from "antd";

export const SubSelect = ({
  select = [],
  list = [],
  onChange,
  className = "",
  placeholder = "",
  disable,
}) => {
  const [state, setState] = useState({ list });

  useEffect(() => {
    const newList = list.filter(
      (item) => select.findIndex((i) => i.value === item.value) === -1
    );

    setState({ ...state, list: newList });
  }, [list]);

  const handleChange = (value) => {
    const newList = state.list.filter((item) => item.value !== value);
    const selectItem = list.find((item) => item.value === value);
    setState({ list: newList, label: selectItem.label });
  };

  return (
    <Select
      disabled={disable}
      className={className}
      placeholder={placeholder}
      options={state.list}
      value={state.label}
      onChange={(item) => {
        handleChange(item);
        onChange(item);
      }}
    ></Select>
  );
};
