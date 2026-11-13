# VALORANT Beginner's Guide

A simple static website for a college Digital Marketing practical. It explains Valorant basics (agents, maps, weapons, tips), has a practice checklist and a quiz, and is ready for Google Analytics 4 (GA4).

> Independent educational student project. Not affiliated with Riot Games.

## 1. What each file does

| File | Purpose |
| --- | --- |
| `index.html` | The page content and SEO tags (title, meta description, headings). |
| `style.css` | All the design: colours, layout, mobile version. |
| `script.js` | Mobile menu, checklist, quiz and Google Analytics code. **Your GA4 ID goes at the top.** |
| `assets/images/` | Agent, map and weapon images (stored locally, so nothing breaks). |
| `README.md` | These instructions. |

## 2. Run it locally

No installation needed. Double-click `index.html` and it opens in your browser.

## 3. Create a free Netlify account

1. Go to <https://www.netlify.com> and click **Sign up**.
2. Sign up with your email or Google/GitHub account. The free plan is enough.

## 4. Publish with Netlify Drop

1. Open <https://app.netlify.com/drop> (log in if asked).
2. Drag the **whole project folder** (the one containing `index.html`) into the box.
3. Wait a few seconds. Netlify gives you a link like `https://random-name.netlify.app`.
4. Optional: in **Site configuration → Change site name**, choose a nicer name.

### Alternative: deploy on Vercel

No build step or environment variables are needed (`vercel.json` only adds image caching).

1. Sign up free at <https://vercel.com/signup>.
2. **Easiest (CLI):** install Node.js, then in the project folder run `npx vercel`, log in, accept the defaults (Framework: *Other*, no build command, output directory `.`), then `npx vercel --prod` for the live URL.
3. **Or via GitHub:** push the folder to a GitHub repo, then on Vercel click **Add New → Project**, import the repo, keep **Framework Preset: Other**, leave Build Command and Output Directory empty, and click **Deploy**.
4. To redeploy, run `npx vercel --prod` again, or just `git push` if you used GitHub.

## 5. Create a free Google Analytics 4 account

1. Go to <https://analytics.google.com> and sign in with your Google account.
2. Click **Start measuring** and create an account (any name).
3. Create a **property** (e.g. "Valorant Beginner Guide"), choose your time zone and currency.
4. Choose **Web** as the platform, enter your Netlify link as the website URL, and name the stream.
5. Make sure **Enhanced measurement** is switched **on** (see section 9), then create the stream.
6. Copy the **Measurement ID** shown on the stream page. It looks like `G-AB12CD34EF`.

## 6. Paste your Measurement ID

Open `script.js`. Near the top, find:

```js
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; // <-- PASTE YOUR ID HERE
```

Replace `G-XXXXXXXXXX` with your real ID and save. This is the only place to change. While the placeholder is still there, no tracking code is loaded and no events are sent.

## 7. Redeploy the updated website

1. In Netlify, open your site and go to the **Deploys** tab.
2. Drag your updated project folder into the "Drag and drop your site output folder here" area.
3. A new version goes live in a few seconds on the same link.

## 8. Events this site sends

| Event name | When it is sent |
| --- | --- |
| `page_view` | Page opens (automatic from GA4) |
| `nav_click` | A navigation bar link is clicked |
| `start_learning_click` | The "Start Learning" button is clicked |
| `checklist_interaction` | A practice checklist box is ticked/unticked |
| `quiz_complete` | The quiz is submitted (includes `score` and `total_questions`) |
| `external_link_click` | An official/external link in the footer is clicked |

## 9. Enhanced Measurement (automatic scroll and outbound clicks)

In GA4: **Admin → Data collection and modification → Data streams → your web stream → Enhanced measurement** (gear icon). Turn on **Page views, Scrolls, Outbound clicks, Site search, Video engagement, File downloads**. GA4 then automatically records `scroll` (90% scrolled) and `click` (outbound link) events without extra code. These are separate from the custom `external_link_click` event above, so you may see both for a footer link; that is normal.

## 10. Check your results in GA4

Data takes a few minutes to appear in **Realtime** and up to 24-48 hours in standard reports. Open your live site, click around, and then check:

- **Realtime** (Reports → Realtime): current visitors and events as they happen.
- **Visitors**: Reports → Acquisition → User acquisition (the *Users* column).
- **Page views**: Reports → Engagement → Pages and screens (*Views*).
- **Engagement time**: Reports → Engagement → Overview (*Average engagement time*).
- **Events**: Reports → Engagement → Events. Look for `nav_click`, `quiz_complete` etc.
- To see the quiz score or checklist item, register the parameter as a custom dimension (Admin → Custom definitions) or look at the event in **DebugView / Realtime**.

If nothing appears, check that the Measurement ID is correct, that you redeployed, and that an ad blocker is not blocking Google Analytics in your browser.

## Image credits

Agent, map and weapon images are © Riot Games, obtained from the community-run [valorant-api.com](https://valorant-api.com) and used for educational, non-commercial purposes under Riot's Legal Jibber Jabber policy. They were resized for web use and saved locally.
