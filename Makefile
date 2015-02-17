dir := widgets

deploy:
	s3cmd sync --acl-public --recursive ./${dir} s3://ticketbase-cdn/

version = $(patsubst v%,%,$@)
parts = $(subst ., ,${version})
major = $(word 1,$(parts))
minor = $(word 2,$(parts))
patch = $(word 3,$(parts))

# Download new versions: `make v0.1.0`
v%:
	@mkdir -p ${dir}/v${version}
	@wget http://rawgit.com/ticketbase/ticketbase-js/v${version}/ticketbase.js -O ${dir}/v${version}/ticketbase.js
	@echo ++ ${dir}/v${version}
	@echo ++ ${dir}/v${major}.${minor}
	@mkdir -p ${dir}/v${major}.${minor}
	@cp ${dir}/v${version}/ticketbase.js ${dir}/v${major}.${minor}/ticketbase.js
	@echo ++ ${dir}/v${major}
	@mkdir -p ${dir}/v${major}
	@cp ${dir}/v${version}/ticketbase.js ${dir}/v${major}/ticketbase.js
