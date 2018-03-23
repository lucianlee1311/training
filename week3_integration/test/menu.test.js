const menuApp = require('../js/menu');
const fs = require('fs');

test('test render menu', () => {
  const fakeData = [
    {
      "menuId": "001",
      "menuName": "Dealer Management",
      "menuIcon": "fa fa-list-alt",
      "submenu": [
        {
          "subMenuId": "001_01",
          "subMenuName": "Test1",
          "subMenuHref": "sub001_01"
        },
        {
          "subMenuId": "001_02",
          "subMenuName": "Test2",
          "subMenuHref": "sub001_02"
        }
      ]
    }
  ];
  const templateText = fs.readFileSync('template/menuTemplate.html').toString();
  document.body.innerHTML = `<div id="menu-list-entry"></div>`;
  menuApp.renderMenuData([fakeData, templateText]);
  expect($('.menu-item').text()).toMatch(fakeData[0].menuName);
});
