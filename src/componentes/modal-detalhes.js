import React, { useState, useEffect } from "react";
import Data from "../data/locais.json";
import {
  Row,
  Col,
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

function ModalDetalhes(props) {
  const [bairroData, setData] = useState([]);
  const [modal, setModal] = useState(props.showModal);

  const toggle = () => setModal(!modal);

  useEffect(() => {
    async function conectar() {
      const res = await Data.filter((bairro) => bairro.bairro === props.bairro);
      // const data = await res.json()
      setData(res);
      setModal(props.showModal);
    }
    conectar();
  }, [props]);

  return (
    <>
      <Modal isOpen={modal} className="modal-xl">
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
              value={props.bairro}
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
                  value={props.sessoes}
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
                  value={props.eleitores}
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
          <Button outline color="secondary" onClick={toggle}>
            Fechar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ModalDetalhes;
