deploy:
	git add .
	git commit -m "${commit}"
	git push origin master
	git push heroku master
