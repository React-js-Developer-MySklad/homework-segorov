import {useContext} from 'react';
import {getContragents, createContragent, updateContragent, deleteContragent} from '../data-model/ContragentEndpoint';
import {ContragentApiContext} from './ContragentApiContext';


export const ContragentApiContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const context = useCreateContragentApiContext();
    return <ContragentApiContext.Provider value={context}>{children}</ContragentApiContext.Provider>;
};

export function useContragentApiContext() {
    const context = useContext(ContragentApiContext);
    if (!context) throw new Error('Exception!');
    return context;
}

export const useCreateContragentApiContext = () => {

    return {
        getContragents,
        createContragent,
        updateContragent,
        deleteContragent
    };
}