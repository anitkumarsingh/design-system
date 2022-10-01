const fs = require('fs');
const path = require('path');
const sass = require('node-sass');

/*
 const result = sass.renderSync({
  data:fs.readFileSync(path.resolve('src/global.scss')).toString(),
  outputStyle:'expanded',
  outFile:'global.css',
  includePaths:[path.resolve('src')]
});

*/

const compileToCss = (paths,filename) =>{
  const result = sass.renderSync({
    data:fs.readFileSync(path.resolve(paths)).toString(),
    outputStyle:'expanded',
    outFile:'global.css',
    includePaths:[path.resolve('src')]
  })
  fs.writeFileSync(path.resolve(filename),result.css.toString());
}
compileToCss('src/global.scss','src/lib/global.css');