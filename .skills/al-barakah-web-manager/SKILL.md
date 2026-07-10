---
name: al-barakah-web-manager
description: Manage and evolve the Al Barakah corporate website. Use this skill when the user wants to add new services, update the corporate profile, change branding, or add new page sections. It ensures a premium, modern UI following the established design system (Outfit font, Navy/Light Blue color palette, glassmorphism, rounded cards). 
---

# Al Barakah Web Manager

This skill helps maintain the Al Barakah corporate website with a focus on premium UAE industrial branding.

## Design System
- **Colors**:
  - Primary: #0F243E (Official Navy)
  - Accent: #75B4E3 (Official Light Blue)
  - Background: #050C17 (Dark Navy)
  - Text: #FFFFFF (White), #94A3B8 (Dim)
- **Typography**: 'Outfit', sans-serif (Google Fonts)
- **UI Patterns**:
  - Pill-shaped buttons (`.btn-primary`)
  - Glass cards (`.glass-card`, `.premium-card`)
  - Reveal animations (`.reveal-up`)
  - Smooth transitions (cubic-bezier)

## Project Structure
- `index.html`: Homepage with hero video and overview.
- `about.html`: Corporate profile and mission.
- `services.html`: Industrial services overview.
- `support.html`: Project support details.
- `contact.html`: Contact form and locations.
- `style.css`: Central stylesheet.
- `script.js`: Interactive elements (scrolled nav, reveal animations).

## Best Practices
- **Premium Feel**: Always use gradients and glassmorphism for new sections.
- **Interactivity**: Ensure new elements have hover states and reveal animations.
- **Responsiveness**: Test all changes on mobile and desktop layouts.
- **Branding**: Use the official logo (`assets/logo.png` or equivalent) and colors.

## Common Workflows
- **Adding a Service**: Add a new `.premium-card` to `services.html` with an appropriate icon and description.
- **Updating Profile**: Ensure content in `about.html` reflects the current corporate mission.
- **Styling Changes**: Only modify `style.css` using the defined CSS variables.
