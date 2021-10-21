const axios = require('axios');
const AppController = require('../controller');
jest.mock('axios');

test('AppController access home', () => {
  const resp = { success: true };
  axios.get.mockResolvedValue(resp);
  return AppController.home().then((data) => expect(data).toEqual(resp));
});
