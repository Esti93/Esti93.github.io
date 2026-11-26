const deck = document.querySelector(".deck");
const shuffle = deck.querySelector("[data-shuffle]");
const names = ["Rings", "Ripple", "Offset"];
shuffle.hidden = false;
shuffle.addEventListener("click", () => {
  const next = (Number(deck.dataset.face) + 1) % names.length;
  deck.dataset.face = String(next);
  deck.querySelector("[data-status]").textContent = names[next] + " print";
});
