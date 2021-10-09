const faIcons = `
  img, .fa {
    width: 60px;
    height: 60px;
  }

  i.fa {
    font-size: 45px;
  }

  i.fa.fa-code {
    padding: 0px;
    font-size: 36px;
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
  // temp
  #mermaid .edgeLabel {
    background-color: red;
  }

  .standardNode > rect {
    fill: white !important;
    stroke: black !important;
    stroke-dasharray: 5 !important;
  }

  .highlight > rect {
    fill: yellow !important;
  }

  img,
  .fa {
    width: 60px;
    height: 60px;
  }

  i.fa {
    font-size: 45px;
  }

  i.fa.fa-code {
    padding: 0px;
    font-size: 36px;
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
