document.querySelectorAll('.flipbook').forEach((flipbook) => {
  const pages = flipbook.querySelectorAll('.page');
  const nextBtn = flipbook.querySelector('#nextBtn');
  const prevBtn = flipbook.querySelector('#prevBtn');

  let current = 0;
  let flipping = false;
  let touchStartX = 0;
  let touchEndX = 0;

  // Initial stacking
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

      flippedPage.addEventListener(
        'transitionend',
        function handler(e) {
          if (e.propertyName === 'transform') {
            flippedPage.removeEventListener('transitionend', handler);
            current++;
            updateStacking();
            updateMargin();
            flipping = false;
            updateButtons();
          }
        }
      );

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

      flippedPage.addEventListener(
        'transitionend',
        function handler(e) {
          if (e.propertyName === 'transform') {
            flippedPage.removeEventListener('transitionend', handler);
            flipping = false;
            updateButtons();
          }
        }
      );

      updateButtons();
    }
  }

  flipbook.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  flipbook.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeDistance = touchEndX - touchStartX;
    const swipeThreshold = 50;

    if (swipeDistance > swipeThreshold) goPrev();
    if (swipeDistance < -swipeThreshold) goNext();
  });

  // Button controls
  nextBtn.addEventListener('click', goNext);
  prevBtn.addEventListener('click', goPrev);

  flipbook.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goNext();
    if (e.key === 'ArrowLeft') goPrev();
  });

  flipbook.setAttribute('tabindex', '0');

  updateButtons();
  updateMargin();
});