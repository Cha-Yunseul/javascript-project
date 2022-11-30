// do something!
import { update } from './Nav.js';
import { observe } from './observer.js';

function NewsList() {
  let container = document.createElement('div');
  container.classList.add('news-list-container');
  let article = document.createElement('article');
  article.classList.add('news-list');
  container.appendChild(article);
  document.querySelector('#root').appendChild(container);
  container.appendChild(article);
  let scrollObs = document.createElement('div');
  scrollObs.classList.add('scroll-observer');
  document.querySelector('#root').appendChild(scrollObs);

  function loading() {
    const image = document.createElement('img');
    image.src = 'img/ball-triangle.svg';
    image.alt = 'Loading...';
    return image;
  }

  const spin = loading();

  const posting = (posts) => {
    posts.forEach((post) => {
      const newsItem = document.createElement('section');
      newsItem.classList.add('news-item');
      newsItem.innerHTML = `
            <div class="thumbnail">
              <a href=${post.url} target="_blank" rel="noopener noreferrer">
                <img
                  src=${post.urlToImage}
                  alt="thumbnail" />
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href=${post.url} target="_blank" rel="noopener noreferrer">
                  ${post.title}
                </a>
              </h2>
              <p>
                ${post.description}
              </p>
            </div>
            `;
      article.appendChild(newsItem);
    });
  };

  let page = 0;
  let category = 'all';
  const pageSize = 5;
  const apiKey = 'd4c97ca8ebad45d6bc5f78980ca870f5';
  let url;

  observe(async () => {
    category = update.state.category;
    page = 0;
    reset();
  });

  function reset() {
    const $reset = document.querySelector('.news-list');
    $reset.innerHTML = '';
  }

  const option = {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  };

  const callback = (entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        page++;
        url = `https://newsapi.org/v2/top-headlines?country=kr&category=${
          category === 'all' ? '' : category
        }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
        try {
          const response = await axios.get(url);
          posting(response.data.articles);
          scrollObs.appendChild(spin);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };
  const observer = new IntersectionObserver(callback, option);
  observer.observe(scrollObs);
}

export default NewsList;
