import React, { useState } from 'react';

import './table.css';
import Column from './column/column';
import Row from './row/row';
import {Contragent} from '../../data-model/contragent';
import {MouseEventHandler} from 'react';

//тип данных, хранимый в стейт
export type TableProps<Contragent> = {
    contragents: Array<Contragent>,
    removeContragent: Function,
    onRowClick: Function,
}


// по хорошему строка должна использовать колонки, чтобы составить ячейки и брать значения, но пока так
export function Table<T> ({contragents, removeContragent, onRowClick}: TableProps<Contragent>) {

    return (
        <>
            <table className="dom-table">
                <thead className="dom-table-head">
                    <tr>
                        <Column name='id'/>
                        <Column name='name'/>
                        <Column name='inn'/>
                        <Column name='address'/>
                        <Column name='kpp'/>
                        <Column name='remove'/>
                    </tr>
                </thead>
                <tbody className="dom-table-body">
                    {contragents.map((contragent) => <Row contragent={contragent} removeContragent={() => removeContragent(contragent)}
                     onRowClick={() => onRowClick(contragent)}/>)}
                </tbody>
            </table>
        </>
    );
};
