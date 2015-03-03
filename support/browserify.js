require('browserify')
  ({ standalone: 'TB' })
  .add('./' + process.argv[2])
  .transform('babelify', { loose: 'all' })
  .transform('stylify', { use: [ require('nib')() ] })
  .transform('brfs')
  .transform('browserify-versionify')
  .bundle()
  .pipe(process.stdout);
