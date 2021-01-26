import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
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
import {removeDuplicates, removeEmpty} from "../../utils/utils";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import FormHelperText from "@material-ui/core/FormHelperText";

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
    select: {},
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState(DEFAULT_INDEX_VARIABLE_NAME);
  const [valueOptionRadio, setValueOptionRadio] = React.useState('optionEnter');
  const [variableValues, setVariableValues] = React.useState(''); // content of textfield
  const phsIndexVariables = INDEX_VARIABLES;

  const handleChangeVariableSelect = (event) => {
    setVariable(event.target.value);
    props.setPhsVariableName(event.target.value);
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

  const handleChangeStatesSelect = (states) => {
    let valuesArray = [];
    states.map(state => (
      valuesArray = valuesArray.concat(stateZipCodes[state.abbreviation])
    ));
    props.setPhsVariableValues(valuesArray);
  };

  return (
    <div>
      <CardHeader className={"stepHeader"}
        title={props.title}
        avatar={
          <Avatar aria-label="step1">1</Avatar>
        }
      />
      <p className={"stepSubHeader"}>Select the PHS variable that will link your data to Data Commons</p>
      <CardContent>
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
          <FormHelperText>Select a variable from the list (Note: the current version is limited to zip codes)</FormHelperText>
        </FormControl>
        <div className={classes.separator}/>

        <FormControl className={classes.formControl}>
          <FormLabel component="legend">Variable values</FormLabel>
          <RadioGroup value={valueOptionRadio} onChange={handleChangeValuesOptionRadio}>
            <FormControlLabel value="optionEnter" control={<Radio color={"primary"}/>} label="Enter values by hand"/>
            <FormControlLabel value="optionSelect" control={<Radio color={"primary"}/>} label="Use all values from selected locations"/>
          </RadioGroup>
        </FormControl>

        <FormControl className={classes.formControl}>
          {valueOptionRadio === "optionEnter" &&
          <>
            <TextField
              id="standard-multiline-flexible"
              label="Variable values"
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
              helperText={"Enter the values of the selected variable (one per line)"}
            />
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
                           helperText={"Select locations (US states)"}
                           variant="outlined" label="Location" placeholder=""/>
              )}
            />
          </>
          }
        </FormControl>
      </CardContent>

    </div>
  );
}