import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TopicsSelector from "./TopicsSelector";

export default function Step2(props) {

  const useStyles = makeStyles((theme) => ({
    topics: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    }
  }));

  const classes = useStyles();

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the Data Commons variables you want to retrieve values from</h4>
      {/*<TopicsTree/>*/}
      <div className={classes.topics}>
        <TopicsSelector setDcVariableNames={props.setDcVariableNames}/>
      </div>
    </div>
  );
}