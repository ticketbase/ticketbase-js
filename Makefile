PORT  ?= 3001
bin   := ./node_modules/.bin
files := $(shell find lib -name '*.js')

uglify_opts := \
	--compress warnings=false \
	--mangle

all: ticketbase.js petlanthropy.js

ticketbase.js: ticketbase.dev.js
	$(bin)/uglifyjs $< $(uglify_opts) --define MODE=null -o $@
	@ls -la $@

petlanthropy.js: ticketbase.dev.js
	$(bin)/uglifyjs $< $(uglify_opts) --define MODE='"pet"' -o $@
	@ls -la $@

ticketbase.dev.js: lib/index.js $(files)
	node ./support/browserify.js $< > $@

watch:
	$(bin)/watch "make -B" lib test & $(bin)/serve --port $(PORT)

.PHONY: watch
