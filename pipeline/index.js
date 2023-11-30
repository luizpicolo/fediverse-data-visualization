import Import from "./import/index.js";
import Filter from "./filter/index.js";

// Primeiro passo do Pipeline
const _import = new Import();
_import.input('./import/input');
_import.output('./import/output');

// Segundo passo do Pipeline
const _filter = new Filter();
_filter.input('./import/output/combined.json')
_filter.removeAttributes = [
  "countryName", "connections", "statuses", "countryCode", "platform", "checked_at", "thumbnail_proxy",
  "open_registration", "description", "banner_url", "monthly_active_users", "thumbnail", "info"
];
_filter.output('./filter/output');