browserify := ./node_modules/.bin/browserify
uglifyjs   := ./node_modules/.bin/uglifyjs

ticketbase.js: index.js
	$(browserify) -s TBjs $< | $(uglifyjs) -m > $@
