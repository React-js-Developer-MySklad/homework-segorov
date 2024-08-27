import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import './app.module.css';

import Modal from './components/modal/modal';
import AddButton from './components/add-button/add-button';
import {Table} from './components/table/table';
import Logo from '@assets/header-logo.svg';
import data from './data-model/data.json';
import {Contragent} from './data-model/contragent';
import {useContragentApiContext} from './hooks/ContragentApiProvider';


const contragents: Array<Contragent> = [];


//сложнее стало работать с number как id (json server не поддерживает)
const App  = () => {
    // наверное не нужно прокидывать в компоненты, а получать функции из контекста в самой компаненте, но оставлю так
    const {getContragents, createContragent, updateContragent, deleteContragent} = useContragentApiContext();

    const [state, setState] = useState({
        //отображаем модальное окно
        showModal: false,
        //храним список контрагентов
        contragents: contragents,
        currentContragent: null,
    });

    const loadData = async () => {
      const contragents = await getContragents();
      setState({
        ...state,
        contragents: contragents,
        showModal: false,
        currentContragent: null
      });
    };

    useEffect(() => {
        loadData();
    }, []);

    const showModalFunction = (sModal: boolean) => {
        setState({
            ...state,
            currentContragent: null,
            showModal: sModal,
        });
    }

    const removeContragent = (contragent: Contragent) => {
        const remove = async (ctr: Contragent) => {
            const r = await deleteContragent(ctr);
            loadData();
        };
        remove(contragent);
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
            contragent.id = uuid();
            const create = async (ctr: Contragent) => {
                const result = await createContragent(ctr);
                loadData();
            };
            create(contragent);
        } else {
            const update = async (ctr: Contragent) => {
                const result = await updateContragent(ctr);
                loadData();
            }
            update(contragent);
        }
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