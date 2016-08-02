.PHONY: deploy clean build upload serve 

deploy: build upload

clean:
	rm -rf public

build: clean
	@hugo

upload:
	rsync -a public/ mornie.org:/srv/www/mornie.org/html/

serve:
	@hugo server --buildDrafts --buildFuture --watch
