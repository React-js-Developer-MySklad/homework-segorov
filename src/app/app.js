import html from "./app.html";
import tableHtml from "../contragents/table/table.html";
import modalHtml from "../contragents/modal/modal.html";
import './app.css'
import '../contragents/table/table.css'
import * as table from '../contragents/table/table.js';
import * as modal from '../contragents/modal/modal.js';

// константы

// исчетчик идентификаторов
let counter = 2;
// контент
let content = [
    {
        "id": 1,
        "name": "Sam",
        "inn": 1234,
        "address": "test",
        "kpp": 1234
    }
]

// элемент, куда вставляем наш html
const rootElement = document.getElementById('root');
// делаем вставку нашего html из app.html где появляются наши шаблоны
rootElement.innerHTML = html;
// получае место, куда будем вставлять таблицу
const tablePlaceholder = document.getElementById('counterparty-table');
// вставляем таблицу в плейсхолдер
tablePlaceholder.innerHTML = tableHtml;
//получить место, куда будем вставлять модальное окно
const modalPlaceholder = document.getElementById('authentication-modal');
//вставляем форму в плейсхолдер
modalPlaceholder.innerHTML = modalHtml;

// кнопка закрытия формы
const closeBtn = document.getElementById("close-button-custom");


const removeElementById = (id) => {
    content = content.filter(item => item.id != id);
    return content;
}

// находим кнопку добавить
const openModalButton = document.getElementById("open-modal");

// добавляем обработчик нажатия
openModalButton.addEventListener('click', (e) => {
    // находим элемент, для которого выбрали действие
    let element = content.find(item => item.id == event.target.getAttribute("data-id"));
    // убираем прочитанный аттрибут
    event.target.removeAttribute("data-id");
    // заполняем форму в соответствии с элементом
    modal.fillCounterpartyForm(element);
    //если создаем называем кнопку create иначе update
    if (element !== undefined) {
        addButton.innerText = 'Update';
    } else {
        addButton.innerText = 'Create';
    }
});

// отрисовываем табличку
table.createCounterpartyTable(content, openModalButton, removeElementById);

// находим кнопку добавления контрагента
const addButton = document.getElementById("create-button-custom");

// добавить обработку нажатия кнопки добавить
addButton.addEventListener('click', (e) => {
    // берем данные, которые пользователь ввел
    let formValues = modal.getFormValue();

    //обновляем форму
    modal.clearForm();

    // если новый сотрудник, то его добавляем
    if (formValues.id === null) {
        // добавляем идентификатор к данным формы
        let newCounterparty = {... formValues, "id": counter++}
        // добавляем созданного контрагента в контекст
        content.push(newCounterparty);
    } else {
        // если существующий, то находим его
        let element = content.find(item => item.id == formValues.id);
        // заполняем поля элемента
        element.name = formValues.name;
        element.kpp = formValues.kpp;
        element.address = formValues.address;
        element.inn = formValues.inn;
    }

    // закрыть форму
    closeBtn.click();
    // перерисовать данные таблицы
    table.refreshCounterpartyTableContent(content, openModalButton, removeElementById);
})

closeBtn.addEventListener('click', (event) => {
    modal.clearForm();
});