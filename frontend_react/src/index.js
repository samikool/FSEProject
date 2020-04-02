import './index.css'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";

import Login from "./login";
import Main from "./main";
import DisasterTable from "./disasterTable";

//Theme creation
import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary:
    {
      main: '#B71C1C',
      contrastText: '#ffffff'
    },

  secondary:
    {
      main: '#EEEEEE',
      contrastText: '#B71C1C'
    }
};
const themeName = 'first_aid';

//export default createMuiTheme({ palette, themeName });

const theme = createMuiTheme({palette, themeName});
export default theme;
console.log(theme);

require('dotenv').config();

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/disasters" component={DisasterTable} />
      <Route path="/" component={Main}/>
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
