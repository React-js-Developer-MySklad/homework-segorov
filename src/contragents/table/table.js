// функция создания меню по набору элементов
 export const createCounterpartyTable = (elements, openModalButton, removeElementById) => {
    // заголовок таблицы
    const tHeadElement = document.querySelector('thead');
    // шаблон заголовка таблицы
    const templateHeadRow = document.querySelector("template[id='template-head-column']");
    // создаем строку заголовок
    const headRowElement = document.createElement('tr');

    // наполняем ячейки в строку заголовка
    for(const column of ['id', 'name', 'inn', 'address', 'kpp', 'remove']) {
        const columnElement = templateHeadRow.content.children[0].cloneNode(true);

        columnElement.innerHTML = column;

        headRowElement.appendChild(columnElement)
    }

    // добавляем строку в блок заголовка
    tHeadElement.appendChild(headRowElement)

    // обновляем данные в таблице
    refreshCounterpartyTableContent(elements, openModalButton, removeElementById);
}

// обновление содержимого таблицы
export const refreshCounterpartyTableContent = (content, openModalButton, removeElementById) => {
    // шаблон строки таблицы
    const templateRow = document.querySelector("template[id='template-row']");
    // содержание таблицы
    const tBodyElement = document.querySelector('tbody');
    //очищаем таблицу перед перерисовкой
    clearAllRows();
    // перебираем элементы контрагентов
    for(const item of content) {
        // создаем строку по шаблону, в которую будем записывать контрагента
        const bodyRowElement = templateRow.content.children[0].cloneNode();
        // добавляем идентифкатор контрагента в строку
        bodyRowElement.setAttribute("data-id", item.id);
        bodyRowElement.addEventListener('dblclick', (event) => {
            // проставляем в кнопку идентификатор элемента, на который нажали
            openModalButton.setAttribute("data-id", bodyRowElement.getAttribute("data-id"));
            // нажимаем кнопку отобразить форму
            openModalButton.click();
        });

        //добавляем ячейки в строку
        bodyRowElement.appendChild(createRowColumn(item.id));
        bodyRowElement.appendChild(createRowColumn(item.name));
        bodyRowElement.appendChild(createRowColumn(item.inn));
        bodyRowElement.appendChild(createRowColumn(item.address));
        bodyRowElement.appendChild(createRowColumn(item.kpp));
        // добавляем ячейку с кнопкой
        bodyRowElement.appendChild(createRemoveButtonRowColumn(item.id, content, openModalButton, removeElementById));

        // добавляем строку в тело таблицы
        tBodyElement.appendChild(bodyRowElement)
    }
}

// функция очистки таблицы контрагентов
const clearAllRows = () => {
    // находим все строки с контрагентами
    let trs = document.querySelectorAll('.dom-table-body tr');
    // удаляем строки в цикле
    trs.forEach((tr)=> {
        tr.remove();
    });
}

// функция создания ячейки по содержимому
const createRowColumn = (content) => {
    // шаблон ячейки таблицы
    const templateRowColumn = document.querySelector("template[id='template-row-column']");
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    rowColumn.innerHTML = content;
    return rowColumn;
}

//функция создания кнопки удаления
const createRemoveButtonRowColumn = (id, content, openModalButton, removeElementById) => {
    // шаблон кнопки удаления данных из таблицы
    const templateRemoveButton = document.querySelector("template[id='remove-counterparty-button']");
    // шаблон ячейки таблицы
    const templateRowColumn = document.querySelector("template[id='template-row-column']");
    // создаем кнопку по шаблону, для удаления контрагентов
    const removeButton = templateRemoveButton.content.children[0].cloneNode();
    removeButton.innerHTML = "удалить";

    // добавляем эвент удаления
    removeButton.addEventListener('click', event => removeRow(event, content, openModalButton, removeElementById));
    // добавляем атрибут, какой элемент нужно удалить по нажатию
    removeButton.setAttribute("data-id", id);
    // создаем ячейку
    const rowColumn = templateRowColumn.content.children[0].cloneNode();
    // добавляем кнопку в ячейку
    rowColumn.append(removeButton);
    return rowColumn;
}

// удаление данных и вызов перерисовки
const removeRow = (event, content, openModalButton, removeElementById) => {
        // удаляем запись из массива по id аттрибута кнопки
        content = removeElementById(event.target.getAttribute("data-id"));
        // перерисовываем табличку
        refreshCounterpartyTableContent(content, openModalButton, removeElementById);
 }

