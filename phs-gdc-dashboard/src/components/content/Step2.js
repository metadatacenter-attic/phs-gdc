import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TopicsTreeSelect from "./TopicsTreeSelect";

export default function Step2(props) {

  const useStyles = makeStyles((theme) => ({
    topics: {
      marginRight: theme.spacing(1),
      textAlign: 'center'
    },
    topicsTree: {
      marginTop: theme.spacing(4),
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.topics}>
      <div className={classes.topicsTree}>
        <TopicsTreeSelect
          setDcVariableNames={props.setDcVariableNames}
          showDcVariableNamesError={props.showDcVariableNamesError}
          validateStep2DcVariableNames={props.validateStep2DcVariableNames}
        />
      </div>
    </div>
  );
}