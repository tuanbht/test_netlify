import CredentialActions from '../CredentialActions';

describe('CredentialActions', () => {
  describe('saveCredentialAction', () => {
    it('returns action save credential', () => {
      expect(CredentialActions.saveCredentialAction('token', 1)).toMatchSnapshot();
    });
  });
});
