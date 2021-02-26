import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import statVarsTree from './../../resources/dc_statvars_tree_custom.json';

import 'react-virtualized-tree/lib/main.css'
import Tree, {FilteringContainer} from 'react-virtualized-tree'
import Expandable from "react-virtualized-tree/lib/renderers/Expandable";
import {getAllVariableValuesByState} from "../../utils/dataCommonsUtils";
import Favorite from "react-virtualized-tree/lib/renderers/Favorite";
import {DEFAULT_INDEX_VARIABLE_NAME} from "../../constants";

import SettingsIcon from '@material-ui/icons/Settings';

import 'material-icons/css/material-icons.css'
import 'react-virtualized/styles.css'

const useStyles = makeStyles({
  root: {
    fontSize: '0.8em',
    textAlign: "left",
    height: 500,
    overflowY: 'auto',
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function TopicsTreeVirtualized() {
  console.log(statVarsTree);
  const classes = useStyles();

  const [treeState, setTreeState] = React.useState(statVarsTree);

  const handleChange = (nodes) => {
    setTreeState(nodes);
    console.log(nodes)
  };

  return (
    <>
      <div style={{height: 400, textAlign: "left"}}>
        <Tree nodes={treeState} onChange={handleChange}>
          {({style, node, ...rest}) => (
            <div style={style}>
              <Expandable node={node} {...rest}>
                 <span
                   style={{
                     marginLeft: 7,
                     fontWeight: 'normal',
                   }}>{node.name}
                   {/*{node.children.length > 0 && ' (' + node.children.length + ')'}*/}
                   {/*<SettingsIcon name="plus" onClick={handleChange} style={{marginLeft: 3}} />*/}
                </span>
              </Expandable>
            </div>
          )}
        </Tree>
      </div>
    </>
  );
}
