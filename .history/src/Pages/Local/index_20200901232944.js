import React, { useState, useEffect } from "react";
import "./index.css";
import MapaLocal from "../mapa-local";
import { navigate } from "hookrouter";
import { Button } from "reactstrap";
import Data from "../../data/locais.json";
import axios from "axios";
import config from "../../componentes/config";
import "font-awesome/css/font-awesome.min.css";
import ModalDescricaoLocal from "../../componentes/modal-descricao-local";
// import Galeria from "./galeria";

function InfoLocal(props) {
  const [dadosLocal, setDadosLocal] = useState();

  useEffect(() => {
    async function obterDadosLocal() {
      try {
        const dados = await axios.get(
          `${config.API_URL_BASE}info-local/${props.latlng}?apiKey=${config.API_KEY}`
        );
        setDadosLocal(dados);
      } catch (error) {
        alert("Erro obtendo dados.");
        navigate("/");
      }      
    }
    // async function obterDadosLocal() { 
    //   const dados = await Data.filter(
    //     (bairro) => bairro.latlng === props.latlng
    //   );
    //   setDadosLocal(dados);
    // }

    if (!dadosLocal) {
      obterDadosLocal();
    }
  }, [dadosLocal, props.latlng]);

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
