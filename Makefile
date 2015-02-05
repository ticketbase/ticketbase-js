browserify := ./node_modules/.bin/browserify
uglifyjs   := ./node_modules/.bin/uglifyjs
files := $(shell find lib -name '*.js')

bfy_opts := -s TB -t brfs -t browserify-versionify

ticketbase.js: index.js $(files)
	$(browserify) $(bfy_opts) $< | $(uglifyjs) -m > $@
	@ls -la $@
