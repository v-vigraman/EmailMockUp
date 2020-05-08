import React, { memo } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CreateUser from './app/pages/CreateUser'
import MailPage from './app/pages/MailPage'

const routes = (routeProps) => (
    <Switch>
        <Route path='/create' exact component={(props) => <CreateUser {...props} {...routeProps}/>} />
        <Route path='/mail' exact component={(props) => <MailPage {...props} {...routeProps}/>} />
        <Redirect from="/" to="/create" />
    </Switch>
)

export default memo(routes)