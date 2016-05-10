all:
	git add .
	git commit -m "${c}"
	git push origin master
	git push heroku master
