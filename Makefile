browserify := ./node_modules/.bin/browserify
uglifyjs   := ./node_modules/.bin/uglifyjs
files := $(shell find lib -name '*.js')

bfy_opts := -s TB -t brfs -t browserify-versionify

ticketbase.js: ticketbase.dev.js
	cat $< | $(uglifyjs) -m > $@
	@ls -la $@

ticketbase.dev.js: index.js $(files)
	$(browserify) $(bfy_opts) $< > $@

