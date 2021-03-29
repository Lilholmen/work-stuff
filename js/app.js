'use strict';

const TOTAL = 92000;
const PREPAYMENT = 8000;
const SALARY = 12010;
const BANK_CARD = 20010;

const allBtns = document.querySelectorAll('button'); //псевдомассив всех кнопок, на них все будет навешано перерасчёт результата

const yearSelector = Array.from(document.querySelectorAll('.year-button')); //массив с годами
const monthSelector = Array.from(document.querySelectorAll('.month-button')); //массив с месяцами
let selectedDate = [2, 2021]; //выбранный [месяц, год]

const shiftsCounterValue = document.querySelector('.shifts__count-value'); //span для вывода кол-ва смен
const shiftsCounterBtns = document.querySelectorAll('.shifts__btn'); //псевдомассив с кнопками кол-ва смен
let shiftsCount = +document.getElementById('counter').textContent; //кол-во смен

const textResult = document.querySelectorAll('.result__data');

const thisMonthSalary = {
  issueWays: {
    total: 0,
    prepayment: 0,
    salary: 0,
    cash: 0,
  },

  set totalSalary(monthSalary) {
    this.issueWays.total = monthSalary;
    this.issueWays.prepayment =
      monthSalary >= PREPAYMENT ? PREPAYMENT : monthSalary;
    this.issueWays.salary =
      monthSalary >= BANK_CARD ? SALARY : monthSalary - PREPAYMENT;
    this.issueWays.cash = monthSalary - BANK_CARD;
  },

  get totalSalary() {
    return this.issueWays;
  },
};
//-----------------------------------------
yearSelector.forEach((item) =>
  item.addEventListener('click', () => {
    if (!item.classList.contains('btn-selected')) {
      yearSelector.forEach((item) => item.classList.remove('btn-selected'));
      selectedDate[1] = +item.value;
      item.classList.add('btn-selected');
    }
  })
);

monthSelector.forEach((item) =>
  item.addEventListener('click', () => {
    if (!item.classList.contains('btn-selected')) {
      monthSelector.forEach((item) => item.classList.remove('btn-selected'));
      selectedDate[0] = +item.value;
      item.classList.add('btn-selected');
    }
  })
);

shiftsCounterBtns.forEach((btn) => {
  btn.addEventListener('click', (event) => {
    const btnType = event.currentTarget.classList;

    if (btnType.contains('decrease') && shiftsCount > 1) {
      shiftsCount--;
    } else if (btnType.contains('increase') && shiftsCount < 15) {
      shiftsCount++;
    }

    shiftsCounterValue.textContent = shiftsCount;
  });
});

allBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    thisMonthSalary.totalSalary = calcTotalSalary();
    displayResult();
  });
});
//--------------------------------------
function getMonthLength() {
  return new Date(selectedDate[1], selectedDate[0], 0).getDate();
}

function calcTotalSalary() {
  return (TOTAL / getMonthLength()) * shiftsCount;
}

function displayResult() {
  const totalSalaryGetted = thisMonthSalary.totalSalary;

  textResult[0].textContent = totalSalaryGetted.total.toFixed(2);
  textResult[1].textContent = totalSalaryGetted.prepayment.toFixed(2);
  textResult[2].textContent = totalSalaryGetted.salary.toFixed(2);
  textResult[3].textContent = totalSalaryGetted.cash.toFixed(2);
}
