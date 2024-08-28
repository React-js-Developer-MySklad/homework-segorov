import React, { MouseEvent } from 'react';
import './row.css';
import {Contragent} from '../../../data-model/contragent';
import RemoveButton from '../remove-button/remove-button';
import {MouseEventHandler} from 'react';

type RowProps<Contragent> = {
    contragent: Contragent;
    removeContragent: MouseEventHandler<HTMLButtonElement>;
    onRowClick: Function;
}

function Row<T> ({contragent, removeContragent, onRowClick}: RowProps<Contragent>) {

    const onClick = (e: MouseEvent) => {
        e.stopPropagation();
        onRowClick();
   }

    return (<tr className="dom-table-row" onDoubleClick={onClick}>
                <td className="dom-table-row-column">{contragent.id}</td>
                <td className="dom-table-row-column">{contragent.name}</td>
                <td className="dom-table-row-column">{contragent.inn}</td>
                <td className="dom-table-row-column">{contragent.address}</td>
                <td className="dom-table-row-column">{contragent.kpp}</td>
                <td className="dom-table-row-column"><RemoveButton onClick={removeContragent}/></td>
            </tr>);
}

export default Row;