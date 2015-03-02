PORT  ?= 3001
bin   := ./node_modules/.bin
files := $(shell find lib -name '*.js')

bfy_opts := --standalone TB -t [ babelify --loose all ] -t brfs -t browserify-versionify -t browserify-swap
uglify_opts := --compress warnings=false --mangle

all: ticketbase.js petlanthropy.js

ticketbase.js: ticketbase.dev.js
	$(bin)/uglifyjs $< $(uglify_opts) --define PETLANTHROPY=false -o $@
	@ls -la $@

petlanthropy.js: ticketbase.dev.js
	$(bin)/uglifyjs $< $(uglify_opts) --define PETLANTHROPY=true -o $@
	@ls -la $@

ticketbase.dev.js: lib/index.js $(files)
	$(bin)/browserify $(bfy_opts) $< -o $@

watch:
	$(bin)/watch "make -B" lib test & $(bin)/serve --port $(PORT)

.PHONY: watch
