import './modal.css';
import {MouseEventHandler, FormEvent, useState} from 'react';
import {Contragent} from '../../data-model/contragent';

type ModalProps = {
    closeFunction: MouseEventHandler<HTMLButtonElement>;
    contragent: Contragent;
    addFunction: Function;
}

const Modal = ({closeFunction, contragent, addFunction}: ModalProps) => {
    const [name, setName] = useState(contragent?.name || '');
    const [inn, setInn] = useState(contragent?.inn || '');
    const [address, setAddress] = useState(contragent?.address || '');
    const [kpp, setKpp] = useState(contragent?.kpp || '');

    const saveContragent = (e: FormEvent) => {
        e.preventDefault();
        addFunction({
            id: contragent ? contragent.id : null,
            name,
            inn,
            address,
            kpp
        });
    }

    return (
        <div id="authentication-modal" tabIndex={-1} aria-hidden="true"
                 className="modal-outer">
            <div className="modal">
                <div className="modal-inner">
                    <div className="modal-header">
                        <h3 className="modal-header-title">
                            Create counterparty
                        </h3>
                        <button id="close-button-custom" type="button"
                                className="modal-header-close-button"
                                data-modal-hide="authentication-modal" onClick={closeFunction}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        <form id="counterparty-form" className="space-y-4" action="#" onSubmit={saveContragent}>
                            <div>
                                <label className="modal-body-label">Name</label>
                                <input type="text" id="name"
                                       className="modal-body-input"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="modal-body-label">INN</label>
                                <input type="text" id="inn"
                                       className="modal-body-input"
                                       value={inn}
                                       onChange={e => setInn(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="modal-body-label">Address</label>
                                <input type="text" id="address"
                                       className="modal-body-input"
                                       value={address}
                                       onChange={e => setAddress(e.target.value)}
                                       required/>
                            </div>
                            <div>
                                <label className="modal-body-label">KPP</label>
                                <input type="text" id="kpp"
                                       className="modal-body-input"
                                       value={kpp}
                                       onChange={e => setKpp(e.target.value)}
                                       required/>
                            </div>
                            <button id="create-button-custom" type="submit"
                                    className="modal-body-button">
                                {contragent ? "Update" : "Create"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;