import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import makeStyles from "@material-ui/core/styles/makeStyles";

export default function SettingsPopOver(props) {

  const useStyles = makeStyles((theme) => ({
    settings: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    item: {
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  const handleSettingsChange = (event) => {
    props.setSettingsState({...props.settingsState, [event.target.name]: event.target.checked});
  };

  return (
    <div className={classes.settings}>
      <h4>Settings</h4>
      <FormControl component="fieldset" fullWidth>
        <FormGroup row className={classes.item}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.settingsState.includeDates}
                onChange={handleSettingsChange}
                name="includeDates"
                color="primary"
              />
            }
            label="Include temporal information"
          />
          <Tooltip flex
            title="For each selected variable, it includes an additional column with the date (e.g., year) the data was collected.">
            <HelpOutlineIcon/>
          </Tooltip>
        </FormGroup>
      </FormControl>
    </div>
  );

}
