import React from "react";

const Filter = ({ searchInput, handleSearchChange }) => {
    return (
      <input value={searchInput} onChange={handleSearchChange} />
    )
  }

  export default Filter