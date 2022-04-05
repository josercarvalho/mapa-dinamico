import React from 'react';
import { BairroData }  from '../../data/locais.json';

function Bairros(bairro) {

    constructor(props) {
        super(props);
        this.state = {
            localBairro: [],
            formBairro: {
                id: "",
                bairro: "",
                eleitores: "",
                sessoes: "",
            },
            erro: null
        };
    };

    const response = BairroData.filter((bairro) => bairro.nome === elem);
    console.log(response);
    // if (response.length > 0) {
    //   const totalEleitores = this.state.searchBairro.reduce(
    //     (prevVal, elem) => prevVal + elem.eleitores,
    //     0
    //   );
    //   console.log(totalEleitores);
    // }
    // return alert("Erro ao carregar!");

    render() {
        return (
            <div>
                <h1>Bairros</h1>
            </div>
        )
    }
};

export default Bairros;