import { newE2EPage } from '@stencil/core/testing';

describe('ot-hospital-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ot-hospital-editor></ot-hospital-editor>');

    const element = await page.find('ot-hospital-editor');
    expect(element).toHaveClass('hydrated');
  });
});
