// Preloader
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  if (pre) setTimeout(() => pre.classList.add('hidden'), 250);
});

// Sticky header
const header = document.getElementById('siteHeader');
const onScroll = () => {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
};
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Click-to-cycle image sliders
document.querySelectorAll('[data-slider]').forEach(slider => {
  const imgs = slider.querySelectorAll('img');
  let index = 0;
  slider.addEventListener('click', () => {
    imgs[index].classList.remove('active');
    index = (index + 1) % imgs.length;
    imgs[index].classList.add('active');
  });
});

// Video modal
const videoTrigger = document.getElementById('videoTrigger');
const videoModal = document.getElementById('videoModal');
const videoModalBackdrop = document.getElementById('videoModalBackdrop');
const videoModalClose = document.getElementById('videoModalClose');
const videoPlayer = document.getElementById('videoPlayer');

const closeVideoModal = () => {
  videoModal.classList.remove('open');
  videoPlayer.pause();
};

if (videoTrigger) {
  videoTrigger.addEventListener('click', () => {
    videoModal.classList.add('open');
    videoPlayer.play().catch(() => {});
  });
  videoModalBackdrop.addEventListener('click', closeVideoModal);
  videoModalClose.addEventListener('click', closeVideoModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });
}

// Contact form -> WhatsApp
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const ad = data.get('ad');
    const telefon = data.get('telefon');
    const eposta = data.get('eposta');
    const mesaj = data.get('mesaj');
    const text = `Merhaba, Teknosan Kalıp web sitesinden yazıyorum.%0A%0AAd Soyad: ${encodeURIComponent(ad)}%0ATelefon: ${encodeURIComponent(telefon)}%0AE-posta: ${encodeURIComponent(eposta)}%0AMesaj: ${encodeURIComponent(mesaj)}`;
    window.open(`https://wa.me/905327098535?text=${text}`, '_blank');
  });
}

/* Paylaş butonu */
(function(){
  var btn=document.getElementById('shareBtn');
  if(!btn)return;
  btn.addEventListener('click',function(){
    var data={title:document.title,text:'Teknosan Kalıp Plastik İmalat',url:location.href};
    if(navigator.share){navigator.share(data).catch(function(){});return;}
    var label=btn.querySelector('span');
    var done=function(){if(label){var t=label.textContent;label.textContent='Bağlantı kopyalandı';setTimeout(function(){label.textContent=t;},2000);}};
    if(navigator.clipboard){navigator.clipboard.writeText(location.href).then(done);}
    else{window.prompt('Bağlantıyı kopyalayın:',location.href);}
  });
})();
