# build the site
build: clean
	@zola build

# remove built site
clean:
	rm -rf public

# run devel server with drafts enabled
serve:
	@zola serve --drafts
