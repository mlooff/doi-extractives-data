# Land ownership map

Maps on the site are dynamically generated svgs, and appear in various sizes and colors, depending on their application. They are critically important, because they show the geographic source of the numbers: our lands and waters.

**US maps** always include offshore regions and Alaska. Larger versions are interactive, with clickable states and regions, and include ownership [choropleths](https://en.wikipedia.org/wiki/Choropleth_map).

 **State and offshore-region maps** include county-level detail (or subregions, for offshore maps). They are included as choropleths in the production, revenue, and wage and salary subsections of the Explore state pages, where they are interactively linked to their adjacent data tables. These maps can be found on the explore state data pages.

 **Icon-sized** maps accompany the side navigation in Explore data, and highlight the state or region being viewed. They also function as buttons that link back to the Explore data landing page.

For more information on how we build the maps, see the [Maps
README](https://github.com/ONRR/doi-extractives-data/blob/dev/maps/README.md).


## How to use


### State maps

Specify the `state_id` variable as the two-letter state abbreviation e.g. `AK`
for Alaska. Include the `location/section-ownership.html` template.
