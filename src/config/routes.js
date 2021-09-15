import { Switch, Route } from 'react-router-dom'

import SignIn from '../pages/SignIn'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import Chatroom from '../pages/Chatroom'
import Navbar from '../components/Navbar'

export default (
  <div>
    {/* <Navbar/> */}
    <Switch>
      <Route
        exact
        path="/"
        render={(propsRouter) => <SignIn {...propsRouter} />}
      />
      <Route
        path="/home"
        render={(propsRouter) => <Home {...propsRouter} />}
      />
      <Route
        path="/signup"
        render={(propsRouter) => <SignUp {...propsRouter} />}
      />
      <Route
        path="/chatroom/:name"
        render={(propsRouter) => <Chatroom {...propsRouter} />}
      />
    </Switch>
  </div>
)