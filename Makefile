# Port number for Web Server
PORT=8001

.PHONY: all

all: index

index: chapter0 chapter1 chapter99
	cat common/index_header.html > index.html
	node js/createINDEX.js chapter0.html >> index.html
	node js/createINDEX.js chapter1.html >> index.html
	node js/createINDEX.js chapter99.html >> index.html
	cat common/index_footer.html >> index.html
	cp js/webserver.js .
	node webserver.js $(PORT) &
	node js/createPDF.js $(PORT) index
	node js/modifyPDF.js $(PORT) index
	curl http://localhost:$(PORT)/abort
	rm -f webserver.js

chapter0: chapter0.md
	node js/createHTML.js chapter0

chapter1: chapter1.md
	node js/createHTML.js chapter1

chapter99: chapter99.md
	node js/createHTML.js chapter99

setup:
	npm -install puppeteer jsdom
	wget https://www.petitmonte.com/pdfdesigner/pdf-designer.zip
	unzip -d tmp pdf-designer.zip
	mv tmp/*.js js
	rm -rf tmp pdf-designer.zip
	wget https://github.com/vivliostyle/vivliostyle.js/releases/download/v2.1.1/vivliostyle-viewer-2.1.1.zip
	unzip -d tmp vivliostyle-viewer-2.1.1.zip
	mv tmp/viewer ./
	rm -rf tmp vivliostyle-viewer-2.1.1.zip

.PHONY: clean

clean:
	rm -f *.html *.pdf
