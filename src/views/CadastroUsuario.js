import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome : "",
        email : '',
        senha : '',
        senhaRepeticao : ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {
        const {nome, email, senha, senhaRepeticao} = this.state;
        const usuario = {nome, email, senha, senhaRepeticao};

        try {
            this.service.validar(usuario)
        } catch(erro) {
            const mensagens = erro.mensagens;
            mensagens.forEach(msg => mensagemErro(msg));
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return(
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text" 
                                        className="form-control"
                                        onChange={e => this.setState({nome : e.target.value})}
                                        id="inputNome" 
                                        name="nome" />
                            </FormGroup>
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email" 
                                        className="form-control"
                                        onChange={e => this.setState({email : e.target.value})}
                                        id="inputEmail" 
                                        name="email" />
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password" 
                                        className="form-control"
                                        onChange={e => this.setState({senha : e.target.value})}
                                        id="inputSenha" 
                                        name="senha" />
                            </FormGroup>
                            <FormGroup label="Repita a senha: *" htmlFor="inputRepitaSenha">
                                <input type="password" 
                                        className="form-control"
                                        onChange={e => this.setState({senhaRepeticao : e.target.value})}
                                        id="inputRepitaSenha" 
                                        name="senhaRepeticao" />
                            </FormGroup>
                            <button onClick={this.cadastrar} 
                                    type="button" 
                                    className="btn btn-success">
                                    <i className="pi pi-save"></i> Salvar
                            </button>
                            <button onClick={this.cancelar} 
                                    type="button" 
                                    className="btn btn-danger">
                                    <i className="pi pi-times"></i> Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Card>

        )
    }

}

export default withRouter(CadastroUsuario)