/* ============================================================================
   CERTIFICATIONS-DATA.JS  —  THIS IS THE ONLY FILE YOU EDIT TO ADD/REMOVE
   CERTIFICATIONS shown in the auto-scrolling carousel on the Manufacturing
   Facilities page.
   ----------------------------------------------------------------------------
   HOW TO ADD ONE:
     1. Put the certificate photo/scan in /assets/images/certifications/.
     2. Copy one whole block below, paste it as a new one, edit the text.
     3. Save. The carousel updates automatically (works with any number of
        certificates — it will auto-advance through all of them).

   FIELD GUIDE:
     name  : the certification name shown under the image
     image : path to the photo/scan. Leave "" for a placeholder box.
   ============================================================================ */

const CERTIFICATIONS = [
  { name: "[ADD: Certification name, e.g. ISO 9001:2015]", image: "" },
  { name: "[ADD: Certification name, e.g. ISO 13485]",     image: "" },
  { name: "[ADD: Certification name, e.g. CE Marking]",    image: "" },
  { name: "[ADD: Certification name]",                     image: "" },
];

if (typeof module !== "undefined") module.exports = CERTIFICATIONS;
