import { Switch, Route } from 'react-router-dom'

import Landing from '../pages/Landing'
import Home from '../pages/Home'
import SignUp from '../pages/SignUp'

export default (
  <div>
    <Switch>
      <Route
        exact
        path="/"
        render={(propsRouter) => <Landing {...propsRouter} />}
      />
      <Route
        path="/home"
        render={(propsRouter) => <Home {...propsRouter} />}
      />
      <Route
        path="/signup"
        render={(propsRouter) => <SignUp {...propsRouter} />}
      />
      {/* <Route
        path="/chatroom"
        render={(propsRouter) => <Chatroom {...propsRouter} />}
      /> */}
    </Switch>
  </div>
)