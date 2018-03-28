const tableApp = require('../js/table');
const fs = require('fs');
const $ = require('jquery');
const mustache = require('mustache');

const list = [
  {
    "id": 1,
    "model": "AK1",
    "status": 2,
    "temperature": 4,
    "address": "台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 西側)",
    "region": "大安區",
    "disable": false
  },
  {
    "id": 2,
    "model": "AK2",
    "status": 0,
    "temperature": 0,
    "address": "台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 南側)",
    "region": "大安區",
    "disable": true
  },
];

const processedList = [
  {
    "id": "001",
    "model": "AK1",
    "status": "Error",
    "lowercaseStatus": "error",
    "temperature": "4°C",
    "address": "台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 西側)",
    "region": "大安區",
    "isDisabled": false
  },
  {
    "id": "002",
    "model": "AK2",
    "status": "Online",
    "lowercaseStatus": "online",
    "temperature": "0°C",
    "address": "台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 南側)",
    "region": "大安區",
    "isDisabled": true
  }
];

const updateRowData = [
  {
    "id": "001",
    "model": "AK1",
    "status": "Errorr",
    "lowercaseStatus": "error",
    "temperature": "4°C",
    "address": "r台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 西側)",
    "region": "r大安區",
    "isDisabled": false
  },
];

const addRowData = [
  {
    "id": 3,
    "model": "AK3",
    "status": 3,
    "temperature": 3,
    "address": "台北市大安區大安里新生南路二段新生段1號21樓(大安森林公園 - 西側)",
    "region": "大安區",
    "disable": false
  },
];

test('test get machine data', () => {
  expect.assertions(1);
  return tableApp($, mustache).service.getMachineData()
    .then((data) => {
      expect(data[0]).toMatchObject(list[0]);
    });
});

test('test process table data: no data', () => {
  const output2 = { page: { loaded: false, list: [] } };
  const processedData = tableApp($, mustache).utils.processMachineData([]);
  expect(processedData).toMatchObject(output2);
});

test('test process table data', () => {
  const output2 = { page: { loaded: true, list: processedList } };
  const newList = Object.assign([], list);
  const processedData = tableApp($, mustache).utils.processMachineData(newList);
  expect(processedData).toMatchObject(output2);
});

test('test init pagination: no data', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.initPagination(templateText, []);
  expect(twbsPagination.mock.calls.length).toBe(0);
});

test('test init pagination', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.initPagination(templateText, newList);
  expect(twbsPagination.mock.calls.length).toBe(1);
});

test('test render table', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  expect($('.model-text').first().text()).toMatch(processedList[0].model);
});

test('test render paging total number', () => {
  const templateText = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  document.body.innerHTML = `<div id="paging-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderPagingData(templateText, newList);
  expect($('.paging-information').text()).toMatch(newList.length + ' Models');
});

test('test render template data: no data', () => {
  const tableTemplate = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const pagingInformationTemplate = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  document.body.innerHTML += `<div id="paging-entry"></div>`;
  tableApp($, mustache).utils.renderTemplateData(tableTemplate, pagingInformationTemplate, []);
  expect($('.paging-information').text()).toMatch(0 + ' Models');
});

test('test render template data', () => {
  const tableTemplate = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const pagingInformationTemplate = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  document.body.innerHTML += `<div id="paging-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTemplateData(tableTemplate, pagingInformationTemplate, newList);
  expect($('.paging-information').text()).toMatch(newList.length + ' Models');
});

// test('test add machine data', () => {
//   const tableTemplateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
//   const pagingInformationTemplateText = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
//   expect.assertions(1);
//   const newList = Object.assign([], list);
//   return expect(tableApp($, mustache).utils.addMachineData(tableTemplateText, pagingInformationTemplateText, addRowData, newList, 3)).resolves.toBe(3);
// });

// test('test update machine data', () => {
//   const tableTemplateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
//   const pagingInformationTemplateText = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
//   expect.assertions(1);
//   const newList = Object.assign([], list);
//   return expect(tableApp($, mustache).utils.updateMachineData(tableTemplateText, pagingInformationTemplateText, updateRowData, newList, 1)).resolves.toBe(1);
// });

// test('test remove machine data', () => {
//   const tableTemplateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
//   const pagingInformationTemplateText = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
//   expect.assertions(1);
//   const newList = Object.assign([], list);
//   return expect(tableApp($, mustache).utils.removeMachineData(tableTemplateText, pagingInformationTemplateText, newList, 1)).resolves.toBe(1);
// });

test('test search data', () => {
  const tableTemplate = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  const pagingInformationTemplate = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.searchData(tableTemplate, pagingInformationTemplate, newList, 'AK1');
  expect($('.paging-information').text()).toMatch('1 Models');
});

test('test advanced search data', () => {
  const tableTemplate = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  const pagingInformationTemplate = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.advancedSearchData(tableTemplate, pagingInformationTemplate, newList, 'AK2', '0');
  expect($('.paging-information').text()).toMatch('1 Models');
});

test('test pading left zero', () => {
  const output3 = tableApp($, mustache).utils.paddingZeroLeft('1', 5);
  expect(output3).toMatch('00001');
});

test('test switch advanced search', () => {
  tableApp($, mustache).utils.switchAdvancedSearch();
  expect($('.advanced-search').hasClass('hidden')).toEqual(false);
});

test('test click row-edit', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-edit').first().click();
  expect($('.row-edit').closest('.action-setup').hasClass('hidden')).toEqual(true);
});

test('test click row-close', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-close').first().click();
  expect($('.row-close').closest('.action-edit').hasClass('hidden')).toEqual(true);
});

test('test click row-check', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-check').first().click();
  expect($('.row-check').closest('.action-edit').hasClass('hidden')).toEqual(true);
});

test('test click row-detail', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-detail').first().click();
  expect($('.row-detail').first().closest('.action-detail').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click row-detail', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-detail').first().click();
  expect($('.row-detail').first().closest('.action-detail').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click row-remove', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.row-remove').first().click();
  expect($('.row-remove').first().closest('.action-setup').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click add-machine-button', async () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML += `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.add-machine-button').click();
  expect($('.paging-information').text()).toMatch('');
});

test('test click remove-machine-button', async () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML += `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);
  tableApp($, mustache).utils.bindUI();
  $('.remove-machine-button').click();
  expect($('.remove-machine-button').data('machine-id')).toEqual('');
});

test('test click search-button', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML += `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.search-button').click();
  expect($('.paging-information').text()).toMatch('');
});

test('test click advanced-search-button', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML += `<div id="table-entry"></div>`;
  const newList = Object.assign([], list);
  tableApp($, mustache).utils.renderTableData(templateText, newList);
  tableApp($, mustache).utils.bindUI();
  $('.advanced-search-button').click();
  expect($('.paging-information').text()).toMatch('');
});

test('test click open-advanced-search', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  tableApp($, mustache).utils.bindUI();
  $('.open-advanced-search').click();
  expect($('.advanced-search').hasClass('hidden')).toEqual(false);
});

test('test click advanced-close-button', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  tableApp($, mustache).utils.bindUI();
  $('.advanced-close-button').click();
  expect($('.advanced-search').hasClass('hidden')).toEqual(false);
});
