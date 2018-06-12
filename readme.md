![Coffeehub Main Screen](/screenshot.png)

# Coffeehub
An app for people to share and review their favourite coffee/tea spots.

## Motivation
This has been my most ambitious deep dive into backend JavaScript. I wanted to gain an understanding of how to write a basic full stack application combining a server, a database, along with a consisten design. Along the way, I also learned about and implemented RESTFUL routing principles, and used Passport for my authentication. There are many apps like this one already created, but any contribution is always welcome!

## Installation
1. Run `npm install`
2. Make sure that you have MongoDB installed and configured on your system
3. Set up a geocoding api key in [Google's Developer Console](https://developers.google.com/maps/documentation/geocoding/get-api-key)
    and store it in an environment variable with name GEOCODER_API_KEY.
4. Run `node app.js` from project's root directory.

## Usage
Run `gulp` to minify public .js file and compile SASS(SCSS).

## Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Deployment
A version of this project is [deployed to heroku](https://coffeehub-73927.herokuapp.com/). 
To deploy your own version, [mLab](https://mlab.com/) offers MongoDB database hosting that can be used instead of a local db. 
Be sure to set process.env.DATABASEURL to your online db before deploying. 

## Built With
* Node          (Server)
* Express       (Web Framework)
* MongoDB       (Database)
* Mongoose      (Object Modeling)
* Passport      (Authentication)
* SCSS          (CSS Preprocessor)
* Gulp          (Task Runner)
* Connect Flash (Flash Messages)
* Body Parser   (HTTP body request parsing for Node)

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
MIT © [Ilya Meerovich](http://www.ilyameerovich.com)
