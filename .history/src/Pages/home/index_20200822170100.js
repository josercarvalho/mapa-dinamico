import React, { Component, useState, useEffect } from "react";
import { DataTable } from "react-data-table-component";
import data from "../../data/locais.json";


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
          data={data}
        />
      </div>
    );
  }
}
