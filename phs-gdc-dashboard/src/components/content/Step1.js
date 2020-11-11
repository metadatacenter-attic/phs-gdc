import React from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";

export default function Step1(props) {

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  const [variable, setVariable] = React.useState('');

  const handleChange = (event) => {
    setVariable(event.target.value);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <h4>Enter or select the variables that provide indices about geospatial or temporal context</h4>
      <FormControl className={classes.formControl}>
        <InputLabel id="label-variable">Variable name</InputLabel>
        <Select
          labelId="label-variable"
          id="variable-select"
          value={variable}
          onChange={handleChange}>
          <MenuItem value={"zip code"}>zip code</MenuItem>
          <MenuItem value={"variable2"}>variable2</MenuItem>
          <MenuItem value={"variable3"}>variable3</MenuItem>
        </Select>
        <FormHelperText>Select a PHS variable from the list</FormHelperText>
      </FormControl>





    </div>
  );
}