const question = async () => {
  const result = await fetch("https://opentdb.com/api.php?amount=15");
  const data = await result.json();
  const refinedData = data.results.map((q) => {
    const options = [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5);
    return {
      ...q,
      options,
    };
  });
  return refinedData;
};

export default question;
