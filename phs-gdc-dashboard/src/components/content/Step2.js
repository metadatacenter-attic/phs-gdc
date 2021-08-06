import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import TopicsTreeSelect from "./TopicsTreeSelect";
import { Typography } from "@material-ui/core";

export default function Step2(props) {

  const useStyles = makeStyles((theme) => ({
    topics: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    },
    topicsTree: {
      marginTop: theme.spacing(4),
    }
  }));

  const classes = useStyles();

  return (
    <>
      <CardContent>
        <Typography variant="h5">
          {props.title}
        </Typography>
        <Typography className="stepSubHeader">
          Specify statistical variables for Data Commons data retrieval
        </Typography>
        <div className={classes.topics}>
          <div className={classes.topicsTree}>
            <TopicsTreeSelect
              setDcVariableNames={props.setDcVariableNames}
              showDcVariableNamesError={props.showDcVariableNamesError}
              validateStep2DcVariableNames={props.validateStep2DcVariableNames}/>
          </div>
        </div>
      </CardContent>
    </>
  );
}