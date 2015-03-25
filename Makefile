.PHONY: deploy clean build upload serve 

deploy: build upload

clean:
	rm -rf public

build:
	@hugo

upload:
	rsync -a public/ mornie.org:/srv/www/www.mornie.org/html/

serve:
	@hugo server --watch