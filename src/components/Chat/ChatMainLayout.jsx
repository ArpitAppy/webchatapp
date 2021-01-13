import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { APIS } from '../../utils/apis/endpoint';
import Header from '../Header';
import ChatInput from './ChatInput';
import ChatContent from './ChatContent';
import { AccountCircle } from '@material-ui/icons';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function ChatMainLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState();

  const handleChange = (event, newValue) => {
    console.log("dfs", newValue)
    setValue(newValue);
  };

  useEffect(() => {
    axios.get(APIS._getAllUsers)
    .then(res => {
        if (res && res.data && res.data.data) {
            setUsers(res.data.data)
        }
    })
    .catch(err => {
        console.log(err)
    })
  }, [])

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
          users && users.map((el, index) => {
            return (<Tab label={el.fullName} {...a11yProps(index)} />)
          })
        }
      </Tabs>

      {
        users && users.map((el, index) => {
          return (
            <TabPanel value={value} index={index}>
              <div className="flex flex-column flex-justify-between flex-align-center">
                {/* <ChatContent data={el} /> */}
                <ChatInput />
              </div>
            </TabPanel>
          )
        })
      }
    </div>
  );
}

  
