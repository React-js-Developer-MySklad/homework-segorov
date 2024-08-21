import React, { useState } from 'react';

import './app.module.css';

import Modal from './components/modal/modal';
import AddButton from './components/add-button/add-button';
import {Table} from './components/table/table';
import Logo from '@assets/header-logo.svg';
import data from './data-model/data.json';
import {Contragent} from './data-model/contragent';

const contragents: Array<Contragent> = data;


//протаскивать функцию удаления такое себе
const App  = () => {
    const [state, setState] = useState({
        //отображаем модальное окно
        showModal: false,
        //храним список контрагентов
        contragents: contragents,
        currentContragent: null,
        counter: 2
    });

    const showModalFunction = (sModal: boolean) => {
        setState({
            ...state,
            currentContragent: null,
            showModal: sModal,
        });
    }

    const removeContragent = (contragent: Contragent) => {
        setState({
            ...state,
            contragents: state.contragents.filter((agent) => agent.id !== contragent.id)
        });
    }

    const editContagent = (contragent: Contragent) => {
        setState({
            ...state,
            showModal: true,
            currentContragent: contragent,
        });
    }

    const addContragent = (contragent: Contragent) => {
        if (!contragent.id) {
            contragent.id = state.counter;
        };
        setState({
            ...state,
            showModal: false,
            contragents: state.currentContragent ? state.contragents.map(c => c.id === state.currentContragent.id ? contragent: c) : [...state.contragents, contragent],
            counter: state.currentContragent ? state.counter : state.counter + 1,
            currentContragent: null,
        });
    }

    return (
        <>
            <header>
                <div>
                    <img src={Logo} alt="MoySklad Logo" className="logo"/>
                </div>
                <AddButton onClick={() => showModalFunction(true)}/>
            </header>
            <main>
                <Table contragents={state.contragents} removeContragent={removeContragent} onRowClick={editContagent}/>
                {state.showModal && <Modal closeFunction={() => showModalFunction(false)} contragent={state.currentContragent} addFunction={addContragent}/>}
            </main>
            <footer></footer>
        </>
    );
};
export default App;