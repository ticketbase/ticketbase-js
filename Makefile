dir := widgets

deploy:
	s3cmd sync --acl-public --recursive ./${dir} s3://ticketbase-cdn/${dir}/
