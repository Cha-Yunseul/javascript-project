const date = new Date();

const calendar = (container) => {
  let head = document.querySelector('head');
  let link = document.createElement('link');
  link.href = './calendar/theme.css';
  link.rel = 'stylesheet';

  let linkEnd =
    head.querySelectorAll('link')[head.querySelectorAll('link').length - 1];
  linkEnd.insertAdjacentElement('afterend', link);

  let calendarGrid = container.querySelector('.calendar-grid');
  while (calendarGrid.hasChildNodes()) {
    calendarGrid.removeChild(calendarGrid.firstChild);
  }

  let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  let month = document.getElementById('month');
  month.innerText = months[date.getMonth()];

  let year = document.getElementById('year');
  year.innerText = date.getFullYear();

  let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  for (let i = 1; i <= days.length; i++) {
    let div = document.createElement('div');
    div.classList.add('weekday');
    div.innerText = `${days[i - 1]}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  date.setDate(1);
  for (let i = date.getDay(); i > 0; i--) {
    let div = document.createElement('div');
    div.classList.add('date');
    div.classList.add('prev-date');
    div.innerText = `${prevDate - i + 1}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  for (let i = 1; i <= lastDay; i++) {
    let div = document.createElement('div');
    div.classList.add('date');
    div.classList.add('present-date');
    div.innerText = `${i}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  let length = container.querySelector('.calendar-grid').childNodes.length;
  let count = 1;
  for (let i = 0; i < 49 - length; i++) {
    let div = document.createElement('div');
    div.classList.add('date');
    div.classList.add('next-date');
    div.innerText = `${count}`;
    count++;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  let presentDate = new Date();
  if (
    month.innerText == months[presentDate.getMonth()] &&
    year.innerText == presentDate.getFullYear()
  ) {
    let nowDay =
      container.querySelectorAll('.present-date')[presentDate.getDate() - 1];
    nowDay.classList.add('green');
  }

  let hoverDate = container.querySelectorAll('.date');
  for (let i = 0; i < hoverDate.length; i++) {
    hoverDate[i].addEventListener('mouseover', function () {
      hoverDate[i].classList.add('hovered');
    });
    hoverDate[i].addEventListener('mouseout', function () {
      hoverDate[i].classList.remove('hovered');
    });
  }

  let pickerYear = date.getFullYear();
  let pickerMonth;
  let pickerDate;

  const pick = () => {
    container.querySelector('.date-picker').value = `${pickerYear}-${pickerMonth
      .toString()
      .padStart(2, '0')}-${pickerDate.toString().padStart(2, '0')}`;

    container.querySelector('.calendar').classList.remove('show');
    console.log(`${pickerYear} - ${pickerMonth} - ${pickerDate}`);
  };

  let clickPrevDate = container.querySelectorAll('.prev-date');
  clickPrevDate.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth();
      pickerDate = e.innerText;
      pick();
    });
  });

  let clickDate = container.querySelectorAll('.present-date');
  clickDate.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth() + 1;
      pickerDate = e.innerText;
      pick();
    });
  });

  let clickNextDate = container.querySelectorAll('.next-date');
  clickNextDate.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth() + 2;
      pickerDate = e.innerText;
      pick();
    });
  });
};

const left = (container) => {
  container.querySelector('.fa-caret-left').addEventListener('click', () => {
    date.setMonth(date.getMonth() - 1);
    calendar(container);
  });
};

const right = (container) => {
  container.querySelector('.fa-caret-right').addEventListener('click', () => {
    date.setMonth(date.getMonth() + 1);
    calendar(container);
  });
};

export { calendar, left, right };
