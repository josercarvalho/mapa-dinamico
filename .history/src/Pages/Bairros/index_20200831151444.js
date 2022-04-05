import React, { Component } from 'react'
import BairroData from '../../data/locais.json';

export default class Bairros(elem) extends Component {

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

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
