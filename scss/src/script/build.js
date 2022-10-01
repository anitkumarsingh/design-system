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

const getAllComponents = () => {
	let allComponents = [];
	const types = ['atoms', 'molecules', 'organisms'];
	types.forEach((type) => {
		const allFiles = fs.readdirSync(`src/${type}`).map(file => ({
      input:`src/${type}/${file}`,
      output:`src/lib/${file.slice(0,-4)+'css'}` // remove .scss and add css extension
    }));

		allComponents = [...allComponents, ...allFiles];
	});

	return allComponents;
};

const compileToCss = (paths, filename) => {
	const result = sass.renderSync({
		data: fs.readFileSync(path.resolve(paths)).toString(),
		outputStyle: 'expanded',
		outFile: 'global.css',
		includePaths: [path.resolve('src')]
	});
	fs.writeFileSync(path.resolve(filename), result.css.toString());
};
compileToCss('src/global.scss', 'src/lib/global.css');

getAllComponents().forEach(component=>compileToCss(component.input,component.output));
