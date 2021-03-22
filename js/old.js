'use strict';

const TOTAL_SALARY = 92000;
const STANDART_PREPAYMENT = 8000;
const STANDART_SALARY = 12010;
const BANK_CARD = 20010;

const globalBtn = document.querySelectorAll('button');

const yearSelector = Array.from(document.querySelectorAll('.year-button'));
const monthSelector = Array.from(document.querySelectorAll('.month-button'));

let shifts = +document.getElementById('counter').textContent;
const value = document.querySelector('.shifts__count-value');
const btns = document.querySelectorAll('.shifts__btn');

const textResult = document.querySelectorAll('.result__data');

const thisMonthSalary = {
  prePay: 0,
  bankCard: 0,
  cash: 0,

  calcIssueWays(total) {
    this.prePay = total > STANDART_PREPAYMENT ? STANDART_PREPAYMENT : total;
    this.bankCard =
      total > BANK_CARD ? STANDART_SALARY : total - STANDART_PREPAYMENT;
    this.cash = total > BANK_CARD ? total - BANK_CARD : 0;

    return this;
  },
};

let selectedMonth = 2;
let selectedYear = 2021;

let thisMonthLength;
let mySalary;

function getMonthLength() {
  let thisMonth = new Date(selectedYear, selectedMonth, 0);
  return thisMonth.getDate();
}

function calcTotalSalary(monthDays, shifts) {
  return (TOTAL_SALARY / monthDays) * shifts;
}

function printIssueWays(salary) {
  console.log(`Total salary this month: ${mySalary.toFixed(2)};`);
  console.log(`Prepayment this month: ${salary.prePay.toFixed(2)};`);
  console.log(`Bank card: ${salary.bankCard.toFixed(2)};`);
  console.log(`Cash this month: ${salary.cash.toFixed(2)}.`);
}

function showResult(salary) {
  textResult[0].textContent = mySalary.toFixed(2);
  textResult[1].textContent = salary.prePay.toFixed(2);
  textResult[2].textContent = salary.bankCard.toFixed(2);
  textResult[3].textContent = salary.cash.toFixed(2);
}

yearSelector.forEach((item) =>
  item.addEventListener('click', () => {
    if (!item.classList.contains('btn-selected')) {
      yearSelector.forEach((item) => item.classList.remove('btn-selected'));
      selectedYear = item.value;
      item.classList.add('btn-selected');
    }
  })
);

monthSelector.forEach((item) =>
  item.addEventListener('click', () => {
    if (!item.classList.contains('btn-selected')) {
      monthSelector.forEach((item) => item.classList.remove('btn-selected'));
      selectedMonth = ++item.value;
      item.classList.add('btn-selected');
    }
  })
);

btns.forEach((item) => {
  item.addEventListener('click', (event) => {
    const styles = event.currentTarget.classList;

    if (styles.contains('decrease') && shifts > 1) {
      shifts--;
    } else if (styles.contains('increase') && shifts < 31) {
      shifts++;
    } else if (styles.contains('reset')) {
      shifts = 8;
    }

    value.textContent = shifts;
  });
});

globalBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    thisMonthLength = getMonthLength();
    mySalary = calcTotalSalary(thisMonthLength, shifts);

    //console.clear();
    //console.log(thisMonthLength, shifts, mySalary);
    //printIssueWays(thisMonthSalary.calcIssueWays(mySalary));
    showResult(thisMonthSalary.calcIssueWays(mySalary));
  });
});
