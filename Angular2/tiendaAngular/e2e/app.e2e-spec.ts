import { TiendaAngularPage } from './app.po';

describe('tienda-angular App', function() {
  let page: TiendaAngularPage;

  beforeEach(() => {
    page = new TiendaAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
