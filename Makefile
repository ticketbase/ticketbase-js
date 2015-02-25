PORT  ?= 3001
bin   := ./node_modules/.bin
files := $(shell find lib -name '*.js')

bfy_opts := -s TB -t brfs -t browserify-versionify -t babelify

ticketbase.js: ticketbase.dev.js
	cat $< | $(bin)/uglifyjs -m > $@
	@ls -la $@

ticketbase.dev.js: lib/index.js $(files)
	$(bin)/browserify $(bfy_opts) $< > $@

watch:
	$(bin)/watch "make -B" lib test & $(bin)/serve --port $(PORT)

.PHONY: watch
