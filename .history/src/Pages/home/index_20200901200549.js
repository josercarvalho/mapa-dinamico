import React, { Component } from "react";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
import { navigate } from "hookrouter";
import ModalDetalhes from "../../componentes/modal-detalhes";
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
      dados: [],
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
    fetch(`${config.API_URL_BASE}locais?apiKey=${config.API_KEY}`)
      .then((dados) => dados.json().then((dados) => this.setState({ dados })))
      .catch((erro) => this.setState({ erro }));
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
    const response = this.state.dados.filter(
      (bairro) => bairro.bairro === elem
    );
    const totalEleitores = response.reduce(
      (prevVal, campo) => prevVal + campo.eleitores,
      0
    );
    const totalSessoes = response.reduce(
      (prevVal, campo) => prevVal + campo.sessoes,
      0
    );

    this.setState({
      totalBairro: response,
      nomeBairro: elem,
      totEleitores: totalEleitores,
      totSessoes: totalSessoes,
      addModalOpen: true,
      selectedBairro: "",
    });
    // this.handleClose();
  };

  render() {
    let filtro = this.state.dados.filter((dado) => {
      return (
        dado.nome.toLowerCase().indexOf(this.state.searchNome.toLowerCase()) !==
        -1
      );
    });

    const listaBairros = [
      "ALTO DO TURU",
      "ARAÇAGY",
      "BOM JARDIM",
      "CANAVIEIRA",
      "CENTRO",
      "COHATRAC V",
      "GUARAPIRANGA",
      "ITAPARY",
      "ITAPIRACÓ",
      "JOTA LIMA",
      "J. CAMARA",
      "JARDIM TROPICAL",
      "JUÇATUBA",
      "KIOLA COSTA",
      "LARANJAL",
      "MAIOBINHA",
      "MARACAJÁ",
      "MATA",
      "MATINHA",
      "MIRITIUA",
      "MOROPOIA",
      "NOVA TERRA",
      "NOVO COHATRAC",
      "PANAQUATIRA",
      "PARQUE JAIR -VILA MAIOBA DO JENIPAPEIRO",
      "PARQUE VITÓRIA",
      "PIÇARREIRA",
      "PINDAÍ",
      "POVOADO DE SANTA MARIA",
      "QUINTA DA BOA VISTA",
      "RIO SÃO JOÃO",
      "SANTANA",
      "SÃO JOSÉ DOS INDIOS",
      "SITIO DO APICUM",
      "TIJUPÁ QUEIMADO",
      "TRIZIDELA DA MAIOBA",
      "TURIÚBA",
      "VILA ALONSO COSTA",
      "VILA CAFETEIRA",
      "VILA COLETORA",
      "VILA DOUTOR JOSÉ SILVA",
      "VILA DR. JULINHO",
      "VILA FLAMENGO",
      "VILA KIOLA",
      "VILA OPERÁRIA",
      "VILA ROSEANA SARNEY",
      "VILA SANTA TEREZINHA",
      "VILA SÃO JOSÉ",
      "VILA SÃO LUÍS",
      "VILA SARNEY FILHO 1",
      "VILA SARNEY FILHO 2",
    ];

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
                    {listaBairros.map((row, index) => {
                      return <option key={index}>{row}</option>;
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

        <ModalDetalhes
          showModal={this.state.addModalOpen}
          dados={this.state.totalBairro}
          bairro={this.state.nomeBairro}
          eleitores={this.state.totEleitores}
          sessoes={this.state.totSessoes}
        />

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
