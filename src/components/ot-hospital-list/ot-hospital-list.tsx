import {Component, Event, EventEmitter, Host, Prop, State, h, Method, Watch} from '@stencil/core';
import {HospitalEmployeeListApi, EmployeeListEntry, Configuration} from '../../api/hospital';

@Component({
  tag: 'ot-hospital-list',
  styleUrl: 'ot-hospital-list.css',
  shadow: true,
})

export class OtHospitalList {
  @Event({eventName: "entry-clicked", composed: true}) entryClicked: EventEmitter<string>;
  @Prop() apiBase: string;
  @Prop() hospitalId!: string;
  @State() errorMessage: string;

  @State() employees: EmployeeListEntry[] = [];

  async componentWillLoad() {
    console.log('ot-hospital-list: componentWillLoad', {apiBase: this.apiBase, hospitalId: this.hospitalId});
    return this.getEmployeeAsync();
  }

  @Watch('hospitalId')
  async hospitalChanged(newId: string) {
    console.log('ot-hospital-list: hospitalId changed → reloading', {newId});
    console.log('📋 List reloading for hospital', newId);
    this.employees = await this.getEmployeeAsync();
  }

  async componentDidLoad() {
    console.log('ot-hospital-list: componentDidLoad', {employeesCount: this.employees?.length});
  }

  async componentDidUpdate() {
    console.log('ot-hospital-list: componentDidUpdate', {employeesCount: this.employees?.length});
  }

  private async getEmployeeAsync(): Promise<EmployeeListEntry[]> {
    console.log('ot-hospital-list: getEmployeeAsync - starting API request', {
      apiBase: this.apiBase,
      hospitalId: this.hospitalId
    });
    try {
      const configuration = new Configuration({
        basePath: this.apiBase,
      });

      const employeeListApi = new HospitalEmployeeListApi(configuration);
      console.log('ot-hospital-list: getEmployeeAsync - sending request');
      const response = await employeeListApi.getEmployeeListEntriesRaw({hospitalId: this.hospitalId})
      console.log('ot-hospital-list: getEmployeeAsync - received response', {
        status: response.raw.status,
        statusText: response.raw.statusText
      });

      if (response.raw.status < 299) {
        const data = await response.value();
        console.log('ot-hospital-list: getEmployeeAsync - parsed response data', {count: data.length});
        this.employees = data;
        return data;
      } else {
        this.errorMessage = `Cannot retrieve list of employees: ${response.raw.statusText}`;
        console.error('ot-hospital-list: getEmployeeAsync - error response', {
          status: response.raw.status,
          statusText: response.raw.statusText
        });
      }
    } catch (err: any) {
      this.errorMessage = `Cannot retrieve list of employees: ${err.message || "unknown"}`;
      console.error('ot-hospital-list: getEmployeeAsync - exception', {message: err.message, error: err});
    }
    this.employees = [];
    return [];
  }

  private handleAddClick = () => {
    console.log('ot-hospital-list: Add button clicked');
    try {
      this.entryClicked.emit("@new");
      console.log('ot-hospital-list: entryClicked event emitted with @new');
    } catch (err) {
      console.error('ot-hospital-list: Error emitting entryClicked event', err);
    }
  }

  private handleEmployeeClick = (employeeId: string) => {
    console.log('ot-hospital-list: Employee item clicked', {employeeId});
    try {
      this.entryClicked.emit(employeeId);
      console.log('ot-hospital-list: entryClicked event emitted with employeeId', {employeeId});
    } catch (err) {
      console.error('ot-hospital-list: Error emitting entryClicked event', err);
    }
  }

  @Method()
  async reload() {
    this.employees = await this.getEmployeeAsync();
  }

  render() {
    console.log('ot-hospital-list: render', {
      hasError: !!this.errorMessage,
      employeesCount: this.employees?.length
    });

    return (
      <Host>
        <div class="list-header">
          <h2>List of employees</h2>
          <md-filled-button class="add-button" onclick={this.handleAddClick}>
            <md-icon slot="icon">add</md-icon>
            Add employee
          </md-filled-button>
        </div>

        {this.errorMessage
          ? <div class="error">{this.errorMessage}</div>
          :
          <div class="list-container">
            <md-list>
              {this.employees && this.employees.map((employee) =>
                <md-list-item onClick={() => this.handleEmployeeClick(employee.id)}>

                  <div slot="headline">{employee.name}</div>
                  <md-icon slot="start">person</md-icon>
                  {employee.role &&
                    <div slot="supporting-text">{employee.role.value}</div>
                  }
                  <div slot="end" class="performance-rating">
                    {employee.performance !== undefined ? employee.performance : 0}/10
                  </div>
                </md-list-item>
              )}
            </md-list>
          </div>
        }
      </Host>
    );
  }
}
