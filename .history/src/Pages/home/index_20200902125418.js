import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { navigate } from "hookrouter";
import localData from "../../data/locais.json";
import bairroData from "../../data/bairros.json";
import {
  Table,
  Button,
  ButtonGroup,
  Container,
  Row,
  Col,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
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
      dadosLocal: [],
      searchNome: "",
      listaBairros: [],
      selectedBairro: "",
      totalBairro: [],
      nomeBairro: "",
      modalDetalhes: false,
      addModalOpen: false,
      totEleitores: 0,
      totSessoes: 0,
      form: {
        id: "",
        latlng: "",
        endereco: "",
        eleitores: "",
        sessoes: "",
      },
      erro: null,
    };
  }

  componentDidMount() {
    this.setState({ dadosLocal: localData, listaBairros: bairroData });
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
    return navigate(`/info-local/${e.latlng}`);
  };

  changeBairro(event) {
    this.setState({ selectedBairro: event.target.value });
  }

  handleClose = () => {
    this.setState({ addModalOpen: false });
  };

  buscarPorBairro = (elem) => {
    const res = localData.filter((bairro) => bairro.bairro === elem);
    const totalEleitores = res.reduce(
      (prevVal, campo) => prevVal + campo.eleitores,
      0
    );
    const totalSessoes = res.reduce(
      (prevVal, campo) => prevVal + campo.sessoes,
      0
    );

    this.setState({
      totalBairro: res,
      nomeBairro: elem,
      totEleitores: totalEleitores,
      totSessoes: totalSessoes,
      addModalOpen: true,
      selectedBairro: "",
    });
  };

  render() {
    let filtro = this.state.dadosLocal.filter((dado) => {
      return (
        dado.nome.toLowerCase().indexOf(this.state.searchNome.toLowerCase()) !==
        -1
      );
    });

    return (
      <>
        <Container>
          <Row className="mt-3">
            <Col md={6}>
              <Input
                type="text"
                placeholder="Localizar por Nome ..."
                value={this.state.searchNome}
                onChange={this.updateSerachNome.bind(this)}
              />
            </Col>
            <Col md={6}>
              <InputGroup>
                <Input
                  type="text"
                  id="BairroId"
                  list="historico"
                  placeholder="Pesquisar por Bairro..."
                  value={this.state.selectedBairro}
                  onChange={this.changeBairro.bind(this)}
                />
                <InputGroupAddon addonType="append">
                  <Button
                    color="secondary"
                    onClick={() =>
                      this.buscarPorBairro(this.state.selectedBairro)
                    }
                  >
                    <i className="fa fa-search"></i>
                  </Button>
                  <datalist id="historico">
                    {this.state.listaBairros.map((row,  index) => {
                      return <option key={index}>{row.nome}</option>;
                    })}
                  </datalist>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </Row>

          <Table responsive striped hover size="sm" className="mt-3">
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

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label> Sessões:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.form.sessoes}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label> Eleitores:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.form.eleitores}
                  />
                </FormGroup>
              </Col>
            </Row>
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

        <Modal isOpen={this.state.addModalOpen} className="modal-xl">
          <ModalHeader>
            <div>
              <h3>Detalhes do Bairro</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <Label>Nome do Bairro:</Label>
              <Input
                className="form-control"
                type="text"
                readOnly
                value={this.state.nomeBairro}
              />
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label> Sessões:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.totSessoes}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label> Eleitores:</Label>
                  <Input
                    className="form-control"
                    type="text"
                    readOnly
                    value={this.state.totEleitores}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Table responsive size="sm">
              <thead>
                <tr>
                  <th>Nome do Colégio</th>
                  <th>Endereço</th>
                  <th>Sessões</th>
                  <th>Eleitores</th>
                </tr>
              </thead>
              <tbody>
                {this.state.totalBairro.map((dado, index) => (
                  <tr key={index}>
                    <td>{dado.nome}</td>
                    <td>{dado.endereco}</td>
                    <td>{dado.sessoes}</td>
                    <td>{dado.eleitores}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Button outline color="secondary" onClick={this.handleClose}>
              Fechar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
