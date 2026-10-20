# October Electrical Services website

A polished, responsive seven-page website concept for October Electrical Services, grounded in the supplied business profile and presented as a demonstration website by Digital Gene. It does not imply that Digital Gene has been officially contracted by or endorsed by October Electrical Services.

## Pages

- `index.html` — Home
- `about.html` — About Us
- `services.html` — Services
- `projects.html` — Our Work
- `why-us.html` — Why Choose Us
- `pricing.html` — Pricing & Enquiries
- `contact.html` — Contact Us

## Local preview

```bash
npm start
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
```

The static output is written to `dist/` and includes every HTML page.

## Form behavior

The enquiry form validates required fields and opens a prefilled email draft addressed to `octoberelectricalservicers@gmail.com`. It does not claim to send a message from the website. For live submissions, replace the `mailto:` behavior in `script.js` with an approved form service or a configured backend endpoint.

## Content and asset notes

- The logo is the supplied official logo and is referenced from project storage.
- The Our Work gallery uses photos extracted from the supplied business profile. Replace the storage paths in the HTML pages if the owner provides higher-resolution originals.
- Pricing is displayed as a reference table from the business profile and is clearly flagged for business verification before launch. Solar pricing is not invented because the profile does not provide a complete figure.
- The contact page intentionally does not include WhatsApp or map directions because the business profile does not confirm the WhatsApp number or a verified map destination.
- No testimonials, additional projects, certifications, licences, insurance claims or unsupported availability statements were added.
