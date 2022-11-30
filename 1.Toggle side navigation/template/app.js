// do something!
'use strict';
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const navbtn = document.querySelector('.toggle');

const toggleSidebar = () => {
  if (localStorage.getItem('sideBar') === 'true') {
    nav.classList.remove('active');
  } else {
    nav.classList.add('active');
  }
};

const toggle = () => {
  window.addEventListener('DOMContentLoaded', () => {
    toggleSidebar();
    body.style.visibility = 'visible';
  });

  window.addEventListener('load', () => {
    body.classList.remove('preload');
  });

  navbtn.addEventListener('click', () => {
    localStorage.setItem('sideBar', nav.hasAttributes('active'));
    toggleSidebar();
  });
};

toggle();
