 // ============================================
        // COMPLETE BLOG POSTS DATABASE WITH STATIC URLs
        // ============================================
        const blogPosts = [];

        // First 10 detailed posts with their static file paths
        const detailedPosts = [
            { id: 1, title: "The Tech-Neck Reset: Why Seattle's High-Performers Prioritize Clinical Recovery", category: "Tech & Executive", excerpt: "How 60 pounds of extra pressure on your cervical spine is ruining your focus. Discover the myofascial solution for tech workers.", image: "https://images.pexels.com/photos/4506100/pexels-photo-4506100.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/tech-neck-reset-seattle-massage.html" },
            { id: 2, title: "Mount Si Recovery: Why Your Glutes & Quads Need a Post-Hike Flush", category: "Active PNW", excerpt: "Conquered Old Mt. Si? Don't let DOMS ruin your week. Specialized lymphatic flush for hikers in Issaquah and North Bend.", image: "https://images.pexels.com/photos/6187257/pexels-photo-6187257.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/mount-si-recovery-hike-massage.html" },
            { id: 3, title: "The 90-Minute System Reboot for Bellevue Executives", category: "Tech & Executive", excerpt: "Why top performers at Microsoft and Amazon are extending their sessions to 90 minutes for cognitive clarity and stress reduction.", image: "https://images.pexels.com/photos/4056896/pexels-photo-4056896.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/executive-system-reboot-bellevue-massage.html" },
            { id: 4, title: "Lymphatic Drainage 101: Why Bellevue's Elite Are Obsessed", category: "Longevity", excerpt: "The science of reducing inflammation, detoxifying tissues, and boosting immunity through manual lymphatic drainage.", image: "https://images.pexels.com/photos/4101660/pexels-photo-4101660.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/lymphatic-drainage-bellevue-massage.html" },
            { id: 5, title: "Pickleball Elbow is Real: How Bellevue Players Stay on the Court", category: "Active PNW", excerpt: "Lateral epicondylitis is plaguing the Eastside. Discover sports massage protocols that keep you playing pain-free.", image: "https://images.pexels.com/photos/3757946/pexels-photo-3757946.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/pickleball-elbow-bellevue-massage.html" },
            { id: 6, title: "Vagus Nerve Tone: Handling Seattle's High-Stress Environment", category: "Longevity", excerpt: "How stimulating the vagus nerve through bodywork can lower cortisol and improve resilience in high-pressure careers.", image: "https://images.pexels.com/photos/6187267/pexels-photo-6187267.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/vagus-nerve-stress-seattle-massage.html" },
            { id: 7, title: "The Fourth Trimester: Mobile Massage for New Bellevue Moms", category: "Women's Wellness", excerpt: "Why postpartum recovery requires specialized in-home bodywork for healing, bonding, and physical restoration.", image: "https://images.pexels.com/photos/4506099/pexels-photo-4506099.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/fourth-trimester-massage-bellevue.html" },
            { id: 8, title: "Ski Season Prep: Preventing ACL Tears at Stevens Pass", category: "Active PNW", excerpt: "Pre-season myofascial release to stabilize knees and hips for powder days at Stevens Pass and Snoqualmie.", image: "https://images.pexels.com/photos/6187257/pexels-photo-6187257.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/ski-season-prep-acl-prevention-massage.html" },
            { id: 9, title: "Mobile Massage in 98039: Why Medina Chooses Outcall", category: "Hyper-Local SEO", excerpt: "Luxury convenience for Medina's busiest residents. No traffic, no waiting rooms—just white-glove service at home.", image: "https://images.pexels.com/photos/4056896/pexels-photo-4056896.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/mobile-massage-medina-98039.html" },
            { id: 10, title: "Mitochondrial Health: Can Massage Boost Cellular Energy?", category: "Longevity", excerpt: "The emerging science linking therapeutic touch to ATP production, reduced oxidative stress, and biological aging.", image: "https://images.pexels.com/photos/4101660/pexels-photo-4101660.jpeg?auto=compress&cs=tinysrgb&w=600", url: "blog/mitochondrial-health-massage-longevity.html" }
        ];

        detailedPosts.forEach(p => blogPosts.push(p));

        // Generate remaining 90 posts (11-100) with static URLs
        const categoriesList = ["Tech & Executive", "Active PNW", "Longevity", "Women's Wellness", "Hyper-Local SEO"];
        const slugsList = [
            "ergonomic-burnout-bellevue-massage",
            "burke-gilman-cyclist-massage-seattle",
            "cortisol-management-seattle-massage",
            "capitol-hill-wellness-massage-seattle",
            "sleep-rem-massage-seattle",
            "remote-tech-massage-bellevue",
            "seattle-marathon-recovery-massage",
            "cold-plunge-deep-tissue-massage",
            "cycle-syncing-massage-women",
            "mercer-island-mobile-massage",
            "tmj-massage-seattle",
            "plantar-fasciitis-massage-seattle",
            "sciatica-massage-bellevue",
            "rotator-cuff-massage-seattle",
            "prenatal-massage-bellevue"
        ];
        
        const titlesList = [
            "Ergonomic Burnout: How Sitting in Bellevue Mimics a Sports Injury",
            "The Burke-Gilman Commute: Relieving Hip Tension for Seattle Cyclists",
            "Cortisol Management: Surviving Seattle's Dark Winter Months",
            "Capitol Hill Wellness: Finding Peace in Seattle's Vibrant Core",
            "Sleep Architecture: Improving Deep REM Through Therapeutic Massage",
            "The Corporate Nomad: Mobile Massage for Remote Tech Leads",
            "Training for Seattle Marathon: The 48-Hour Post-Race Recovery Window",
            "The Longevity Protocol: Combining Cold Plunges with Deep Tissue",
            "Cycle Syncing: Aligning Massage with Your Hormonal Rhythm",
            "Mobile Massage in Mercer Island: I-90 Convenience for Busy Families",
            "TMJ Relief: How Intraoral Massage Helps Jaw Pain",
            "Plantar Fasciitis: Relieving Heel Pain for Seattle Runners",
            "Sciatica Relief: Non-Invasive Solutions for Lower Back Pain",
            "Rotator Cuff Recovery: Sports Massage for Overhead Athletes",
            "Prenatal Massage: Safe Comfort for Expecting Mothers"
        ];

        for (let i = 11; i <= 100; i++) {
            const cat = categoriesList[i % categoriesList.length];
            const idx = i % slugsList.length;
            blogPosts.push({
                id: i,
                title: titlesList[idx] + " | Lazizi Wellness",
                category: cat,
                excerpt: "Expert insights for King County residents. Learn how specialized massage therapy can transform your wellness journey and improve daily performance.",
                image: "https://images.pexels.com/photos/4506100/pexels-photo-4506100.jpeg?auto=compress&cs=tinysrgb&w=600",
                url: "blog/" + slugsList[idx] + ".html"
            });
        }

        // Pagination variables
        let currentPage = 1;
        const postsPerPage = 15;

        function renderBlogs() {
            const start = (currentPage - 1) * postsPerPage;
            const end = start + postsPerPage;
            const postsToShow = blogPosts.slice(start, end);
            
            const grid = document.getElementById('blogGrid');
            if (!grid) return;
            
            grid.innerHTML = postsToShow.map(post => `
                <div class="blog-card">
                    <div class="blog-image">
                        <img src="${post.image}" alt="${post.title.replace(/"/g, '&quot;')}" loading="lazy" onerror="this.src='https://placehold.co/600x400/e8dfd6/a88664?text=Wellness+Journal'">
                    </div>
                    <div class="blog-category">${post.category}</div>
                    <div class="blog-title">${post.title.substring(0, 65)}${post.title.length > 65 ? '...' : ''}</div>
                    <div class="blog-excerpt">${post.excerpt.substring(0, 110)}${post.excerpt.length > 110 ? '...' : ''}</div>
                    <div class="blog-meta">
                        <span><i class="far fa-calendar-alt"></i> April 2026</span>
                        <span><i class="far fa-clock"></i> 6 min read</span>
                    </div>
                    <a href="${post.url}" class="read-more">Read Full Article →</a>
                </div>
            `).join('');
            
            renderPagination();
        }

        function renderPagination() {
            const totalPages = Math.ceil(blogPosts.length / postsPerPage);
            const paginationDiv = document.getElementById('pagination');
            if (!paginationDiv) return;
            
            let html = '';
            html += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>← Previous</button>`;
            
            for (let i = 1; i <= totalPages; i++) {
                if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                    html += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
                } else if (i === currentPage - 3 || i === currentPage + 3) {
                    html += `<span>...</span>`;
                }
            }
            
            html += `<button onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next →</button>`;
            paginationDiv.innerHTML = html;
        }

        window.changePage = function(page) {
            const totalPages = Math.ceil(blogPosts.length / postsPerPage);
            if (page < 1 || page > totalPages) return;
            currentPage = page;
            renderBlogs();
            window.scrollTo({ top: 300, behavior: 'smooth' });
        };

        // Mobile menu toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navLinksMenu = document.getElementById('nav-links');
        if (menuToggle) {
            menuToggle.addEventListener('click', () => {
                navLinksMenu.classList.toggle('show');
            });
        }

        // Current year for footer
        document.getElementById('currentYear').innerText = new Date().getFullYear();

        // Fade animation on scroll
        const faders = document.querySelectorAll('.fade-section');
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.15 });
        faders.forEach(el => fadeObserver.observe(el));

        // Booking button redirect
        const bookBtn = document.getElementById('openBookingNavBtn');
        if (bookBtn) {
            bookBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'index.html#booking';
            });
        }

        // Initialize
        renderBlogs();