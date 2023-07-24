import { AuthService } from './AuthService';

async function testAuth() {
  const service = new AuthService();
  const loginResult = await service.login('USERNAME', 'PASSW');
  console.log(loginResult.getSignInUserSession().getIdToken().getJwtToken());
}

testAuth();
