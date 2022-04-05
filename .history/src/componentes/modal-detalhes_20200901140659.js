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

export default function ModalDetalhes(props) {
  const [bairroData, setData] = useState();
  const [totalEleitores, setEleitores] = useState();
  const [totalSessoes, setSessoes] = useState();
  const [showModal, setModal] = useState(false);

  async function obterDadosLocal() {
    const res = await BairroData.filter(
      (bairro) => bairro.bairro === props.bairro
    );
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    obterDadosLocal();
  }, []);

  return (
    <>
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
