const pages = document.querySelectorAll('.page');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let current = 0;
let flipping = false;
let touchStartX = 0;
let touchEndX = 0;

function handleGesture() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;

  if (swipeDistance > swipeThreshold) {
    goPrev();
  } else if (swipeDistance < -swipeThreshold) {
    goNext();
  }
}

document.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleGesture();
});

pages.forEach((page, i) => {
  page.style.zIndex = pages.length - i;
});

function updateButtons() {
  prevBtn.classList.toggle('disabled', current === 0 || flipping);
  nextBtn.classList.toggle('disabled', current === pages.length || flipping);
}

function updateStacking() {
  pages.forEach((page, i) => {
    if (i < current) {
      page.style.zIndex = 0;
    } else if (i === current) {
      page.style.zIndex = pages.length + 1;
    } else {
      page.style.zIndex = pages.length - i;
    }
  });
}

function updateMargin() {
  let margin;
  if (current === 0) {
    margin = '0%';
  } else if (current === pages.length) {
    margin = '100%';
  } else {
    margin = '50%';
  }
  pages.forEach((page) => {
    page.style.marginLeft = margin;
  });
}

function goNext() {
  if (current < pages.length && !flipping) {
    flipping = true;
    const flippedPage = pages[current];
    flippedPage.classList.add('flipped');
    
    flippedPage.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'transform') {
        flippedPage.removeEventListener('transitionend', handler);
        current++;
        updateStacking();
        updateMargin();
        flipping = false;
        updateButtons();
      }
    });

    updateButtons();
  }
}

function goPrev() {
  if (current > 0 && !flipping) {
    flipping = true;
    current--;
    updateStacking();
    updateMargin();
    const flippedPage = pages[current];
    flippedPage.classList.remove('flipped');

    flippedPage.addEventListener('transitionend', function handler(e) {
      if (e.propertyName === 'transform') {
        flippedPage.removeEventListener('transitionend', handler);
        flipping = false;
        updateButtons();
      }
    });

    updateButtons();
  }
}

nextBtn.addEventListener('click', goNext);
prevBtn.addEventListener('click', goPrev);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'ArrowLeft') goPrev();
});

updateButtons();
updateMargin();