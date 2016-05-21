all:
	git add --all
	git commit -m "${c}"
	git push origin master
	git push heroku master

file:
	curl http://192.168.1.194:8888/readFile?user=${u}
	curl http://192.168.1.41:8888/readFile?user=${u}

