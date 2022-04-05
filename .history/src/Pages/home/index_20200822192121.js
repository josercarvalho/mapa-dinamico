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
  Input,
  Form,
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
      search: "",
      erro: null,
    };
  }

  updateSerach(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  componentDidMount() {
    fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
      .catch((erro) => this.setState({ erro }));
  }
  render() {
    let filtro = this.state.dados.filter((dado) => {
      return (
        dado.nome.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
      );
    });
    return (
      <>
        <Container>
          <br />
          <Row>
            <Form>
              <Col md={6}>
                <Input
                  type="text"
                  placeholder="Localizar por Nome..."
                  value={this.state.search}
                  onChange={this.updateSerach.bind(this)}
                />
              </Col>
            </Form>
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
            <tbody>
              {filtro.map((dado, index) => (
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
            </tbody>
          </Table>
        </Container>
      </>
    );
  }
}
