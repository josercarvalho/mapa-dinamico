import React, { useState, useEffect } from "react";
import BairroData from "../../data/locais.json";
import {
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

// import { Container } from './styles';

function ModalDetalhes(props) {
  const [bairroData, setData] = useState();
  const [totalEleitores, setEleitores] = useState();
  const [totalSessoes, setSessoes] = useState();
  const [showModal, setModal] = useState(props.isOpen);

  async function obterDadosLocal() {
    const res = await BairroData.filter(
      (bairro) => bairro.bairro === props.bairro
    );
    const data = await res.json();
    setData(data);
    setModal(true);
  }

  useEffect(() => {
    obterDadosLocal();
  }, [props.isOpen]);

  function encerrarModal() {
    setModal(false);
  }

  return (
    <>
      <Modal isOpen={this.showModal}>
        <ModalHeader>
          <div>
            <h3>Detalhes do Bairro e seus Colégios/Sessões</h3>
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
            onClick={() => encerrarModal()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalDetalhes;
