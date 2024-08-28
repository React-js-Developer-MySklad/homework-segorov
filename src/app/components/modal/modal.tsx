import './modal.css';
import { Form, Field } from 'react-final-form'
import {MouseEventHandler, FormEvent, useState} from 'react';
import {Contragent} from '../../data-model/contragent';

type ModalProps = {
    closeFunction: MouseEventHandler<HTMLButtonElement>;
    contragent: Contragent;
    addFunction: Function;
}

const Modal = ({closeFunction, contragent, addFunction}: ModalProps) => {
    //оставим тип без id
    type FormValues = Omit<Contragent, 'id'>;

    const saveContragent = (values: FormValues) => {
        addFunction({
            id: contragent ? contragent.id : null,
            ...values
        });
    }

    const required = (value: string) => {
        if (!value || value.length < 1) {
            return 'Fill field please';
        }
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
                        <Form onSubmit={saveContragent} subscription={{submitting: true}} initialValues={contragent as FormValues}>
                            {({handleSubmit, submitting}) => (
                                <form id="counterparty-form" className="space-y-4" action="#" onSubmit={handleSubmit}>
                                    <div>
                                        <label className="modal-body-label">Name</label>
                                        <Field name="name" validate={required}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" id="name"
                                                       className="modal-body-input"
                                                       value={input.value}
                                                       onChange={e => input.onChange(e.target.value)}
                                                       />
                                                    {meta.error && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <label className="modal-body-label">INN</label>
                                        <Field name="inn" validate={required}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" id="inn"
                                                       className="modal-body-input"
                                                       value={input.value}
                                                       onChange={e => input.onChange(e.target.value)}
                                                       />
                                                   {meta.error && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <label className="modal-body-label">Address</label>
                                        <Field name="address" validate={required}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" id="address"
                                                       className="modal-body-input"
                                                       value={input.value}
                                                       onChange={e => input.onChange(e.target.value)}
                                                       />
                                                   {meta.error && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <div>
                                        <label className="modal-body-label">KPP</label>
                                        <Field name="kpp" validate={required}>
                                            {({input, meta}) => (
                                                <div>
                                                    <input type="text" id="kpp"
                                                       className="modal-body-input"
                                                       value={input.value}
                                                       onChange={e => input.onChange(e.target.value)}
                                                       />
                                                    {meta.error && <span>{meta.error}</span>}
                                                </div>
                                            )}
                                        </Field>
                                    </div>
                                    <button id="create-button-custom" type="submit"
                                            className="modal-body-button">
                                        {contragent ? "Update" : "Create"}
                                    </button>
                                </form>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;