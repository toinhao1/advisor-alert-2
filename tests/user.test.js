const request = require('supertest');
const app = require('../server');
const User = require('../src/db/models/User');
// const { userOne, userOneId, setupDatabase } = require('./fixtures/db');

// beforeEach(setupDatabase);

// Testing route to create a user
test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/register')
    .send({
      name: 'Anthony',
      email: 'toinhao89@example.com',
      password: 'skdnekudfui324'
    })
    .expect(201);
  // Assert that DB was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response
  expect(response.body).toMatchObject({
    user: {
      name: 'Anthony',
      email: 'toinhao89@example.com'
    },
    token: user.tokens[0].token
  });
  expect(user.password).not.toBe('skdnekudfui324');
});
