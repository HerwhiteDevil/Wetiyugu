// Simple carousel and reveal animations
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('dots');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let idx = 0;

function showSlide(i){
  slides.forEach((s,si)=> s.classList.toggle('active', si===i));
  Array.from(dotsWrap.children).forEach((d,di)=> d.classList.toggle('active', di===i));
  idx = i;
}

function createDots(){
  slides.forEach((s, i)=> {
    const btn = document.createElement('button');
    btn.addEventListener('click', ()=> showSlide(i));
    if(i===0) btn.classList.add('active');
    dotsWrap.appendChild(btn);
  });
}

prev.addEventListener('click', ()=> showSlide((idx-1+slides.length)%slides.length));
next.addEventListener('click', ()=> showSlide((idx+1)%slides.length));

createDots();
showSlide(0);

// Auto-advance every 6s
setInterval(()=> showSlide((idx+1)%slides.length), 6000);

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) { e.target.style.opacity = 1; e.target.style.transform = 'none' }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => obs.observe(el));

// fake form handler
function submitForm(e){
  e.preventDefault();
  const name = document.getElementById('name').value || 'Friend';
  alert(`${name}, thanks! We'll contact you shortly.`);
  document.querySelector('.contact-form').reset();
}
