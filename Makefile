.PHONY: clean build serve

build: clean
	@hugo

clean:
	rm -rf public

serve:
	@hugo server --buildDrafts --buildFuture --watch
