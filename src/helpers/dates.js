import moment from "moment";

export const filterReports = (data, frecuency) => {

  if (frecuency === 'general') return data;

  if(frecuency === 'today') {
    const result = filterToday(data);
    return result;
  }

  if(frecuency === 'week') {
    const result = filterWeek(data);
    return result;
  }

  if(frecuency === 'month') {
    const result = filterMonth(data);
    return result;
  }

  if(frecuency === 'year') {
    const result = filterYear(data);
    return result;
  }

};

const filterToday = (data) => {
  const initDate = moment().startOf('day');
  const endDate = moment().endOf('day');
  return data.filter(({ dateOfAdmission }) => moment(dateOfAdmission).isBetween(initDate, endDate));
};

const filterWeek = (data) => {
  const initWeek = moment().startOf('week');
  const endWeek = moment().endOf('week');
  return data.filter(({ dateOfAdmission }) => moment(dateOfAdmission).isBetween(initWeek, endWeek));
};

const filterMonth = (data) => {
  const initMonth = moment().startOf('month');
  const endMonth = moment().endOf('month');
  return data.filter(({ dateOfAdmission }) => moment(dateOfAdmission).isBetween(initMonth, endMonth));
};

const filterYear = (data) => {
  const initYear = moment().startOf('year');
  const endYear = moment().endOf('year');
  return data.filter(({ dateOfAdmission }) => moment(dateOfAdmission).isBetween(initYear, endYear));
};



