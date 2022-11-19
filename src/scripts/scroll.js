
export function scrollLess() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export function scrollMore(func){
           
  const block = document.querySelector('.gallery');
  if((window.pageYOffset + window.innerHeight) >= block.offsetHeight){
    func();
  }
}