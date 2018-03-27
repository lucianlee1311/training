const menuFunc = ($, Mustache) => {
  const service = {
    getMenuData: () => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/menu', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    }),

    getMenuTemplate: () => new Promise((resolve, reject) => {
      fetch('./templateHtml/menuTemplate.html', {
        method: 'GET',
      })
        .then(res => res.text())
        .then(resolve)
        .catch(reject);
    }),
  };

  const utils = {
    processMenuData: (list) => {
      const menuData = { page: { list } };
      return menuData;
    },

    renderMenuData: (([template, data]) => {
      const menuData = utils.processMenuData(data);
      const templateHtml = $(template).html();
      $('#menu-list-entry').html(Mustache.render(templateHtml, menuData));
    }),

    bindUI: (() => {
      const $panels = $('.panel');
      const $menuItem = $('.menu-item');
      const $menuSubItem = $('.menu-sub-item');

      utils.clickMenu($panels, $menuItem, $menuSubItem);
      utils.clickSubMenu($panels, $menuItem, $menuSubItem);
      utils.hoverMenu();
    }),

    clickMenu: ($panels, $menuItem, $menuSubItem) => $panels.click((e) => {
      e.stopPropagation();

      const $self = $(e.currentTarget);
      $panels.filter((index, element) => {
        const $node = $(element);
        return $node.children('.menu-item').hasClass('active') === true && (!($self.children('.menu-item').hasClass('active')));
      }).children('.panel-collapse').slideUp(200);

      $menuItem.removeClass('active');
      $self.children('.menu-item').addClass('active');

      $menuSubItem.removeClass('active');
      $self.children('.panel-collapse').children('.menu-sub-item:nth-child(1)').addClass('active');
    }),

    clickSubMenu: ($panels, $menuItem, $menuSubItem) => $menuSubItem.click((e) => {
      e.stopPropagation();

      const $self = $(e.currentTarget);
      const $hasActiveClass = $self.closest('.panel').children('.menu-item').hasClass('active');
      if (!$hasActiveClass) {
        $panels.filter((index, element) => {
          const $node = $(element);
          return $node.children('.menu-item').hasClass('active') === true;
        }).children('.panel-collapse').slideUp(200);
      }

      $menuItem.removeClass('active');
      $self.closest('.panel').children('.menu-item').addClass('active');

      $menuSubItem.removeClass('active');
      $self.addClass('active');
    }),

    hoverMenu: () => $('.panel, .panel-collapse').hover((e) => {
      const self = e.currentTarget;
      if ($('> .panel-collapse', self).length > 0) {
        $('> .panel-collapse', self).stop().slideDown();
      }
    }, (e) => {
      const self = e.currentTarget;
      const $hasActiveClass = $(self).children('.menu-item').hasClass('active');
      if ($('> .panel-collapse', self).length > 0 && !$hasActiveClass) {
        $('> .panel-collapse', self).stop().slideUp();
      }
    }),

  };

  return { service, utils };
};

if (typeof module !== 'undefined' && typeof require !== 'undefined') {
  module.exports = menuFunc;
}
