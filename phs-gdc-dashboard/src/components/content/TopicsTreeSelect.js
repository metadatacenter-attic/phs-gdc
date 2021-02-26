import React, {useCallback} from "react";
import statVarsTree from './../../resources/dc_statvars_tree_select.json';
import '../../css/topicsTreeSelect.css'
import 'react-dropdown-tree-select/dist/styles.css'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import {ReactDropdownTreeSelectMemoized} from "./dropdownTree.container";



function TopicsTreeSelect(props) {

  //let selectedNodes;

  const [dcVarNames, setDcVarNames] = React.useState([]);
  //
  // const onChange0 = (currentNode, selectedNodes) => {
  //   console.log('onChange::', currentNode, selectedNodes)
  //   // setDcVarNames(selectedNodes.filter(function (node) {
  //   //       return node.nodeType === 'variable';
  //   //     }));
  //   console.log('number of selected nodes', selectedNodes.length);
  //   selectedNodes.filter(function (node) {
  //     console.log('node',node);
  //     return node.nodeType === 'variable';
  //   });
  // }

  // const onChange = React.useMemo((currentNode, selectedNodes) => {
  //   selectedNodes.filter(node => node.nodeType === 'variable');
  //   console.log('selectedNodes', selectedNodes);
  // }, []);

  const handleChange = React.useMemo(
    () => (_, selectedNodes) => {
      //setDcVarNames(selectedValues.map(val => val.label));
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

  // const onChange = (_, selectedNodes) => {
  //   selectedNodes.filter(node => node.nodeType === 'variable');
  //   console.log('selectedNodes', selectedNodes);
  // };

  const onAction = (node, action) => {
    console.log('onAction::', action, node)
  }
  const onNodeToggle = currentNode => {
    console.log('onNodeToggle::', currentNode)
  }

  const onBlur = () => {
    console.log('onBlur')

    //props.setDcVariableNames(selectedNodes);
    //props.validateStep2DcVariableNames();
  }

  return (
    <div style={{height: 300,textAlign: "left"}}>

      <ReactDropdownTreeSelectMemoized
        className="statvars-tree"
        mode="hierarchical"
        data={statVarsTree} onChange={handleChange}
      />

    </div>
  );
}

export default TopicsTreeSelect;
