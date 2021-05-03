import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Step1 from "./content/Step1";
import Step2 from "./content/Step2";
import Step3 from "./content/Step3";
import {DEFAULT_INDEX_VARIABLE_NAME} from "../constants";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "4vh",
  },
  card: {
    height: "100%",
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AppContent() {

  const classes = useStyles();

  // Step 1
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

  // Step 2
  const [dcVariableNames, setDcVariableNames] = React.useState();
  const [showDcVariableNamesError, setShowDcVariableNamesError] = React.useState(false);
  const validateStep2DcVariableNames = () => {
    let isValid = dcVariableNames && dcVariableNames.length > 0 ? true : false;
    setShowDcVariableNamesError(!isValid);
    return isValid;
  };

  // Step 3
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item md={4}>
          <Card className={classes.card}>
            <Step1
              title={"Select Locations"}
              setPhsVariableName={setPhsVariableName}
              setPhsVariableValues={setPhsVariableValues}
              showPhsVariableValuesError={showPhsVariableValuesError}
              setShowPhsVariableValuesError={setShowPhsVariableValuesError}
              showLocationsError={showLocationsError}
              setShowLocationsError={setShowLocationsError}
              validateStep1VariableValues={validateStep1VariableValues}
            />
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card className={classes.card}>
            <Step2 title={"Select Data Variables"}
                   setDcVariableNames={setDcVariableNames}
                   showDcVariableNamesError={showDcVariableNamesError}
                   validateStep2DcVariableNames={validateStep2DcVariableNames}
            />
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card className={classes.card}>
            <Step3 title={"Export Data"}
                   phsVariableName={phsVariableName}
                   phsVariableValues={phsVariableValues}
                   dcVariableNames={dcVariableNames}
                   validateStep1VariableValues={validateStep1VariableValues}
                   validateStep2DcVariableNames={validateStep2DcVariableNames}
                   showValidationErrorMsg={showLocationsError || showDcVariableNamesError}
            />
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}