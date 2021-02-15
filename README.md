# Wordpress Content Parser

**Wordpress Content Parser** is written on **Node.js** and can parse metadata, content, h1 heading using terminal.<br>
After parsing received data is saving to **`storage`** folder. Format of file is **`.csv`**.<br>
The name of the file will consist of **_date + day in unix timastamp + domain name + file_** extension.
Example: **`26.01.2021_1611698146089_test.com.csv`**.<br>

## How to use

#### Download from github and run:

```sh
$ npm install
```
#### To parse links from **https://test.com/sitemap_index.xml/** run in terminal:

`$ npm run gs https://test.com/sitemap_index.xml`

When command will be finished you can find all urls in **`app/sitemap-urls.json`**
And in **`app/criteria`** you will find generated **`.json`** file, 
where will be written all params by default.<br>
Example:
```sh 
"page": {
    "h1": "h1.heading-class",
    "content": [
        "div.content-bl"
    ]
},
```
Where:
**`"page"`** is type of **_page_** <br>
**`"h1"`** is H1 with value class **_h1.heading-class_**<br>
**`"content"`** is content with value class **_"div.content-bl"_**<br>
**`"content"`** can get a list classes of different text's blocks on one page.

```sh 
"content": [
    "div.content-bl-one",
    "div.content-bl-two"
]
```
####See:

| Plugin | GitHub |
| ------ | ------ |
| Cheerio | [https://github.com/cheeriojs/cheerio] |

#### Before parsing data:

Before parsing data, you need in created json file (**`app/criteria/domain_name.json`**) change **CSS** selectors if it needs. 
Parser needs this params to get correct data in HTML document.

#### To start parsing data run in terminal:
```sh
$ npm run parse
```
When parsing will be finished, in the **`storage`** folder you will find **`.csv`** file with all parsed data.
