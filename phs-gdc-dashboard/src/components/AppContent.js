import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Step1 from "./content/Step1";
import Step2 from "./content/Step2";
import Step3 from "./content/Step3";
import {DEFAULT_INDEX_VARIABLE_NAME} from "../constants";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "4vh",
  },
  card: {
    height: "100%",
    color: theme.palette.text.secondary,
  },
}));

export default function AppContent(props) {
  const classes = useStyles();

  const [phsVariableValues, setPhsVariableValues] = React.useState('');
  const [phsVariableName, setPhsVariableName] = React.useState(DEFAULT_INDEX_VARIABLE_NAME);
  const [showPhsVariableValuesError, setShowPhsVariableValuesError] = React.useState(false);
  const [showLocationsError, setShowLocationsError] = React.useState(false);
  const validateStep1VariableValues = () => {
    let isValid = phsVariableValues && phsVariableValues.length > 0 ? true : false;
    setShowPhsVariableValuesError(!isValid);
    setShowLocationsError(!isValid);
    return isValid;
  };

  const [dcVariableNames, setDcVariableNames] = React.useState();
  const [showDcVariableNamesError, setShowDcVariableNamesError] = React.useState(false);
  const validateStep2DcVariableNames = () => {
    let isValid = dcVariableNames && dcVariableNames.length > 0 ? true : false;
    setShowDcVariableNamesError(!isValid);
    return isValid;
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        
        {/* Locations card */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Locations"
              subheader="Specify locations for Data Commons data retrieval"
            />
            <CardContent>
              <Step1
                setPhsVariableName={setPhsVariableName}
                setPhsVariableValues={setPhsVariableValues}
                showPhsVariableValuesError={showPhsVariableValuesError}
                setShowPhsVariableValuesError={setShowPhsVariableValuesError}
                showLocationsError={showLocationsError}
                setShowLocationsError={setShowLocationsError}
                validateStep1VariableValues={validateStep1VariableValues}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Statistical variables card */}
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardHeader
              title="Variables"
              subheader="Specify statistical variables for Data Commons data retrieval"
            />
            <CardContent>
              <Step2
                setDcVariableNames={setDcVariableNames}
                showDcVariableNamesError={showDcVariableNamesError}
                validateStep2DcVariableNames={validateStep2DcVariableNames}
              />
            </CardContent>
          </Card>
        </Grid>
        
        {/* Bottom button panel */}
        <Grid item xs={12}>
          <Paper>
            <Step3 
              phsVariableName={phsVariableName}
              phsVariableValues={phsVariableValues}
              dcVariableNames={dcVariableNames}
              validateStep1VariableValues={validateStep1VariableValues}
              validateStep2DcVariableNames={validateStep2DcVariableNames}
              showValidationErrorMsg={showLocationsError || showDcVariableNamesError}
              settingsState={props.settingsState}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}