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
# git commit -m 'Book Create/Index/New'
# git push
# git push heroku master

when restart, file is remove in heroku. so we better find better solution on how to store image or file


UPLOADED FILE

filepond
# npm i filepond
Basic
https://unpkg.com/filepond@4.29.1/dist/filepond.css -> css
https://unpkg.com/filepond@^4/dist/filepond.js
https://unpkg.com/filepond@^4/dist/filepond-plugin-file-encode/filepond-plugin-file-encode.js
Plugins
<script src="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.js"></script> //before dist basic js
<link href="https://unpkg.com/filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css" rel="stylesheet"/> //after basic css

create js to manage filepond. fileUpload.js

and then to use just add class="filepond" on input

stylePanelAspectRatio-> setting size  same with Book Model set on fileUpload.js main filepond

fileencoded form
{
    "id": "b56kpu6u9",
    "name": "encoded-file.png",
    "type": "image/png",
    "size": 123456,
    "metadata": {
        "resize": {
            "mode": "force",
            "size": {
                "width": 200,
                "height": 200
            }
        },
        "crop": {
            "rect": {
                "x": 0.19234,
                "y": 0,
                "width": 1,
                "height": 0.61213
            },
            "aspectRatio": 1
        }
    },
    "data": "iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAA..."
}

Buffer data to view as image object template string in html. data object
data:{data-type};charset=utf-8;base64,{base64filetostring}
data:image/jpeg;charset=utf-8;base64;"iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAA..."

# git add .
# git commit -m "File Upload Database to json"
# git push
# git push heroku master 




EDIT UPDATE DELETE AUTHORS. mongodb course
create method put and delete and get detail on authors route

# npm i method-override -> to let browser know if we send post, we can override with params put or delete
include and use on server.js
app.use(methodOverride('_method'))

dont use get method because google get all of it and can be accidentaly delete when user click that
to use delete and update or put method, need method override

button delete and update is on folder partials cuz can be use everywhere
cuz it can use on authors and book

EDit equal to new method
update equal to create method
delete similar to update method

remember the order of route, cuz it can cause one of route not call

to add view.ejs on layout.ejs
<%- nameofview %>

to includes partial on view. include plus path and name of view.ejs
including function to pass to partial if there is
<%- include('../partials/deleteForm', {url: `authors/${author.id}`}) %>

# git add .
# git commit -m "Finish Author Routes"
# git push
# git push heroku master




EDIT UPDATE DELETE BOOKS
create view in book

Show.ejs in folder view book

if Book.findById(req.params.id) we only get id that pass
when we want to get all of information of that model. use populate to make it object


PUT

DELETE

# git add .
# git commit -m "Finishing Books Route"
# git push
# git push heroku master



STYLING 
transfonter.com -> generate css from font. get that folder fonts here

create folder on public stylesheets/shared/fonts.css

create stylesheets/main.css file

include main.css inside views/layouts/layout.ejs
 <link rel="stylesheet" href="/stylesheets/main.css">


create stylesheets/shared/variable.css -> place to store all css variable that used

create stylesheets/shared/header.css

add class element on partials/header.ejs

#Live server web extension:
no need to refresh2 when using css
open live server web extension install on browser
install Live Server by ritwick dey in Vscode extension

Actual Server Address: http://localhost:3000 //mongodb server addres
Live Server Address: http://127.0.0.1:5500/ //live server
check Go Live in visual code studio to get ip address to entry the live server address