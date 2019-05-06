from subprocess import call
import sys

f = "tmp"
num_push = int(sys.argv[1])

for i in range(num_push):
  call(["touch", f+str(i)])
  call(["git", "add", "."])
  call(["git", "commit", "-m", "update"])
  call(["git", "push", "origin", "master"])
  call(["rm", f+str(i)])
