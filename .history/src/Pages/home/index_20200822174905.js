import React, { Component } from "react";
import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";

const Button = () => <button type="button">Download</button>;

const colunas = [
  {
    name: "Nome",
    selector: "nome",
    sortable: true,
  },
  {
    name: "Poster Button",
    button: true,
    cell: () => <Button>Download Poster</Button>,
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

  componentDidMount() {
    fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
          .catch((erro) => this.setState({ erro }));
  }
  render() {
    const { dados } = this.state;
    return (
      <div>
        <DataTable
          title="Colégios eleitorais de SJR"
          columns={colunas}
          data={dados}
        />
      </div>
    );
  }
}
