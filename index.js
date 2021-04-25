const app = require('./app/parse');
/**
 * Start App
 */
app.init(process.argv[2], process.env.npm_lifecycle_event);

// npm run gs https://test.com/sitemap_index.xml
// npm run parse
// npm run clean