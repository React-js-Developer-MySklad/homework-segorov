// функция заполнения формы контрагента
export const fillCounterpartyForm = (element) => {
    // получаем поля ввода
    const formElement = document.getElementById('counterparty-form');
    const formNameElement = formElement.querySelector("input[id='name']");
    const formKppElement = formElement.querySelector("input[id='kpp']");
    const formAddressElement = formElement.querySelector("input[id='address']");
    const formInnElement = formElement.querySelector("input[id='inn']");

    // переменная, показывающая задан ли элемен для заполнения
    let isValueDefined = element !== undefined;
    // значения для заполнения формы
    let name = isValueDefined ? element.name : '';
    let kpp = isValueDefined ? element.kpp : '';
    let address = isValueDefined ? element.address : '';
    let inn = isValueDefined ? element.inn : '';

    // если элемент существует, то форме добавляем аттрибут идентификатора
    if (isValueDefined) {
        formElement.setAttribute("data-id", element.id);
    } else {
        // чистим аттрибут, если нет элемента
        formElement.removeAttribute("data-id");
    }

    //заполняем поля ввода значениями элемента
    formNameElement.value = name;
    formKppElement.value = kpp;
    formAddressElement.value = address;
    formInnElement.value = inn;
}

// фнукцию очищающая форму контрагента
export const clearForm = () => {
    fillCounterpartyForm();
}

// получить данные формы
export const getFormValue = () => {
    // получаем поля ввода
    const formElement = document.getElementById('counterparty-form');
    const formNameElement = formElement.querySelector("input[id='name']");
    const formKppElement = formElement.querySelector("input[id='kpp']");
    const formAddressElement = formElement.querySelector("input[id='address']");
    const formInnElement = formElement.querySelector("input[id='inn']");

    return {
        "id": formElement.getAttribute("data-id"),
        "name": formNameElement.value,
        "kpp": formKppElement.value,
        "address": formAddressElement.value,
        "inn": formInnElement.value
    };
}