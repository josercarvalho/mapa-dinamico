import React, { Component } from 'react';
import BairroData   from '../../data/locais.json';

export default class Bairros extends Component {

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
            erro: null,
        };
    }

    const response = BairroData.filter((bairro) => bairro.nome === dado);
    console.log(response);

    render() {
        return (
            <div>
                <h1>Bairros</h1>
            </div>
        )
    };
}