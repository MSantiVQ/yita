// SVGs sencillos de girasol y lirio amarillo, dibujados a mano en código.
const SUNFLOWER = `
<svg viewBox="0 0 100 140" width="72" height="100" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="70" x2="50" y2="140" stroke="#5E7A54" stroke-width="4"/>
  <g transform="translate(50,55)">
    <g fill="#F2B705">
      <ellipse cx="0" cy="-32" rx="10" ry="22"/>
      <ellipse cx="0" cy="32" rx="10" ry="22"/>
      <ellipse cx="32" cy="0" rx="22" ry="10"/>
      <ellipse cx="-32" cy="0" rx="22" ry="10"/>
      <ellipse cx="22" cy="-22" rx="20" ry="9" transform="rotate(45 22 -22)"/>
      <ellipse cx="-22" cy="-22" rx="20" ry="9" transform="rotate(-45 -22 -22)"/>
      <ellipse cx="22" cy="22" rx="20" ry="9" transform="rotate(-45 22 22)"/>
      <ellipse cx="-22" cy="22" rx="20" ry="9" transform="rotate(45 -22 22)"/>
    </g>
    <circle r="20" fill="#B4740E"/>
    <circle r="20" fill="none" stroke="#8C5A0B" stroke-width="1" opacity=".5"/>
  </g>
</svg>`;

const LILY = `
<svg viewBox="0 0 100 140" width="60" height="100" xmlns="http://www.w3.org/2000/svg">
  <line x1="50" y1="70" x2="50" y2="140" stroke="#5E7A54" stroke-width="4"/>
  <g transform="translate(50,58)">
    <g fill="#F7D842">
      <path d="M0 -6 C 10 -30, 6 -46, 0 -50 C -6 -46, -10 -30, 0 -6 Z"/>
      <path d="M0 -6 C 10 -30, 6 -46, 0 -50 C -6 -46, -10 -30, 0 -6 Z" transform="rotate(72)"/>
      <path d="M0 -6 C 10 -30, 6 -46, 0 -50 C -6 -46, -10 -30, 0 -6 Z" transform="rotate(144)"/>
      <path d="M0 -6 C 10 -30, 6 -46, 0 -50 C -6 -46, -10 -30, 0 -6 Z" transform="rotate(216)"/>
      <path d="M0 -6 C 10 -30, 6 -46, 0 -50 C -6 -46, -10 -30, 0 -6 Z" transform="rotate(288)"/>
    </g>
    <g stroke="#B4740E" stroke-width="2">
      <line x1="0" y1="0" x2="4" y2="-30"/>
      <line x1="0" y1="0" x2="-4" y2="-30"/>
      <line x1="0" y1="0" x2="10" y2="-24"/>
    </g>
    <circle r="5" fill="#C97B2E"/>
  </g>
</svg>`;

function scatterFlowers(){
  const field = document.getElementById('field');
  const count = window.innerWidth < 480 ? 9 : 14;
  const kinds = [SUNFLOWER, LILY];

  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'flower';
    el.innerHTML = kinds[i % 2];

    const leftPct = (i / (count-1)) * 96 + Math.random()*3;
    const scale = 0.75 + Math.random()*0.6;
    const dip = Math.random()*18;

    el.style.left = `${leftPct}%`;
    el.style.bottom = `${-dip}px`;
    el.style.width = `${scale*72}px`;
    el.style.transitionDelay = `${i * 70}ms`;

    field.appendChild(el);
  }
}

function bloomFlowers(){
  document.querySelectorAll('.flower').forEach(f => f.classList.add('bloom'));
}

function bloomBouquet(){
  document.getElementById('bouquet').classList.add('bloom');
}

const PETAL_COLORS = ['#F2B705', '#F7D842', '#B4740E'];

function releasePetals(originEl){
  const rect = originEl.getBoundingClientRect();
  const count = 14;

  for(let i=0;i<count;i++){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.background = PETAL_COLORS[i % PETAL_COLORS.length];

    const startX = rect.left + rect.width * (0.2 + Math.random()*0.6);
    const startY = rect.top + rect.height * (0.15 + Math.random()*0.3);
    const fallX = (Math.random()-0.5) * 160;
    const fallY = 160 + Math.random()*140;
    const spin = (Math.random()>0.5 ? 1 : -1) * (180 + Math.random()*180);

    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;
    petal.style.setProperty('--fall', `translate(${fallX}px, ${fallY}px) rotate(${spin}deg)`);
    petal.style.animationDuration = `${1.1 + Math.random()*0.6}s`;

    document.body.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove());
  }
}

function initBouquetInteraction(){
  const bouquet = document.getElementById('bouquet');

  bouquet.addEventListener('click', () => {
    bouquet.classList.remove('bounce');
    // reflow para poder repetir la animación
    void bouquet.offsetWidth;
    bouquet.classList.add('bounce');
    releasePetals(bouquet);
  });
}

function openGift(){
  const envelope = document.getElementById('envelope');
  const sceneEnvelope = document.getElementById('scene-envelope');
  const sceneLetter = document.getElementById('scene-letter');

  envelope.classList.add('open');
  envelope.disabled = true;
  bloomFlowers();

  setTimeout(() => {
    envelope.classList.add('leaving');
  }, 550);

  setTimeout(() => {
    sceneEnvelope.hidden = true;
    sceneLetter.hidden = false;
    requestAnimationFrame(bloomBouquet);
  }, 1150);
}

document.addEventListener('DOMContentLoaded', () => {
  scatterFlowers();
  initBouquetInteraction();
  document.getElementById('envelope').addEventListener('click', openGift);
});
