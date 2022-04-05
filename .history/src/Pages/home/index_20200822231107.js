import React, { Component } from "react";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
import { navigate } from "hookrouter";
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
        latlng: "",
        endereco: "",
        eleitores: "",
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

  mostrarMapa = (e) => {
    let local = this.state.dados.find(
      (local) =>
        local.latlng[0] === e.latlng.lat && local.latlng[1] === e.latlng.lng
    );
    navigate(`/info-local/${local.latlng}`);
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

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div>
              <h3>Editar Registro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup>
              <label>Personaje:</label>
              <input
                className="form-control"
                name="personaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.personaje}
              />
            </FormGroup>

            <FormGroup>
              <label>Anime:</label>
              <input
                className="form-control"
                name="anime"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.anime}
              />
            </FormGroup>
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
