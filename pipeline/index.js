import Import from "./import/index.js";
import Filter from "./filter/index.js";
import Map from "./map/index.js";
import open from 'open';
import _render from './render/index.js';

// Primeiro passo do Pipeline
const _import = new Import();
_import.input('./import/input');
_import.output('./import/output');

// Segundo passo do Pipeline
const _filter = new Filter();
_filter.input('./import/output/combined.json')
_filter.removeAttributes = [
  "connections", "statuses", "countryCode", "platform", "checked_at", "thumbnail_proxy",
  "open_registration", "description", "banner_url", "monthly_active_users", "thumbnail", "info", "https_score", "admin", "fileName", "location", "country", "url", "version", "last_seen_at", "first_seen_at", "peer_count", "discovered_at\r", "state", "dead", "note_count", "monthly_active_users", "added_at", "updated_at", "uptime", "up", "dead", "ipv6", "https_rank", "obs_score", "obs_rank", "open_registrations", "active_users", "email", "id", "software", "discovered_at", "countryName"
];
_filter.output('./filter/output');

// Terceiro passo do Pipeline
const _map = new Map();
_map.input('./filter/output/filtered.json')
_map.mapAttributes = [
  ["name", "users"],
  ["hostname", "user_count"],
  ["name", "usersTotal"],
  ["domain", "stats"]
]
_map.output('./map/output', 'BubbleChart');

// Passo Final
_render.input('../../map/output/');
_render.listen(3000, () => open('http://localhost:3000/'));
