const fs = require('fs');
const url = require('url');
const axios = require('axios');
const cheerio = require('cheerio');
const sizeOf = require('image-size');
const CleanCss = require('clean-css');
const path = require('path')
var juice = require('juice');
module.exports = async (html, options) => {
  const tags = {
    amp: ['img', 'video'],
  };

  let youtube = false;

  const cheerioOptions = options.cheerioOptions || {
    cwd: options.cheerioOptions.cwd || '',
    round: options.cheerioOptions.round || true,
    normalizeWhitespace: options.cheerioOptions.normalizeWhitespace || false,
    xmlMode: options.cheerioOptions.xmlMode || false,
		decodeEntities: options.cheerioOptions.decodeEntities || false,
	};
	
	const {canonicalHref, gaMeasurementID} = options
	const distRoot = options.distRoot || '/'

	

  const $ = cheerio.load(html, cheerioOptions);

  const round = cheerioOptions.round ? numb => Math.round(numb / 5) * 5 : numb => numb;

  /* Fetch images and CSS */
  const promises = [];
  const responses = {};

  $('img:not([width]):not([height])').each((index, element) => {
    const src = $(element).attr('src');
    // skip if already fetched
    if (responses[src]) {
      return;
    }
    if (src && src.indexOf('//') !== -1) {
      // set a flag
      responses[src] = true;
      const imageUrl = element.attribs.src;
      promises.push(axios.get(imageUrl, { responseType: 'arraybuffer' })
        .then((response) => {
          responses[src] = response;
        }));
    }
  });

  $('link[rel=stylesheet]').each((index, element) => {
    const src = $(element).attr('href');
    if (responses[src]) {
      return;
    }
    try {
      if (src && src.indexOf('//') !== -1) {
        let cssSrc = src;
        if (src.indexOf('//') === 0) {
          cssSrc = `https:${src}`;
        }
        responses[src] = true;
        promises.push(axios.get(cssSrc)
          .then((response) => {
            responses[src] = response;
          }));
      }
    } catch (err) {
      console.dir(err);
    }
  });

  await Promise.all(promises);

  /* html ⚡ */
  $('html').each((index, element) => {
    $(element).attr('amp', '');
  });

  /* head */

  /* main amp library */
  $('head script[src="https://cdn.ampproject.org/v0.js"]').remove();


  /* meta charset */
  $('head meta[charset="utf-8"]').remove();
  $('head meta[charset="UTF-8"]').remove();
  $('head').prepend('<meta charset="utf-8">');

  /* Delete all Scripts and add google analytics */
  $('script').each((index, element) => {
    const src = $(element).attr('src');
    if (src) {
      const trackingId = src.match(/\bUA-\d{4,10}-\d{1,4}\b/);
      if (trackingId) {
        $(element).remove();
        $('head').prepend('<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>');
				// adding custom tag
				$('body').append(`
<amp-analytics type="gtag" data-credentials="include">
<script type="application/json">
{
	"vars" : {
		"gtag_id": "${options.gaMeasurementID || trackingId}",
		"config" : {
			"${options.gaMeasurementID || trackingId}": { "groups": "default" }
		}
	}
}
</script>
</amp-analytics>`)
      }
    }
    const scriptContent = $(element).html();
    const htmlScriptContent = scriptContent.match(/function gtag\(\){dataLayer\.push\(arguments\);}/);
    if (scriptContent && htmlScriptContent) {
      $(element).remove();
		}
		$(element).remove();
		
	});
	$('head').prepend(`
	<script async src="https://cdn.ampproject.org/v0.js"></script>
	<link rel="canonical" href="${canonicalHref}">`
	)

  /* meta viewport */
  if ($('head meta[content="width=device-width,minimum-scale=1,initial-scale=1"]').length === 0) {
    $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1">');
  }

  /* style amp-boilerplate */
  if ($('head style[amp-boilerplate]').length === 0) {
    $('head').append('<style amp-boilerplate="">body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate="">body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>');
  }

  /* body */

  /* img dimensions */
  $('img:not([width]):not([height])').each((index, element) => {
    const src = $(element).attr('src');
    if (!src) {
      return $(element).remove();
    }
    if (src.indexOf('//') === -1) {
			const image = path.join(distRoot, $(element).attr('src').replace(/\//g, path.sep))
			console.log(image)
      if (fs.existsSync(image)) {
        const size = sizeOf(image);
        $(element).attr({
          width: round(size.width),
					height: round(size.height),
					layout: 'responsive'
        });
			}
			else {
				throw Error(`image ${image} does not exist Please add it!`)
			}
    } else if (src.indexOf('//') !== -1) {
      const response = responses[src];
      if (response === true) {
        throw new Error('No image for', src);
      }
      const size = sizeOf(Buffer.from(response.data, 'binary'));
      $(element).attr({
        width: round(size.width),
        height: round(size.height),
      });
    } 
  });

  /* inline styles */
  $('link[rel=stylesheet]').each((index, element) => {
    const src = $(element).attr('href');
    let sourcePath = src;
		let file = '';
    const setFile = (data) => {
			// Added inline local option to remove stuff like import
			// console.log(new CleanCss({ compatibility: 'ie9',   inline: ['none']   }).minify(data))
			const minified = new CleanCss().minify(data).styles;
			// const inlined  = juice(data)
      return `<style amp-custom>${minified}</style>`;
    };

    try {
      if (src.indexOf('//') === -1) {
				sourcePath = path.join(options.cssPath, src)
				
        if (fs.existsSync(sourcePath)) {
					file = setFile(String(fs.readFileSync(sourcePath)));
        }
      } else if (src.indexOf('//') !== -1) {
        const response = responses[src];
        if (response === true) {
          throw new Error('No CSS for', src);
        }
        file = setFile(response.data);
      }
    } catch (err) {
      console.dir(err);
    }
    $(element).replaceWith(file);
  });

  /* youtube */
  $('iframe[src*="http://www.youtube.com"],iframe[src*="https://www.youtube.com"],iframe[src*="http://youtu.be/"],iframe[src*="https://youtu.be/"]').each((index, element) => {
    youtube = true;
    const src = $(element).attr('src');
    const width = $(element).attr('width');
    const height = $(element).attr('height');
    const path = url.parse(src).pathname.split('/');
    const ampYoutube = `
    <amp-youtube
      data-videoid="${path[path.length - 1]}"
      width="${width}"
      height="${height}"
      layout="responsive">
    </amp-youtube>`;
    $(element).replaceWith(ampYoutube);
  });

  if (youtube) {
    $('head').prepend('<script async custom-element="amp-youtube" src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js">');
  }

  /* amp tags */
  $(tags.amp.join(',')).each((index, element) => {
    const ampElement = Object.assign(element, {
      name: `amp-${element.name}`,
    });
    $(element).html($(ampElement).html());
  });

  return $.html();
};