import React, { useState, useEffect } from "react";
import BairroData from "../data/locais.json";
import {
  Input,
  Button,
  Label,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

// import { Container } from './styles';

function ModalDetalhes(props) {
  const [bairroData, setData] = useState();
  const [showModal, setModal] = useState(props.isOpen);

  // async function obterDadosLocal() {
  //   const res = await BairroData.filter(
  //     (bairro) => bairro.bairro === props.bairro
  //   );
  //   const data = await res.json();
  //   setData(data);
  //   setModal(true);
  // }

  useEffect(() => {
    setData(props.dados)
    setModal(props.isOpen);
  }, [props.isOpen]);

  const encerrarModal = () => {
    setModal(false);
  };

  return (
    <>
      <Modal isOpen={showModal}>
        <ModalHeader>
          <div>
            <h3>Detalhes do Bairro {props.nome}</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <Label>Nome:</Label>
            <Input
              className="form-control"
              type="text"
              readOnly
              value={props.nome}
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
              value={props.sessoes}
            />
          </FormGroup>

          <FormGroup>
            <Label> Eleitores:</Label>
            <Input
              className="form-control"
              type="text"
              readOnly
              value={props.eleitores}
            />
          </FormGroup>

          <Table responsive size="sm">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Sessões</th>
                <th>Eleitores</th>
              </tr>
            </thead>
            <tbody>
              {bairroData.map((dado, index) => (
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
          <Button outline color="secondary" onClick={() => encerrarModal()}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalDetalhes;
