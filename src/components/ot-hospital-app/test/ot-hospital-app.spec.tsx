import {newSpecPage} from '@stencil/core/testing';
import {OTHospitalApp} from '../ot-hospital-app';

describe('ot-hospital-app', () => {

  it('always renders navbar as first child', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/',
      components: [OTHospitalApp],
      html: `<ot-hospital-app base-path="/" api-base="http://localhost/api" hospital-id="hospital-ba"></ot-hospital-app>`
    });

    const first = page.root.shadowRoot!.firstElementChild!;
    expect(first.tagName.toLowerCase()).toBe('ot-hospital-navbar');
  });

  it('always renders list as second child', async () => {
    const page = await newSpecPage({
      url: 'http://localhost/hospital/',
      components: [OTHospitalApp],
      html: `<ot-hospital-app base-path="/hospital/" api-base="http://localhost/api" hospital-id="hospital-ba"></ot-hospital-app>`
    });

    const second = page.root.shadowRoot!.children[1];
    expect(second.tagName.toLowerCase()).toBe('ot-hospital-list');
  });
});
