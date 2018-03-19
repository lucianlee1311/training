$( document ).ready(function() {

  let status = {
    '0': 'Online',
    '1': 'Offline',
    '2': 'Error'
  };

  let temperatureUnit = {
    'c': '°C',
    'f': '°F'
  };

  let bindUI = function() {
    $('.menu-item').parent('.panel').click(function(e){
      e.stopPropagation();

      let self = $(this);

      $('ol').children('.panel').filter(function(item) {
         return $(this).children('.menu-item').hasClass('active') === true && (!(self.children('.menu-item').hasClass('active')));
      }).children('.panel-collapse').slideUp(200);

      $('li a').removeClass('active');
      $(this).children('.menu-item').addClass('active');

      $('li a .menu-sub-item').removeClass('active');
      $(this).children('div').children('.menu-sub-item:nth-child(1)').addClass('active');
    });

    $('div a.menu-sub-item').click(function (e) { 
      e.stopPropagation();

      let hasActiveClass = $(this).parent('div').parent('li').children('.menu-item').hasClass('active');
      if(!hasActiveClass) {
        $('ol').children('.panel').filter(function(item) {
           return $(this).children('.menu-item').hasClass('active') === true;
        }).children('.panel-collapse').slideUp(200);
      }

      $('li a').removeClass('active');
      $(this).parent('div').parent('li').children('.menu-item').addClass('active');

      $('li div .menu-sub-item').removeClass('active');
      $(this).addClass('active');
    });
    
    $('.open-advanced-search').click(function(e) {
      let openAdvancedSearch = $('.open-advanced-search');
      let advancedSearch = $('.advanced-search');

      if(advancedSearch.hasClass('hidden')) {
        openAdvancedSearch.children('i').addClass('dark');
        advancedSearch.removeClass('hidden');
      } else {
        openAdvancedSearch.children('i').removeClass('dark');
        advancedSearch.addClass('hidden');
      }
    });

    $('.panel-heading').parent('.panel').hover(function(e) {
      let hasActiveClass = $(this).children('.menu-item').hasClass('active');
      let submenu = $(this).children('.panel-collapse');
      if ( $(submenu).is(':hidden') ) {
        $(submenu).slideDown(200);
      } else if(!hasActiveClass) {
        $(submenu).slideUp(200);
      }
    });


    $('.row-edit').click(function(e) {
      let $trEl = $(e.currentTarget).closest('.action-setup').parent();
      let id = $trEl.data('machine-id');

      $trEl.children('.address-text').addClass('hidden');
      $trEl.children('.address-edit').removeClass('hidden');
      $trEl.children('.region-text').addClass('hidden');
      $trEl.children('.region-edit').removeClass('hidden');
      $trEl.children('.action-detail').children('.action-box').addClass('hidden');
      $trEl.children('.action-setup').addClass('hidden');
      $trEl.children('.action-edit').removeClass('hidden');

      $('tbody').find('tr').map(function(item) {
        let thisId = $(this).data('machine-id');
        if(thisId !== id) {
          $(this).children('.action-detail').children('.action-box').addClass('disabled');
          $(this).children('.action-setup').children('.action-box').addClass('disabled');
          $(this).children('.action-edit').children('.action-box').addClass('disabled');
        }
      });
    });

  }


  
  let service = function() {

    getTableData = async function() {
      let result = null;
      await $.ajax({
        url: 'https://api.myjson.com/bins/6yeqb',
        type: "GET",
        dataType: "json",
        success: function(data) {
          result = Object.assign([], data);
        },
        error: function(error) {
          console.log(error);
        }
      });
      return result;
    };

    getMenuData = async function() {
      let result = null;
      await $.ajax({
        url: 'https://api.myjson.com/bins/125b43',
        type: "GET",
        dataType: "json",
        success: function(data) {
          result = Object.assign([], data);
        },
        error: function(error) {
          console.log(error);
        }
      });

      return result;
    };
  }

  let initMenu = async function() {
    let menuData = {
      page: {
        list: []
      }
    };

    menuData.page.list = await getMenuData();
    let template = $('#menu-list-tpl').html();
    let html = Mustache.render(template, menuData);
    $('#menu-list-entry').html(html);
  }

  let initTable = async function() {
    let tableData = {
      page: {
        list: []
      }
    };
    let pagingData = {
      page: {
        listLength: ''
      }
    };
    
    tableData.page.list = await getTableData();
    tableData.page.list.forEach(function(item) {
      item.id = item.id.toString().padStart(3, "0");
      item.temperature = item.temperature + temperatureUnit.c;
      item.status = status[item.status];
      item.lowercaseStatus = item.status.toLowerCase();
    });
    let tableTemplate = $('#table-tpl').html();
    $('#table-entry').html(Mustache.render(tableTemplate, tableData));

    pagingData.page.listLength = tableData.page.list.length;
    let pagingTemplate = $('#paging-tpl').html();
    $('#paging-entry').html(Mustache.render(pagingTemplate, pagingData));
  }

  service();

  initTable();
  initMenu()
  .then(function() {
    bindUI();
  });
});
