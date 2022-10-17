const faIcons = `
  img, .fa {
    width: 60px;
    height: 60px;
    padding: 6px;
  }
  .edgePath .path {
    stroke: #C6C8D0 !important;
    //stroke: blue !important;
  }

  i.fa {
    font-size: 45px;
  }

  i.fa.fa-code {
    padding: 6px;
    font-size: 38px;
  }

  i::before {
    padding: 7px;
    line-height: 55px;
  }

  i.fa.fa-play > i::before {
    font-size: 25px;
  }

  .fa-play {
    color: #00e000;
  }

  .fa-pen {
    color: #0000FF;
  }

  .fa-at {
    color: #2200DD;
  }

  .fa-calendar {
    color: #00FF00;
  }

  .fa-map-signs {
    color: #408000;
  }

  .fa-code {
    color: #FF9922;
  }

  .fa-clock {
    color: #408000;
  }

  .fa-arrow-right {
    color: #b0b0b0;
  }

  .fa-rss {
    color: #b02020;
  }

  .fa-envelope {
    color: #00bb88;
  }

  .fa-pause-circle {
    color: #804050;
  }

  .fa-table {
    color: #2244FF;
  }

  .fa-terminal {
    color: #886644;
  }

  .fa-code-branch {
    color: #00bbcc;
  }

  .fa-th-large {
    color: #007755;
  }

  .fa-exchange-alt {
    color: #7722CC;
  }

  .fa-cut {
    color: #333377;
  }
`;

const themeCSS = `
  #mermaid svg[id^="m"][width][height][viewBox] {
    min-width: 350px;
    max-width: 600px;
    width: 80%;
    height: auto;
  }

  // temp
  #mermaid .edgeLabel {
    background-color: red;
  }

  .standardNode > rect {
    fill: white !important;
    stroke: #7d838f !important;
    stroke-width: 2px;
    // stroke-dasharray: 5 !important;
    padding: 50px !important;
  }

  .highlight > rect {
    fill: #f9e990 !important;
  }

  div[style*="display: inline-block; white-space: nowrap;"] {
    // fill: blue;
    // margin: 20px;
  }

  img,
  .fa {
    width: 40px;
    height: 40px;
  }

  i.fa {
    font-size: 33px;
  }

  i.fa.fa-code {
    padding: 0px;
    // font-size: 5px;
  }

  i::before {
    padding: 7px;
    line-height: 55px;
  }

  i.fa.fa-play > i::before {
    font-size: 25px;
  }

  ${faIcons}
`;
