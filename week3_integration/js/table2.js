const status = {
  0: 'Online',
  1: 'Offline',
  2: 'Error',
};
const temperatureUnit = {
  c: `${String.fromCharCode(176)}C`,
  f: `${String.fromCharCode(176)}F`,
};

class Machine {
  constructor(template, data, machinesEvent) {
    const processData = this.processData(data);
    this.template = $(Mustache.render(template, processData));
    this.data = data;
    this.props = { machinesEvent };
    this.bindEvent();
  }
  bindEvent() {
    this.template.find('.row-detail').click(this.clickDetail.bind(this));
    this.template.find('.row-edit').click(this.clickEdit.bind(this));
    this.template.find('.row-remove').click(this.clickRemove.bind(this));
    this.template.find('.row-close').click(this.clickClose.bind(this));
    this.template.find('.row-check').click(this.clickCheck.bind(this));
  }
  processData(data) {
    const processData = {
      id: this.paddingZeroLeft(data.id, 3),
      model: data.model,
      status: status[data.status],
      temperature: data.temperature + temperatureUnit.c,
      address: data.address,
      region: data.region,
      lowercaseStatus: status[data.status].toLowerCase(),
      isDisabled: data.disable,
    };
    return processData;
  }
  paddingZeroLeft(str, lenght) {
    if (str.toString().length >= lenght) {
      return str;
    }
    return this.paddingZeroLeft(`0${str}`, lenght);
  }
  doRemove() {
    this.template.remove();
  }
  clickDetail() {
    this.props.machinesEvent(this, 'detail');
  }
  clickEdit() {
    this.isShowEdit(true);
    this.props.machinesEvent(this, 'edit');
  }
  clickRemove() {
    this.props.machinesEvent(this, 'remove');
  }
  clickClose() {
    this.isShowEdit(false);
    this.props.machinesEvent(this, 'close');
  }
  clickCheck() {
    const newAddress = this.template.find('input[name=inputAddress]').val();
    const newRegion = this.template.find('input[name=inputRegion]').val();
    this.template.find('.address-text').text(newAddress);
    this.template.find('.region-text').text(newRegion);

    const params = { newAddress, newRegion };
    this.isShowEdit(false);
    this.props.machinesEvent(this, 'check', params);
  }
  isShowEdit(isShow) {
    if (isShow) {
      this.template.find('.address-text').addClass('hidden');
      this.template.find('.address-edit').removeClass('hidden');
      this.template.find('.region-text').addClass('hidden');
      this.template.find('.region-edit').removeClass('hidden');
      this.template.find('.action-detail').children('.action-box').addClass('hidden');
      this.template.find('.action-setup').addClass('hidden');
      this.template.find('.action-edit').removeClass('hidden');
    } else {
      this.template.find('.address-text').removeClass('hidden');
      this.template.find('.address-edit').addClass('hidden');
      this.template.find('.region-text').removeClass('hidden');
      this.template.find('.region-edit').addClass('hidden');
      this.template.find('.action-detail').children('.action-box').removeClass('hidden');
      this.template.find('.action-setup').removeClass('hidden');
      this.template.find('.action-edit').addClass('hidden');
    }
  }
}

class APP {
  constructor(template, json) {
    this.template = template;
    this.json = json;
    this.addModalTemplate = $('#addMachineModal');
    this.detailModalTemplate = $('#detailMachineModal');
    this.removeModalTemplate = $('#removeMachineModal');
    this.contentSearchTemplate = $('#contentSearch');
    this.contentPagingTemplate = $('#contentPaging');
    this.machines = this.machineFactory(template, json);
    this.cloneMachines = Object.assign([], this.machines);
    this.activeMachine = null;
    this.visiblePages = 5;
    this.visibleContents = 5;
  }
  machineFactory(template, json) {
    const self = this;
    return json.map((data) => {
      const result = new Machine(template, data, self.machinesEvents.bind(self));
      return result;
    });
  }
  render() {
    const $fragement = $(document.createDocumentFragment());
    this.machines.forEach((element) => {
      $fragement.append(element.template);
    });
    $('#machine-row-template-entry').html('');
    $('#machine-row-template-entry').append($fragement);
    this.bindEvent();
  }
  renderPage(machines) {
    if (machines === undefined) {
      machines = this.cloneMachines;
    }
    this.contentPagingTemplate.find('.paging-information').text(`${machines.length} Models`);
    if ($('#pagination-entry').data('twbs-pagination')) {
      $('#pagination-entry').twbsPagination('destroy');
    }
    $('#pagination-entry').twbsPagination({
      totalPages: Math.ceil(machines.length / this.visibleContents),
      visiblePages: machines.length > this.visiblePages ? this.visiblePages : machines.length,
      first: '<i class="fa fa-angle-double-left"></i>',
      prev: '<i class="fa fa-angle-left"></i>',
      next: '<i class="fa fa-angle-right"></i>',
      last: '<i class="fa fa-angle-double-right"></i>',
      onPageClick: (event, page) => {
        const start = (page - 1) * this.visibleContents;
        const end = start + this.visibleContents;
        this.machines = machines.slice(start, end);
        this.render();
      },
    });
  }
  bindEvent() {
    this.removeModalTemplate.find('.remove-machine-button').click(this.clickModalRemove.bind(this));
    this.addModalTemplate.find('.add-machine-button').click(this.clickModalAdd.bind(this));
    this.contentSearchTemplate.find('.search-button').click(this.clickSearch.bind(this));
    this.contentSearchTemplate.find('.advanced-search-button').click(this.clickAdvancedSearch.bind(this));
    this.contentSearchTemplate.find('.advanced-open-button').click(this.clickAdvancedOpen.bind(this));
    this.contentSearchTemplate.find('.advanced-close-button').click(this.clickAdvancedClose.bind(this));
  }
  machinesEvents(activeMachine, eventType, params) {
    if (eventType === 'edit') {
      this.clickEdit(activeMachine);
    } else if (eventType === 'close') {
      this.clickClose(activeMachine);
    } else if (eventType === 'check') {
      this.clickCheck(activeMachine, params);
    } else if (eventType === 'remove') {
      this.clickRemove(activeMachine);
    } else if (eventType === 'detail') {
      this.clickDetail(activeMachine);
    }
  }
  clickOpenAddMachine() {
    this.modalTemplate.find('.modal-title').html('');
    this.modalTemplate.find('.modal-body').html('');
    this.modalTemplate.find('.modal-title').append('Add Machine');
    this.modalTemplate.find('.modal-body').append(this.addModalContent);
    this.modalTemplate.find('.machine-button').data('machind-type', 'add');
    this.modalTemplate.find('.machine-button').show();
  }
  clickEdit(activeMachine) {
    this.isEditDisabled(activeMachine, true);
  }
  clickClose(activeMachine) {
    this.isEditDisabled(activeMachine, false);
  }
  clickCheck(activeMachine, params) {
    this.isEditDisabled(activeMachine, false);
    const machine = this.machines.find(item => item.data.id === activeMachine.data.id);
    machine.data.address = params.newAddress;
    machine.data.region = params.newRegion;
  }
  clickRemove(activeMachine) {
    this.activeMachine = activeMachine;
  }
  clickDetail(activeMachine) {
    this.detailModalTemplate.find('input[name=editDeviceId]').val(activeMachine.data.id);
    this.detailModalTemplate.find('input[name=editModel]').val(activeMachine.data.model);
    this.detailModalTemplate.find('input[name=editStatus]').val(activeMachine.data.status);
    this.detailModalTemplate.find('input[name=editTemperature]').val(activeMachine.data.temperature);
    this.detailModalTemplate.find('input[name=editAddress]').val(activeMachine.data.address);
    this.detailModalTemplate.find('input[name=editRegion]').val(activeMachine.data.region);
  }
  clickModalRemove() {
    this.cloneMachines = this.cloneMachines.filter(targetMachine => this.activeMachine.data.id !== targetMachine.data.id);
    this.activeMachine.doRemove();
    this.renderPage(this.cloneMachines);
  }
  clickModalAdd() {
    const data = {
      id: (this.machines.length + 1),
      model: this.addModalTemplate.find('input[name=addModel]').val(),
      status: this.addModalTemplate.find('select[name=addStatus]').val(),
      temperature: this.addModalTemplate.find('input[name=addTemperature]').val(),
      address: this.addModalTemplate.find('input[name=addAddress]').val(),
      region: this.addModalTemplate.find('input[name=addRegion]').val(),
    };
    const result = new Machine(this.template, data, this.machinesEvents.bind(this));
    this.cloneMachines.push(result);
    this.renderPage(this.cloneMachines);
  }
  clickSearch() {
    const keyword = this.contentSearchTemplate.find('input[name=searchKeyword]').val();
    if (keyword !== '') {
      this.machines = this.cloneMachines.filter((item) => {
        const isModel = item.data.model.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        const isAddress = item.data.address.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        return (isModel || isAddress);
      });
    }
    this.renderPage(this.machines);
  }
  clickAdvancedSearch() {
    const keyword = this.contentSearchTemplate.find('input[name=advancedKeyword]').val();
    const searchStatus = this.contentSearchTemplate.find('select[name=advancedStatus]').val();
    this.machines = this.cloneMachines.filter((item) => {
      if (keyword !== '') {
        const isModel = item.data.model.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        const isAddress = item.data.address.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
        const isStatus = item.data.status.toString() === searchStatus;
        return ((isModel || isAddress) && isStatus);
      }
      return (item.data.status.toString() === searchStatus);
    });
    this.renderPage(this.machines);
    this.changeAdvancedRegion();
  }
  clickAdvancedOpen() {
    this.changeAdvancedRegion();
  }
  clickAdvancedClose() {
    this.changeAdvancedRegion();
  }
  isEditDisabled(activeMachine, isDisabled) {
    this.machines.forEach((item) => {
      if (item.data.id !== activeMachine.data.id) {
        if (isDisabled) {
          item.template.find('.action-box').addClass('disabled');
        } else {
          item.template.find('.action-box').removeClass('disabled');
        }
      }
    });
  }
  changeAdvancedRegion() {
    const region = this.contentSearchTemplate.find('.advanced-search-region');
    const openButton = this.contentSearchTemplate.find('.advanced-open-button');
    if (region.hasClass('hidden')) {
      region.removeClass('hidden');
      openButton.children('i').addClass('dark');
    } else {
      region.addClass('hidden');
      openButton.children('i').removeClass('dark');
    }
  }
}