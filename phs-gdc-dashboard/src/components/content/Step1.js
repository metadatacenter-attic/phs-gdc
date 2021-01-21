import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import CheckBoxOutlineBlankIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {INDEX_VARIABLES, DEFAULT_INDEX_VARIABLE_NAME} from "../../constants";

export default function Step1(props) {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
  const checkedIcon = <CheckBoxIcon fontSize="small"/>;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: 'left',
      margin: theme.spacing(1),
      maxWidth: 500,
      minWidth: 200,
    },
    selectVariable: {

    },
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState(DEFAULT_INDEX_VARIABLE_NAME);
  const [values, setValues] = React.useState('');

  const handleChangeVariableSelect = (event) => {
    setVariable(event.target.value);
    props.setPhsVariableName(event.target.value);
  };

  const handleChangeValuesField = (event) => {
    setValues(event.target.value);
    if (values != null && values.trim().length > 0) {
      let valuesArray = values.split(/\r?\n/);
      props.setPhsVariableValues(valuesArray);
    }
    else {
      props.setPhsVariableValues([]);
    }
  };

  const phsIndexVariables = INDEX_VARIABLES;

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Select the variable that will connect your data to Data Commons data</h4>
      <FormControl className={classes.formControl} variant="outlined" /* if the variant is omitted here, the label of the select field is misaligned */>
        <InputLabel id="demo-simple-select-outlined-label">Variable</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={variable}
          onChange={handleChangeVariableSelect}
          variant="outlined"
          className={classes.selectVariable}
          label="Variable">
          {Object.keys(phsIndexVariables).map((varKey) =>
          {
            if (phsIndexVariables[varKey].enabled) {
              return <MenuItem key={varKey} value={varKey}>{phsIndexVariables[varKey].uiLabel}</MenuItem>
            }
          }
          )};
        </Select>
        <FormHelperText>Select a PHS variable from the list</FormHelperText>
        <br/>
        <TextField
          id="standard-multiline-flexible"
          label="Variable values"
          multiline
          rowsMax={20}
          rows={10}
          value={values}
          variant="outlined"
          onBlur={handleChangeValuesField}
          onChange={handleChangeValuesField}/>
        <FormHelperText>Paste the values of the selected variable (one per line)</FormHelperText>
      </FormControl>
    </div>
  );
}