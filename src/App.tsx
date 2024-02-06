import { EditNote } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  CssBaseline,
  Divider,
  Drawer,
  styled,
  TextareaAutosize,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  settings as defaultSettings,
  insertIds,
  mapSettingsToTree,
  Setting,
  TreeNode,
} from './MockApi';
import { ThemeSwitcherComponent } from "./themeSwitcher";
import { TreeView } from './TreeView';

const drawerWidth = 800;

const TextareaStyled = styled(TextareaAutosize)(
  ({ theme }) => `
    width: 100%;
    max-height: 80vh;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;
  `
);

const App = () => {
  const [settings, setSettings] = useState<Setting[]>(defaultSettings);
  // const [selectedSetting, setSelectedSetting] = useState<Setting | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [rawSettings, setRawSettings] = useState('');

  const prefersDarkMode = true;
  const [darkMode, setDarkMode] = useState(prefersDarkMode);

  const themeString = (b: boolean) => (b ? "dark" : "light");
  const theme = useMemo(
    () => createTheme({
      palette: {
        mode: themeString(darkMode),
      },
    }),
    [darkMode]
  );

  const toggleDarkMode = (checked: boolean) => {
    if (checked === null) setDarkMode(prefersDarkMode);
    else setDarkMode(checked);
  };

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
    <ThemeProvider theme={theme}>
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
            <ThemeSwitcherComponent useOs={false} useDark={true} themeChanger={toggleDarkMode} />
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
              <TextareaStyled
                onChange={(e) => setRawSettings(e.target.value)}
                value={rawSettings}
              />
              <Divider />
              <Box>
                <Button variant="contained" onClick={submitHandler}>
                  <span>Save</span>
                </Button>
                <Button onClick={() => setOpen(false)}>
                  <span>Cancel</span>
                </Button>
              </Box>
            </Box>
          </Drawer>
          {settings && <TreeView<Setting> nodes={nodes} onItemClick={onItemClicked} />}
          {!settings && <CircularProgress />}
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
