import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import myData from './../../resources/data.json';

const useStyles = makeStyles({
  root: {
    textAlign: "left",
    height: 110,
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
      {myData.map((node) => renderTree(node))}
    </TreeView>
  );
}