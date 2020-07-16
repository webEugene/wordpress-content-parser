# parserWPData - Wordress data parser

**parserWPData** can parse metadata, content, h1 heading and alt images from content.
And save it to **`storage`** folder in **.csv** format.

### Files

-   `parse.js` - contains code that checks what module to start.

-   `sitemap-urls.json` - here is saving pages from **sitemap.xml**

### Modules

-   `modules/sitemapUrlsParse.js` - module gets **https://test.com/sitemap.xml** link and extract

urls list and save them to `sitemap-urls.json`.

-   `modules/parseData.js` - module go through the loop and get from each link from

`sitemap-urls.json` and parse metadata, content, h1 heading and alt images from content.

After save data to **`storage`** folder.

-   `modules/parseDataTest.js` - the same as `parseData.js`. Using for testing.

## How to use

#### Download from github and run:

`$ npm install`

#### To parse links from **https://test.com/sitemap.xml** run:

`$ npm run gs --xml="https://test.com/sitemap.xml"`

**--xml=""** - gets params as url to sitemap page.

#### Start parsing content use next command:

`$ npm run parse`

When parsing has finished, in the **`storage`** folder you will find **.csv** file with all data.

The name of the file will consist of **_date + domain name + file_** extension.
