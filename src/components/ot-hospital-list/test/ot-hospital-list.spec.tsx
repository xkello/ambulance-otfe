import {newSpecPage} from '@stencil/core/testing';
import {OtHospitalList} from '../ot-hospital-list';
import {EmployeeListEntry} from '../../../api/hospital/models';
import fetchMock from 'jest-fetch-mock';

describe('ot-hospital-list', () => {
  const sampleEntries: EmployeeListEntry[] = [
    {
      id: "entry-1",
      name: "Juraj Prvý",
    },
    {
      id: "entry-2",
      name: "James Druhý",
    }
  ];

  beforeAll(() => {
    fetchMock.enableMocks();
  });

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it('renders sample entries', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleEntries));
    const page = await newSpecPage({
      components: [OtHospitalList],
      html: `<ot-hospital-list hospital-id="test-hospital" api-base="http://test/api"></ot-hospital-list>`,
    });

    const wlList = page.rootInstance as OtHospitalList;
    const expectedPatients = wlList?.employees?.length

    await page.waitForChanges();

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(expectedPatients).toEqual(sampleEntries.length);
    expect(items.length).toEqual(expectedPatients);
  });

  it('renders error message on network issues', async () => {
    fetchMock.mockRejectOnce(new Error('Network Error'));

    const page = await newSpecPage({
      components: [OtHospitalList],
      html: `<ot-hospital-list hospital-id="test-hospital" api-base="http://test/api"></ot-hospital-list>`,
    });

    const wlList = page.rootInstance as OtHospitalList;
    const expectedPatients = wlList?.employees?.length;

    await page.waitForChanges();

    const errorMessage = page.root.shadowRoot.querySelectorAll(".error");
    const items = page.root.shadowRoot.querySelectorAll("md-list-item");

    expect(errorMessage.length).toBeGreaterThanOrEqual(1);
    expect(expectedPatients).toEqual(0);
    expect(items.length).toEqual(expectedPatients);
  });

});
