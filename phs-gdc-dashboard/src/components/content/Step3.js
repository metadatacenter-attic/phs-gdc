import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {getPlaceStatistics} from "../../services/dataCommonsService";
import {indexVariableValueToDcid, toTabularJsonData} from "../../utils/dataCommonsUtils";
import {jsonToCsv} from "../../utils/utils";
import SettingsIcon from '@material-ui/icons/Settings';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from "@material-ui/core/Tooltip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import DialogActions from "@material-ui/core/DialogActions";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {stackoverflowLight} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {SNIPPET_1_URL} from "../../constants";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import SettingsPopOver from "./SettingsPopOver";
import {generateRCode} from "../../services/codeGenerationService";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

export default function Step3(props) {

  const useStyles = makeStyles((theme) => ({
    item: {
      alignItems: "center",
    },
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

  const [optionsState, setOptionsState] = React.useState({
    includeDates: false
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
    setOpenCodeDialog(true);
  };

  const handleCloseCodeDialog = (value) => {
    setOpenCodeDialog(false);
  };



  function CodeDialog(props) {

    const [snippetOption, setSnippetOption] = React.useState(0);
    const handleSnippetOptionChange = (event, newValue) => {
      setSnippetOption(newValue);
    };

    return (
      <Dialog
        maxWidth={"md"}
        fullWidth={false}
        onClose={handleCloseCodeDialog}
        aria-labelledby="r-dialog-title"
        open={openCodeDialog}>
        <DialogTitle id="r-dialog-title">R code</DialogTitle>
        <DialogContent>
          <DialogContentText>Use one of the following code snippets to merge the downloaded CSV file into your data.
          </DialogContentText>
          <Tabs
            value={snippetOption}
            onChange={handleSnippetOptionChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Option 1" />
            <Tab label="Option 2" />
          </Tabs>
          <div className={classes.codeOptions}>
            <CopyToClipboard text={generateRCode(snippetOption)}>
              <Tooltip title="Copy to clipboard">
                <IconButton><FileCopyIcon fontSize={"small"}/></IconButton>
              </Tooltip>
            </CopyToClipboard>
            <Tooltip title="Show GitHub source">
              <IconButton onClick={() => window.open(SNIPPET_1_URL)}><GitHubIcon fontSize={"small"}/></IconButton>
            </Tooltip>
          </div>
          <div className={classes.codeContent}>
          <SyntaxHighlighter language="r" style={stackoverflowLight}>
            {generateRCode(snippetOption)}
          </SyntaxHighlighter>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCodeDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  function getCsvData() {
    let phsVariableDcids = props.phsVariableValues.map(v => indexVariableValueToDcid(props.phsVariableName, v));
    let uniquePhsVariableValueDcids = [...new Set(phsVariableDcids)];
    return getPlaceStatistics(props.phsVariableName, uniquePhsVariableValueDcids, props.dcVariableNames).then((data) => {
      let tabJsonData = toTabularJsonData(data, props.phsVariableName, props.phsVariableValues, props.dcVariableNames, optionsState.includeDates);
      return jsonToCsv(tabJsonData);
    })
      .catch((error) => {
        error.json().then((json) => {
          // this.setState({
          //   errors: json,
          //   loading: false
          // });
        })
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
                    <IconButton
                      aria-describedby={'settings-popover'}
                      onClick={handleClickOpenSettingsPopOver}><SettingsIcon/></IconButton>
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
            optionsState={optionsState}
            setOptionsState={setOptionsState}
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
        <CodeDialog open={openCodeDialog} onClose={handleCloseCodeDialog}/>
      </CardContent>
    </>
  );
}