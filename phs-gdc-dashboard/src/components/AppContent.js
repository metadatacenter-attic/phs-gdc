import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Paper from "@material-ui/core/Paper";
import Step1 from "./content/Step1";
import Step2 from "./content/Step2";
import Step3 from "./content/Step3";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "4vh",
  },
  paper: {
    minHeight: "75vh",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AppContent() {

  const classes = useStyles();

  const [phsVariableValues, setPhsVariableValues] = React.useState('');

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <Step1 title={"1. PHS Variable Selection"} setPhsVariableValues={setPhsVariableValues}/>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <Step2 title={"2. Topics Search"}/>
          </Paper>
        </Grid>
        <Grid item md={4}>
          <Paper className={classes.paper}>
            <Step3 title={"3. Attributes Selection"} phsVariableValues={phsVariableValues}/>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}