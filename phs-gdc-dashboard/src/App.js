import React from 'react';
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppFooter from "./components/AppFooter";

export default function App() {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppHeader/>
      <AppContent/>
      <AppFooter/>
    </div>
  );
}
