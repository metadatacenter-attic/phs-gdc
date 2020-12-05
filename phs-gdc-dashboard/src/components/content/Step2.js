import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TopicsSelection from "./TopicsSelection";

export default function Step1(props) {

  const useStyles = makeStyles((theme) => ({
    topics: {
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign: 'center'
    }
  }));

  const classes = useStyles();
  const [topic, setTopic] = React.useState('');

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the variables (topics) for which you want to retrieve contextual values</h4>
      {/*<TopicsTree/>*/}
      <div className={classes.topics}>
        <TopicsSelection/>
      </div>
    </div>
  );
}