import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AboutDialog from "./content/AboutDialog";
import ContactUsDialog from "./content/ContactUsDialog";
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from "@material-ui/core/Tooltip";
import {GITHUB_REPO_URL} from "../constants";
import SettingsIcon from '@material-ui/icons/Settings';
import Popover from '@material-ui/core/Popover';
import SettingsPopOver from "./content/SettingsPopOver";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  bar: {
    backgroundColor: "#3849AB",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function AppHeader(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openAboutDialog, setOpenAboutDialog] = React.useState(false);
  const [openContactUsDialog, setOpenContactUsDialog] = React.useState(false);

  const [settingsPopoverAnchorEl, setSettingsPopoverAnchorEl] = React.useState(null);
  const settingsPopoverOpen = Boolean(settingsPopoverAnchorEl);
  const settingsPopoverID = settingsPopoverOpen ? 'settings-popover' : undefined;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpenAboutDialog = () => {
    setOpenAboutDialog(true);
  }

  const handleCloseAboutDialog = (value) => {
    setOpenAboutDialog(false);
  };

  const handleClickOpenContactUsDialog = () => {
    setOpenContactUsDialog(true);
  }

  const handleCloseContactUsDialog = (value) => {
    setOpenContactUsDialog(false);
  };

  const handleClickSettings = (event) => {
    setSettingsPopoverAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setSettingsPopoverAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                      aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            <MenuIcon/>
          </IconButton>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <MenuItem onClick={handleClickOpenAboutDialog}>About this project</MenuItem>
            <MenuItem onClick={handleClickOpenContactUsDialog}>Contact us</MenuItem>
          </Menu>

          <Typography variant="h6" className={classes.title}>
            Data Commons Wizard
          </Typography>

          <Tooltip title="Download settings">
            <IconButton color="inherit" onClick={handleClickSettings}><SettingsIcon /></IconButton>
          </Tooltip>

          <Tooltip title="Go to GitHub repository">
            <IconButton color="inherit" onClick={() => window.open(GITHUB_REPO_URL)}><GitHubIcon/></IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <AboutDialog openAboutDialog={openAboutDialog} handleCloseAboutDialog={handleCloseAboutDialog}/>
      <ContactUsDialog openContactUsDialog={openContactUsDialog} handleCloseContactUsDialog={handleCloseContactUsDialog}/>
      <Popover
          id={settingsPopoverID}
          open={settingsPopoverOpen}
          anchorEl={settingsPopoverAnchorEl}
          onClose={handleCloseSettings}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <SettingsPopOver 
            settingsState={props.settingsState} 
            setSettingsState={props.setSettingsState}
          />
        </Popover>
    </div>
  );
}