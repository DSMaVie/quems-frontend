import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Tabs,
  Tab,
  ButtonGroup,
  IconButton,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import { IconFlagDE, IconFlagUK } from 'material-ui-flags';
import { AppWideSettingsContext } from '../contexts/appWideSettings';
import { AlertContext } from '../contexts/alert';
const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
  },
  tabs: {
    flexGrow: '1',
  },
  buttons: {
    flexShrink: '1',
  },
});

const TabBar = (props) => {
  const appWideSettings = useContext(AppWideSettingsContext);
  const alert = useContext(AlertContext);
  const classes = useStyles();
  const handleTabChange = (event, newTab) => {
    alert.fireAlert({
      severity: 'success',
      message: `The Tab has been changed successfully to ${newTab}!`,
    });
    console.assert(
      props.listOfTabs.includes(newTab),
      `${newTab} not in list of tabs`,
    );
    props.setTab(newTab);
  };

  return (
    <div>
      <AppBar className={props.className} position="static">
        <Toolbar className={classes.toolbar}>
          <Tabs
            className={classes.tabs}
            value={props.currentTab}
            onChange={handleTabChange}
            centered //small displays should use variant="fullWidth" instead
          >
            {props.listOfTabs.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>
          <ButtonGroup className={classes.buttons} color="secondary">
            <IconButton onClick={appWideSettings.toggleDarkMode}>
              <WbIncandescentIcon />
            </IconButton>
            <IconButton onClick={appWideSettings.toggleLang}>
              {appWideSettings.langDe ? <IconFlagUK /> : <IconFlagDE />}
            </IconButton>
          </ButtonGroup>
        </Toolbar>
      </AppBar>
    </div>
  );
};

TabBar.propTypes = {
  listOfTabs: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentTab: PropTypes.string.isRequired,
  setTab: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default TabBar;
