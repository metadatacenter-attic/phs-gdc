import React from "react";
import Button from "@material-ui/core/Button";
import {getPlaceStatistics} from "../../services/dataCommonsService";
import {
  generateIndexVariableDcidsToValuesMap,
  generateIndexVariableValuesToDcidsMap,
  indexVariableValueToDcid,
  toTabularJsonData
} from "../../utils/dataCommonsUtils";
import {jsonToCsv} from "../../utils/utils";
import SettingsIcon from '@material-ui/icons/Settings';
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import SettingsPopOver from "./SettingsPopOver";
import RCodeDialog from "./RCodeDialog";
import Tooltip from "@material-ui/core/Tooltip";

export default function Step3(props) {

  const useStyles = makeStyles((theme) => ({
    buttons: {
      marginTop: '2vh',
      marginBottom: '3vh',
    },
    button: {
      marginBottom: '1vh',
    },
    codeOptions: {
      textAlign: "right",
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(-2),
    },
    validationErrorMsg: {
      color: "red",
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: 1.66,
      marginTop: theme.spacing(1),
    },
    codeContent: {
      minHeight: 450,
    }
  }));

  const classes = useStyles();

  const [settingsState, setSettingsState] = React.useState({
    includeDates: false,
    includeDatesOption: 'column'
  });

  const [openCodeDialog, setOpenCodeDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // popover anchor
  const openSettingsPopOver = Boolean(anchorEl);
  const [showDownloadProgress, setShowDownloadProgress] = React.useState(false);

  const handleClickOpenSettingsPopOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettingsPopOver = () => {
    setAnchorEl(null);
  };

  const handleClickOpenCodeDialog = () => {
    if (isValid()) {
      setOpenCodeDialog(true);
    }
  };

  const handleCloseCodeDialog = (value) => {
    setOpenCodeDialog(false);
  };

  function getCsvData() {
    let indexVariableValuesToDcidsMap = generateIndexVariableValuesToDcidsMap(props.phsVariableName, props.phsVariableValues);
    let indexVariableDcidsToValuesMap = generateIndexVariableDcidsToValuesMap(props.phsVariableName, props.phsVariableValues);
    let indexVariableValueDcids = Object.keys(indexVariableDcidsToValuesMap);
    return getPlaceStatistics(props.phsVariableName, indexVariableValueDcids, props.dcVariableNames).then((data) => {
      let tabJsonData = toTabularJsonData(data, props.phsVariableName, indexVariableValuesToDcidsMap, indexVariableDcidsToValuesMap, props.dcVariableNames,
        settingsState.includeDates, settingsState.includeDatesOption);
      return jsonToCsv(tabJsonData);
    }).catch((error) => {
        console.error(error);
        //error.json().then((json) => {
        // this.setState({
        //   errors: json,
        //   loading: false
        // });
        //})
      });
  };

  function isValid() {
    let step1Valid = props.validateStep1VariableValues();
    let step2Valid = props.validateStep2DcVariableNames();
    return step1Valid && step2Valid;
  }

  function downloadDataFile() {

    if (isValid()) {
      setShowDownloadProgress(true);
      getCsvData().then(data => {
        const element = document.createElement("a");
        const file = new Blob([data], {type: 'text/csv'});
        element.href = URL.createObjectURL(file);
        element.download = "dcw_data.csv";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
        document.body.removeChild(element);
        setShowDownloadProgress(false);
      });
    }
  };

  return (
    <>
      <CardHeader className={"stepHeader"} title={props.title}
                  avatar={
                    <Avatar aria-label="step3">3</Avatar>
                  }
                  action={
                    <Tooltip title="Export settings">
                      <IconButton
                        aria-describedby={'settings-popover'}
                        onClick={handleClickOpenSettingsPopOver}><SettingsIcon/></IconButton>
                    </Tooltip>
                  }
      />
      <p className={"stepSubHeader"}>Generate and download the selected data<br/></p>
      <CardContent>
        <Popover
          id={'settings-popover'}
          open={openSettingsPopOver}
          anchorEl={anchorEl}
          onClose={handleCloseSettingsPopOver}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <SettingsPopOver
            settingsState={settingsState}
            setSettingsState={setSettingsState}
          />
        </Popover>

        <div className={classes.buttons}>
          <Button className={classes.button} disabled={showDownloadProgress} variant="outlined" color="primary"
                  onClick={downloadDataFile} size={"large"}>
            Download data
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button className={classes.button} variant="outlined" color="primary" onClick={handleClickOpenCodeDialog}
                  disabled={false} size={"large"}>
            Generate R code
          </Button>
        </div>
        <div>
          {showDownloadProgress && <CircularProgress/>}
          {props.showValidationErrorMsg &&
          <Typography className={classes.validationErrorMsg}>Please fill out all required fields</Typography>}
        </div>
        <RCodeDialog openCodeDialog={openCodeDialog}
                     handleCloseCodeDialog={handleCloseCodeDialog}
                     phsVariableName={props.phsVariableName}
                     phsVariableValues={props.phsVariableValues}
                     dcVariableNames={props.dcVariableNames}
                     settingsState={settingsState}/>

      </CardContent>
    </>
  );
}