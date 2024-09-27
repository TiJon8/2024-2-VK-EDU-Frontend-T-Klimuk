import correctSentence from './correctSentence';

test('returns correct sentence', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.")
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.")
  expect(correctSentence("i love VK")).toBe("I love VK.")
  expect(correctSentence("just, Hello World")).toBe("Just, Hello World.")
})
