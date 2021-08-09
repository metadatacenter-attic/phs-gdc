import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import {DEFAULT_INDEX_VARIABLE_NAME, DEFAULT_VALUE_OPTION, INDEX_VARIABLES} from "../../constants";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import states from './../../resources/locationData/allStates.json';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {removeDuplicates, removeEmpty} from "../../utils/utils";
import CardContent from "@material-ui/core/CardContent";
import FormHelperText from "@material-ui/core/FormHelperText";
import {getAllVariableValuesByState} from "../../utils/dataCommonsUtils";
import { Typography } from "@material-ui/core";

export default function Step1(props) {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
  const checkedIcon = <CheckBoxIcon fontSize="small"/>;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: theme.spacing(4),
      textAlign: 'left',
    },
    locationValuesLabel: {
      margin: theme.spacing(0, 0, 1.5, 0),
      textAlign: 'left',
    },
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState(DEFAULT_INDEX_VARIABLE_NAME);
  const [valueOptionRadio, setValueOptionRadio] = React.useState(DEFAULT_VALUE_OPTION);
  const [variableValues, setVariableValues] = React.useState(''); // content of textfield
  const phsIndexVariables = INDEX_VARIABLES;

  const handleChangeVariableSelect = (event) => {
    setVariable(event.target.value);
    props.setPhsVariableName(event.target.value);
    // reset radio button and variable values
    setValueOptionRadio(DEFAULT_VALUE_OPTION);
    setVariableValues('');
    props.setPhsVariableValues([]);
    // reset validation
    props.setShowLocationsError(false);
    props.setShowPhsVariableValuesError(false);
  };

  const handleChangeValuesOptionRadio = (event) => {
    setValueOptionRadio(event.target.value);
    // reset variable values
    setVariableValues('');
    props.setPhsVariableValues([]);
    // reset validation
    props.setShowLocationsError(false);
    props.setShowPhsVariableValuesError(false);
  };

  const handleChangeValuesField = (event) => {
    let value = event.target.value;
    setVariableValues(value);
    if (value != null && value.trim().length > 0) {
      let valuesArray = removeDuplicates(value.split(/\r?\n/));
      valuesArray = removeEmpty(valuesArray);
      props.setPhsVariableValues(valuesArray);
    } else {
      props.setPhsVariableValues([]);
    }
  };

  const handleChangeLocationSelect = (states, variable) => {
    props.setPhsVariableValues(getAllVariableValuesByState(states, variable));
  };

  return (
      <CardContent>
        <Typography variant="h5">
          {props.title}
        </Typography>
        <Typography className="stepSubHeader">
          Specify locations for Data Commons data retrieval
        </Typography>

        <FormControl className={classes.formControl} fullWidth
                     variant="outlined" /* if the variant is omitted here, the label of the select field is misaligned */>
          <InputLabel id="location-type-select-label">Location type</InputLabel>
          <Select
            labelId="location-type-select-label"
            id="location-type-select-id"
            value={variable}
            onChange={handleChangeVariableSelect}
            variant="outlined"
            className={classes.select}
            label="Location Type">
            {Object.keys(phsIndexVariables).map((varKey) =>
              <MenuItem key={varKey} value={varKey}
                        disabled={!phsIndexVariables[varKey].enabled}>{phsIndexVariables[varKey].uiLabel}</MenuItem>
            )};
          </Select>
          <FormHelperText>Choose a location type for grouping variable data</FormHelperText>
        </FormControl>
        
        <FormControl className={classes.formControl} fullWidth>
          <FormLabel component="legend">Entering location values</FormLabel>
          <RadioGroup value={valueOptionRadio} onChange={handleChangeValuesOptionRadio}>
            <FormControlLabel value="optionEnter" control={<Radio color={"primary"}/>} label="Enter location values by hand"/>
            <FormControlLabel value="optionSelect" control={<Radio color={"primary"}/>}
                              label="Use all values from selected region (US states)"/>
          </RadioGroup>
        </FormControl>

        {valueOptionRadio === "optionEnter" &&
        <>
          <FormControl className={classes.formControl} fullWidth>
            <FormLabel className={classes.locationValuesLabel}>Location list</FormLabel>
            <TextField
              fullWidth
              id="standard-multiline-flexible"
              label="Enter values (one per line)"
              multiline
              rowsMax={20}
              rows={6}
              value={variableValues}
              variant="outlined"
              onChange={handleChangeValuesField}
              onBlur={e => {
                handleChangeValuesField(e);
                props.validateStep1VariableValues();
              }}
              error={props.showPhsVariableValuesError}
            />
            <FormHelperText className="helper-text">Example: <i>{INDEX_VARIABLES[variable]['uiValuesExample']}</i></FormHelperText>
          </FormControl>
        </>
        }

        {valueOptionRadio === "optionSelect" &&
        <>
          <Autocomplete
            multiple
            id="state-autocomplete-id"
            options={states}
            disableCloseOnSelect
            onChange={(event, values) => handleChangeLocationSelect(values, variable)}
            onBlur={props.validateStep1VariableValues}
            getOptionLabel={(option) => option.name}
            renderOption={(option, {selected}) => (
              <React.Fragment>
                <Checkbox
                  color={"primary"}
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params}
                         error={props.showLocationsError}
                         helperText={"Select region (US states)"}
                         variant="outlined" label="States" placeholder=""/>
            )}
          />
        </>
        }

      </CardContent>

  );
}