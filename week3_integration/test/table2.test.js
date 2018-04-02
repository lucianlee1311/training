const tableApp = require('../js/table2');
const fs = require('fs');
const machinesEvents = jest.fn();

const data = [
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
  },
];
const tableTemplate = fs.readFileSync('templateHtml/machineRowTemplate.html').toString();
const addModalContent = fs.readFileSync('templateHtml/addMachineModalContent.html').toString();
const detailModalContent = fs.readFileSync('templateHtml/detailMachineModalContent.html').toString();
const removeModalContent = fs.readFileSync('templateHtml/removeMachineModalContent.html').toString();

test('test machineFactory', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  expect(machines).toHaveLength(2);
});

test('test render', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  document.body.innerHTML = `<div id="machine-row-template-entry"></div>`;
  app.render(machines);
  expect($('.model-text').first().text()).toMatch(data[0].model);
});

test('test renderPage', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  document.body.innerHTML = `<div id="machine-row-template-entry"></div>`;
  app.renderPage(machines);
  expect(twbsPagination.mock.calls.length).toBe(1);
});

test('test isEditDisabled true', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  app.isEditDisabled(machines[0], true);
  expect(app.machines[1].template.find('.action-box').hasClass('disabled')).toBeTruthy();
});

test('test isEditDisabled false', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  app.isEditDisabled(machines[0], false);
  expect(app.machines[1].template.find('.action-box').hasClass('disabled')).toBeFalsy();
});

test('test clickEdit', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  app.clickEdit(machines[0]);
  expect(app.machines[1].template.find('.action-box').hasClass('disabled')).toBeTruthy();
});

test('test clickClose', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  const machines = app.machineFactory(tableTemplate, data);
  app.clickClose(machines[0]);
  expect(app.machines[1].template.find('.action-box').hasClass('disabled')).toBeFalsy();
});

test('test switch advanced search', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  app.changeAdvancedRegion();
  expect($('.advanced-search-region').hasClass('hidden')).toEqual(false);
});

test('test clickAdvancedOpen', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  app.clickAdvancedOpen();
  expect($('.advanced-search-region').hasClass('hidden')).toEqual(false);
});

test('test clickAdvancedClose', () => {
  const app = new tableApp.APP(tableTemplate, addModalContent, detailModalContent, removeModalContent, data);
  app.clickAdvancedClose();
  expect($('.advanced-search-region').hasClass('hidden')).toEqual(false);
});


test('test isShowEdit true', () => {
  const app = new tableApp.Machine(tableTemplate, data[0], machinesEvents);
  app.isShowEdit(true);
  expect(app.template.find('.address-text').hasClass('hidden')).toBeTruthy();
});

test('test isShowEdit false', () => {
  const app = new tableApp.Machine(tableTemplate, data[0], machinesEvents);
  app.isShowEdit(false);
  expect(app.template.find('.address-text').hasClass('hidden')).toBeFalsy();
});

test('test doRemove', () => {
  const app = new tableApp.Machine(tableTemplate, data[0], machinesEvents);
  app.doRemove();
  expect(app.template.val()).toBe('');
});
