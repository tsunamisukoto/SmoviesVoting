import { AuthenticationService } from './authentication.service';

describe('Service: Authentication', () => {
  it('should create an instance', () => {
    const service = new AuthenticationService(null);
    expect(service).toBeTruthy();
  });
});
