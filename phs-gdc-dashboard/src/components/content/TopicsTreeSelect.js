import React, {useCallback} from "react";
import statVarsTree from './../../resources/dc_statvars_tree_select.json';
import '../../css/topicsTreeSelect.css'
import 'react-dropdown-tree-select/dist/styles.css'
import {ReactDropdownTreeSelectMemoized} from "./dropdownTree.container";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function TopicsTreeSelect(props) {

  const handleChange = React.useMemo(
    () => (_, selectedNodes) => {
      let nodes = [];
      for (let i=0; i<selectedNodes.length; i++) {
        if (selectedNodes[i].nodeType === 'variable') {
          nodes.push(selectedNodes[i].label);
        }
      }
      props.setDcVariableNames(nodes);
    },
    []
  );

  return (
    <div style={{height: 300,textAlign: "left"}}>
      <ReactDropdownTreeSelectMemoized
        className="statvars-tree"
        mode="hierarchical"
        data={statVarsTree}
        onChange={handleChange}
      />
      <FormHelperText className="tree-helper-text">Search for variables by name or browse the hierarchy</FormHelperText>
    </div>
  );
}

