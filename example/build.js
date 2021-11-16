const fs = require( 'fs' );
const MagicString = require( '../' );

process.chdir( __dirname );

fs.readFile( 'app.source.js', ( err, result ) => {
	let source;
	let magicString;
	const pattern = /foo/g;
	let match;
	let transpiled;
	let map;

	if ( err ) throw err;

	source = result.toString();
	magicString = new MagicString( result.toString() );

	while ( match = pattern.exec( source ) ) {
		magicString.overwrite( match.index, match.index + 3, 'answer' );
	}

	magicString.appendRight(10,'456');
	// magicString.appendLeft(10,'456');

	console.log(Reflect.ownKeys(magicString));
	console.log(magicString.intro);

	transpiled = magicString.toString() + '\n//# sourceMappingURL=app.js.map';
	map = magicString.generateMap({
		file: 'app.js.map',
		source: 'app.source.js',
		includeContent: true,
		hires: true
	});

	fs.writeFileSync( 'app.js', transpiled );
	fs.writeFileSync( 'app.js.map', map.toString() );

	fs.writeFileSync( 'app.inlinemap.js', transpiled + '\n//#sourceMappingURL=' + map.toUrl() );
});
