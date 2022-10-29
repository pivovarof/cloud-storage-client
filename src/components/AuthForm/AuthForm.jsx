import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import LoginForm from '../LoginForm/LoginForm';
import SignUpForm from '../SignUpForm/SignUpForm';

export default function AuthForm() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        typography: 'body1',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
        marginTop: '40px',
      }}
    >
      <div>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
            <TabList
              onChange={handleChange}
              TabIndicatorProps={{ sx: { backgroundColor: '#d1caca' } }}
              sx={{
                '& button': { color: '#787272' },
                '& button.Mui-selected': { color: '#d1caca' },
              }}
            >
              <Tab label="LOGIN" value="1" />
              <Tab label="SIGN UP" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <LoginForm />
          </TabPanel>
          <TabPanel value="2">
            <SignUpForm />
          </TabPanel>
        </TabContext>
      </div>
    </Box>
  );
}
