import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import HelpOutline from "@material-ui/core/SvgIcon/SvgIcon";
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function SettingsPopOver(props) {

  const useStyles = makeStyles((theme) => ({
    settings: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  const handleOptionsChange = (event) => {
    props.setOptionsState({...props.optionsState, [event.target.name]: event.target.checked});
  };

  return (
    <div className={classes.settings}>
      <h4>Settings</h4>
      <FormControl component="fieldset" fullWidth>
        <FormGroup row flex className={classes.item}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.optionsState.includeDates}
                onChange={handleOptionsChange}
                name="includeDates"
                color="primary"
              />
            }
            label="Include temporal information"
          />
          <Tooltip
            title="For each selected variable, it includes an additional column with the date (e.g., year) the data was collected.">
            <HelpOutline/>
          </Tooltip>
        </FormGroup>
      </FormControl>
    </div>
  );

}
