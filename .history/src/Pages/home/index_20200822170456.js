import React, { Component, useState, useEffect } from "react";
import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";

const [locais, setLocais] = useState([]);
const [search, setSearch] = useState("");
const [filteredLocais, setFilteredLocais] = useState([]);

useEffect(() => {
  fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
    .then((dados) => dados.json().then((dados) => this.setState({ dados })))
    .catch((erro) => this.setState({ erro }));
}, []);

useEffect(() => {
    filtrarLocais = dados.filter((local) => {
      return local.nome.toLowerCase().includes(search.toLowerCase());
    });
}, [search, local]);
  
const Button = () => <button type="button">Download</button>;

const CustomTitle = ({ row }) => (
  <div>
    {}
    <div>{row.title}</div>
    <div>
      <div
        style={{
          color: "grey",
          overflow: "hidden",
          whiteSpace: "wrap",
          textOverflow: "ellipses",
        }}
      >
        {}
        {row.plot}
      </div>
    </div>
  </div>
);

const colunas = [
  {
    name: "Nome",
    selector: "nome",
    sortable: true,
  },
  {
    name: "Localização",
    button: true,
    cell: () => <Button>Abrir Localr</Button>,
  },
];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: [],
      erro: null,
    };
  }
  render() {
    return (
      <div>
        <DataTable
          title="Colégios eleitorais de SJR"
          columns={colunas}
          data={dados.data}
        />
      </div>
    );
  }
}
