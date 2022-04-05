import React from 'react';
import { BairroData }  from '../../data/locais.json';

function Bairros(props) {

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

    const response = BairroData.filter((bairro) => bairro.nome === props);
    console.log(response);

    render() {
        return (
            <div>
                <h1>Bairros</h1>
            </div>
        )
    }
};

export default Bairros;