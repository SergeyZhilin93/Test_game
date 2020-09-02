const form = document.querySelector('#form')
  const numField = document.querySelector('input');
  const errEl = document.querySelector('.err');
  let hiddenNumber = setNum();
  let isValidateSuccess = false;
  let iterationIdx = 1;
  let isShowHidden = false;

  numField.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    isValidateSuccess = checkField();
    console.log(isValidateSuccess)
    if (isValidateSuccess) {
      errEl.innerHTML = '';
      checkNum();
    } else {
      errEl.innerHTML = 'Введёные числа не должны повторяться!';
    }
  });

  function checkField() {
    const val = numField.value;


    for (let i in val) {
      if (i === '0') continue;
      const slice = val.slice(0, i);
      if(slice.indexOf(val[i]) !== -1) return false;
    }

    return true;
  }

  function setNum() {
    let resultNum = String(getRandomNum(1000, 9999));

    for (let i in resultNum) {
      if (i === '0') continue;

      i = parseInt(i);

      if (resultNum.indexOf(resultNum[i]) !== i) {
        const newNum = getSmallRandom(resultNum[i], resultNum.slice(0, i));
        resultNum = resultNum.substr(0, i) + newNum + resultNum.substr(i + 1);
      }
    }

    return resultNum;
  }

  function getSmallRandom(num, slice) {
    const newNum = getRandomNum(0, 9);

    if (slice.indexOf(newNum) === -1) {
      return newNum;
    } else {
      return getSmallRandom(num, slice);
    }
  }

  function checkNum() {
    const num = numField.value;
    const bulls = checkBulls(num);
    const cows = checkCows(num);
    drawResult(bulls, cows, num)
  }

  function drawResult(bulls, cows, num) {
    const el = document.querySelector('.results');
    const children = document.createElement('p');
    let resultStr = `${iterationIdx}) Число: ${num},<br />Быков: ${bulls}, Коров: ${cows}<br/>`;

    if (bulls === 4) {
      resultStr += '<p style="color: green">Ура! Вы угадали число!</p>';
    }

    resultStr += '-------------------------------';

    children.innerHTML = resultStr;
    el.append(children);
    iterationIdx += 1;
  }

  function checkCows(num) {
    let countCows = 0;

    for (let i in num) {
      if (hiddenNumber.indexOf(num[i]) !== -1 && num[i] !== hiddenNumber[i]) {
        countCows += 1;
      }
    }

    return countCows;
  }

  function checkBulls(num) {
    let countBulls = 0;

    for (let i in num) {
      if (num[i] === hiddenNumber[i]) {
        countBulls += 1;
      }
    }

    return countBulls;
  }

  function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function showNum() {
    const el = document.querySelector('.show-num');

    isShowHidden = !isShowHidden;
    el.innerHTML = isShowHidden ? hiddenNumber : '';
  }

  function newGame() {
    hiddenNumber = setNum();
    errEl.innerHTML = '';
    document.querySelector('.results').innerHTML = '';
    document.querySelector('.show-num').innerHTML = '';
    isValidateSuccess = false;
    numField.value = '';
    iterationIdx = 1;
    isShowHidden = false;
  }
  
  function rulesShow(element_id) {
    if(document.getElementById(element_id)) {
      let obj = document.getElementById(element_id)
      if (obj.style.display != "block") {
        obj.style.display = "block"
      } else obj.style.display = "none"
    }
    else alert("Элемент с id: " + element_id + " не найден!"); 
  }