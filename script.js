const answerList = [
  -1,
  ['селедк', 'Я требую незамедлительно прекратить убивать селедку ради шуб! Сколько можно?', -1],
  ['птиц', 'Хватит доить птиц ради птичьего молока!', -1],
  ['салат', 'У оливье тоже есть чувства! Холодец должен жить на воле!', -1],
  ['колбас', 'Доколе вы будете убивать докторов ради производства докторской колбасы?', -1],
  ['краб', 'Капиталисты воруют у крабов палочки так же, как они украли у меня детство!', -1],
  ['климат', 'Климатические изменения убьют нас быстрее, чем астероид убил динозавров!', -1],
  ['потеплени', 'Пока я тут жгу миллионами нервные клетки - они продолжают жечь ископаемое топливо тоннами!', -1],
  ['эколог', 'Отравляют окружающую среду не столько ваши отходы, сколько безразличие и наплевательством к словам небезучастных школьниц!', -1],
];

function selectAnswer(question, answers = answerList) {
  question = question.replace(/ё/gi, 'е').toLowerCase();

  for (let x = 1; x < answers.length; x++) {
    if (question.includes(answers[x][0])) {
      answers[x][2]++;
      return answers[x][2] === 0 ? answerList[x][1] : 
      answerList[x][2] === 1 ? `Повторюсь: ${answerList[x][1][0].toLowerCase() + answerList[x][1].substring(1)}` :
      answerList[x][2] % 2
        ? 'Пока мы твердим об одном и том же - треклятые капиталисты воруют у меня детство! Довольно!'
        : 'Сколько можно повторяться? Вы осознаете количество углекислого газа, выдыхаемое вами в атмосферу за эту прошедшую бесцельно прожитую минуту?';
    }
  }

  answerList[0]++;
  switch (answerList[0] % 4) {
    case 0:
      return ('Понятия не имeю, о чем вы...');
    case 1:
      return ('Я устаю от пустой болтовни.');
    case 2:
      return ('Почему мы должны говорить об этой ерунде, а не о спасении планеты?!');
    case 3:
      return ('Вам не удастся отвлечь меня от самого важного!');
  }
}

function botSendReceive() {
  let divToSend = document.createElement('div'),
    divToReceive = document.createElement('div'),
    txtField = document.getElementById('txtfield'),
    submitButton = document.getElementById('submit'),
    gretaImg = document.getElementById('greta').firstElementChild,
    text = txtField.value,
    ind = 0,
    indStored = 0,
    initdelay = 0,
    step = 0.01;

  function prosessor(phrase) {
    let reworkedPhrase = '';
    phrase = phrase.split(' ');
    
    for (word of phrase) {
      reworkedPhrase += '<div>';
    
      for (letter of word) {
        reworkedPhrase += `<span style="animation-delay: ${(ind * step + initdelay).toFixed(2)}s">${letter}</span>`;
        ind++;
      }
    
      reworkedPhrase += '<span>&nbsp;</span></div>';
    }

    return reworkedPhrase;
  }

  function scrollDown() {
    document.getElementById('output').scrollTop = document.getElementById('output').scrollHeight;
  }

  function hideButtons() {
    txtField.value = '';
    txtField.disabled = true;
    submitButton.disabled = true;
    submitButton.style = 'opacity: 0 !important';
    txtField.placeholder = 'девочка отвечает...';
  }

  function showButtons() {
    txtField.placeholder = 'рискнуть спросить у девочки что-то еще...';
    txtField.disabled = false;
    submitButton.disabled = false;
    submitButton.style = 'opacity: 1';
    gretaImg.classList.remove('gretahover');
  }

  function pushQuestion() {
    divToSend.className = 'question';
    divToSend.innerHTML = prosessor(text);
    document.getElementById('output').append(divToSend);
    scrollDown();
  }
  
  function pushAnswer() {
    gretaImg.classList.add('gretahover');
    divToReceive.className = 'answer';
    divToReceive.innerHTML = prosessor(selectAnswer(text, answerList));
    document.getElementById('output').append(divToReceive);
    scrollDown();
  }

  if (text.length) {
    hideButtons();
    pushQuestion();
    indStored = ind;
    setTimeout(pushAnswer, 1000 * ((indStored * step + initdelay
      + 0.01 * text.length + 1).toFixed(2)));
    setTimeout(showButtons, 1000 * ((2 * indStored * step + initdelay
      + 0.01 * text.length + 2).toFixed(2)));
  }
}

document.getElementById('submit').addEventListener('click', botSendReceive);
