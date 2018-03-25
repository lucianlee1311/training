$(document).ready(() => {
  const menuApp = menuFunc($);
  const tableApp = tableFunc($);

  Promise.all([menuApp.service.getMenuTemplate(), menuApp.service.getMenuData()])
    .then((values) => {
      menuApp.utils.renderMenuData(values);
    })
    .then(() => {
      menuApp.utils.bindUI();
    })
    .catch((error) => {
      console.log(error);
    });

  Promise.all([tableApp.service.getTableTemplate(), tableApp.service.getPagingInformationTemplate(), tableApp.service.getMachineData()])
    .then(([tableTemplate, pagingInformationTemplate, data]) => {
      tableApp.utils.initPagination(tableTemplate, data);
      tableApp.utils.renderPagingData(pagingInformationTemplate, data);
    })
    .then(() => {
      tableApp.utils.bindUI();
    })
    .catch((error) => {
      console.log(error);
    });

});

