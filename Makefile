PORT  ?= 3001
bin   := ./node_modules/.bin
files := $(shell find lib -name '*.js')

bfy_opts := \
	-t [ babelify --loose all ] \
	-t [ stylify --use nib ] \
	-t brfs \
	-t browserify-versionify \
	--standalone TB

uglify_opts := \
	--compress warnings=false \
	--mangle

all: ticketbase.js petlanthropy.js

ticketbase.js: ticketbase.dev.js
	@$(bin)/uglifyjs $< $(uglify_opts) --define MODE=null -o $@
	@ls -la $@

petlanthropy.js: ticketbase.dev.js
	@$(bin)/uglifyjs $< $(uglify_opts) --define MODE='"pet"' -o $@
	@ls -la $@

ticketbase.dev.js: lib/index.js $(files)
	@$(bin)/browserifyinc -v $(bfy_opts) $< -o $@

watch:
	$(bin)/watch "make -B" lib test & $(bin)/serve --port $(PORT)

.PHONY: watch
