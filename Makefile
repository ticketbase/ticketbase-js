deploy:
	s3cmd sync --acl-public --delete-removed --recursive --exclude '.git/*' --exclude Makefile ./ s3://ticketbase-cdn/
