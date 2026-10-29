
/* =========================================================
   LAZIZI WELLNESS — BLOG LISTING
   Source of truth: manually written HTML articles in /blog/
   No generated or duplicated posts.
   ========================================================= */

const articleUrls = [
    "blog/burke-gilman-cyclist-massage-seattle.html",
    "blog/capitol-hill-wellness-massage-seattle.html",
    "blog/cold-plunge-deep-tissue-massage.html",
    "blog/cortisol-management-seattle-massage.html",
    "blog/cycle-syncing-massage-women.html",
    "blog/ergonomic-burnout-bellevue-massage.html",
    "blog/executive-system-reboot-bellevue-massage.html",
    "blog/fourth-trimester-massage-bellevue.html",
    "blog/lymphatic-drainage-bellevue-massage.html",
    "blog/mercer-island-mobile-massage.html",
    "blog/mitochondrial-health-massage-longevity.html",
    "blog/mobile-massage-medina-98039.html",
    "blog/mount-si-recovery-hike-massage.html",
    "blog/pickleball-elbow-bellevue-massage.html",
    "blog/plantar-fasciitis-massage-seattle.html",
    "blog/prenatal-massage-bellevue.html",
    "blog/remote-tech-massage-bellevue.html",
    "blog/rotator-cuff-massage-seattle.html",
    "blog/sciatica-massage-bellevue.html",
    "blog/seattle-marathon-recovery-massage.html",
    "blog/ski-season-prep-acl-prevention-massage.html",
    "blog/sleep-rem-massage-seattle.html",
    "blog/tech-neck-reset-seattle-massage.html",
    "blog/tmj-massage-seattle.html",
    "blog/vagus-nerve-stress-seattle-massage.html"
];

const postsPerPage = 15;

let allPosts = [];
let filteredPosts = [];
let currentPage = 1;
let searchQuery = "";

const blogGrid = document.getElementById("blogGrid");
const pagination = document.getElementById("pagination");
const currentYear = document.getElementById("currentYear");
const searchForm = document.querySelector(
    'form[action="/search.html"]'
);
const searchInput = searchForm?.querySelector(
    'input[name="q"]'
);

// ---------------------------------------------------------
// HELPERS
// ---------------------------------------------------------

function getMetaContent(doc, selector) {
    return (
        doc.querySelector(selector)?.getAttribute("content") || ""
    ).trim();
}

function getArticleTitle(doc, url) {
    const title =
        getMetaContent(doc, 'meta[property="og:title"]') ||
        doc.querySelector("h1")?.textContent?.trim() ||
        doc.querySelector("title")?.textContent?.trim();

    if (title) {
        return title.replace(/\s*[|–-]\s*Lazizi(?:®)? Wellness\s*$/i, "");
    }

    return url
        .split("/")
        .pop()
        .replace(/\.html$/i, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, letter => letter.toUpperCase());
}

function getArticleDescription(doc) {
    return (
        getMetaContent(doc, 'meta[name="description"]') ||
        getMetaContent(doc, 'meta[property="og:description"]')
    );
}

function getArticleImage(doc, articleUrl) {
    const image =
        getMetaContent(doc, 'meta[property="og:image"]') ||
        getMetaContent(doc, 'meta[name="twitter:image"]') ||
        doc.querySelector("article img, main img, .article-content img")
            ?.getAttribute("src") ||
        "";

    if (!image) return "";

    try {
        return new URL(image, articleUrl).href;
    } catch {
        return "";
    }
}

function getArticleCategory(doc) {
    return (
        getMetaContent(doc, 'meta[property="article:section"]') ||
        getMetaContent(doc, 'meta[name="article:section"]') ||
        "Wellness"
    );
}

// ---------------------------------------------------------
// READ THE REAL ARTICLE FILES
// ---------------------------------------------------------

async function loadArticle(relativeUrl) {
    const absoluteUrl = new URL(relativeUrl, document.baseURI).href;

    try {
        const response = await fetch(absoluteUrl);

        if (!response.ok) {
            console.warn(
                `Could not load blog article (${response.status}):`,
                relativeUrl
            );
            return null;
        }

        const html = await response.text();
        const doc = new DOMParser().parseFromString(
            html,
            "text/html"
        );

        return {
            url: relativeUrl,
            title: getArticleTitle(doc, relativeUrl),
            excerpt: getArticleDescription(doc),
            image: getArticleImage(doc, absoluteUrl),
            category: getArticleCategory(doc)
        };
    } catch (error) {
        console.error("Error loading blog article:", relativeUrl, error);
        return null;
    }
}

// ---------------------------------------------------------
// SAFE CARD CREATION
// ---------------------------------------------------------

function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
}

function createBlogCard(post) {
    const card = createElement("article", "blog-card");

    if (post.image) {
        const imageWrapper = createElement("div", "blog-image");
        const image = document.createElement("img");

        image.src = post.image;
        image.alt = post.title;
        image.loading = "lazy";
        image.decoding = "async";

        image.addEventListener("error", () => {
            imageWrapper.remove();
        }, { once: true });

        imageWrapper.appendChild(image);
        card.appendChild(imageWrapper);
    }

    card.appendChild(
        createElement("div", "blog-category", post.category)
    );

    card.appendChild(
        createElement("h2", "blog-title", post.title)
    );

    if (post.excerpt) {
        card.appendChild(
            createElement("p", "blog-excerpt", post.excerpt)
        );
    }

    const link = createElement(
        "a",
        "read-more",
        "Read Full Article →"
    );

    link.href = post.url;

    card.appendChild(link);

    return card;
}

// ---------------------------------------------------------
// SEARCH AND RENDERING
// ---------------------------------------------------------

function applySearch() {
    const query = searchQuery.toLowerCase().trim();

    filteredPosts = allPosts.filter(post => {
        const searchableText = [
            post.title,
            post.excerpt,
            post.category,
            post.url
        ].join(" ").toLowerCase();

        return searchableText.includes(query);
    });

    currentPage = 1;
    renderBlogs();
}

function renderBlogs() {
    if (!blogGrid) return;

    blogGrid.replaceChildren();

    const totalPages = Math.ceil(
        filteredPosts.length / postsPerPage
    );

    if (filteredPosts.length === 0) {
        blogGrid.appendChild(
            createElement(
                "p",
                "blog-empty",
                allPosts.length
                    ? "No articles match your search. Try different keywords."
                    : "No articles could be loaded. Please try again later."
            )
        );

        if (pagination) pagination.replaceChildren();
        return;
    }

    const start = (currentPage - 1) * postsPerPage;
    const visiblePosts = filteredPosts.slice(
        start,
        start + postsPerPage
    );

    visiblePosts.forEach(post => {
        blogGrid.appendChild(createBlogCard(post));
    });

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    if (!pagination) return;

    pagination.replaceChildren();

    if (totalPages <= 1) return;

    function addPageButton(label, page, options = {}) {
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = label;
        button.disabled = Boolean(options.disabled);

        if (options.active) {
            button.classList.add("active");
            button.setAttribute("aria-current", "page");
        }

        button.addEventListener("click", () => {
            if (page < 1 || page > totalPages) return;

            currentPage = page;
            renderBlogs();

            blogGrid?.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });

        pagination.appendChild(button);
    }

    addPageButton("← Previous", currentPage - 1, {
        disabled: currentPage === 1
    });

    for (let page = 1; page <= totalPages; page++) {
        const nearCurrent = Math.abs(page - currentPage) <= 2;
        const isBoundary = page === 1 || page === totalPages;

        if (nearCurrent || isBoundary) {
            addPageButton(String(page), page, {
                active: page === currentPage
            });
        } else if (
            page === currentPage - 3 ||
            page === currentPage + 3
        ) {
            pagination.appendChild(
                createElement("span", "pagination-ellipsis", "…")
            );
        }
    }

    addPageButton("Next →", currentPage + 1, {
        disabled: currentPage === totalPages
    });
}

// ---------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------

async function initializeBlog() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (!blogGrid) {
        console.warn("Blog grid #blogGrid was not found.");
        return;
    }

    blogGrid.replaceChildren(
        createElement("p", "blog-loading", "Loading articles…")
    );

    // Each URL appears only once. No synthetic posts are created.
    const loadedPosts = await Promise.all(
        articleUrls.map(loadArticle)
    );

    allPosts = loadedPosts.filter(Boolean);
    filteredPosts = [...allPosts];

    renderBlogs();

    if (allPosts.length !== articleUrls.length) {
        console.warn(
            `Loaded ${allPosts.length} of ${articleUrls.length} blog articles. ` +
            "Check the missing URLs and deployment paths."
        );
    }
}

// Search the loaded article metadata without navigating to a missing
// /search.html page.
if (searchForm && searchInput) {
    searchForm.addEventListener("submit", event => {
        event.preventDefault();
        searchQuery = searchInput.value;
        applySearch();
    });

    searchInput.addEventListener("input", () => {
        searchQuery = searchInput.value;
        applySearch();
    });
}

// Mobile navigation
const menuToggle = document.getElementById("menu-toggle");
const navLinksMenu = document.getElementById("nav-links");

if (menuToggle && navLinksMenu) {
    menuToggle.addEventListener("click", () => {
        navLinksMenu.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            String(navLinksMenu.classList.contains("show"))
        );
    });
}

// Preserve the existing booking destination.
const bookingButton = document.getElementById("openBookingNavBtn");

if (bookingButton) {
    bookingButton.addEventListener("click", event => {
        event.preventDefault();
        window.location.href = "index.html#booking";
    });
}

// Existing fade-in effects
if ("IntersectionObserver" in window) {
    const fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll(".fade-section").forEach(element => {
        fadeObserver.observe(element);
    });
}

initializeBlog();
