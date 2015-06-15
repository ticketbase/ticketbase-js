# Releasing new versions

**NB:** This is an internal document intended for the Ticketbase development team.

### Preparing a release

 * `vim History.md` - make sure it's up to date
 * `bump package.json Readme.md` - update version numbers ([bump-cli](https://www.npmjs.com/package/bump-cli))
 * `npm test` - ensure tests pass
 * `npm run prepublish` - produce ticketbase.js build
 * `git release v0.2.0` - commit, tag, and push ([git-extras](https://github.com/tj/git-extras))

### Updating the CDN

Check out the `releases` branch into its own path, and follow its setup instructions

    git checkout https://github.com/ticketbase/ticketbase-js.git

    cd ticketbase-js
    cat README.md

Download the new release into that branch:

    make v0.2.0

Commit it:

    git add .
    git commit -m v0.2.0

Deploy it to S3:

    make deploy
