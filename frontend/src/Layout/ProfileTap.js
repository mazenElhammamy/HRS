import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import LeavesApplications from './LeaveApplications';
import MyLeave from './MyLeaveList';
import ProfileInfo from './ProfileInfo';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProfileTab() {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <TabContext value={value}>
          
          <AppBar position="static" style ={{background : "black"}}>
          <div className="container">
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Info" value="1" />
            <Tab label="LEAVES" value="2" />
            <Tab label="leaves requests" value="3" />
          </TabList>
          </div>
        </AppBar>
        <div >
        <TabPanel value="1"><ProfileInfo /> </TabPanel>
        <TabPanel value="2"><MyLeave /></TabPanel>
        <TabPanel value="3"><LeavesApplications /></TabPanel>    
     
          </div>
          </TabContext>
        
    </div>
  );
}

