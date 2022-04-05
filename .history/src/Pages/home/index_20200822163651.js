import React, { Component, useState, useEffect } from 'react'
import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";

const dados = fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
      .catch((erro) => this.setState({ erro }));

  
const Button = () => (
    <button type="button">Download</button>
);

const CustomTitle = ({ row }) => (
    <div>
      {}
      <div>{row.title}</div>
      <div>
        <div style={{ color: 'grey', overflow: 'hidden', whiteSpace: 'wrap', textOverflow: 'ellipses' }}>
          {}
          {row.plot}
        </div>
      </div>
    </div>
  );
  
const colunas = [
    {
        name: 'Nome',
        selector: 'nome',
        sortable: true
    },
    {
      name: 'Localização',
      button: true,
      cell: () => <Button>Download Poster</Button>,
    },
]

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Página Inicial</h1>
            </div>
        )
    }
}
