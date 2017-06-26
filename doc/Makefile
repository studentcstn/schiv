.PHONY: paper

paper:
	mkdir -p pdf
	pandoc \
		--toc \
		--smart \
		--filter pandoc-crossref \
		--csl tex/acm.csl \
		--number-sections \
		-H tex/header.tex \
		-B tex/title.tex \
		-N \
		-V lang=de-DE \
		--highlight-style tango \
		-o pdf/paper.tex \
		*.md
	cd pdf && latexmk -pdf paper.tex
