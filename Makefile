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
	@mkdir -p ${dir}/v${major}.${minor}
	@mkdir -p ${dir}/v${major}
	@mkdir -p ${dir}/v${version}/assets
	@mkdir -p ${dir}/v${major}/assets
	@mkdir -p ${dir}/v${major}.${minor}/assets
	@# ticketbase
	@wget http://rawgit.com/ticketbase/ticketbase-js/v${version}/ticketbase.js -O ${dir}/v${version}/ticketbase.js
	@cp ${dir}/v${version}/ticketbase.js ${dir}/v${major}.${minor}/ticketbase.js
	@cp ${dir}/v${version}/ticketbase.js ${dir}/v${major}/ticketbase.js
	@# petlanthropy
	@wget http://rawgit.com/ticketbase/ticketbase-js/v${version}/petlanthropy.js -O ${dir}/v${version}/petlanthropy.js
	@cp ${dir}/v${version}/petlanthropy.js ${dir}/v${major}.${minor}/petlanthropy.js
	@cp ${dir}/v${version}/petlanthropy.js ${dir}/v${major}/petlanthropy.js
	@# assets
	@wget http://rawgit.com/ticketbase/ticketbase-js/v${version}/assets/powered-by.png -O ${dir}/v${version}/assets/powered-by.png
	@wget http://rawgit.com/ticketbase/ticketbase-js/v${version}/assets/powered-by-pet.png -O ${dir}/v${version}/assets/powered-by-pet.png
	@cp ${dir}/v${version}/assets/* ${dir}/v${major}.${minor}/assets
	@cp ${dir}/v${version}/assets/* ${dir}/v${major}/assets
	@# results
	@echo ✓ ${dir}/v${version}
	@echo ✓ ${dir}/v${major}.${minor}
	@echo ✓ ${dir}/v${major}
