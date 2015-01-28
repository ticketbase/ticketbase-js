browserify := ./node_modules/.bin/browserify
uglifyjs   := ./node_modules/.bin/uglifyjs
files := $(shell find lib -name '*.js')

ticketbase.js: index.js $(files)
	$(browserify) -s TBjs $< | $(uglifyjs) -m > $@
