import { newE2EPage } from '@stencil/core/testing';

describe('ot-hospital-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ot-hospital-list></ot-hospital-list>');

    const element = await page.find('ot-hospital-list');
    expect(element).toHaveClass('hydrated');
  });
});
