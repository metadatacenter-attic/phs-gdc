import React from 'react';
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import './App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f4f6f8"
  },
}));

export default function App() {
  const classes = useStyles();

  const [settingsState, setSettingsState] = React.useState({
    includeDates: true,
    includeDatesOption: 'column',
    includeProvenance: true,
  });

  return (
    <div className={`${classes.root} content`}>
      <AppHeader
        settingsState={settingsState} 
        setSettingsState={setSettingsState}
      />
      <AppContent
        settingsState={settingsState}
      />
    </div>
  );
}
