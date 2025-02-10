const head = `
    <meta charset="utf-8" />
    <meta name="viewport" content="width=1024" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <title>impress.js | presentation tool based on the power of CSS3 transforms and transitions in modern browsers | by Bartek Szopka @bartaz</title>

    <meta name="description" content="impress.js is a presentation tool based on the power of CSS3 transforms and transitions in modern browsers and inspired by the idea behind prezi.com." />
    <meta name="author" content="Bartek Szopka" />

    <link href="//fonts.googleapis.com/css?family=Open+Sans:regular,semibold,italic,italicsemibold|PT+Sans:400,700,400italic,700italic|PT+Serif:400,700,400italic,700italic" rel="stylesheet" />
    <link href="css/impress-demo.css" rel="stylesheet" />
    <link href="css/impress-common.css" rel="stylesheet" />

    <link rel="shortcut icon" href="favicon.png" />
    <link rel="apple-touch-icon" href="apple-touch-icon.png" />
    <style>
        img {
            width: 100%;
        }
    </style>
`;

function makeBody(imgDir) {

  return `
    <div id="impress"
        data-transition-duration="1000"
        data-width="1024"
        data-height="768"
        data-max-scale="3"
        data-min-scale="0"
        data-perspective="1000"
        >
        <div id="hv1" class="step slide" data-x="0" data-y="0"
            data-goto-key-list="ArrowUp ArrowDown ArrowRight ArrowLeft PageUp"
            data-goto-next-list="r1 v2 h2 t1 overview"
            >
        <img src="${imgDir}/hv1.png" />
        </div>

        <div id="h2" class="step slide vertical"
            data-x="750" data-y="0"
            data-goto-key-list="ArrowRight ArrowLeft PageUp"
            data-goto-next-list="h3 hv1 overview"
            >
        <img src="${imgDir}/h2.png" />
        </div>

        <div id="h3" class="step slide" data-x="1500" data-y="0"
            data-goto-key-list="ArrowUp ArrowRight ArrowLeft PageUp"
            data-goto-next-list="r3 h4 h2 overview"
            >
        <img src="${imgDir}/h3.png" />
        </div>

        <div id="h4" class="step slide vertical" data-x="2250" data-y="0"
            data-goto-key-list="ArrowRight ArrowLeft PageUp"
            data-goto-next-list="hv1 h3 overview"
            >
        <img src="${imgDir}/h4.png" />
        </div>

        <div id="v2" class="step slide horizontal"
            data-x="0" data-y="750"
            data-goto-key-list="ArrowDown ArrowUp PageUp"
            data-goto-next-list="v3 hv1 overview"
            >
        <img src="${imgDir}/v2.png" />
        </div>

        <div id="v3" class="step slide" data-x="0" data-y="1500"
            data-goto-key-list="ArrowRight ArrowLeft ArrowDown ArrowUp PageUp"
            data-goto-next-list="t3 t3 v4 v2 overview"
            >
        <img src="${imgDir}/v3.png" />
        </div>

        <div id="v4" class="step slide horizontal" data-x="0" data-y="2250"
            data-goto-key-list="ArrowDown ArrowUp PageUp"
            data-goto-next-list="hv1 v3 overview"
            >
        <img src="${imgDir}/v4.png" />
        </div>

        <div id="r1" class="step slide"
            data-x="0" data-y="-1000"
            data-goto-key-list="ArrowUp ArrowDown ArrowRight ArrowLeft PageUp"
            data-goto-next-list="hv1 hv1 r2 r3 overview"
            >
        <img src="${imgDir}/r1.png" />
        </div>

        <div id="r2" class="step slide vertical"
            data-x="750" data-y="-1000"
            data-goto-key-list="ArrowDown ArrowUp PageUp"
            data-goto-next-list="r1 r3 overview"
            >
        <img src="${imgDir}/r2.png" />
        </div>

        <div id="r3" class="step slide"
            data-x="1500" data-y="-1000"
            data-goto-key-list="ArrowLeft ArrowRight ArrowDown ArrowUp PageUp"
            data-goto-next-list="r2 r4 h3 h3 overview"
            >
        <img src="${imgDir}/r3.png" />
        </div>

        <div id="r4" class="step slide vertical"
            data-x="2250" data-y="-1000"
            data-goto-key-list="ArrowRight ArrowLeft PageUp"
            data-goto-next-list="r1 r3 overview"
            >
        <img src="${imgDir}/r4.png" />
        </div>

        <div id="t1" class="step slide"
            data-x="-1000" data-y="0"
            data-goto-key-list="ArrowUp ArrowDown ArrowRight ArrowLeft PageUp"
            data-goto-next-list="t4 t2 hv1 hv1 overview"
            >
        <img src="${imgDir}/t1.png" />
        </div>

        <div id="t2" class="step slide horizontal"
            data-x="-1000" data-y="750"
            data-goto-key-list="ArrowDown ArrowUp PageUp"
            data-goto-next-list="t3 t1 overview"
            >
        <img src="${imgDir}/t2.png" />
        </div>

        <div id="t3" class="step slide"
            data-x="-1000" data-y="1500"
            data-goto-key-list="ArrowLeft ArrowRight ArrowDown ArrowUp PageUp"
            data-goto-next-list="v3 v3 t4 t2 overview"
            >
        <img src="${imgDir}/t3.png" />
        </div>

        <div id="t4" class="step slide horizontal"
            data-x="-1000" data-y="2250"
            data-goto-key-list="ArrowDown ArrowUp PageUp"
            data-goto-next-list="t1 t3 overview"
            >
        <img src="${imgDir}/t4.png" />
        </div>

        <div id="overview" class="step" data-x="3000" data-y="1500" data-z="0" data-scale="10">
        </div>

    </div>

    <div id="impress-toolbar"></div>
    `;
}

// https://stackoverflow.com/questions/13121948/dynamically-add-script-tag-with-src-that-may-include-document-write
const addScript = async src => new Promise((resolve, reject) => {
  const el = document.createElement('script');
  el.src = src;
  el.addEventListener('load', resolve);
  el.addEventListener('error', reject);
  document.body.append(el);
});

async function flexagon(imgDir) {
    document.addEventListener('DOMContentLoaded', async () => {
        const body = makeBody((imgDir));
        document.querySelector('head').insertAdjacentHTML('afterbegin', head);
        document.querySelector('body').insertAdjacentHTML('afterbegin', body);
        await addScript('js/impress.js');
        impress().init();
    });
}
