import { SearchOutlined } from "@ant-design/icons";
import React, { useRef } from "react";

const InputSearch = ({
  type = "text",
  search = () => {},
  placeholder = "Tìm kiếm",
}) => {
  const refs = useRef(null);

  const onSearch = (e) => {
    if (refs.current) {
      clearTimeout(refs.current);
    }
    refs.current = setTimeout(() => {
      search(e.target.value);
    }, 500);
  };

  return (
    <div className="search-box">
      <SearchOutlined style={{ color: "#666" }} />
      <input type={type} onChange={onSearch} placeholder={placeholder} />
    </div>
  );
};

export default InputSearch;
