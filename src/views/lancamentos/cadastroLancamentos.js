import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/select-menu'
import LancamentoService from '../../app/service/lancamentoService'
import {withRouter} from 'react-router-dom'
import * as messages from '../../components/toastr'
import LocalStorageService from '../../app/service/localstorageService'

class CadastroLancamentos extends React.Component {

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    componentDidMount() {
        const params = this.props.match.params
        if(params.id) {
            this.service.obterPorId(params.id)
                .then(response => {
                    this.setState({...response.data, atualizando : true})
                }).catch(error => {
                    messages.mensagemErro(error.response.data)
                })
        }
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem("_usuario_logado")

        const {descricao, valor, mes, ano, tipo} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

        this.service
            .salvar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso("Lançamento cadastrado com sucesso!")
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    atualizar = () => {
        const {descricao, valor, mes, ano, tipo, status, id, usuario} = this.state;
        const lancamento = {descricao, valor, mes, ano, tipo, status, id, usuario}

        this.service
            .atualizar(lancamento)
            .then(response => {
                this.props.history.push('/consulta-lancamentos')
                messages.mensagemSucesso("Lançamento atualizado com sucesso!")
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({[name]: value})
    }

    render() {
        const tipos = this.service.obterListaTipos();
        const meses = this.service.obterListaMeses();

        return (
            <Card title={this.state.atualizando ? "Atualização de lançamento" : "Cadastro de Lancamento"}>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao" 
                                    name="descricao" 
                                    value={this.state.descricao}
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input id="inputAno" 
                                    name="ano" 
                                    value={this.state.ano}
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" 
                                        name="mes" 
                                        value={this.state.mes}
                                        onChange={this.handleChange}
                                        lista={meses} 
                                        className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input id="inputValor" 
                                    name="valor" 
                                    value={this.state.valor}
                                    onChange={this.handleChange}
                                    type="text" 
                                    className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" 
                                        name="tipo" 
                                        value={this.state.tipo}
                                        onChange={this.handleChange}
                                        lista={tipos} 
                                        className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input id="inputStatus" 
                                    name="status" 
                                    value={this.state.status}
                                    type="text" 
                                    className="form-control" 
                                    disabled />
                        </FormGroup>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            { this.state.atualizando ?
                                (
                                    <button onClick={this.atualizar} className="btn btn-success">Atualizar</button>
                                ) : (
                                    <button onClick={this.submit} className="btn btn-success">Salvar</button>
                                )
                            }
                            
                            <button onClick={e => this.props.history.push('/consulta-lancamentos')} className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroLancamentos) 