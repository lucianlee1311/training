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

  let disableIds = [];
  let originalMachineData = null;

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
          $(this).children().children('.action-box').addClass('disabled');
        }
      });
    });

    $('.row-close').click(function(e) {
      let $trEl = $(e.currentTarget).closest('.action-edit').parent();

      $trEl.children('.address-text').removeClass('hidden');
      $trEl.children('.address-edit').addClass('hidden');
      $trEl.children('.region-text').removeClass('hidden');
      $trEl.children('.region-edit').addClass('hidden');
      $trEl.children('.action-detail').children('.action-box').removeClass('hidden');
      $trEl.children('.action-setup').removeClass('hidden');
      $trEl.children('.action-edit').addClass('hidden');
      
      $('tbody').find('tr').map(function(item) {
        let self = $(this);
        let thisId = self.data('machine-id');
        if(disableIds.join().indexOf(thisId) < 0) {
          self.children().children('.action-box').removeClass('disabled');
        }
      });
    });

    $('.row-check').click(function(e) {
      let $trEl = $(e.currentTarget).closest('.action-edit').parent();
      let id = $trEl.data('machine-id');

      $trEl.children('.address-text').removeClass('hidden');
      $trEl.children('.address-edit').addClass('hidden');
      $trEl.children('.region-text').removeClass('hidden');
      $trEl.children('.region-edit').addClass('hidden');
      $trEl.children('.action-detail').children('.action-box').removeClass('hidden');
      $trEl.children('.action-setup').removeClass('hidden');
      $trEl.children('.action-edit').addClass('hidden');
      
      $('tbody').find('tr').map(function(item) {
        let self = $(this);
        let thisId = self.data('machine-id');
        if(disableIds.join().indexOf(thisId) < 0) {
          self.children().children('.action-box').removeClass('disabled');
        }
      });

      let newAddress = $trEl.children().children('input[name=inputAddress]').val();
      let newRegion = $trEl.children().children('input[name=inputRegion]').val();

      var findRowData = originalMachineData.find(function(item) {
        return item.id === parseInt(id);
      });
      findRowData.address = newAddress;
      findRowData.region = newRegion;
      
      service.updateMachineData(JSON.stringify(findRowData), parseInt(id));
    });

    $('.row-detail').click(function(e) {
      let $trEl = $(e.currentTarget).closest('.action-detail').parent();
      let id = $trEl.data('machine-id');
      let model = $trEl.children('.model-text').text();
      let status = $trEl.children('.status-text').text();
      let temperature = $trEl.children('.temperature-text').text();
      let address = $trEl.children('.address-text').text();
      let region = $trEl.children('.region-text').text();
      

      $('input[name=editDeviceId]').val(id);
      $('input[name=editModel]').val(model);
      $('input[name=editStatus]').val(status);
      $('input[name=editTemperature]').val(temperature);
      $('input[name=editAddress]').val(address);
      $('input[name=editRegion]').val(region);
    });

    $('.btn-add-machine').click(function(e) {
      let addModel = $('input[name=addModel]').val();
      let addStatus = $('select[name=addStatus]').val();
      let addTemperature = $('input[name=addTemperature]').val();
      let addAddress = $('input[name=addAddress]').val();
      let addRegion = $('input[name=addRegion]').val();

      let newMachineData = {
        model: addModel,
        status: addStatus,
        temperature: addTemperature,
        address: addAddress,
        region: addRegion,
        disable: false
      }

      service.addMachineData(JSON.stringify(newMachineData));
    });

  };


  
  let service = {

    getMachineData: async function() {
      let result = null;
      await $.ajax({
        url: 'https://lucianjson.herokuapp.com/machine',
        type: "GET",
        dataType: "json",
        success: function(data) {
          result = Object.assign([], data);
          originalMachineData = JSON.parse (JSON.stringify(data));
        },
        error: function(error) {
          console.log(error);
        }
      });
      return result;
    },

    addMachineData: async function(machineData) {
      let result = null;
      await $.ajax({
        url: 'https://lucianjson.herokuapp.com/machine',
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: machineData,
        success: function(data) {
          console.log(data);
          // result = Object.assign([], data);
        },
        error: function(error) {
          console.log(error);
        }
      });
      return result;
    },

    updateMachineData: async function(machineData, id) {
      let result = null;
      await $.ajax({
        url: 'https://lucianjson.herokuapp.com/machine/' + id,
        type: "PATCH",
        dataType: "json",
        contentType: "application/json",
        data: machineData,
        success: function(data) {
          console.log(data);
          // result = Object.assign([], data);
        },
        error: function(error) {
          console.log(error);
        }
      });
      return result;
    },

    getMenuData: async function() {
      let result = null;
      await $.ajax({
        url: 'https://lucianjson.herokuapp.com/menu',
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
    },
  };

  let initMenu = async function() {
    let menuData = {
      page: {
        list: []
      }
    };

    menuData.page.list = await service.getMenuData();
    let template = $('#menu-list-tpl').html();
    let html = Mustache.render(template, menuData);
    $('#menu-list-entry').html(html);
  };

  let initTable = async function() {
    let machineData = {
      page: {
        list: []
      }
    };
    let pagingData = {
      page: {
        listLength: ''
      }
    };
    
    machineData.page.list = await service.getMachineData();
    machineData.page.list.forEach(function(item) {
      item.id = item.id.toString().padStart(3, "0");
      item.temperature = item.temperature + temperatureUnit.c;
      item.status = status[item.status];
      item.lowercaseStatus = item.status.toLowerCase();
      item.isDisabled = item.disable;
      if(item.disable) {
        disableIds.push(item.id);
      }
    });
    let tableTemplate = $('#table-tpl').html();
    $('#table-entry').html(Mustache.render(tableTemplate, machineData));

    pagingData.page.listLength = machineData.page.list.length;
    let pagingTemplate = $('#paging-tpl').html();
    $('#paging-entry').html(Mustache.render(pagingTemplate, pagingData));
  };

  initTable()
  .then(function() {
    initMenu()
    .then(function() {
      bindUI();
    });
  });
  
});
