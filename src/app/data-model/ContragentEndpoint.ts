import {Contragent} from './contragent';

//так как запускаю из docker-compose то тут нужен ip, а не localhost
const ENDPOINT = 'http://172.19.0.2:3000/contragents';

export const getContragents = () => {
    return fetch(ENDPOINT).then(response => response.json()).catch(e => console.log(e));
}

export const createContragent = (contragent: Contragent) => {
    return fetch(ENDPOINT, {method: 'POST', body: JSON.stringify(contragent)}).then(response => response.json).catch(e => console.log(e));
}

export const updateContragent = (contragent: Contragent) => {
    return fetch(`${ENDPOINT}/${contragent.id}`, {method: 'PUT', body: JSON.stringify(contragent)}).then(response => response.json).catch(e => console.log(e));
}

export const deleteContragent = (contragent: Contragent) => {
    return fetch(`${ENDPOINT}/${contragent.id}`, {method: 'DELETE'}).then(response => response.json).catch(e => console.log(e));
}
