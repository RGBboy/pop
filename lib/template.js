const template = (content) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Pop!</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="stylesheet" href="/style.css">
  </head>
  <body>
    <div id="mount">
${content}
    </div>
    <script src="/index.min.js"></script>
    <script>
      Elm.Main.embed(
        document.getElementById('mount')
      );
    </script>
  </body>
</html>
`;

exports = module.exports = template;
