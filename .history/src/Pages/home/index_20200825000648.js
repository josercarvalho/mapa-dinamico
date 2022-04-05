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
  Label,
  Input,
  InputGroupAddon,
  InputGroupAddon,
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
      searchNome: "",
      searchBairro: "",
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

  updateSerachNome(event) {
    this.setState({ searchNome: event.target.value.substr(0, 20) });
  }

  mostrarMapa = (e) => {
    // const local = this.state.dados.find(
    //   (local) =>
    //     local.latlng[0] === e.latlng.lat && local.latlng[1] === e.latlng.lng
    // );
    return navigate(`/info-local/${e.latlng}`);
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
            <Row form>
              <Col md={6}>
                <Input
                  type="text"
                  placeholder="Localizar por Nome..."
                  value={this.state.searchNome}
                  onChange={this.updateSerachNome.bind(this)}
                />
              </Col>
              <Col md={6}>
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Localizar por Bairro..."
                    value={this.state.searchBairro}
                  />
                  <InputGroupAddon addonType="prepend">
                    <Button><i class="fa fa-search" aria-hidden="true"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
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
            <FormGroup>
              <Label>Nome:</Label>
              <Input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.nome}
              />
            </FormGroup>

            <FormGroup>
              <Label>Endereço:</Label>
              <Input
                // className="form-control"
                type="textarea"
                readOnly
                value={this.state.form.endereco}
              />
            </FormGroup>

            <FormGroup>
              <Label> Sessões:</Label>
              <Input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.sessoes}
              />
            </FormGroup>

            <FormGroup>
              <Label> Eleitores:</Label>
              <Input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.eleitores}
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
