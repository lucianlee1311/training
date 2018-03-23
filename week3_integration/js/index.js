$(document).ready(() => {
  Promise.all([menuService.getMenuData(fetch), menuService.getMenuTemplate(fetch)])
    .then(renderMenuData)
    .then(bindMenuUI);
});

