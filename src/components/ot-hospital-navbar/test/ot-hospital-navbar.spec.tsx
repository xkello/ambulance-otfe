import { newSpecPage } from '@stencil/core/testing';
import { OtHospitalNavbar } from '../ot-hospital-navbar';

describe('ot-hospital-navbar', () => {
  it('renders the nav skeleton even on 404', async () => {
    const page = await newSpecPage({
      components: [ OtHospitalNavbar ],
      html:       `<ot-hospital-navbar></ot-hospital-navbar>`,
    });

    expect(page.root).toEqualHtml(`
      <ot-hospital-navbar>
        <mock:shadow-root>
          <nav class="navbar">
            <div class="navbar-brand"></div>
            <div class="navbar-items">
              <md-filled-button>Employees</md-filled-button>
              <md-filled-button>Clinics</md-filled-button>
              <md-filled-select label="Hospitals" value=""></md-filled-select>
            </div>
          </nav>
        </mock:shadow-root>
      </ot-hospital-navbar>
    `);
  });
});
