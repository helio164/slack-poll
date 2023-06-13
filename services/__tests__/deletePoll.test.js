const faker = require('faker');
const deletePoll = require('../deletePoll');

test('deletes a poll', async () => {
});

test('fails to delete a poll as not the same owner', async () => {
  const notSameOwner = faker.random.uuid();
  const poll = {
    mode: PollMode.SINGLE,
    owner: faker.random.uuid(),
    options: [faker.lorem.word()],
    question: faker.lorem.word(),
  };

  const createdPoll = await createPoll(poll);
  try {
    await deletePoll({ id: createdPoll.id, owner: notSameOwner });
  } catch (error) {

    expect(error).toBeInstanceOf(NotPollOwnerError);
    expect(error.message).toBe(
      'Only the owner of the poll can remove this poll.'
    );
  }
});
