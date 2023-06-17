const express = require('express');
const fs = require('fs');
const { execSync } = require('child_process');
const app = new express();
const PORT = 3000;

const fetchWebsite = (url) => {
  execSync(`wget -q -O - ${url} > site.html`,
    (error, stdout, stderr) => {
      if (error !== null) {
        return false;
      }
  });
}

app.get('/', async (req, res) => {
  fs.writeFileSync('site.html', '', () => console.log('Created site.html'));
  fs.createReadStream('site.html').pipe(res);
  fetchWebsite('https://dommycraft.my.canva.site');
});

app.listen(PORT, () => {console.log("Listening at port: ", PORT)} )
