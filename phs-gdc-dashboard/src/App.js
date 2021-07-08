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
  return (
    <div className={`${classes.root} content`}>
      <AppHeader/>
      <AppContent/>
    </div>
  );
}
