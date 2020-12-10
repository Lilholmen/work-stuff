'use strict';

const TOTAL_SALARY = 92000;
const STANDART_PREPAYMENT = 8000;
const STANDART_SALARY = 12010;
const BANK_CARD = 20010;

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

let thisMonthLength = getMonthLength(11);
let mySalary = calcTotalSalary(thisMonthLength, 9);

printIssueWays(thisMonthSalary.calcIssueWays(mySalary));

function getMonthLength(smth) {
  let thisMonth = new Date(2020, ++smth, 0);
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
