import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  let component: SignInPageComponent;

  beforeEach(() => {
    component = new SignInPageComponent(null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
