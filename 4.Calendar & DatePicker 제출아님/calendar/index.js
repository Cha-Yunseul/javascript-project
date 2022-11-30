const date = new Date();

const now = (container) => {
  let head = document.querySelector('head');
  let link = document.createElement('link');
  link.href = './calendar/theme.css';
  link.rel = 'stylesheet';

  let linkEnd =
    head.querySelectorAll('link')[head.querySelectorAll('link').length - 1];
  linkEnd.insertAdjacentElement('afterend', link);

  while (container.querySelector('.calendar-grid').hasChildNodes()) {
    container
      .querySelector('.calendar-grid')
      .removeChild(container.querySelector('.calendar-grid').firstChild);
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
  let days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  let p = container.querySelector('.calendar-nav_txt').querySelectorAll('p');
  p[0].innerText = months[date.getMonth()];
  p[1].innerText = date.getFullYear();

  //날짜 채우기
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevDate = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

  //요일 채우기
  for (let i = 0; i < days.length; i++) {
    let div = document.createElement('div');
    div.classList.add('weekday');
    div.innerText = `${days[i]}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  //이전 달의 날짜 채우기
  date.setDate(1);
  for (let i = date.getDay(); i > 0; i--) {
    let div = document.createElement('div');
    div.classList.add('date');
    div.classList.add('pre-date');
    div.innerText = `${prevDate - i + 1}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  //이번달의 날짜 채우기
  for (let i = 0; i < lastDay; i++) {
    let div = document.createElement('div');
    div.classList.add('date');
    div.classList.add('present-date');
    div.innerText = `${i + 1}`;
    container.querySelector('.calendar-grid').appendChild(div);
  }

  //다음달의 날짜 채우기
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

  //일요일 date 구하기.
  let sunday = 0;
  for (let i = 1; i <= days.length; i++) {
    date.setDate(i);
    if (date.getDay() == 0) {
      console.log(date.getDay(), date.getDate());
      sunday = date.getDate();
    }
  }

  //일요일 빨간색으로 나타내기.
  while (sunday <= lastDay) {
    let red = container.querySelectorAll('.present-date')[sunday - 1];
    red.classList.add('sunday');
    sunday += 7;
  }

  //현재 날짜 초록색 원으로 표시해주기
  let presentDate = new Date();

  if (
    p[0].innerText == months[presentDate.getMonth()] &&
    p[1].innerText == presentDate.getFullYear()
  ) {
    let nowDay =
      container.querySelectorAll('.present-date')[presentDate.getDate() - 1];
    nowDay.classList.add('green');
  }
  //mouseover시 클래스 추가
  let hoverDate = container.querySelectorAll('.date');
  for (let i = 0; i < hoverDate.length; i++) {
    hoverDate[i].addEventListener('mouseover', function () {
      hoverDate[i].classList.add('hovered');
    });
    hoverDate[i].addEventListener('mouseout', function () {
      hoverDate[i].classList.remove('hovered');
    });
  }
  //날짜 찍으면 date-picker에 now
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
  //전달에 포함된 날짜 찍을시
  let pre = container.querySelectorAll('.pre-date');
  pre.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth();
      pickerDate = e.innerText;
      pick();
    });
  });

  //이번달에 포함된 날짜 찍을시
  let present = container.querySelectorAll('.present-date');
  present.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth() + 1;
      pickerDate = e.innerText;
      pick();
    });
  });

  //다음달에 포함된 날짜 찍을시
  let next = container.querySelectorAll('.next-date');
  next.forEach((e) => {
    e.addEventListener('click', function () {
      pickerMonth = date.getMonth() + 2;
      pickerDate = e.innerText;
      pick();
    });
  });
};

const previous = (container) => {
  container
    .querySelector('.fa-caret-left')
    .addEventListener('click', function () {
      date.setMonth(date.getMonth() - 1);
      now(container);
    });
};

const next = (container) => {
  container
    .querySelector('.fa-caret-right')
    .addEventListener('click', function () {
      date.setMonth(date.getMonth() + 1);
      now(container);
    });
};

export { now, next, previous };
