import React from "react";
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

function modalDetalhes(props) {
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

export default modalDetalhes;
