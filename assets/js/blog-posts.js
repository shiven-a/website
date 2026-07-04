/* ============================================================================
   BLOG POSTS  —  THIS IS THE ONLY FILE YOU EDIT TO ADD NEWS / BLOG POSTS
   ----------------------------------------------------------------------------
   HOW TO ADD A NEW POST (no coding knowledge needed):
     1. Copy one whole block — everything from "{" to "}," including the comma.
     2. Paste it directly below as a new block (newest posts go at the TOP).
     3. Change the text inside the quotation marks.
     4. Save the file. The website updates automatically. Done!

   FIELD GUIDE:
     id       : a short unique tag, lowercase-with-dashes (used in the web link)
     title    : the headline
     date     : the date, written exactly like "2026-06-01" (Year-Month-Day)
     category : a short label, e.g. "Company News", "Textiles", "Events"
     image    : path to a photo (put photos in /assets/images/). Leave "" for none.
     excerpt  : 1–2 sentence summary shown in the list
     body     : the full article. Separate paragraphs by leaving a blank line,
                i.e. press Enter twice between paragraphs (use \n\n as shown).

   ⚠ Keep the quotation marks "" and the commas exactly where they are.
   ============================================================================ */

const BLOG_POSTS = [

  {
    id: "global-expansion-2026",
    title: "Meridian opens new regional office in Singapore",
    date: "2026-06-01",
    category: "Company News",
    image: "",   // <!-- ADD PHOTO: e.g. "assets/images/news/singapore-office.jpg" (16:9 works best) -->
    excerpt: "Our new Singapore hub strengthens supply and support for partners across the Asia-Pacific region.",
    body:
`Write your full article here. This is the first paragraph — replace it with your own news.

This is a second paragraph. Leave one blank line between paragraphs and they will format correctly on the website.

You can write as many paragraphs as you like. When you are finished, just keep the closing quotation mark and the lines below exactly as they are.`
  },

  {
    id: "textile-collection-launch",
    title: "Spring furnishing-fabric collection now available",
    date: "2026-05-12",
    category: "Textiles",
    image: "",   // <!-- ADD PHOTO: product/collection image -->
    excerpt: "A new range of upholstery and drapery fabrics designed for contract and residential interiors.",
    body:
`Replace this with the announcement details.

Add specifications, availability, and ordering information in further paragraphs.`
  },

  {
    id: "machinery-trade-show",
    title: "Showcasing automated harvesters at AgriExpo",
    date: "2026-04-20",
    category: "Events",
    image: "",   // <!-- ADD PHOTO: event / machinery photo -->
    excerpt: "Visit our stand to see live demonstrations of our latest automated agriculture machinery.",
    body:
`Replace this with event details: dates, stand number, and what visitors will see.

Add a closing call-to-action, e.g. inviting readers to book a meeting.`
  },

];

/* Do not edit below */
if (typeof module !== "undefined") module.exports = BLOG_POSTS;
