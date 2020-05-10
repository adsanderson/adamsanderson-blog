const { html } = require("./template");

module.exports = (data, content) => html`
  <!DOCTYPE html>
  <html lang="en-GB">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>
        ${data.metadata.title}
      </title>
      <script
        async
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      ></script>
    </head>

    <body>
      <main>
        ${content}${console.log("hit")}b
      </main>
    </body>
  </html>
`;
