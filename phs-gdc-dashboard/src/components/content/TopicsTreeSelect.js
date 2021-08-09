import React from "react";
import statVarsTree from './../../resources/dc_statvars_tree_select.json';
import '../../css/topicsTreeSelect.css'
import 'react-dropdown-tree-select/dist/styles.css'
import {ReactDropdownTreeSelectMemoized} from "./dropdownTree.container";
import FormHelperText from "@material-ui/core/FormHelperText";
import {STATVARS_AVAILABILITY_SHEET} from "../../constants";

export default function TopicsTreeSelect(props) {

  const handleChange = React.useMemo(
    () => (_, selectedNodes) => {
      let nodes = [];
      for (let i = 0; i < selectedNodes.length; i++) {
        if (selectedNodes[i].nodeType === 'variable') {
          nodes.push(selectedNodes[i].label);
        }
      }
      props.setDcVariableNames(nodes);
    },
    []
  );

  return (
    <div style={{height: 300, textAlign: "left"}}>
      <ReactDropdownTreeSelectMemoized
        className="statvars-tree"
        mode="hierarchical"
        data={statVarsTree}
        onChange={handleChange}
      />
      <FormHelperText className="helper-text">
        Browse hierarchy or start typing to choose statistical variables. 
        <i>(Many statistical variables may not have data. Please see <a href={STATVARS_AVAILABILITY_SHEET} target="_blank" rel="noreferrer">variables-location availability list</a>.)</i>
      </FormHelperText>
    </div>
  );
}

