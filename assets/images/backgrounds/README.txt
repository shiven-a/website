BACKGROUND IMAGE SLOTS
======================
Each page shows a faint background photo at the top (fading out as you scroll,
so your logo watermark takes over lower down). The pages are already wired to
look for the filenames below — just drop matching image files into THIS folder
and they appear automatically. Until a file exists, that page simply shows no
backdrop (nothing breaks).

EXPECTED FILENAMES (put these here):
  home.jpg           -> Home page
  core-values.jpg    -> Core Values page
  global-reach.jpg   -> Global Reach page
  products.jpg       -> Products hub page
  textiles.jpg       -> Textiles division + its product subpages
  agriculture.jpg    -> Agriculture division + its product subpages
  medical.jpg        -> Medical division + its product subpages
  manufacturing.jpg  -> Manufacturing Facilities page
  news.jpg           -> News & Blog page
  contact.jpg        -> Contact page

TIPS
- Landscape, large (1920px+ wide), but compressed for the web.
- They display faintly (about 22% opacity) behind the top of each page, so
  choose photos that still read well when faded.
- Product subpages share their division's image by default (e.g. every Medical
  subpage uses medical.jpg). To give one subpage its own image, open that page's
  .html file and change the data-bg="..." path on the <body> tag to a new
  filename, then add that file here.
- File format can be .jpg, .png, or .gif — just make sure the name in data-bg
  matches exactly (including the extension).
