const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');

const collage = document.querySelector('.collage');
const badges = collage.querySelectorAll('.badge');
const hoverPointer = matchMedia('(any-hover: hover) and (any-pointer: fine)');

function resetBadges() {
  for (const badge of badges) {
    badge.style.removeProperty('--escape-x');
    badge.style.removeProperty('--escape-y');
  }
}

collage.addEventListener('pointermove', event => {
  if (event.pointerType === 'touch' || !hoverPointer.matches || motionPreference.matches) return;
  const bounds = collage.getBoundingClientRect();
  for (const badge of badges) {
    // Measure from the resting position so the badge stays away until the pointer leaves.
    const dx = bounds.left + badge.offsetLeft - event.clientX;
    const dy = bounds.top + badge.offsetTop - event.clientY;
    const distance = Math.hypot(dx, dy);
    const radius = badge.offsetWidth * 1.2;
    const shift = Math.max(0, 1 - distance / radius) * badge.offsetWidth * .75;
    badge.style.setProperty('--escape-x', (distance ? dx / distance : 1) * shift + 'px');
    badge.style.setProperty('--escape-y', (distance ? dy / distance : 0) * shift + 'px');
  }
});
collage.addEventListener('pointerleave', resetBadges);
motionPreference.addEventListener('change', resetBadges);
