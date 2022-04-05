import React from "react";
import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";

const Button = () => <button type="button">Download</button>;

const data = fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
    .then((dados) => dados.json().then((dados) => this.setState({ dados })))
    .catch((erro) => this.setState({ erro }));

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

function Home() {
    
        state = {
          dados: [],
          erro: null,
        };
    
    return (
      <div>
        <DataTable
          title="Colégios eleitorais de SJR"
          columns={colunas}
          data={data}
        />
      </div>
    );
}

export default Home;