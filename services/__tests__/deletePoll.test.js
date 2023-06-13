const faker = require('faker');
const deletePoll = require('../deletePoll');

test('deletes a poll', async () => {
  const poll = {
    mode: PollMode.SINGLE,
    owner: faker.random.uuid(),
    options: [faker.lorem.word()],
    question: faker.lorem.word(),
  };

  const createdPoll = await createPoll(poll);

  await deletePoll({ id: createdPoll.id, owner: poll.owner });

  expect(error).toBeUndefined();
});

