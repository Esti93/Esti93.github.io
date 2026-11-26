const projects = document.querySelectorAll('.frames > *');
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let frame = 0;

function updateProjects() {
  frame = 0;
  const height = window.innerHeight;
  const amounts = Array.from(projects, project => {
    const top = project.getBoundingClientRect().top;
    return Math.min(1, Math.max(0, (top / height - 0.18) / 0.82));
  });
  projects.forEach((project, index) => {
    project.style.setProperty('--reveal', amounts[index].toFixed(4));
  });
}

function scheduleUpdate() {
  if (!motionPreference.matches && !frame) {
    frame = requestAnimationFrame(updateProjects);
  }
}

window.addEventListener('scroll', scheduleUpdate, { passive: true });
window.addEventListener('resize', scheduleUpdate);
motionPreference.addEventListener('change', scheduleUpdate);
scheduleUpdate();
