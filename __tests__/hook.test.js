const request = require('supertest');
const faker = require('faker');
const app = require('../app');
const createPoll = require('../services/createPoll');

test('add poll answer by calling slack interactive components', async () => {
});

test('rejects with invalid verification token', async () => {
  const slackVerificationToken = faker.random.uuid();
  const expectedOption = faker.lorem.word();
  const userId = faker.random.uuid();
  const pollId = faker.random.uuid();

  const requestBody = {
    payload: JSON.stringify({
      token: slackVerificationToken,
      user: {
        id: userId,
      },
      callback_id: pollId,
      actions: [
        {
          value: expectedOption,
        },
      ],
    }),
  };

  const response = await request(app).post('/hook').send(requestBody);

  expect(response.status).toBe(403);
});

test('fails to create a poll response with invalid answer', async () => {
  const poll = {
    mode: PollMode.SINGLE,
    owner: faker.random.uuid(),
    options: [faker.lorem.word()],
    question: faker.lorem.word(),
  };

  const slackVerificationToken = 'slack_verification_token';
  const exctedUserId = faker.random.uuid();
  const invalidOption = faker.lorem.word();

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
          value: invalidOption,
        },
      ],
    }),
  };

  const response = await request(app).post('/hook').send(requestBody);

  expect(response.status).toBe(200);
  expect(response.body.text).toBe(

    "Sorry, there's been an error. Try again later."
  );
});
