import React from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";

export const ReactDropdownTreeSelectMemoized = React.memo(props => {
  return <DropdownTreeSelect {...props} />;
});
