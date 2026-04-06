(function() {
    // Mobile menu
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    if(menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

    // testimonials
    let slides = document.querySelectorAll('.testimonial-slide');
    let dots = document.querySelectorAll('.dot');
    let currentIdx = 0;
    function showSlide(i) { if(i<0)i=slides.length-1; if(i>=slides.length)i=0; slides.forEach(s=>s.classList.remove('active')); dots.forEach(d=>d.classList.remove('active')); slides[i].classList.add('active'); dots[i].classList.add('active'); currentIdx=i; }
    if(dots.length) dots.forEach((d,i)=>d.addEventListener('click',()=>showSlide(i)));
    if(slides.length) setInterval(()=>showSlide(currentIdx+1),5000);
    document.getElementById('currentYear').innerText = new Date().getFullYear();

    // Modal logic
    const modal = document.getElementById('bookingModal');
    const openBtns = [document.getElementById('openBookingBtn'), document.getElementById('heroBookBtn')];
    const closeBtn = document.getElementById('closeModalBtn');
    function openModal() { modal.style.display = 'flex'; }
    openBtns.forEach(btn => { if(btn) btn.addEventListener('click', (e) => { e.preventDefault(); openModal(); }); });
    if(closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };
    
    window.openBookingWithService = (serviceName) => {
        const select = document.getElementById('serviceSelect');
        if(select) { for(let opt of select.options) { if(opt.value.includes(serviceName) || opt.text.includes(serviceName)) { opt.selected = true; break; } } }
        openModal();
    };
    
    const bookingForm = document.getElementById('dynamicBookingForm');
    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const terms = document.getElementById('termsCheckbox');
        if(!terms.checked) { 
            alert("Please accept the cancellation policy."); 
            return; 
        }
        
        const name = document.getElementById('clientName').value;
        const email = document.getElementById('clientEmail').value;
        const phone = document.getElementById('clientPhone').value;
        const service = document.getElementById('serviceSelect').value;
        const date = document.getElementById('appointmentDate').value;
        const time = document.getElementById('appointmentTime').value;
        const notes = document.querySelector('textarea')?.value || '';
        
        if(!name || !email || !phone || !service || !date || !time) { 
            alert("Please fill all booking fields."); 
            return; 
        }
        
        // ========== FORMSUBMIT: Send email to info@laziziwellness.com ==========
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('service', service);
        formData.append('date', date);
        formData.append('time', time);
        formData.append('notes', notes);
        formData.append('_subject', `🆕 NEW BOOKING: ${service} on ${date} at ${time}`);
        formData.append('_template', 'table');
        formData.append('_captcha', 'false');  // Disable captcha for smoother flow
        
        try {
            const emailResponse = await fetch('https://formsubmit.co/ajax/info@laziziwellness.com', {
                method: 'POST',
                body: formData
            });
            if(emailResponse.ok) {
                console.log('✅ Booking email sent to info@laziziwellness.com');
            } else {
                console.warn('⚠️ Email notification failed, but continuing with payment');
            }
        } catch(err) {
            console.warn('⚠️ Email send error:', err);
            // Continue with payment even if email fails - don't block the user
        }
        
        // Store booking details for post-payment confirmation
        const bookingMeta = { name, email, phone, service, date, time, notes, deposit: 50, currency: "USD" };
        sessionStorage.setItem("lazizi_booking", JSON.stringify(bookingMeta));
        
        // Redirect to Paystack for $50 deposit (USD amount = 50 dollars)
        const returnUrl = window.location.href.split('#')[0];
        const paystackUrl = `https://sarahadevelopers.github.io/paystack-API/?amount=50&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&currency=USD&metadata=${encodeURIComponent(JSON.stringify({service, date, time, deposit:50, name, phone, notes}))}&callback=${encodeURIComponent(returnUrl)}`;
        
        window.location.href = paystackUrl;
    });
    
    // navbar scroll hide/show
    let lastScroll = 0; 
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => { 
        let cs = window.pageYOffset; 
        if(cs > lastScroll && cs > 120) navbar.classList.add("hide"); 
        else navbar.classList.remove("hide"); 
        if(cs > 10) navbar.classList.add("scrolled"); 
        else navbar.classList.remove("scrolled"); 
        lastScroll = cs; 
    });
    
    // fade sections observer
    const faders = document.querySelectorAll('.fade-section');
    const obs = new IntersectionObserver((entries) => { 
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }); 
    }, { threshold: 0.15 });
    faders.forEach(el => obs.observe(el));
    
    // If returning from payment gateway with success
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('payment_status') === 'success') {
        const saved = sessionStorage.getItem("lazizi_booking");
        if(saved) {
            const bk = JSON.parse(saved);
            alert(`✅ Payment confirmed! Your $50 deposit is secured.\n\nConfirmation sent to ${bk.email}\n\nWe'll contact you within 2 hours to confirm your ${bk.service} on ${bk.date} at ${bk.time}.\n\nThank you for choosing Lazizi® Wellness.`);
            sessionStorage.removeItem("lazizi_booking");
        } else { 
            alert("✅ Payment confirmed! We'll contact you shortly to finalize your booking."); 
        }
        window.history.replaceState({}, document.title, window.location.pathname);
    }

    
})();
// Testimonial slider functionality
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentTestimonial = index;
}

dots.forEach((dot, i) => {
    dot.addEventListener('click', () => showTestimonial(i));
});

// Auto-rotate every 5 seconds
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 5000);