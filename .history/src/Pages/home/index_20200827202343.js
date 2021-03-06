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
      searchBairro: [],
      selectedBairro: "",
      totalBairro: [],
      modalDetalhes: false,
      totalEleitores: 0,
      form: {
        id: "",
        latlng: "",
        endereco: "",
        eleitores: "",
        sessoes: "",
      },
      formBairro: {
        id: "",
        bairro: "",
        eleitores: "",
        sessoes: "",
      },
      erro: null,
    };
    this.changeBairro = this.changeBairro.bind(this);
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
    this.setState({
      searchBairro: this.state.dados.find(
        (bairro) => bairro.nome === event.target.value
      ),
    });
    this.setState({
      totalEleitores: this.state.searchBairro.reduce(
      (prevVal, elem) => prevVal + elem.eleitores,
      0
    );
    }) 
    console.log(totalEleitores);
  }

  render() {
    let filtro = this.state.dados.filter((dado) => {
      return (
        dado.nome.toLowerCase().indexOf(this.state.searchNome.toLowerCase()) !==
        -1
      );
    });

    // let bairros = this.state.dados.filter( function( elem, index, arr ) {
    //   return arr.indexOf(elem.bairro) === index;
    // });

    const searchBairro = [
      "ALTO DO TURU",
      "ARA??AGY",
      "BOM JARDIM",
      "CANAVIEIRA",
      "CENTRO",
      "COHATRAC V",
      "GUARAPIRANGA",
      "ITAPARY",
      "ITAPIRAC??",
      "JOTA LIMA",
      "J. CAMARA",
      "JARDIM TROPICAL",
      "JU??ATUBA",
      "KIOLA COSTA",
      "LARANJAL",
      "MAIOBINHA",
      "MARACAJ??",
      "MATA",
      "MATINHA",
      "MIRITIUA",
      "MOROPOIA",
      "NOVA TERRA",
      "NOVO COHATRAC",
      "PANAQUATIRA",
      "PARQUE JAIR -VILA MAIOBA DO JENIPAPEIRO",
      "PARQUE VIT??RIA",
      "PI??ARREIRA",
      "PINDA??",
      "POVOADO DE SANTA MARIA",
      "QUINTA DA BOA VISTA",
      "RIO S??O JO??O",
      "SANTANA",
      "S??O JOS?? DOS INDIOS",
      "SITIO DO APICUM",
      "TIJUP?? QUEIMADO",
      "TRIZIDELA DA MAIOBA",
      "TURI??BA",
      "VILA ALONSO COSTA",
      "VILA CAFETEIRA",
      "VILA COLETORA",
      "VILA DOUTOR JOS?? SILVA",
      "VILA DR. JULINHO",
      "VILA FLAMENGO",
      "VILA KIOLA",
      "VILA OPER??RIA",
      "VILA ROSEANA SARNEY",
      "VILA SANTA TEREZINHA",
      "VILA S??O JOS??",
      "VILA S??O LU??S",
      "VILA SARNEY FILHO 1",
      "VILA SARNEY FILHO 2",
    ];

    return (
      <>
        <Container>
          <br />
          <Form>
            <Row form>
              <Col md={6}>
                <Input
                  type="text"
                  placeholder="Localizar por Nome ..."
                  value={this.state.searchNome}
                  onChange={this.updateSerachNome.bind(this)}
                />
              </Col>
              <Col md={6}>
                <Input
                  type="select"
                  value={this.state.selectedBairro}
                  onChange={this.changeBairro}
                >
                  <option value="">-- Selecione o bairro -- </option>
                  {searchBairro.map((row, index) => {
                    return <option key={index}>{row}</option>;
                  })}
                </Input>
              </Col>
            </Row>
          </Form>
          <br />
          <Table responsive striped hover size="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endere??o</th>
                <th>A????o</th>
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
                        title="Informa????es"
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
              <h3>Detalhes do Col??gio Eleitoral</h3>
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
              <Label>Endere??o:</Label>
              <Input
                // className="form-control"
                type="textarea"
                readOnly
                value={this.state.form.endereco}
              />
            </FormGroup>

            <FormGroup>
              <Label> Sess??es:</Label>
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
