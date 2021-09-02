import React from 'react'

import Home from '../views/home'
import Login from '../views/login'
import CadastroUsuario from '../views/CadastroUsuario'
import consultaLancamentos from '../views/lancamentos/consultaLancamentos'
import cadastroLancamentos from '../views/lancamentos/cadastroLancamentos'
import { AuthConsumer } from './provedorAutenticacao'

import { Route, Switch, HashRouter, Redirect} from 'react-router-dom'

function RotaAutenticada({component : Component, isUsuarioAutenticado, ...props}) {
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{pathname : '/login', state : {from : componentProps.location}}} />
                )
            }
        }} />
    )
}

function Rotas(props) {

    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={consultaLancamentos} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={cadastroLancamentos} />
            </Switch>
        </HashRouter>

    )

}

const rota = () => (
    <AuthConsumer>
        {(context) => (
            <Rotas isUsuarioAutenticado={context.isAutenticado} />
        )}
    </AuthConsumer>
)

export default rota