import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import makeStyles from "@material-ui/core/styles/makeStyles";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

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

  const handleIncludeDatesCheckBoxChange = (event) => {
    props.setSettingsState({...props.settingsState, 'includeDates': event.target.checked});
  };

  const handleIncludeDatesOptionRadioChange = (event) => {
    props.setSettingsState({...props.settingsState, 'includeDatesOption': event.target.value});
  };

  const handleIncludeProvenanceCheckBoxChange = (event) => {
    props.setSettingsState({...props.settingsState, 'includeProvenance': event.target.checked});
  };

  return (
    <div className={classes.settings}>
      <h4>Export settings</h4>
      <FormControl component="fieldset" fullWidth>
        <FormGroup row className={classes.item}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.settingsState.includeDates}
                onChange={handleIncludeDatesCheckBoxChange}
                name="includeDates"
                color="primary"
              />
            }
            label="Include temporal information"
          />
          <Tooltip
                   title="For each selected variable, it includes the date when the most recent data were collected,
                   either as an additional column (e.g., Median_Income_Year) or in the column name (e.g., Median_Income_2018).">
            <HelpOutlineIcon/>
          </Tooltip>
        </FormGroup>
        <RadioGroup row
                    aria-label="includeDatesOption"
                    name="includeDatesOption"
                    value={props.settingsState.includeDatesOption}
                    onChange={handleIncludeDatesOptionRadioChange}>
          <FormControlLabel
            value="column"
            control={<Radio disabled={!props.settingsState.includeDates} color={"primary"}/>}
            label="As additional column"/>
          <FormControlLabel
            value="header"
            control={<Radio disabled={!props.settingsState.includeDates} color={"primary"}/>}
            label="In column name"/>
        </RadioGroup>
        <FormGroup row className={classes.item}>
          <FormControlLabel
            control={
              <Checkbox
                checked={props.settingsState.includeProvenance}
                onChange={handleIncludeProvenanceCheckBoxChange}
                name="includeProvenance"
                color="primary"
              />
            }
            label="Include provenance"
          />
          <Tooltip
            title="For each selected variable, it includes the corresponding data source as an additional column.">
            <HelpOutlineIcon/>
          </Tooltip>
        </FormGroup>
      </FormControl>
    </div>
  );

}
