
const numbersShowPhotos = 8;


const arrowLeft = '<span class="arrow-left" data-arrow="left"></span>';
const arrowRight = '<span class="arrow-right" data-arrow="right"></span>';
const pagePagination = (index, active) =>
  `<span class="number ${active ? 'active' : ''}">${index}</span>`;


class Pagination {

  constructor() {
    this.curPage = 1;
    this.pagination = document.getElementById('pagination');
    this.photos = document.querySelectorAll('.ph-block__item');
    this.pageCounter = Math.round(this.photos.length / numbersShowPhotos);

    this.handleClick = this.handleClick.bind(this);
    this.createPaginationList();
  }

  handleClick(e) {
    const dom = e.target;
    const {arrow} = dom.dataset;

    if (arrow) {
      if (arrow === 'left') {
        this.curPage = this.curPage === 1 ? this.pageCounter : this.curPage - 1;
      } else {
        this.curPage = this.curPage === this.pageCounter ? 1 : this.curPage + 1;
      }
    } else {
      this.curPage = parseInt(dom.innerHTML, 10);
    }

    this.createPaginationList();
  }



  createPaginationList() {
    let dom = arrowLeft;

    for (let i = 1; i <= this.pageCounter; i++) {
      dom += pagePagination(i, this.curPage === i);
    }

    dom += arrowRight;

    let btns = this.pagination.querySelectorAll('span');
    for (let btn of btns) {
      btn.removeEventListener('click', this.handleClick, false);
    }

    this.pagination.innerHTML = dom;
    btns = this.pagination.querySelectorAll('span');

    for (let btn of btns) {
      btn.addEventListener('click', this.handleClick, false);
    }

    const start = (this.curPage - 1) * numbersShowPhotos;
    const end = this.curPage * numbersShowPhotos;

    for (let i = 0; i < this.photos.length; i++) {
      if (start <= i && i < end) {
        this.photos[i].classList.remove('hide');
      } else {
        this.photos[i].classList.add('hide');
      }
    }
  }


}

export default Pagination;
