# Wedding Invitation Website

A responsive, multi-page wedding invitation built with plain HTML, CSS and JavaScript. It is designed for static hosting on GitHub Pages and does not require Firebase, a backend, or a build step.

## Pages
- `index.html` — invitation landing page and live countdown
- `story.html` — couple's story
- `events.html` — ceremony schedule and Google Maps directions
- `gallery.html` — responsive photo gallery with lightbox
- `config.js` — all names, dates, venue, event schedule, music path and gallery image URLs
- `style.css`, `script.js` — design and functionality

## Personalize it
1. Open `config.js`.
2. Replace `bride`, `groom`, `date`, `dateLabel`, `venue`, `address`, and `mapQuery`.
3. Edit the `events` array with the actual event names, dates, times and venues.
4. Replace the sample `gallery` URLs with your own image paths, such as `assets/photo-1.jpg`.
5. Add a royalty-free or properly licensed MP3 named `wedding-music.mp3` inside `assets/`. The music starts only after a visitor presses the Music button because browsers block unsolicited autoplay.
6. In `story.html`, edit the story paragraph and heading to add your own story.

**Date format:** `YYYY-MM-DDTHH:MM:SS+05:30`. Use the correct local time and India offset for the wedding.

## Test locally
Open `index.html` in a browser. For a more reliable local preview, use VS Code's Live Server extension, or run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository, for example `wedding-invitation`.
2. Upload all files and the `assets` folder to the repository root (not inside an extra nested folder).
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for the deployment to finish. GitHub will show your public website URL in Settings → Pages, usually `https://YOUR-USERNAME.github.io/wedding-invitation/`.

Every page is linked using relative paths, so the site works from a GitHub project URL. After changing files, commit and push the updates; GitHub Pages will redeploy.

## Important notes
- Google Maps directions use a normal Maps search URL based on `mapQuery`; replace it with the exact venue/address.
- The gallery uses remote sample photographs. Replace them with photographs you have permission to publish.
- This is a static website. The Hindi/English toggle is saved in the visitor's browser. There is no guest database or RSVP submission endpoint included.
- Keep image files reasonably compressed (ideally around 200–500 KB each) so the site loads quickly on mobile.
