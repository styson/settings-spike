import {
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  settings as defaultSettings,
  Setting,
  TreeNode,
  mapSettingsToTree,
  insertIds,
} from './MockApi';
import { TreeView } from './TreeView';
import { EditNote } from '@mui/icons-material';

const drawerWidth = 800;

const App = () => {
  const [settings, setSettings] = useState<Setting[]>(defaultSettings);
  // const [selectedSetting, setSelectedSetting] = useState<Setting | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [rawSettings, setRawSettings] = useState('');

  useEffect(() => {
    setRawSettings(JSON.stringify(settings, null, 2));
  }, [settings]);

  const submitHandler = useCallback(() => {
    setSettings(insertIds(JSON.parse(rawSettings)));
    setOpen(false);
  }, [rawSettings, setSettings]);

  const onItemClicked = (node: TreeNode<Setting>) => {
    if (node?.type === 'setting') {
      console.log('Setting w/ value clicked', node.data);
    }
  };

  const nodes = useMemo(() => mapSettingsToTree(settings), [settings]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Settings Explorer
          </Typography>
          <Button onClick={() => setOpen(true)}>
            <EditNote />
          </Button>
        </Toolbar>
        <Divider />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <Box padding={3}>
            <Typography variant="h6" noWrap component="div">
              Settings Form
            </Typography>
            <textarea
              rows={20}
              cols={75}
              onChange={(e) => setRawSettings(e.target.value)}
              value={rawSettings}
            />
            <Divider />
            <Box>
              <Button onClick={() => setOpen(false)}>
                <span>Cancel</span>
              </Button>
              <Button variant="contained" onClick={submitHandler}>
                <span>Save</span>
              </Button>
            </Box>
          </Box>
        </Drawer>
        {settings && <TreeView<Setting> nodes={nodes} onItemClick={onItemClicked} />}
        {!settings && <CircularProgress />}
      </Box>
    </Box>
  );
};

export default App;
