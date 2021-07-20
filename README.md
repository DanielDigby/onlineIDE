# onlineIDE

# to build run:

docker compose build
docker compose up

# If performance is slow for backend temp fix is to run:

cd backend
docker build . -t ddigby/online-ide
docker run --name online-ide-server -p 8080:8080 -v "//var/run/docker.sock:/var/run/docker.sock" -d ddigby/online-ide

# frontend

http://localhost:3000

# API routes

# create

returns containerId

http://localhost:8080/create/


JSON body (example hangman program):
{
   "user": "daniel",
   "language": "python",
   "script": "import random\na=['computer','program','random', 'hello', 'decrypt', 'encrypt', 'string', 'loop', 'programming', 'digimaker']\nword=random.choice(a)\nguesses = ''\nturns = 10\nfailed = 0\nwhile turns > 0: \n  for char in word:\n    if char in guesses:               \n      print (char,end=' ')        \n    else:           \n      print ('_', end=' ')                \n      failed = 1    \n  print(' ')\n  if failed == 0:        \n    print ('You won!')\n    break\n  \n  guess = input('guess a character:') \n  guesses += guess\n  if guess not in word:  \n    turns -= 1\n    \nif failed == 1:\n  print(word)\nelse:\n  print(10-turns)"
}

# run

ws://localhost:8080/run/:containerId

