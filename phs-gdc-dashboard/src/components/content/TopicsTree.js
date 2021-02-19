import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import statVars from './../../resources/dc_statvars_tree.json';

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

export default function TopicsTree() {
  const classes = useStyles();

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  return (
    <TreeView
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {statVars.map((node) => renderTree(node))}
    </TreeView>
  );
}