import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TopicsSelector from "./TopicsSelector";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

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
    <>
      <CardHeader className={"stepHeader"}
                  title={props.title}
                  avatar={
                    <Avatar aria-label="step2">2</Avatar>
                  }
      />
      <p className={"stepSubHeader"}>Select the Data Commons variables you want to retrieve values from</p>
      <CardContent>
        <div className={classes.topics}>
          <TopicsSelector setDcVariableNames={props.setDcVariableNames}
                          showDcVariableNamesError={props.showDcVariableNamesError}
                          validateStep2DcVariableNames={props.validateStep2DcVariableNames}/>
        </div>
      </CardContent>
    </>
  );
}