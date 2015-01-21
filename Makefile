mdextract = ./node_modules/.bin/mdextract
browserify = ./node_modules/.bin/browserify
uglifyjs = ./node_modules/.bin/uglifyjs

all: README.md ticketbase.js

README.md: index.js
	@echo '  update  $@'
	@(sed '/begin api/q' $@; echo; cat index.js | ${mdextract}; echo; sed -n '/end api/,$$p' $@) > $@~
	@mv $@~ $@

ticketbase.js: index.js
	@echo '   build  $@'
	@$(browserify) -s TB $< | $(uglifyjs) -m --comments > $@
