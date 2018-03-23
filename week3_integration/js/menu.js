
const menuService = {
  getMenuData: fetch => new Promise((resolve, reject) => {
    fetch('https://lucianjson.herokuapp.com/menu', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json()).then(resolve).catch(reject);
  }),
  getMenuTemplate: fetch => new Promise((rs, rj) => {
    fetch('/template/menuTemplate.html').then(res => res.text()).then(rs).catch(rj);
  }),
};

const renderMenuData = ([list, template]) => {
  const menuData = { page: { list } };
  const html = $(template).html();
  const renderedHtml = Mustache.render(html, menuData);
  $('#menu-list-entry').html(renderedHtml);
};

const bindMenuUI = () => {
  const $panels = $('.panel');
  const $menuItem = $('.menu-item');
  const $menuSubItem = $('.menu-sub-item');

  $panels.click((e) => {
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
  });

  $menuSubItem.click((e) => {
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
  });

  $('.panel, .panel-collapse').hover((e) => {
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
  });
};

if (typeof module !== 'undefined' && typeof require !== 'undefined') {
  module.exports = { menuService, renderMenuData, bindMenuUI };
}
