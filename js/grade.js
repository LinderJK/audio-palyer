const tasks = [
  {
    number: 1,
    maxscore: 10,
    myscore: 10,
    description: 'Вёрстка +10',
  },
  {
    number: 2,
    maxscore: 10,
    myscore: 10,
    description: 'Кнопка Play/Paus',
  },
  {
    number: 3,
    maxscore: 10,
    myscore: 10,
    description:
      'При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек',
  },
  {
    number: 4,
    maxscore: 10,
    myscore: 10,
    description:
      'При смене аудиотрека меняется изображение - обложка аудиотрека',
  },
  {
    number: 5,
    maxscore: 10,
    myscore: 10,
    description:
      'Прогресс-бар отображает прогресс проигрывания текущего аудиотрека',
  },
  {
    number: 6,
    maxscore: 10,
    myscore: 10,
    description:
      'Отображается продолжительность аудиотрека и его текущее время проигрывания',
  },
  {
    number: 7,
    maxscore: 10,
    myscore: 0,
    description:
      'Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения.   На усмотрение проверяющего))',
  },
];

function grade() {
  let scoreSumm = 0;
  for (const task of tasks) {
    console.log(
      `№${task.number} - ${task.myscore}/${task.maxscore} - ${task.description}`
    );
    scoreSumm = scoreSumm + task.myscore;
  }
  return (
    console.log('Максимально возможные баллы - 60'),
    console.log('Баллы самопроверки - ' + scoreSumm)
  );
}
grade();
