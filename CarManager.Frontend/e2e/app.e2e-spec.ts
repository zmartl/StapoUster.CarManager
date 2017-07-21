import { CarmanagerFrontendPage } from './app.po';

describe('carmanager-frontend App', () => {
  let page: CarmanagerFrontendPage;

  beforeEach(() => {
    page = new CarmanagerFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
