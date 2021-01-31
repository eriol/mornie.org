.PHONY: clean build serve

build: clean
	@zola build

clean:
	rm -rf public

serve:
	@zola serve
