import React from 'react'
import currencyFormatter from 'currency-formatter'

function LancamentosTable(props) {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, {locale:'pt-BR'})}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button type="button" 
                            title="efetivar"
                            className="btn btn-success" 
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento, 'EFETIVADO')}>
                            <i className="pi pi-check"></i>
                    </button>
                    <button type="button" 
                            title="cancelar"
                            className="btn btn-warning" 
                            disabled={lancamento.status !== 'PENDENTE'}
                            onClick={e => props.alterarStatus(lancamento, 'CANCELADO')}>
                            <i className="pi pi-times"></i>
                    </button>
                    <button type="button" 
                            title="editar"
                            className="btn btn-primary" 
                            onClick={e => props.editAction(lancamento.id)}>
                            <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button" 
                            title="excluir"
                            className="btn btn-danger" 
                            onClick={e => props.deleteAction(lancamento)}>
                            <i className="pi pi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descri????o</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">M??s</th>
                    <th scope="col">Situa????o</th>
                    <th scope="col">A????es</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export default LancamentosTable