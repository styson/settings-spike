import { AppBar, Box, CircularProgress, CssBaseline, Divider, Drawer, Toolbar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Setting, TreeNode, getSettings } from './MockApi';
import { TreeView } from './TreeView';

const drawerWidth = 400;

const App = () => {
  const [settings, setSettings] = useState<TreeNode[] | undefined>([]);
  const [selectedSetting, setSelectedSetting] = useState<Setting | undefined>(undefined);

  useEffect(() => {
    getSettings().then(data => setSettings(data));
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            &nbsp;
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
        <Typography variant="h6" noWrap component="div">
            Explorer
          </Typography>
        </Toolbar>
        <Divider />
        {settings && <TreeView nodes={settings} />}
        {!settings && (<CircularProgress />)}
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
        <Typography paragraph>
          Editor here
        </Typography>
      </Box>
    </Box>
  );
};

export default App;