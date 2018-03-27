const tableApp = require('../js/table');
const fs = require('fs');
const $ = require('jquery');
const mustache = require('mustache');
// const fetch = require('node-fetch');
// const bootstrap = require('bootstrap');

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
    "disable": false
  }
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
    "isDisabled": false
  }
];

test('test render paging total number', () => {
  const templateText = fs.readFileSync('templateHtml/pagingInformationTemplate.html').toString();
  document.body.innerHTML = `<div id="paging-entry"></div>`;
  tableApp($, mustache).utils.renderPagingData(templateText, list);
  expect($('.paging-information').text()).toMatch(list.length + ' Models');
});

test('test process table data', () => {
  const output2 = { page: { loaded: true, list: processedList } };
  const processedData = tableApp($, mustache).utils.processMachineData(list);
  expect(processedData).toMatchObject(output2);
});

// test('test render table', () => {
  // const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  // document.body.innerHTML = `<div id="table-entry"></div>`;
  // tableApp($, mustache).utils.initTable();
  // expect($('.model-text').first().text()).toMatch(processedList[0].model);
// });

test('test pading left zero', () => {
  const output3 = tableApp($, mustache).utils.paddingZeroLeft('1', 5);
  expect(output3).toMatch('00001');
});

test('test init table', () => {
  const output3 = tableApp($, mustache).utils.paddingZeroLeft('1', 5);
  expect(output3).toMatch('00001');
});

test('test switch advanced search', () => {
  tableApp($, mustache).utils.switchAdvancedSearch();
  expect($('.advanced-search').hasClass('hidden')).toEqual(false);
});

test('test init pagination', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  // tableApp($, mustache).utils.initPagination(templateText, list);
  // expect($('.model-text').first().text()).toMatch(processedList[0].model);
});

test('test click row-edit', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);

  tableApp($, mustache).utils.bindUI();
  $('.row-edit').first().click();
  expect($('.row-edit').closest('.action-setup').hasClass('hidden')).toEqual(true);
});

test('test click row-close', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);

  tableApp($, mustache).utils.bindUI();
  $('.row-close').first().click();
  expect($('.row-close').closest('.action-edit').hasClass('hidden')).toEqual(true);
});

test('test click row-check', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);
  tableApp($, mustache).utils.bindUI();
  $('.row-check').first().click();
  expect($('.row-check').closest('.action-edit').hasClass('hidden')).toEqual(true);
});

test('test click row-detail', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);
  tableApp($, mustache).utils.bindUI();
  $('.row-detail').first().click();
  expect($('.row-detail').first().closest('.action-detail').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click row-detail', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);
  tableApp($, mustache).utils.bindUI();
  $('.row-detail').first().click();
  expect($('.row-detail').first().closest('.action-detail').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click row-remove', () => {
  const templateText = fs.readFileSync('templateHtml/tableTemplate.html').toString();
  document.body.innerHTML = `<div id="table-entry"></div>`;
  tableApp($, mustache).utils.renderTableData(templateText, list);
  tableApp($, mustache).utils.bindUI();
  $('.row-remove').first().click();
  expect($('.row-remove').first().closest('.action-setup').parent().data('machine-id')).toEqual(processedList[0].id);
});

test('test click remove-machine-button', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;
  tableApp($, mustache).utils.bindUI();
  
  // $('.row-remove').first().click();
  // $('.remove-machine-button').click();
  // expect($('.remove-machine-button').data('machine-id')).toEqual(processedList[0].id);
});

test('test click search-button', () => {
  const indexTemplateText = fs.readFileSync('index.html').toString();
  document.body.innerHTML = indexTemplateText;

  tableApp($, mustache).utils.bindUI();
  // $('.search-button').click();
  // expect($('.search-button').data('machine-id')).toEqual(processedList[0].id);
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
