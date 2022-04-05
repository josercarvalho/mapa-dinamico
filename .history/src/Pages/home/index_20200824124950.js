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
    })
    
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
            <FormGroup row>
              <label>Id:</label>

              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>

            <FormGroup row>
              <label sm={2}>Nome:</label>
              <input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.nome}
                sm={10}
              />
            </FormGroup>

            <FormGroup row>
              <label sm={2}>Endereço:</label>
              <input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.endereco}
                sm={10}
              />
            </FormGroup>

            <FormGroup Row>
              <label> sm={2}Sessões:</label>
              <input
                className="form-control"
                type="text"
                readOnly
                value={this.state.form.sessoes}
                sm={10}
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
