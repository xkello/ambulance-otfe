import { newE2EPage } from '@stencil/core/testing';

describe('ot-hospital-navbar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ot-hospital-navbar></ot-hospital-navbar>');

    const element = await page.find('ot-hospital-navbar');
    expect(element).toHaveClass('hydrated');
  });
});
