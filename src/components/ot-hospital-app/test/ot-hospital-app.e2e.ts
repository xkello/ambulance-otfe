import { newE2EPage } from '@stencil/core/testing';

describe('ot-hospital-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('ot-hospital-app></ot-hospital-app>');

    const element = await page.find('ot-hospital-app');
    expect(element).toHaveClass('hydrated');
  });
});
