import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import {DEFAULT_INDEX_VARIABLE_NAME, INDEX_VARIABLES} from "../../constants";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";
import states from './../../resources/locationData/allStates.json';
import stateZipCodes from './../../resources/locationData/zipCodesByState.json';
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default function Step1(props) {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
  const checkedIcon = <CheckBoxIcon fontSize="small"/>;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: 'left',
      margin: theme.spacing(1),
      maxWidth: 500,
      minWidth: 300,
    },
    separator: {
      margin: theme.spacing(2),
    },
    select: {}
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState(DEFAULT_INDEX_VARIABLE_NAME);
  const [valueOptionRadio, setValueOptionRadio] = React.useState('optionEnter');
  const [state, setState] = React.useState('');
  // const [selectedStates, setSelectedStates] = React.useState();
  const [variableValues, setVariableValues] = React.useState(''); // content of textfield

  const handleChangeVariableSelect = (event) => {
    setVariable(event.target.value);
    props.setPhsVariableName(event.target.value);
  };

  const handleChangeValuesOptionRadio = (event) => {
    setValueOptionRadio(event.target.value);
  };

  const handleChangeStateSelect = (event) => {
    setState(event.target.value);
  };

  const handleChangeStatesSelect = (states) => {
    let valuesArray = [];
    states.map(state => {
      valuesArray = valuesArray.concat(stateZipCodes[state.abbreviation]);
    });
    props.setPhsVariableValues(valuesArray);
  };

  const handleChangeValuesField = (event) => {
    setVariableValues(event.target.value);
    if (variableValues != null && variableValues.trim().length > 0) {
      let valuesArray = variableValues.split(/\r?\n/);
      props.setPhsVariableValues(valuesArray);
    } else {
      props.setPhsVariableValues([]);
    }
  };

  const phsIndexVariables = INDEX_VARIABLES;

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the variable that will connect your data to Data Commons data</h4>
      <FormControl className={classes.formControl}
                   variant="outlined" /* if the variant is omitted here, the label of the select field is misaligned */>
        <InputLabel id="variable-select-label">Variable</InputLabel>
        <Select
          labelId="variable-select-label"
          id="variable-select-id"
          value={variable}
          onChange={handleChangeVariableSelect}
          variant="outlined"
          className={classes.select}
          label="Variable">
          {Object.keys(phsIndexVariables).map((varKey) =>
            <MenuItem key={varKey} value={varKey}
                      disabled={!phsIndexVariables[varKey].enabled}>{phsIndexVariables[varKey].uiLabel}</MenuItem>
          )};
        </Select>
        {/*<FormHelperText>Select a PHS variable from the list</FormHelperText>*/}
      </FormControl>
      <div className={classes.separator}/>

      <FormControl className={classes.formControl}>
        <FormLabel component="legend">Variable values</FormLabel>
        <RadioGroup value={valueOptionRadio} onChange={handleChangeValuesOptionRadio}>
          <FormControlLabel value="optionEnter" control={<Radio/>} label="Enter values by hand"/>
          <FormControlLabel value="optionSelect" control={<Radio/>} label="Use all values from a given territory"/>
        </RadioGroup>
      </FormControl>

      {/*<FormControl className={classes.formControl} variant="outlined">*/}
      {/*  {valueOptionRadio === "optionSelect" &&*/}
      {/*  <>*/}
      {/*    <InputLabel>State</InputLabel>*/}
      {/*    <Select*/}
      {/*      labelId="values-select-label"*/}
      {/*      id="values-select-id"*/}
      {/*      value={state}*/}
      {/*      onChange={handleChangeStateSelect}*/}
      {/*      variant="outlined"*/}
      {/*      className={classes.select}*/}
      {/*      label="State">*/}
      {/*      {states.map((item) =>*/}
      {/*        <MenuItem key={item.abbreviation} value={item.abbreviation}>{item.name}</MenuItem>*/}
      {/*      )};*/}
      {/*    </Select>*/}
      {/*    /!*<FormHelperText>Select a state from the list</FormHelperText>*!/*/}
      {/*  </>*/}
      {/*  }*/}
      {/*</FormControl>*/}

      <FormControl className={classes.formControl}>
        {valueOptionRadio === "optionEnter" &&
        <>
          <TextField
            id="standard-multiline-flexible"
            label="Enter variable values"
            multiline
            rowsMax={20}
            rows={10}
            value={variableValues}
            variant="outlined"
            onBlur={handleChangeValuesField}
            onChange={handleChangeValuesField}/>
          <FormHelperText>Enter the values of the selected variable (one per line)</FormHelperText>
        </>
        }
      </FormControl>

      <FormControl className={classes.formControl} variant="outlined">
        {valueOptionRadio === "optionSelect" &&
        <>
          <Autocomplete
            multiple
            id="state-autocomplete-id"
            options={states}
            disableCloseOnSelect
            onChange={(event, values) => handleChangeStatesSelect(values)}
            getOptionLabel={(option) => option.name}
            renderOption={(option, {selected}) => (
              <React.Fragment>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{marginRight: 8}}
                  checked={selected}
                />
                {option.name}
              </React.Fragment>
            )}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label="States" placeholder=""/>
            )}
          />
          <FormHelperText>Select one or several US states</FormHelperText>
        </>
        }
      </FormControl>


    </div>
  );
}