const { Switch, Redirect } = require("react-router-dom")

import {Switch, Route, Redirect} from 'react-router-dom'
import Landing from './Components/LandingPage/LandingPage'
import Profile from './Components/Profile/Profile'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Favorites from './Components/Favorites/Favorites'
import Rate from './Components/RateUser/RateUser'
import New from './Components/NewDono/NewDono'
import Pending from './Components/PendingDonos/PendingDonos'



export default (
    <Switch>
        <Route exact path = "/" component = {Login} />
        <Route path = "/Landing" component = {Landing} />
        <Route path = "/Profile" component = {Profile} />
        <Route path = "/Register" component = {Register} />
        <Route path = "/Favorites" component = {Favorites} />
        <Route path = "/Rate" component = {Rate} />
        <Route path = "/New" component = {New} />
        <Route path = "/Pending" component = {Pending} />
    </Switch>
)