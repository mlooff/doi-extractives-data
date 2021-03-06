---
title: "Color Palette: Supporting"
---

<color-directory></color-directory>


*"Accessible” colors can be used in combination with white text or backgrounds, since the contrast ratio between the color and white is at least 4.5:1, the [WCAG 2.0 level AA](https://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast) compliance ratio for color contrast.*

The supporting color palette is composed of lightest and darkest variations of the primary color palette. A broad supporting color palette adds nuance and depth to illustrations, data visualizations, and complex components.

## How colors are used

### Blacks and grays
Cool grays are used widely in the site, predominantly for large background fills.
- `$black`: `h1`, `h3`, and `h4` header text
- `$gray-darkest`: `h5` header text
- `$gray-dark`: the text on disabled buttons
- `$gray`: maps, as rules with custom headline styles on [Revenue pages](https://revenuedata.doi.gov/how-it-works/offshore-oil-gas/)
- `$gray-lighter`: primarily in flowcharts, and as an option for large background containers

### Greens
Green represents land-ownership in maps, and data in charts. It also serves to add a bit of color to the site here and there, and helps make hierarchy more distinct when used as a rule with some headers.
- `$green-dark`: complex bar charts
- `$green-state-hex`: for maps only
- `$green-land`: for maps only
- `$green-mid`: for maps only

### Blues
Blues do not feature heavily in the site design. They're mainly reserved for links, buttons, and the county-level maps on state Explore pages.
- `$blue-dark`: the text color over the `$blue-cthru` background color (on the filter panel for [Federal Revenue by Company](https://revenuedata.doi.gov/how-it-works/federal-revenue-by-company/2017/)), to achieve sufficient color contrast
- `$blue-mid-dark`: for maps only
- `$blue-mid`: for maps only
- `$blue-cthru` is semi-transparent, and used as the background color for filter panel overlays
- `$blue-light`: for maps only
