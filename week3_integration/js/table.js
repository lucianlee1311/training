const tableFunc = ($, Mustache) => {
  const disableIds = [];
  let originalMachineData = null;
  const pageLimit = 5;
  const status = {
    0: 'Online',
    1: 'Offline',
    2: 'Error',
  };
  const temperatureUnit = {
    c: `${String.fromCharCode(176)}C`,
    f: `${String.fromCharCode(176)}F`,
  };

  const service = {
    getMachineData: () => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/machine', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then((json) => {
          originalMachineData = JSON.parse(JSON.stringify(json));
          resolve(json);
        })
        .catch(reject);
    }),

    addMachineData: machineData => new Promise((resolve, reject) => {
      fetch('https://lucianjson.herokuapp.com/machine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: machineData,
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    }),

    updateMachineData: (machineData, id) => new Promise((resolve, reject) => {
      fetch(`https://lucianjson.herokuapp.com/machine/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: machineData,
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    }),

    removeMachineData: id => new Promise((resolve, reject) => {
      fetch(`https://lucianjson.herokuapp.com/machine/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(resolve)
        .catch(reject);
    }),

    getTableTemplate: () => new Promise((resolve, reject) => {
      fetch('/templateHtml/tableTemplate.html', {
        method: 'GET',
      })
        .then(res => res.text())
        .then(resolve)
        .catch(reject);
    }),

    getPagingInformationTemplate: () => new Promise((resolve, reject) => {
      fetch('/templateHtml/pagingInformationTemplate.html', {
        method: 'GET',
      })
        .then(res => res.text())
        .then(resolve)
        .catch(reject);
    }),
  };

  const utils = {
    paddingZeroLeft: (str, lenght) => {
      if (str.length >= lenght) {
        return str;
      }
      return utils.paddingZeroLeft(`0${str}`, lenght);
    },

    processMachineData: (data) => {
      const newData = data.map((item) => {
        const itemId = utils.paddingZeroLeft(item.id, 3);
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

      const machineData = {
        page: {
          loaded: true,
          list: newData,
        },
      };
      if (newData.length <= 0) {
        machineData.page.loaded = false;
      } else {
        machineData.page.list = newData;
      }

      return machineData;
    },

    switchAdvancedSearch: () => {
      const openAdvancedSearch = $('.open-advanced-search');
      const advancedSearch = $('.advanced-search');

      if (advancedSearch.hasClass('hidden')) {
        openAdvancedSearch.children('i').addClass('dark');
        advancedSearch.removeClass('hidden');
      } else {
        openAdvancedSearch.children('i').removeClass('dark');
        advancedSearch.addClass('hidden');
      }
    },

    initPagination: (tableTemplate, list) => {
      if ($('#pagination-entry').data('twbs-pagination')) {
        $('#pagination-entry').twbsPagination('destroy');
      }
      if (list.length <= 0) {
        return;
      }

      $('#pagination-entry').twbsPagination({
        totalPages: Math.ceil(list.length / pageLimit),
        visiblePages: list.length > pageLimit ? pageLimit : list.length,
        first: '<i class="fa fa-angle-double-left"></i>',
        prev: '<i class="fa fa-angle-left"></i>',
        next: '<i class="fa fa-angle-right"></i>',
        last: '<i class="fa fa-angle-double-right"></i>',
        onPageClick: (event, page) => {
          const start = (page - 1) * pageLimit;
          const end = start + pageLimit;
          const pagingTableData = list.slice(start, end);

          utils.renderTableData(tableTemplate, pagingTableData);
          utils.bindUI();
        },
      });
    },

    initTable: () => {
      Promise.all([service.getTableTemplate(), service.getPagingInformationTemplate(), service.getMachineData()])
        .then(([tableTemplate, pagingInformationTemplate, data]) => {
          utils.initPagination(tableTemplate, data);
          utils.renderPagingData(pagingInformationTemplate, data);
        })
        .then(() => {
          utils.bindUI();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    reloadTable: (data) => {
      Promise.all([service.getTableTemplate(), service.getPagingInformationTemplate()])
        .then(([tableTemplate, pagingInformationTemplate]) => {
          if (data.length <= 0) {
            utils.initPagination(tableTemplate, data);
            utils.renderTableData(tableTemplate, data);
            utils.renderPagingData(pagingInformationTemplate, data);
          } else {
            utils.initPagination(tableTemplate, data);
            utils.renderPagingData(pagingInformationTemplate, data);
          }
        })
        .then(() => {
          utils.bindUI();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    renderTableData: ((template, machineData) => {
      const processedData = utils.processMachineData(machineData);
      const machineTemplateHtml = $(template).html();
      $('#table-entry').html(Mustache.render(machineTemplateHtml, processedData));
    }),

    renderPagingData: ((template, list) => {
      const listLength = list.length;
      const pagingData = { page: { listLength } };
      const pagingTemplateHtml = $(template).html();
      $('#paging-entry').html(Mustache.render(pagingTemplateHtml, pagingData));
    }),

    updateMachineData: ((id, newAddress, newRegion, originalData) => {
      const findRowData = originalData.find(item => item.id === parseInt(id, 10));
      findRowData.address = newAddress;
      findRowData.region = newRegion;

      service.updateMachineData(JSON.stringify(findRowData), parseInt(id, 10))
        .then(() => {
          utils.initTable();
        })
        .catch((error) => {
          console.log(error);
        });
    }),

    bindUI: () => {
      $('.row-edit').click((e) => {
        if ($(e.currentTarget).parent().hasClass('disabled')) {
          return;
        }

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

        if (originalMachineData === null) {
          service
            .getMachineData()
            .then((data) => {
              originalMachineData = data;
            })
            .then(() => {
              utils.updateMachineData(id, newAddress, newRegion, originalMachineData);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          utils.updateMachineData(id, newAddress, newRegion, originalMachineData);
        }
      });

      $('.row-detail').click((e) => {
        if ($(e.currentTarget).parent().hasClass('disabled')) {
          return;
        }

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

      $('.row-remove').click((e) => {
        if ($(e.currentTarget).parent().hasClass('disabled')) {
          return;
        }

        const $trEl = $(e.currentTarget).closest('.action-setup').parent();
        const machineId = $trEl.data('machine-id');

        $('#remove-machine-button').attr('data-machine-id', machineId);
      });

      $('.remove-machine-button').click((e) => {
        e.stopImmediatePropagation();
        $('#removeMachineModal').modal('hide');

        const $trEl = $(e.currentTarget);
        const removeId = $trEl.data('machine-id');

        service.removeMachineData(parseInt(removeId, 10))
          .then(() => {
            utils.initTable();
          })
          .catch((error) => {
            console.log(error);
          });
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
          .then(() => {
            utils.initTable();
          })
          .catch((error) => {
            console.log(error);
          });
      });

      $('.search-button').click((e) => {
        e.stopImmediatePropagation();

        const searchKeyword = $('input[name=searchKeyword]').val();
        if (searchKeyword !== '') {
          const result = originalMachineData.filter(item => item.model.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1 || item.address.toLowerCase().indexOf(searchKeyword.toLowerCase()) > -1);
          utils.reloadTable(result);
        } else {
          utils.reloadTable(originalMachineData);
        }
      });

      $('.open-advanced-search').click((e) => {
        e.stopImmediatePropagation();

        utils.switchAdvancedSearch();
      });

      $('.advanced-search-button').click((e) => {
        e.stopImmediatePropagation();

        const advancedKeyword = $('input[name=advancedKeyword]').val();
        const searchStatus = $('select[name=advancedStatus]').val();
        const result = originalMachineData.filter((item) => {
          if (advancedKeyword !== '') {
            return ((item.model.indexOf(advancedKeyword) > -1 || item.address.indexOf(advancedKeyword) > -1) && (item.status.toString() === searchStatus));
          }
          return (item.status.toString() === searchStatus);
        });
        utils.reloadTable(result);

        utils.switchAdvancedSearch();
      });

      $('.advanced-close-button').click((e) => {
        e.stopImmediatePropagation();

        utils.switchAdvancedSearch();
      });
    },

  };

  return { service, utils };
};

if (typeof module !== 'undefined' && typeof require !== 'undefined') {
  module.exports = tableFunc;
}
