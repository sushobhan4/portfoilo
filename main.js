/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input, .resume__video, .resume__download, .projects__card, .certifications__item', {interval: 200});
  

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
  
    form.addEventListener('submit', e => {
      e.preventDefault();
  
      // Trigger built-in HTML5 validation
      if (!form.reportValidity()) {
        return;
      }
  
      // Build URL-encoded form body
      const formData = new FormData(form);
      const params = new URLSearchParams();
      for (const [key, val] of formData.entries()) {
        params.append(key, val);
      }
  
      // POST to the Google Form
      fetch('https://docs.google.com/forms/d/e/1FAIpQLSdP9LG7HWBhOtzp3lCtCBqkJ4tQjH_1LyBhwNBvuHNHXEvg7Q/formResponse', {
        method: 'POST',
        mode: 'no-cors',        
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })
      .then(() => {
        status.textContent = 'Thank you! Your message has been sent.';
        form.reset();
      })
      .catch(err => {
        console.error(err);
        status.textContent = 'Oops—there was an error. Please try again later.';
      });
    });
  });