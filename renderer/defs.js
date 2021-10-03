const origDef = `graph LR; Systemstart-->SomeIcon(<img src='https://iconscout.com/ms-icon-310x310.png' width='40' height='40' />)`;

const sampleImg = "https://iconscout.com/ms-icon-310x310.png";

const plainDef = `
  graph LR
    urlscan --> git
    urlscan --> emelia
    start --> urlscan
    emelia --> airtable
    git --> asana
`;

// const richDev = `
// graph LR
//   user0(fa:fa-play) --> SomeIcon(<img src='../sample-svgs/single1.svg' />)
//   user0(fa:fa-play) --> SomeIconOther(<img src='sample.svg' />)
//   user1(fa:fa-play) --> folder
//   whoa --> folder
//   folder((alskdnaslkdn)) --> qqq
//   qqq --> www
//   www --> folder
// `;

const compactDef = `graph LR;urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />) --> Git(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Git/git.svg' />);urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />) --> Emelia(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg' />);Start(fa:fa-play) --> urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />);Emelia(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg' />) --> Airtable(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg' />);Airtable(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg' />) --> null(null);Git(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Git/git.svg' />) --> Asana(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Asana/asana.svg' />)`;

const readableDef = `
graph LR
	urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />) --> Git(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Git/git.svg' />)
	urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />) --> Emelia(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg' />)
	Start(fa:fa-play) --> urlscan.io(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/UrlScanIo/urlScanIo.svg' />)
	Emelia(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Emelia/emelia.svg' />) --> Airtable(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg' />)
	Airtable(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Airtable/airtable.svg' />) --> null(null)
	Git(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Git/git.svg' />) --> Asana(<img src='/Users/ivov/Development/hackmation-oct2021/node_modules/n8n-nodes-base/dist/nodes/Asana/asana.svg' />)
`;
