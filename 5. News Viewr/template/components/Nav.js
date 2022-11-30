// do something!
import { observable } from './observer.js';

export const update = {
  state: observable({
    category: 'all',
  }),

  //새로운 상태로 업데이트
  setState(newState) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};

const Nav = () => {
  let ul = document.createElement('ul');
  let nav = document.createElement('nav');
  nav.classList.add('category-list');
  document.querySelector('#root').appendChild(nav);
  nav.appendChild(ul);

  let ids = [
    'all',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology',
  ];
  let txt = [
    '전체보기',
    '비즈니스',
    '엔터테인먼트',
    '건강',
    '과학',
    '스포츠',
    '기술',
  ];

  for (let i = 0; i < ids.length; i++) {
    let li = document.createElement('li');
    li.id = ids[i];
    li.classList.add('category-item');
    li.innerText = txt[i];
    ul.appendChild(li);
  }

  let categoryItem = document.querySelectorAll('.category-item');
  categoryItem[0].classList.add('active');
  for (let i = 0; i < categoryItem.length; i++) {
    categoryItem[i].addEventListener('click', function (e) {
      categoryItem[i].classList.add('active');
      for (let j = 0; j < categoryItem.length; j++) {
        if (categoryItem[j] != e.target) {
          categoryItem[j].classList.remove('active');
        }
      }
      const categoryId = e.target.id;
      update.setState({ category: categoryId });
    });
  }
};
export default Nav;
