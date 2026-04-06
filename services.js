     (function() {
            // mobile menu toggle
            const menuToggle = document.getElementById('menu-toggle');
            const navLinks = document.getElementById('nav-links');
            if(menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));
            document.getElementById('currentYear').innerText = new Date().getFullYear();

            // smooth scroll for nav links
            const links = document.querySelectorAll('.nav-links a[href^="#"]');
            links.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                    if (navLinks.classList.contains('show')) navLinks.classList.remove('show');
                });
            });

            // Modal logic
            const modal = document.getElementById('bookingModal');
            const openBtns = document.querySelectorAll('#openBookingNavBtn, .book-service-btn, .book-link');
            const closeBtn = document.getElementById('closeModalBtn');
            
            function openModal() { 
                if(modal) modal.style.display = 'flex'; 
            }
            
            if(openBtns.length) {
                openBtns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        const serviceName = btn.getAttribute('data-service');
                        const select = document.getElementById('serviceSelect');
                        if(select && serviceName) {
                            for(let opt of select.options) {
                                if(opt.value && (opt.value.includes(serviceName.split('(')[0].trim()) || 
                                   opt.text.includes(serviceName.split('(')[0].trim()))) {
                                    opt.selected = true;
                                    break;
                                }
                            }
                        }
                        openModal();
                    });
                });
            }
            
            if(closeBtn) closeBtn.addEventListener('click', () => modal.style.display = 'none');
            window.onclick = (e) => { if(e.target === modal) modal.style.display = 'none'; };

            window.openBookingWithService = (serviceName) => {
                const select = document.getElementById('serviceSelect');
                if(select && serviceName) { 
                    for(let opt of select.options) { 
                        if(opt.value && (opt.value.includes(serviceName.split('(')[0].trim()) || 
                           opt.text.includes(serviceName.split('(')[0].trim()))) { 
                            opt.selected = true; 
                            break; 
                        } 
                    } 
                }
                openModal();
            };

            const bookingForm = document.getElementById('dynamicBookingForm');
            if(bookingForm) {
                bookingForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const terms = document.getElementById('termsCheckbox');
                    if(!terms.checked) { 
                        alert("Please accept the cancellation policy."); 
                        return; 
                    }
                    
                    const name = document.getElementById('clientName')?.value;
                    const email = document.getElementById('clientEmail')?.value;
                    const phone = document.getElementById('clientPhone')?.value;
                    const service = document.getElementById('serviceSelect')?.value;
                    const date = document.getElementById('appointmentDate')?.value;
                    const time = document.getElementById('appointmentTime')?.value;
                    const notes = document.getElementById('notes')?.value || '';
                    const location = document.getElementById('location')?.value || '';
                    const referral = document.getElementById('hearAbout')?.value || '';
                    
                    if(!name || !email || !phone || !service || !date || !time) { 
                        alert("Please fill all booking fields."); 
                        return; 
                    }
                    
                    // FORMSUBMIT: Send email to info@laziziwellness.com
                    const formData = new FormData();
                    formData.append('name', name);
                    formData.append('email', email);
                    formData.append('phone', phone);
                    formData.append('service', service);
                    formData.append('date', date);
                    formData.append('time', time);
                    formData.append('notes', notes);
                    formData.append('location', location);
                    formData.append('referral_source', referral);
                    formData.append('_subject', `🆕 NEW BOOKING (Services Page): ${service} on ${date} at ${time}`);
                    formData.append('_template', 'table');
                    formData.append('_captcha', 'false');
                    
                    try {
                        await fetch('https://formsubmit.co/ajax/info@laziziwellness.com', {
                            method: 'POST',
                            body: formData
                        });
                        console.log('✅ Booking email sent to info@laziziwellness.com');
                    } catch(err) {
                        console.warn('⚠️ Email notification failed, continuing with payment');
                    }
                    
                    // Store booking for confirmation
                    const bookingMeta = { name, email, phone, service, date, time, notes, location, deposit: 50 };
                    sessionStorage.setItem("lazizi_booking", JSON.stringify(bookingMeta));
                    
                    // Redirect to Paystack
                    const returnUrl = window.location.href.split('#')[0];
                    const paystackUrl = `https://sarahadevelopers.github.io/paystack-API/?amount=50&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&currency=USD&metadata=${encodeURIComponent(JSON.stringify({service, date, time, deposit:50, name, phone, notes}))}&callback=${encodeURIComponent(returnUrl)}`;
                    window.location.href = paystackUrl;
                });
            }

            // fade observer
            const faders = document.querySelectorAll('.fade-section');
            const observer = new IntersectionObserver((entries) => { 
                entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }); 
            }, { threshold: 0.15 });
            faders.forEach(el => observer.observe(el));

            // payment return check
            const urlParams = new URLSearchParams(window.location.search);
            if(urlParams.get('payment_status') === 'success') {
                const saved = sessionStorage.getItem("lazizi_booking");
                if(saved) {
                    const bk = JSON.parse(saved);
                    alert(`✅ Deposit secured! Confirmation sent to ${bk.email}. We'll reach out within 2 hours to confirm your ${bk.service} on ${bk.date} at ${bk.time}.`);
                    sessionStorage.removeItem("lazizi_booking");
                } else { 
                    alert("✅ Booking received! We'll contact you shortly to confirm your appointment."); 
                }
                window.history.replaceState({}, document.title, window.location.pathname);
            }
        })();