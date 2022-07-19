describe('Creating An Account', () => {
  beforeAll(async () => {
    await device.launchApp();
  });
  it('should open register screen', async () => {
    await element(by.id('register')).tap();
    await expect(
      element(by.text('I agree to the Terms of Service and Privacy Policy')),
    ).toBeVisible();
  });
  it('should fill in values and fail validation', async () => {
    await element(by.id('password')).typeText('password');
    await element(by.id('confirmPassword')).typeText('password');
    await element(by.id('displayName')).typeText('Test Account Display Name');
    await element(by.id('email')).typeText('testEmail@example.com');
    await element(by.id('scrollView')).scrollTo('bottom');
    await element(by.id('createAccount')).tap();
    await expect(element(by.text('Required'))).toBeVisible();
  });
  it('should fix validation errors and continue to MFA setup', async () => {
    await element(by.id('terms')).tap();
    await expect(element(by.text('Required'))).not.toBeVisible();
    await element(by.id('createAccount')).tap();
  });
  it('should setup MFA', async () => {
    await element(by.id('phone')).typeText('+79122313445');
    await element(by.id('submit')).tap();
  });
  it('should verify MFA', async () => {
    await element(by.id('textInput')).atIndex(0).typeText('123456');
    await expect(element(by.text('Home'))).toBeVisible();
  });
});
describe('Changing Language', () => {
  it('should change language to es', async () => {
    await element(by.id('settings')).tap();
    await element(by.id('change-language')).tap();
    await element(by.id('change-language-fr')).tap();
    await element(by.id('header-back')).atIndex(1).tap();
    await element(by.id('header-back')).tap();
    await expect(element(by.text('Réglages'))).toBeVisible();
    await element(by.id('settings')).tap();
    await element(by.id('change-language')).tap();
    await element(by.id('change-language-en')).tap();
    await element(by.id('header-back')).atIndex(1).tap();
    await element(by.id('header-back')).tap();
    await expect(element(by.text('Settings'))).toBeVisible();
  });
});
describe('Changing Theme', () => {
  it('should change theme to dark mode with purple accent', async () => {
    await element(by.id('settings')).tap();
    await element(by.id('change-theme')).tap();
    await element(by.id('dark-mode')).tap();
    await element(by.id('accordion')).tap();
    await element(by.id('change-theme-purple')).tap();
    await element(by.id('header-back')).atIndex(1).tap();
    await element(by.id('header-back')).tap();
    await element(by.id('logout')).tap();
  });
});
