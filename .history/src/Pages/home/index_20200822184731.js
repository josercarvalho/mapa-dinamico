import React, { Component } from "react";
// import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  //   Modal,
  //   ModalHeader,
  //   ModalBody,
  //   FormGroup,
  //   ModalFooter,
} from "reactstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: [],
      lista: [],
      erro: null,
    };
  }

  componentDidMount() {
    fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
      .catch((erro) => this.setState({ erro }));
  }
  render() {
    const lista = this.state.dados.map((dado, index) => {
      return (
        <tr key={index}>
          <td>{dado.nome}</td>
          <td>{dado.endereco}</td>
          <td>
            <ButtonGroup>
              <Button
                title="Informações"
                outline
                color="primary"
                id={"Inf"}
                //   onClick={() => this.mostrarModalActualizar(dado)}
              >
                <i className="fa fa-info-circle"> </i>
              </Button>
              <Button
                title="Localizar no mapa"
                outline
                color="primary"
                id="map"
                // onClick={() => onMapaClick(dado)}
              >
                <i className="fa fa-street-view"></i>
              </Button>
            </ButtonGroup>
          </td>
        </tr>
      );
    });

    return (
      <>
        <Container>
          <br />
          <Row>
            <Col md={6}>
              <input
                type="text"
                placeholder="Localizar por Nome..."
                // onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
          </Row>
          <br />
          <Table responsive striped hover size="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Ação</th>
              </tr>
            </thead>
                    <tbody>{{ lista }}</tbody>
          </Table>
        </Container>
      </>
    );
  }
}