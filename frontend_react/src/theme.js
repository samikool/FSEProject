import { createMuiTheme } from '@material-ui/core/styles';
const palette = {
    primary: {
      main: '#B71C1C',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#EEEEEE',
      contrastText: '#B71C1C'
    }
  };
  const themeName = 'first_aid';
  
const theme = createMuiTheme({palette, themeName});
export default theme;