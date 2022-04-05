import React, { Component } from "react";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
// import { navigate } from "hookrouter";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Input,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: [],
      search: "",
      erro: null,
      modalDetalhes: false,
      form: {
        id: "",
        latlng: "",
        endereco: "",
        eleitores: "",
        sessoes: "",
      },
    };
  }

  mostrarModalDetalhes = (dato) => {
    this.setState({
      form: dato,
      modalDetalhes: true,
    });
  };

  encerrarModalDetalhes = () => {
    this.setState({ modalDetalhes: false });
  };

  updateSerach(event) {
    this.setState({ search: event.target.value.substr(0, 20) });
  }

  mostrarMapa = (dado) => {
    this.setState({
      form: dado,
      mostrarModalDetalhes: true,
    });
  };

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
          <Form>
            <Row>
              <Col md={6}>
                <Input
                  type="text"
                  placeholder="Localizar por Nome..."
                  value={this.state.search}
                  onChange={this.updateSerach.bind(this)}
                />
              </Col>
            </Row>
          </Form>
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
                        onClick={() => this.mostrarModalDetalhes(dado)}
                      >
                        <i className="fa fa-info-circle"> </i>
                      </Button>
                      <Button
                        title="Localizar no mapa"
                        outline
                        color="primary"
                        id="map"
                        onClick={() => this.mostrarMapa(dado)}
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

        <Modal isOpen={this.state.modalDetalhes}>
          <ModalHeader>
            <div>
              <h3>Detalhes do Colégio Eleitoral</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <Form>
              {/* <FormGroup Row>
                <label md={2}>Id:</label>
                <input
                  className="form-control"
                  readOnly
                  type="text"
                  value={this.state.form.id}
                  md={10}
                />
              </FormGroup> */}

              <FormGroup Row>
                <label smdm={2}>Nome:</label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={this.state.form.nome}
                  md={10}
                />
              </FormGroup>

              <FormGroup Row>
                <label md={2}>Endereço:</label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={this.state.form.endereco}
                  md={10}
                />
              </FormGroup>

              <FormGroup Row>
                <label md={2}> Sessões:</label>
                <input
                  className="form-control"
                  type="text"
                  readOnly
                  value={this.state.form.sessoes}
                  md={10}
                />
              </FormGroup>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button
              outline
              color="secondary"
              onClick={() => this.encerrarModalDetalhes()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
