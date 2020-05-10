const { html } = require("./template");
const layout = require("./layout.11ty");

const x = "Wowow";

const y = html`
  <h1>test</h1>
  <section>
    <h2>test 2</h2>
    <h3>${x}</h3>
    <h4>${99 + 11}</h4>
  </section>
`;

module.exports = data => layout(data, y);
