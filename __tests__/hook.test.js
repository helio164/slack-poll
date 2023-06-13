const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const createPoll = require('../services/createPoll');

test('add poll answer by calling slack interactive components', async () => {
  const poll = {
    mode: PollMode.SINGLE,
    owner: faker.random.uuid(),
    options: [faker.lorem.word()],
    question: faker.lorem.word(),
  };

  const slackVerificationToken = 'slack_verification_token';
  const exctedUserId = faker.random.uuid();
  const [option] = poll.options;

  const createdPoll = await createPoll(poll);

  const requestBody = {
    payload: JSON.stringify({
      token: slackVerificationToken,
      user: {
        id: exctedUserId,
      },
      callback_id: createdPoll.id,
      actions: [
        {
          value: `${option}-0`,
        },
      ],
    }),
  };

  const response = await request(app).post('/hook').send(requestBody);

  expect(response.status).toBe(200);
});

