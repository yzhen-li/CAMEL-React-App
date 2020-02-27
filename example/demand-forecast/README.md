# How to start the app

## Start the UI
    $ npm install
    $ npm install -g serve (optional in Linux)
    $ npm run build
    $ serve -s build -l 3000

## Start the backend
    $ virtualenv -p python3 .
    $ source bin/activate
    $ pip install -r requirements.txt
    $ FLASK_APP=app.py flask run