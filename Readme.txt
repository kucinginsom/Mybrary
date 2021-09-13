My Library
first things first

# npm init -y -> create default value json with directory
# npm i express ejs express-ejs-layouts -> install basic dependency express with ejs and express ejs layouts
# npm i --save-dev nodemon -> install nodemon with save dev environment
# create file server.js
# edit package.json, change server.js to nodemon in script section
# create folder public
# create folder views
	# create folder layouts
		# create file layout.ejs -> <%- body %> means get all code from everything inside parent views folder including index.ejs
	# create file index.ejs (inside views parent, default)

# create folder routes
# create folder models

DATABASES
#install mongodb community, set as server
# npm i mongoose -> integrated with mongodb

# npm i --save-dev dotenv -> for dev environment. set .env to set variabel global

GIT
initialize project with git
# git init -> intiialize
# create file .gitignore -> all file that not include in git
# git add . -> add all folder above and below
# git commit -m "Initial Setup" -> commit to git with comment initial setup


then go to github.com
create repository new. Mybrary
not add readme or gitignore cuz already created.
after created repository

choose
…or push an existing repository from the command line
# git remote add origin https://github.com/kucinginsom/Mybrary.git
# git push -u origin main -> not workin
# git push origin master --force -> working but authentication first, allow vcode acces git



HOSTING
# go to heroku. sign up
# go to this link. https://dashboard.heroku.com/new-app
# download or install heroku cli -> so that can run to vscode
# npm install -g heroku -> if fail uninstall cli heroku first, then install
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -> bypass unsigned cli heroku
# heroku login -> this will redirect to open new page and login to heroku (new rule)
# heroku git:remote -a mybrary-kucinginsom -> remote app on heroku on git
since already commit and add, continue to push to heroku
# git push heroku master -> push to heroku. building server on heroku
# klik open-app on heroku dashboard web

# but heroku not have databse online. then go to mongodb atlas to create database for mongodb
# got to ATLAS MONGODB

#7
go to settings
and klik config Vars
change vars url_database to mongodb online ATLAS that created
DATABASE_URL : mongodb+srv://user:mmBxWd1bzlD0ORkb@cluster0.keu1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

# go to 8 below


ATLAS MONGODB
create account on mongodb atlas online
# https://www.mongodb.com/try

# go to database depoyment. build database
choose shared database cuz free.
default setting. choose server neares, this case is singapore
# ap-southeast-1 (aws)
after finish clustering. click connect 
# choose connect
# set username: user
# set password(auto generate) : mmBxWd1bzlD0ORkb
# create user(Done)

# choose connection method
# chose connect your application
# choose node
# copy the url, change <password> to actual password that genereated
// remarksmongodb+srv://user:<password>@cluster0.keu1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongodb+srv://user:mmBxWd1bzlD0ORkb@cluster0.keu1f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

#7 GO BACK TO HEROKU.DASHBOARD.COM 

#8
# create file authors.js inside routes folder -> for controller or route that specify ti authors view
# create folder authors inside views folder -> create index.ejs and new.ejs for view

Create Header
# create folder partials -> use for headers and footers
# create file header.ejs inside partials
# include the header.ejs to layout.ejs file
# <%- include('../partials/header.ejs') %> -> include header inside partials

Models
# create file author.js in models folder
# connect author.js to mongoose.
# crete schema -> table in mongodb. type json

# npm i body-parser -> lib to access different input element to server
is deprecated. now just use express.urlencoded built in express
# app.use(express.urlencoded({ extended: true }));
# app.use(express.json());

# Initialize Author Routes
# git add .
# git commit -m "Initial Author Routes"
# git push

HEROKU
# git push heroku master

push done. but error because heroku ip is not whitelist on mongodb online
go to Cluser0
click Connect
Click Add a Different IP Addres
entery : 0.0.0.0/0 -> thats mean whitelist all ip addres there is because no security need in this app

go to heroku once again
click More
and Restart all dynos -> restart server when there is  change on mongodb online
entry new authors

Click Collection to see authors collection that created on mongodb atlas online



/* ====================== BOOKS Section ===============*/
create books.js
install npm to create cover book image

# npm i multer -> for file cover image. can work with multipart form
remember enctype="multipart/form-data"

# modify gitignore
inside upload folder

# git add .
# git commit -m 'Book Section'



