// const { Switch, Redirect } = require("react-router-dom")

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LandingPage from './Components/LandingPage/LandingPage'
import Profile from './Components/Profile/Profile'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Favorites from './Components/Favorites/Favorites'
import RateUser from './Components/RateUser/RateUser'
import NewDono from './Components/NewDono/NewDono'
import PendingDonos from './Components/PendingDonos/PendingDonos'
import Dono from './Components/Dono/Dono'
import AcceptedDono from './Components/AcceptedDono/AcceptedDono'



export default (
    <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/Landing" component={LandingPage} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Register" component={Register} />
        <Route path="/Favorites" component={Favorites} />
        <Route path="/Rate/:dono_id" component={RateUser} />
        <Route path="/New" component={NewDono} />
        <Route path="/Pending" component={PendingDonos} />
        <Route path="/Dono/:dono_id" component={Dono} />
        <Route path='/AcceptedDono/:dono_id/:chat_id' component={AcceptedDono} />
        <Route render={() => <Redirect to='/' />} />
    </Switch>
)