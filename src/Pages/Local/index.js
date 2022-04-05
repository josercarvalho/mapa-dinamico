import React, { useState, useEffect } from "react";
import "./index.css";
import MapaLocal from "../mapa-local";
import { navigate } from "hookrouter";
import { Button } from "reactstrap";
import Data from "../../data/locais.json";
import "font-awesome/css/font-awesome.min.css";
import ModalDescricaoLocal from "../../componentes/modal-descricao-local";

function InfoLocal(props) {
  const [dadosLocal, setDadosLocal] = useState();

  useEffect(() => {
    async function obterDadosLocal() { 
      const dados = await Data.find(
        (bairro) => bairro.latlng === props.latlng
      );
      setDadosLocal(dados);
    }

    if (!dadosLocal) {
      obterDadosLocal();
    }
  }, [dadosLocal, props.latlng, props.nome]);

  return (
    <>
      <div className="div-botao-voltar">
        <Button color="secondary" onClick={() => navigate("/")}>
          <span className="fa fa-arrow-left"></span>
        </Button>
      </div>
      {dadosLocal && <MapaLocal latlng={props.latlng} nome={dadosLocal.nome} />}
      {dadosLocal && (
        <ModalDescricaoLocal
          nome={dadosLocal.nome}
          descricao={dadosLocal.descricao}
          eleitores={dadosLocal.eleitores}
          endereco={dadosLocal.endereco}
        />
      )}
    </>
  );
}

export default InfoLocal;
