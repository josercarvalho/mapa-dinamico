import React, { Component } from "react";
// import { DataTable } from "react-data-table-component";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Row, Col,
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
      erro: null,
    };
  }

  componentDidMount() {
    fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
      .catch((erro) => this.setState({ erro }));
  }
  render() {
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
          <Table responsive striped hover>
            <thead>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Ação</th>
            </thead>
            {this.state.dados.map((dado, index) => (
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
            ))}
            <tbody></tbody>
          </Table>
        </Container>
      </>
    );
  }
}
