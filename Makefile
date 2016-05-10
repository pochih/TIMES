all:
	git add --all
	git commit -m "${c}"
	git push origin master
	git push heroku master
