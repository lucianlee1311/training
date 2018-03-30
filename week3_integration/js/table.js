const tableFunc = ($, Mustache) => {
  const disableIds = [];
  let originalMachineData = null;
  let tableTemplate = null;
  let pagingInformationTemplate = null;
  const visiblePages = 5;
  const visibleContents = 5;
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
        .then((text) => {
          tableTemplate = text;
          resolve(text);
        })
        .catch(reject);
    }),

    getPagingInformationTemplate: () => new Promise((resolve, reject) => {
      fetch('/templateHtml/pagingInformationTemplate.html', {
        method: 'GET',
      })
        .then(res => res.text())
        .then((text) => {
          pagingInformationTemplate = text;
          resolve(text);
        })
        .catch(reject);
    }),
  };

  const utils = {
    paddingZeroLeft: (str, lenght) => {
      if (str.toString().length >= lenght) {
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
      const openAdvancedSearch = $('.advanced-open-button');
      const advancedSearch = $('.advanced-search-region');

      if (advancedSearch.hasClass('hidden')) {
        openAdvancedSearch.children('i').addClass('dark');
        advancedSearch.removeClass('hidden');
      } else {
        openAdvancedSearch.children('i').removeClass('dark');
        advancedSearch.addClass('hidden');
      }
    },

    initPagination: (tableTpl, list) => {
      if ($('#pagination-entry').data('twbs-pagination')) {
        $('#pagination-entry').twbsPagination('destroy');
      }
      if (list === null || list.length <= 0) {
        return;
      }

      $('#pagination-entry').twbsPagination({
        totalPages: Math.ceil(list.length / visibleContents),
        visiblePages: list.length > visiblePages ? visiblePages : list.length,
        first: '<i class="fa fa-angle-double-left"></i>',
        prev: '<i class="fa fa-angle-left"></i>',
        next: '<i class="fa fa-angle-right"></i>',
        last: '<i class="fa fa-angle-double-right"></i>',
        onPageClick: (event, page) => {
          const start = (page - 1) * visibleContents;
          const end = start + visibleContents;
          const pagingTableData = list.slice(start, end);

          utils.renderTableData(tableTpl, pagingTableData);
          utils.bindUI();
        },
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

    renderTemplateData: ((tableTpl, pagingInformationTpl, data) => {
      if (data.length <= 0) {
        utils.initPagination(tableTpl, data);
        utils.renderTableData(tableTpl, data);
        utils.renderPagingData(pagingInformationTpl, data);
      } else {
        utils.initPagination(tableTpl, data);
        utils.renderPagingData(pagingInformationTpl, data);
      }
    }),

    addMachineData: (tableTpl, pagingInformationTpl, orgData, addMachineData, addId) => new Promise((resolve, reject) => {
      service.addMachineData(JSON.stringify(addMachineData))
        .then(() => {
          orgData.push(addMachineData);

          utils.initPagination(tableTpl, orgData);
          utils.renderPagingData(pagingInformationTpl, orgData);
          resolve(addId);
        })
        .catch(reject);
    }),

    updateMachineData: (tableTpl, pagingInformationTpl, orgData, updateRowData, updateId) => new Promise((resolve, reject) => {
      service.updateMachineData(JSON.stringify(updateRowData), updateId)
        .then(() => {
          const findIndex = orgData.findIndex(item => item.id === updateId);
          orgData.splice(findIndex, 1, updateRowData);

          utils.initPagination(tableTpl, orgData);
          utils.renderPagingData(pagingInformationTpl, orgData);
          resolve(updateId);
        })
        .catch(reject);
    }),

    removeMachineData: (tableTpl, pagingInformationTpl, orgData, removeId) => new Promise((resolve, reject) => {
      service.removeMachineData(removeId)
        .then(() => {
          const findIndex = orgData.findIndex(item => item.id === removeId);
          orgData.splice(findIndex, 1);

          utils.initPagination(tableTpl, orgData);
          utils.renderPagingData(pagingInformationTpl, orgData);

          resolve(removeId);
        })
        .catch(reject);
    }),

    searchData: ((tableTpl, pagingInformationTpl, orgData, keyword) => {
      if (keyword !== '') {
        const resultData = orgData.filter((item) => {
          const isModel = item.model.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
          const isAddress = item.address.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
          return (isModel || isAddress);
        });
        utils.renderTemplateData(tableTpl, pagingInformationTpl, resultData);
      } else if (orgData !== null) {
        utils.renderTemplateData(tableTpl, pagingInformationTpl, orgData);
      }
    }),

    advancedSearchData: ((tableTpl, pagingInformationTpl, orgData, keyword, searchStatus) => {
      if (orgData !== null) {
        const resultData = orgData.filter((item) => {
          if (keyword !== '') {
            const isModel = item.model.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
            const isAddress = item.address.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
            const isStatus = item.status.toString() === searchStatus;
            return ((isModel || isAddress) && isStatus);
          }
          return (item.status.toString() === searchStatus);
        });
        utils.renderTemplateData(tableTpl, pagingInformationTpl, resultData);
        utils.switchAdvancedSearch();
      }
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
        const machineId = $trEl.data('machine-id');

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
        if (originalMachineData !== null) {
          const updateId = parseInt(machineId, 10);
          const updateRowData = originalMachineData.find(item => item.id === updateId);
          updateRowData.address = newAddress;
          updateRowData.region = newRegion;

          utils.updateMachineData(tableTemplate, pagingInformationTemplate, originalMachineData, updateRowData, updateId)
            .catch((error) => {
              console.log(error);
            });
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

        const machineId = $(e.currentTarget).closest('.action-setup').parent().data('machine-id');
        $('#remove-machine-button').attr('data-machine-id', machineId);
      });

      $('.remove-machine-button').click((e) => {
        e.stopImmediatePropagation();
        $('#removeMachineModal').modal('hide');

        let removeId = $(e.currentTarget).data('machine-id');
        if (removeId === '') {
          return;
        }
        removeId = parseInt(removeId, 10);
        utils.removeMachineData(tableTemplate, pagingInformationTemplate, originalMachineData, removeId)
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
        let addId = 0;
        if (originalMachineData !== null) {
          if (originalMachineData.length > 0) {
            addId = originalMachineData[originalMachineData.length - 1].id + 1;
          }
          const addMachineData = {
            id: addId,
            model: addModel,
            status: addStatus,
            temperature: addTemperature,
            address: addAddress,
            region: addRegion,
            disable: false,
          };
          utils.addMachineData(tableTemplate, pagingInformationTemplate, originalMachineData, addMachineData, addId)
            .catch((error) => {
              console.log(error);
            });
        }
      });

      $('.search-button').click((e) => {
        e.stopImmediatePropagation();

        const searchKeyword = $('input[name=searchKeyword]').val();
        utils.searchData(tableTemplate, pagingInformationTemplate, originalMachineData, searchKeyword);
      });

      $('.advanced-search-button').click((e) => {
        e.stopImmediatePropagation();

        const advancedKeyword = $('input[name=advancedKeyword]').val();
        const searchStatus = $('select[name=advancedStatus]').val();
        utils.advancedSearchData(tableTemplate, pagingInformationTemplate, originalMachineData, advancedKeyword, searchStatus);
      });

      $('.advanced-open-button').click((e) => {
        e.stopImmediatePropagation();

        utils.switchAdvancedSearch();
      });

      $('.advanced-close-button').click((e) => {
        e.stopImmediatePropagation();

        utils.switchAdvancedSearch();
      });

      $('.open-add-machine').click((e) => {
        // e.stopImmediatePropagation();

        // $('#addMachineModal')
        $('.modal-title').html('title');
      });
    },

  };

  return { service, utils };
};

if (typeof module !== 'undefined' && typeof require !== 'undefined') {
  module.exports = tableFunc;
}
