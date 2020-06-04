const btnSearch = document.querySelector('#page-home main a');
const btnClose = document.querySelector('#modal .content .header a');
const modal = document.querySelector('#modal');

btnSearch.addEventListener('click',() => {
    modal.classList.remove('hide');
})

btnClose.addEventListener('click',() => {
    modal.classList.add('hide');
})

