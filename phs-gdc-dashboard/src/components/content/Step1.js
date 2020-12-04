import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import myData from "../../resources/data2";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckBoxOutlineBlankIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CheckBoxIcon from '@material-ui/icons/CheckBox';

export default function Step1(props) {

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const useStyles = makeStyles((theme) => ({
    formControl: {
      textAlign: 'left',
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState('zip code');
  const [values, setValues] = React.useState('');

  const handleChangeVariableSelect = (event) => {
    setVariable(event.target.value);
  };

  const handleChangeValuesField = (event) => {
    setValues(event.target.value);
  };

  const phsVariables = ["zip code"];

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Enter or select the variable that you want to use to expand your original data with data from Data Commons</h4>
      <FormControl className={classes.formControl}>
        <Autocomplete
          id="variable-select"
          options={phsVariables}
          disableCloseOnSelect
          value={variable}
          getOptionLabel={(option) => option}
          style={{maxWidth: 400 }}
          renderInput={(params) => (
            <TextField {...params}  variant="outlined" label="Variables" placeholder="" />
          )}
        />
        {/*<InputLabel id="label-variable">Variable</InputLabel>*/}
        {/*<Select*/}
        {/*  labelId="label-variable"*/}
        {/*  id="variable-select"*/}
        {/*  value={variable}*/}
        {/*  variant="outlined"*/}
        {/*  onChange={handleChangeVariableSelect}>*/}
        {/*  <MenuItem value={"zip code"}>zip code</MenuItem>*/}
        {/*</Select>*/}
        <FormHelperText>Select a PHS variable from the list</FormHelperText>
        <br/>
        <TextField
          id="standard-multiline-flexible"
          label="Variable values"
          multiline
          rowsMax={10}
          rows={6}
          value={values}
          variant="outlined"
          onChange={handleChangeValuesField}/>
        <FormHelperText>Copy-paste the variable values (one per line)</FormHelperText>
      </FormControl>
    </div>
  );
}