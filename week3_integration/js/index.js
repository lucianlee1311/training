$(document).ready(() => {
  const menuApp = menuFunc($, Mustache);
  // const tableApp = tableFunc($, Mustache);

  Promise.all([menuApp.service.getMenuTemplate(), menuApp.service.getMenuData()])
    .then(([menuTemplate, data]) => {
      menuApp.utils.renderMenuData(menuTemplate, data);
    })
    .then(() => {
      menuApp.utils.bindUI();
    })
    .catch((error) => {
      console.log(error);
    });

  // Promise.all([tableApp.service.getTableTemplate(), tableApp.service.getPagingInformationTemplate(), tableApp.service.getMachineData()])
  //   .then(([tableTemplate, pagingInformationTemplate, data]) => {
  //     tableApp.utils.initPagination(tableTemplate, data);
  //     tableApp.utils.renderPagingData(pagingInformationTemplate, data);
  //   })
  //   .then(() => {
  //     tableApp.utils.bindUI();
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  Promise.all([fetch('./templateHtml/machineRowTemplate.html').then(res => res.text()), fetch('https://lucianjson.herokuapp.com/machine').then(res => res.json())])
    .then(([tableTemplate, data]) => {
      const machineApp = new APP(tableTemplate, data);
      machineApp.renderPage();
    })
    .catch((error) => {
      console.log(error);
    });

});
