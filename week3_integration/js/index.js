// const fetch = require('node-fetch');

$(document).ready(() => {
  const status = {
    0: 'Online',
    1: 'Offline',
    2: 'Error',
  };

  const temperatureUnit = {
    c: `${String.fromCharCode(176)}C`,
    f: `${String.fromCharCode(176)}F`,
  };

  let disableIds = [];
  let originalMachineData = null;

  const service = {
    getMachineData: () => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/machine', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((json) => {
          originalMachineData = JSON.parse(JSON.stringify(json));
          const newJson = Object.assign([], json);
          resolve(newJson);
        })
        .catch((error) => {
          reject(error);
        });
    }),

    addMachineData: machineData => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/machine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: machineData,
      })
        .then(res => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    }),

    updateMachineData: (machineData, id) => new Promise((resolve, reject) => {
      fetch(`https://lucianjson.herokuapp.com/machine/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: machineData,
      })
        .then(res => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    }),

    removeMachineData: id => new Promise((resolve, reject) => {
      fetch(`https://lucianjson.herokuapp.com/machine/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((json) => {
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    }),

    getMenuData: () => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/menu', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((json) => {
          const newJson = Object.assign([], json);
          resolve(newJson);
        })
        .catch((error) => {
          reject(error);
        });
    }),
  };

  const bindUI = () => {
    const $panels = $('.panel');
    $panels.click((e) => {
      e.stopPropagation();

      const $self = $(e.target);
      const $selfPanel = $(e.target).parent('.panel');

      $panels.filter((index, element) => {
        const $node = $(element);
        return $node.children('.menu-item').hasClass('active') === true && (!($self.children('.menu-item').hasClass('active')));
      }).children('.panel-collapse')
        .slideUp(200);

      $('.menu-item').removeClass('active');
      $self.addClass('active');

      $('.menu-sub-item').removeClass('active');
      $selfPanel.children('.panel-collapse').children('.menu-sub-item:nth-child(1)').addClass('active');
    });

    const $subItem = $('.menu-sub-item');
    $subItem.click((e) => {
      e.stopPropagation();

      const $self = $(e.target);

      const hasActiveClass = $self.closest('.panel').children('.menu-item')
        .hasClass('active');

      if (!hasActiveClass) {
        $panels.filter((index, element) => {
          const $node = $(element);
          return $node.children('.menu-item').hasClass('active') === true;
        }).children('.panel-collapse')
          .slideUp(200);
      }

      $('.menu-item').removeClass('active');
      $self.closest('.panel').children('.menu-item')
        .addClass('active');

      $('.menu-sub-item').removeClass('active');
      $self.addClass('active');
    });

    $('.open-advanced-search').click(() => {
      switchAdvancedSearch();
    });

    $panels.hover((e) => {
      const $self = $(e.target);
      const $selfPanel = $(e.target).parent('.panel');

      const $hasActiveClass = $self.hasClass('active');
      const $submenu = $selfPanel.children('.panel-collapse');
      if ($submenu.is(':hidden')) {
        $submenu.slideDown(200);
      } else if (!$hasActiveClass) {
        $submenu.slideUp(200);
      }
    });

    $('.row-edit').click((e) => {
      const $trEl = $(e.currentTarget).closest('.action-setup').parent();
      const id = $trEl.data('machine-id');

      $trEl.children('.address-text').addClass('hidden');
      $trEl.children('.address-edit').removeClass('hidden');
      $trEl.children('.region-text').addClass('hidden');
      $trEl.children('.region-edit').removeClass('hidden');
      $trEl.children('.action-detail').children('.action-box').addClass('hidden');
      $trEl.children('.action-setup').addClass('hidden');
      $trEl.children('.action-edit').removeClass('hidden');

      $('tbody').find('tr').each((index, element) => {
        const $node = $(element);
        const thisId = $node.data('machine-id');
        if (thisId !== id) {
          $node.children().children('.action-box').addClass('disabled');
        }
      });
    });

    $('.row-close').click((e) => {
      e.stopImmediatePropagation();

      const $trEl = $(e.currentTarget).closest('.action-edit').parent();

      $trEl.children('.address-text').removeClass('hidden');
      $trEl.children('.address-edit').addClass('hidden');
      $trEl.children('.region-text').removeClass('hidden');
      $trEl.children('.region-edit').addClass('hidden');
      $trEl.children('.action-detail').children('.action-box').removeClass('hidden');
      $trEl.children('.action-setup').removeClass('hidden');
      $trEl.children('.action-edit').addClass('hidden');

      $('tbody').find('tr').each((index, element) => {
        const $node = $(element);
        const thisId = $node.data('machine-id');
        if (disableIds.join().indexOf(thisId) < 0) {
          $node.children().children('.action-box').removeClass('disabled');
        }
      });
    });

    $('.row-check').click((e) => {
      e.stopImmediatePropagation();

      const $trEl = $(e.currentTarget).closest('.action-edit').parent();
      const id = $trEl.data('machine-id');

      $trEl.children('.address-text').removeClass('hidden');
      $trEl.children('.address-edit').addClass('hidden');
      $trEl.children('.region-text').removeClass('hidden');
      $trEl.children('.region-edit').addClass('hidden');
      $trEl.children('.action-detail').children('.action-box').removeClass('hidden');
      $trEl.children('.action-setup').removeClass('hidden');
      $trEl.children('.action-edit').addClass('hidden');

      $('tbody').find('tr').each((index, element) => {
        const $node = $(element);
        const thisId = $node.data('machine-id');
        if (disableIds.join().indexOf(thisId) < 0) {
          $node.children().children('.action-box').removeClass('disabled');
        }
      });

      const newAddress = $trEl.children().children('input[name=inputAddress]').val();
      const newRegion = $trEl.children().children('input[name=inputRegion]').val();

      const findRowData = originalMachineData.find(item => item.id === parseInt(id, 10));
      findRowData.address = newAddress;
      findRowData.region = newRegion;

      service.updateMachineData(JSON.stringify(findRowData), parseInt(id, 10))
        .then((json) => {
          console.log(json);
          initTable();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    $('.row-detail').click((e) => {
      const $trEl = $(e.currentTarget).closest('.action-detail').parent();
      const id = $trEl.data('machine-id');
      const model = $trEl.children('.model-text').text();
      const statusText = $trEl.children('.status-text').text();
      const temperature = $trEl.children('.temperature-text').text();
      const address = $trEl.children('.address-text').text();
      const region = $trEl.children('.region-text').text();


      $('input[name=editDeviceId]').val(id);
      $('input[name=editModel]').val(model);
      $('input[name=editStatus]').val(statusText);
      $('input[name=editTemperature]').val(temperature);
      $('input[name=editAddress]').val(address);
      $('input[name=editRegion]').val(region);
    });

    $('.add-machine-button').click((e) => {
      e.stopImmediatePropagation();
      $('#addMachineModal').modal('hide');

      const addModel = $('input[name=addModel]').val();
      const addStatus = $('select[name=addStatus]').val();
      const addTemperature = $('input[name=addTemperature]').val();
      const addAddress = $('input[name=addAddress]').val();
      const addRegion = $('input[name=addRegion]').val();

      const newMachineData = {
        model: addModel,
        status: addStatus,
        temperature: addTemperature,
        address: addAddress,
        region: addRegion,
        disable: false,
      };

      service.addMachineData(JSON.stringify(newMachineData))
        .then((json) => {
          console.log(json);
          initTable();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    $('.remove-machine-button').click((e) => {
      e.stopImmediatePropagation();
      $('#removeMachineModal').modal('hide');

      const $trEl = $(e.currentTarget);
      const removeId = $trEl.data('machine-id');

      service.removeMachineData(parseInt(removeId, 10))
        .then((json) => {
          console.log(json);
          initTable();
        })
        .catch((error) => {
          console.log(error);
        });
    });

    $('.row-remove').click((e) => {
      const $trEl = $(e.currentTarget).closest('.action-setup').parent();
      const machineId = $trEl.data('machine-id');

      $('#remove-machine-button').attr('data-machine-id', machineId);
    });

    $('.search-button').click(() => {
      const searchKeyword = $('input[name=searchKeyword]').val();
      if (searchKeyword !== '') {
        const result = originalMachineData.filter(item => item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || item.address.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
        reloadTable(result);
      } else {
        reloadTable(originalMachineData);
      }
    });

    $('.advanced-search-button').click(() => {
      const advancedKeyword = $('input[name=advancedKeyword]').val();
      const searchStatus = $('select[name=advancedStatus]').val();
      const result = originalMachineData.filter((item) => {
        if (advancedKeyword !== '') {
          return ((item.model.indexOf(advancedKeyword) > -1 || item.address.indexOf(advancedKeyword) > -1) && (item.status === parseInt(searchStatus, 10)));
        }
        return (item.status === parseInt(searchStatus, 10));
      });
      reloadTable(result);

      switchAdvancedSearch();
    });

    $('.advanced-close-button').click(() => {
      switchAdvancedSearch();
    });
  };

  const switchAdvancedSearch = () => {
    const openAdvancedSearch = $('.open-advanced-search');
    const advancedSearch = $('.advanced-search');

    if (advancedSearch.hasClass('hidden')) {
      openAdvancedSearch.children('i').addClass('dark');
      advancedSearch.removeClass('hidden');
    } else {
      openAdvancedSearch.children('i').removeClass('dark');
      advancedSearch.addClass('hidden');
    }
  };

  const initMenu = () => {
    const menuData = {
      page: {
        list: [],
      },
    };

    service.getMenuData()
      .then((json) => {
        menuData.page.list = json;
        const template = $('#menu-list-tpl').html();
        const html = Mustache.render(template, menuData);
        $('#menu-list-entry').html(html);
      })
      .then(() => {
        bindUI();
      });
  };

  const initTable = () => {
    const machineData = {
      page: {
        list: [],
      },
    };
    const pagingData = {
      page: {
        listLength: '',
      },
    };

    service.getMachineData()
      .then(json =>
        json.map((item) => {
          const itemId = item.id.toString().padStart(3, '0');
          const itemTemperature = item.temperature + temperatureUnit.c;
          const itemStatus = status[item.status];
          const itemLowercaseStatus = itemStatus.toLowerCase();
          const itemIsDisabled = item.disable;
          if (itemIsDisabled) {
            disableIds.push(itemId);
          }

          const machineList = {
            id: itemId,
            model: item.model,
            status: itemStatus,
            temperature: itemTemperature,
            address: item.address,
            region: item.region,
            lowercaseStatus: itemLowercaseStatus,
            isDisabled: itemIsDisabled,
          };
          return machineList;
        }))
      .then((list) => {
        machineData.page.list = list;
        const tableTemplate = $('#table-tpl').html();
        $('#table-entry').html(Mustache.render(tableTemplate, machineData));
        pagingData.page.listLength = list.length;
        const pagingTemplate = $('#paging-tpl').html();
        $('#paging-entry').html(Mustache.render(pagingTemplate, pagingData));
      })
      .then(() => {
        bindUI();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reloadTable = (data) => {
    const machineData = {
      page: {
        list: [],
      },
    };
    const pagingData = {
      page: {
        listLength: '',
      },
    };

    machineData.page.list = data.map((item) => {
      const itemId = item.id.toString().padStart(3, '0');
      const itemTemperature = item.temperature + temperatureUnit.c;
      const itemStatus = status[item.status];
      const itemLowercaseStatus = itemStatus.toLowerCase();
      const itemIsDisabled = item.disable;
      if (itemIsDisabled) {
        disableIds.push(itemId);
      }

      const list = {
        id: itemId,
        model: item.model,
        status: itemStatus,
        temperature: itemTemperature,
        address: item.address,
        region: item.region,
        lowercaseStatus: itemLowercaseStatus,
        isDisabled: itemIsDisabled,
      };
      return list;
    });
    const tableTemplate = $('#table-tpl').html();
    $('#table-entry').html(Mustache.render(tableTemplate, machineData));
    pagingData.page.listLength = machineData.page.list.length;
    const pagingTemplate = $('#paging-tpl').html();
    $('#paging-entry').html(Mustache.render(pagingTemplate, pagingData));
  };


  initTable();
  initMenu();
});
