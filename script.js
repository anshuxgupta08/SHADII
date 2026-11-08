(() => {
    const W = window.WEDDING || {};
    const $ = s => document.querySelector(s);
    const translations = {
        en: {
            navHome: "Home", navStory: "Our Story", navEvents: "Events", navGallery: "Gallery", music: "Music",
            inviteLine: "WITH THE BLESSINGS OF OUR FAMILIES", inviteYou: "We joyfully invite you to celebrate the wedding of", explore: "Explore the celebration", scroll: "SCROLL TO DISCOVER ↓",
            countdownEyebrow: "THE DAY WE BEGIN FOREVER", countdownTitle: "Counting every moment", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
            together: "TWO HEARTS, ONE BEAUTIFUL JOURNEY", welcomeTitle: "A day made more special with you.", welcomeText: "Some moments become memories because the people we love are there. Your presence and blessings will make our celebration truly complete.", readStory: "Get to know our story ↗",
            locationEyebrow: "SAVE THE LOCATION", locationTitle: "Celebrate with us", directions: "Get directions ↗", footer: "Made with love. We can't wait to celebrate with you.",
            storyEyebrow: "THE BEGINNING OF FOREVER", storyTitle: "Our Story", storySub: "Every love story is beautiful. We are grateful to share ours with you.", chapter: "CHAPTER ONE", eventsEyebrow: "JOYFUL MOMENTS, BEAUTIFUL MEMORIES", eventsTitle: "Wedding Events", eventsSub: "A few days of celebration, a lifetime of memories.", galleryEyebrow: "LITTLE GLIMPSES OF OUR JOURNEY", galleryTitle: "Our Gallery", gallerySub: "A collection of moments close to our hearts.", galleryNote: "Replace these sample photographs with your own memories in the assets folder."
        },
        hi: {
            navHome: "मुखपृष्ठ", navStory: "हमारी कहानी", navEvents: "शुभ अवसर", navGallery: "तस्वीरें", music: "संगीत",
            inviteLine: "हमारे परिवारों के आशीर्वाद से", inviteYou: "आपको सादर आमंत्रित करते हैं", explore: "शुभ अवसर देखें", scroll: "आगे देखने के लिए नीचे जाएँ ↓",
            countdownEyebrow: "एक नए सफ़र की शुरुआत", countdownTitle: "शुभ दिन की उलटी गिनती", days: "दिन", hours: "घंटे", minutes: "मिनट", seconds: "सेकंड",
            together: "दो दिल, एक खूबसूरत सफ़र", welcomeTitle: "आपकी उपस्थिति इस दिन को खास बनाएगी।", welcomeText: "कुछ पल अपनों के साथ होने से यादगार बन जाते हैं। आपका प्यार और आशीर्वाद हमारे उत्सव को पूर्ण करेगा।", readStory: "हमारी कहानी जानें ↗",
            locationEyebrow: "स्थान सुरक्षित करें", locationTitle: "हमारे साथ जश्न मनाएँ", directions: "रास्ता देखें ↗", footer: "प्यार के साथ। आपके साथ जश्न मनाने का इंतज़ार है।",
            storyEyebrow: "हमेशा के सफ़र की शुरुआत", storyTitle: "हमारी कहानी", storySub: "हर प्रेम कहानी खूबसूरत होती है। अपनी कहानी आपके साथ साझा करके हमें खुशी है।", chapter: "पहला अध्याय", eventsEyebrow: "खुशियों के पल, यादगार लम्हे", eventsTitle: "शुभ अवसर", eventsSub: "कुछ दिनों का उत्सव, जीवन भर की यादें।", galleryEyebrow: "हमारे सफ़र की कुछ झलकियाँ", galleryTitle: "तस्वीरें", gallerySub: "दिल के करीब कुछ खूबसूरत पल।", galleryNote: "assets फ़ोल्डर में अपनी तस्वीरों से इन नमूना तस्वीरों को बदलें।"
        }
    };
    let language = localStorage.getItem("wedding-language") || "en";
    function applyLanguage() {
        document.documentElement.lang = language;
        document.body.classList.toggle("hindi", language === "hi");
        document.querySelectorAll("[data-i18n]").forEach(el => { const k = el.dataset.i18n; if (translations[language][k]) el.textContent = translations[language][k]; });
        const btn = $("#languageToggle"); if (btn) btn.textContent = language === "en" ? "हिंदी" : "English";
    }
    document.querySelectorAll("[data-couple]").forEach(el => el.textContent = `${W.bride?.[0] || "B"} & ${W.groom?.[0] || "G"}`);
    if ($("#brideName")) $("#brideName").textContent = W.bride || "Bride";
    if ($("#groomName")) $("#groomName").textContent = W.groom || "Groom";
    if ($("#weddingDateLabel")) $("#weddingDateLabel").textContent = W.dateLabel || "Wedding date";
    if ($("#brideParents")) $("#brideParents").textContent = W.brideParents || "";
    if ($("#groomParents")) $("#groomParents").textContent = W.groomParents || "";
    if ($("#venueLabel")) $("#venueLabel").textContent = `${W.venue || ""} · ${W.address || ""}`;
    if ($("#venueAddress")) $("#venueAddress").textContent = W.address || "";
    if ($("#mapLink")) $("#mapLink").href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(W.mapQuery || W.address || "")}`;
    if ($("#year")) $("#year").textContent = new Date().getFullYear();
    applyLanguage();
    $("#languageToggle")?.addEventListener("click", () => { language = language === "en" ? "hi" : "en"; localStorage.setItem("wedding-language", language); applyLanguage(); });
    $(".menu-toggle")?.addEventListener("click", () => $(".nav")?.classList.toggle("open"));
    const audio = $("#weddingAudio"), musicBtn = $("#musicToggle");
    if (audio && W.musicFile) audio.src = W.musicFile;
    // Music is always on by default. Browsers block sound until the visitor interacts,
    // so we try right away and, if blocked, start on the first tap / click / key press.
    let userPaused = false;
    try { userPaused = localStorage.getItem("wedding-music-paused") === "1"; } catch (e) { }
    const setPlaying = on => musicBtn?.classList.toggle("playing", on);
    try {
        const t = parseFloat(sessionStorage.getItem("wedding-music-time"));
        if (audio && t > 0) audio.addEventListener("loadedmetadata", () => { try { audio.currentTime = t; } catch (e) { } }, { once: true });
    } catch (e) { }
    window.addEventListener("pagehide", () => { try { sessionStorage.setItem("wedding-music-time", String(audio?.currentTime || 0)); } catch (e) { } });
    const unlockEvents = ["click", "keydown", "mousedown", "pointerup", "touchend"];
    const removeUnlock = () => unlockEvents.forEach(ev => document.removeEventListener(ev, startMusic));
    async function startMusic() {
        if (!audio || userPaused || !audio.paused) return;
        try { await audio.play(); setPlaying(true); removeUnlock(); } catch (e) { /* blocked or file missing; try again on next interaction */ }
    }
    unlockEvents.forEach(ev => document.addEventListener(ev, startMusic));
    startMusic();
    // Welcome screen: the "Open Invitation" tap is what lets the browser play music right away.
    try {
        if (!sessionStorage.getItem("wedding-opened")) {
            const hi = language === "hi";
            const ov = document.createElement("div");
            ov.className = "welcome-overlay";
            ov.innerHTML = `<div class="welcome-box"><p class="eyebrow">${hi ? "आपको सादर आमंत्रित करते हैं" : "YOU ARE INVITED"}</p><h1>${W.bride || ""} <i>&amp;</i> ${W.groom || ""}</h1><div class="ornament">✦ ───── ❀ ───── ✦</div><button class="button button-dark" id="openInvite">${hi ? "निमंत्रण खोलें" : "Open Invitation"}</button></div>`;
            document.body.appendChild(ov);
            document.body.style.overflow = "hidden";
            ov.querySelector("#openInvite").addEventListener("click", e => {
                e.stopPropagation();
                try { sessionStorage.setItem("wedding-opened", "1"); localStorage.setItem("wedding-music-paused", "0"); } catch (err) { }
                userPaused = false;
                startMusic();
                ov.remove();
                document.body.style.overflow = "";
            });
        }
    } catch (e) { }
    musicBtn?.addEventListener("click", async e => {
        e.stopPropagation();
        if (!audio) return;
        try {
            if (audio.paused) { userPaused = false; await audio.play(); setPlaying(true); }
            else { userPaused = true; audio.pause(); setPlaying(false); }
            try { localStorage.setItem("wedding-music-paused", userPaused ? "1" : "0"); } catch (err) { }
        } catch (err) { setPlaying(false); console.warn("Music could not play. Check that the file exists:", W.musicFile); alert("Music is not available right now."); }
    });
    function tick() { const target = new Date(W.date || "2026-11-24T22:00:00+05:30").getTime(), diff = target - Date.now(); if (diff <= 0) { ["days", "hours", "minutes", "seconds"].forEach(id => { const e = $("#" + id); if (e) e.textContent = "00"; }); return; } const vals = { days: Math.floor(diff / 86400000), hours: Math.floor(diff / 3600000) % 24, minutes: Math.floor(diff / 60000) % 60, seconds: Math.floor(diff / 1000) % 60 }; Object.entries(vals).forEach(([k, v]) => { const e = $("#" + k); if (e) e.textContent = String(v).padStart(2, "0"); }); }
    tick(); setInterval(tick, 1000);
    const events = $("#eventsGrid"); if (events) events.innerHTML = (W.events || []).map(ev => `<article class="event-card"><span class="event-icon">${ev.icon || "✦"}</span><p class="eyebrow">${ev.date || ""}</p><h2>${ev.name || "Event"}</h2><p class="event-time">${ev.time || ""}</p><p>${ev.note || ""}</p><small>${ev.place || ""}</small></article>`).join("");
    const gallery = $("#galleryGrid");
    if (gallery) {
        gallery.innerHTML = (W.gallery || []).map((src, i) => `<button class="gallery-item" data-src="${src}" aria-label="Open photograph ${i + 1}"><img src="${src}" alt="Wedding memory ${i + 1}" loading="lazy"></button>`).join("");
        // Fix: missing image files (404) no longer show as broken boxes
        const showEmpty = () => { if (!gallery.querySelector(".gallery-item") && !gallery.querySelector(".gallery-empty")) gallery.innerHTML = '<p class="gallery-empty">Photos coming soon.</p>'; };
        gallery.querySelectorAll("img").forEach(img => {
            img.addEventListener("error", () => { img.closest(".gallery-item")?.remove(); showEmpty(); });
        });
        showEmpty();
    }
    const V = W.vehicleArrangement;
    if (V) {
        if ($("#vehicleWhen")) $("#vehicleWhen").textContent = `${V.date} · ${V.time}`;
        if ($("#vehicleText") && V.note) $("#vehicleText").textContent = V.note;
    }
    document.addEventListener("keydown", e => { if (e.key === "Escape") $("#lightbox")?.classList.remove("visible"); });
    gallery?.addEventListener("click", e => { const item = e.target.closest(".gallery-item"); if (!item) return; $("#lightboxImage").src = item.dataset.src; $("#lightbox").classList.add("visible"); });
    $("#closeLightbox")?.addEventListener("click", () => $("#lightbox").classList.remove("visible"));
    $("#lightbox")?.addEventListener("click", e => { if (e.target.id === "lightbox") e.currentTarget.classList.remove("visible"); });
})();