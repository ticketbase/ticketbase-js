deploy:
	s3cmd sync --acl-public --recursive --exclude '.git/*' --exclude Makefile ./js s3://ticketbase-cdn/js
