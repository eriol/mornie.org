# build the site
build: clean
	@npm run build

# remove built site
clean:
	rm -rf dist

# run devel server
serve:
	@npm run dev
