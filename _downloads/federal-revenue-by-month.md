---
title: Revenue by Month | Documentation
layout: content
permalink: /downloads/federal-revenue-by-month/
title_display: 'Revenue by Month'
nav_items:
  - name: introduction
    title: Top
  - name: scope
    title: Scope
    subnav_items:
      - name: why-are-some-values-negative
        title: Negative values
      - name: why-is-there-a-gas-value-an-oil-value-and-an-oil--gas-value
        title: Oil and gas values
  - name: data-dictionary
    title: Data dictionary
    subnav_items:
      - name: fields-and-definitions
        title: Fields and definitions
  - name: commodities-and-products
    title: Commodities and products
  - name: contact-us
    title: Contact us
selector: list
breadcrumb:
  - title: Downloads
    permalink: /downloads/
description: We offer revenue by month for January 2008 through the most recently completed month of the current year. The data includes federal offshore and onshore revenue, along with revenue from Native American lands. The data is further broken down by revenue type (e.g., bonuses, rents, and royalties) and commodity.
tag:
- Data
- Downloads
- Documentation
- Federal
- Revenue
- Location
- By location
---

{% include revenue-nav.html %}

> {{ page.description }}

Download revenue by month:

<ul class="downloads-download_links list-unstyled">
  <li><a href="{{ site.baseurl }}/downloads/monthly_revenue_10-2018.xlsx">{% include svg/icon-download.svg %} Revenue by month, 1/2008–10/2018 (xlsx, 216 KB)
  </a></li>
</ul>
<!--<p class="u-margin-top" markdown="1">We also have [notes on this data](https://github.com/onrr/doi-extractives-data/wiki/Data-Catalog#federal-revenue) from the web development team as they built the interactions on this site.</p>-->

## Scope

This dataset includes revenues paid by companies to extract natural resources on U.S. federal lands and waters. It also includes revenues generated on Native American tribal and individual lands. It does not include privately owned lands or state lands. The dataset includes data tracked and managed by the Department of the Interior’s Office of Natural Resources Revenue. The data is presented by month, from January 2008 through the most recently completed month (we update the data every month). A given month's data is represented by the 1st day of the month (e.g., 10/1/2018 represents data for the month of October 2018).

### Why are some values negative?

Companies can adjust and correct their payments for up to seven years after a transaction takes place. If a company overpays their royalty, rent, or bonus, they are entitled to recover their overpayment. If the overpayment and recovered payment happen in different years, the recovered payment will appear as a negative amount in the data.

### Why is there a Gas value, an Oil value and an Oil & Gas value?

“Oil & Gas” is the commodity category used for offshore oil and gas rents and bonuses. At the time of lease sale, it isn’t known whether a lease will produce oil, gas or both oil and gas. After a lease starts producing a commodity (or commodities), the lease owner starts paying royalties. These can then be associated with either oil or gas. Hence, rent and bonus lines of data will be associated with an “Oil & Gas” commodity type, while royalty lines of data will be associated with either “Oil” or “Gas” commodity types.

## Data dictionary

### Fields and definitions

_Date_ The first day of the month represents the data for that entire month. For example, 1/1/2008 represents the data for the month of January 2008.

_Land Class_ This field distinguishes federal lands and waters from Native American lands. The latter is represented as "Indian" in the data.

_Land Category_ This field distinguishes between onshore and offshore revenue. Some revenues – such as civil penalties – are not tied to either onshore or offshore.

_Revenue Type_ Revenues from U.S. natural resources fall into one of several types:

* _Royalties_ A natural resource lease holder pays royalties after the lease starts producing a commodity in {{"paying quantities" | term_end }}. The amount is based on a percentage of the revenue from the commodity sold. The exact percentage is set in the original lease document that went along with the lease sale.
* _Bonus_ The amount paid by the highest successful bidder for a natural resource lease. The winning bid.
* _Rents_ A natural resource lease might not produce anything in paying quantities for some time after it is sold. Until it does, periodic payments are made for the right to continue exploration and development of the land for future natural resource production. These payments are called rent.
* _Civil Penalties_ {{ "ONRR" | term }} issues civil penalties when companies fail to comply with, or knowingly or willfully violate, regulations or laws
* _Inspection Fees_ The Department of the Interior inspects offshore oil and gas drilling rigs at least once a year. Inspection fees help recover some of the costs associated with these inspections.
* _Other Revenues_ This category includes revenues that are not included in the royalty, rent, or bonus categories, such as minimum royalties, estimated royalties, settlement agreements, and interest.

_Commodity_ The Department of the Interior collects revenue on over 60 different products. The majority of revenue come from Oil & Gas, Coal, and Renewables (Geothermal and Wind), but you will find many other product categories in these datasets.

_Revenue_ Total revenue

## Commodities and products

Commodities can be further broken down into products. These are the products that could fall into the commodity categories found in these datasets.

_Coal_ Coal (ton), Coal-Bituminous-Raw (ton).

_Gas_ Coal Bed Methane (mcf), Flash Gas (mcf), Fuel Gas (mcf), Gas Hydrate (mcf), Gas Lost - Flared or Vented (mcf), Nitrogen (mcf), Processed (Residue) Gas (mcf), Unprocessed (Wet) Gas (mcf), NGL (Gas Plant Products).

_Oil_ Asphaltic Crude (bbl), Black Wax Crude (bbl), Condensate (bbl), Drip or Scrubber Condensate (bbl),  Drip or Scrubber Condensate (bbl), Fuel Oil (bbl), Inlet Scrubber (bbl), Oil (bbl), Oil Lost (bbl), Other Liquid Hydrocarbons (bbl), Sour Crude (bbl), Sweet Crude (bbl), Yellow Wax Crude (bbl).

_Geothermal_ Geothermal - Direct Utilization, Hundreds of Gallons (cgal), Geothermal - Direct Utilization, Millions of BTUs (mmbtu), Geothermal - Electrical Generation, Kilowatt Hours (kwh), Geothermal - Electrical Generation, Thousands of Pounds (klb), Geothermal - sulfur (lton).

_Wind_ Wind.

_Other Commodities_ Anhydrous Sodium Sulfate (ton), Borax-Decahydrate (ton), Borax-Pentahydrate (ton), Boric Acid (ton), Carbon Dioxide Gas (CO2) (mcf), Cinders (ton), Clay (ton), Copper Concentrate (ton), Gilsonite (ton), Gold (ton), Gypsum (ton), Helium (bbl), Langbeinite (ton), Lead Concentrate (ton), Leonardite (ton), Limestone (ton), Magnesium Chloride Brine (ton), Manure Salts (ton), Muriate Of Potash-Granular (ton), Muriate Of Potash-Standard (ton), Other (ton), Phosphate Raw Ore (ton), Potash (ton), Purge Liquor (ton), Quartz Crystal (lb), Salt (ton), Sand/Gravel (ton), Sand/Gravel-Cubic Yards (cyd), Silver (oz), Soda Ash (ton), Sodium Bi-Carbonate (ton), Sodium Bisulfite (ton), Sodium Sesquicarbonate (ton), Sulfide (ton), Sulfur (lton), Sylvite-Raw Ore (ton), Trona Ore (ton), Zinc Concentrate (ton).

## Contact us

{% include contact.html %}
