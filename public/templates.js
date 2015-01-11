angular.module("MyApp").run(["$templateCache", function($templateCache) {$templateCache.put("views/views/add.html","<div class=\"container\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">Add TV Show</div>\n    <div class=\"panel-body\">\n      <form class=\"form\" method=\"post\" ng-submit=\"addShow()\" name=\"addForm\">\n        <div class=\"form-group\" ng-class=\"{ \'has-error\' : addForm.showName.$invalid && addForm.showName.$dirty }\">\n          <label class=\"control-label\">Name</label>\n          <input class=\"form-control\" type=\"text\" name=\"showName\" ng-model=\"showName\" placeholder=\"Enter TV show name\" required autofocus>\n          <div class=\"help-block text-danger\" ng-if=\"addForm.showName.$dirty\" ng-messages=\"addForm.showName.$error\">\n            <div ng-message=\"required\">TV show name is required.</div>\n          </div>\n        </div>\n        <button class=\"btn btn-primary\" type=\"submit\" ng-disabled=\"addForm.$invalid\">Add</button>\n      </form>\n    </div>\n  </div>\n</div>");
$templateCache.put("views/views/detail.html","<div class=\"container\">\n  <div class=\"panel panel-default\">\n    <div class=\"panel-body\">\n      <div class=\"media\">\n        <div class=\"pull-left\">\n          <img class=\"media-object img-rounded\" ng-src=\"{{show.poster}}\">\n          <div class=\"text-center\" ng-if=\"currentUser\">\n            <div ng-show=\"!isSubscribed()\">\n              <button ng-click=\"subscribe()\" class=\"btn btn-block btn-success\">\n                <span class=\"ion-plus\"></span> Subscribe\n              </button>\n            </div>\n            <div ng-show=\"isSubscribed()\">\n              <button ng-click=\"unsubscribe()\" class=\"btn btn-block btn-danger\">\n                <span class=\"ion-minus\"></span> Unsubscribe\n              </button>\n            </div>\n          </div>\n          <div class=\"text-center\" ng-show=\"!currentUser\">\n            <a class=\"btn btn-block btn-primary\" href=\"#/login\">Login to Subscribe</a>\n          </div>\n        </div>\n        <div class=\"media-body\">\n          <h2 class=\"media-heading\">\n            {{show.name}}\n            <span class=\"pull-right text-danger\"><span class=\"ion-heart\"></span> {{show.rating}}</span>\n          </h2>\n          <h4 ng-show=\"show.status === \'Continuing\'\">\n            <span class=\"ion-calendar\"></span>\n            {{show.airsDayOfWeek}} <em>{{show.airsTime}}</em> on\n            {{show.network}}\n          </h4>\n          <h4 ng-show=\"show.status === \'Ended\'\">\n            Status: <span class=\"text-danger\">Ended</span>\n          </h4>\n          <p>{{show.overview}}</p>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"alert alert-info\" ng-show=\"nextEpisode\">\n    The next episode starts {{nextEpisode.firstAired | fromNow}}.\n  </div>\n\n  <div class=\"panel panel-default\">\n    <div class=\"panel-heading\">\n      <span class=\"ion-film-marker\"></span> Episodes\n    </div>\n    <div class=\"panel-body\">\n      <div class=\"episode\" ng-repeat=\"episode in show.episodes | orderBy:[\'-season\', \'+episodeNumber\']\">\n        <h4 ng-if=\"episode.episodeNumber < 2\" class=\"panel-heading\">Season {{episode.season}}</h4>\n        <h5>{{episode.episodeNumber}}. {{episode.episodeName}}\n        <small>S{{episode.season}}E{{episode.episodeNumber}}</small>\n        </h5>\n        <p>\n          <span class=\"ion-clock\"></span>\n          {{episode.firstAired | date: \'short\'}}\n          <span ng-repeat=\"torrent in episode.torrents\">\n            <a class=\"btn\" ng-if=\"torrent.quality == \'480p\'\"\n               data-ng-click=\"downloadTorrent(torrent, show)\" title=\"Download 480p torrent\">\n              <i class=\"ion-magnet\"> 480p</i>\n            </a>\n            <a class=\"btn\" ng-if=\"torrent.quality == \'720p\'\"\n               data-ng-click=\"downloadTorrent(torrent)\" title=\"Download 720p torrent\">\n              <i class=\"ion-magnet\"> 720p</i>\n            </a>\n          </span>\n        </p>\n        <p>{{episode.overview}}</p>\n      </div>\n    </div>\n  </div>\n</div>");
$templateCache.put("views/views/home.html","<div class=\"jumbotron\">\n    <div class=\"container\">\n        <ul class=\"alphabet\">\n            <li ng-repeat=\"char in alphabet\">\n                <span ng-click=\"filterByAlphabet(char)\">{{char}}</span>\n            </li>\n        </ul>\n        <ul class=\"genres\">\n            <li ng-repeat=\"genre in genres\">\n                <span ng-click=\"filterByGenre(genre)\">{{genre}}</span>\n            </li>\n        </ul>\n    </div>\n</div>\n\n<div class=\"container\">\n    <div class=\"panel panel-default\">\n        <div class=\"panel-heading\">\n            {{headingTitle}}\n            <div class=\"pull-right\">\n                <input class=\"search\" type=\"text\" ng-model=\"query.name\" placeholder=\"Search...\">\n            </div>\n        </div>\n        <div class=\"panel-body\">\n            <div class=\"row show-list\">\n                <div class=\"fade-repeat col-xs-4 col-md-3\" ng-repeat=\"show in shows | filter:query | orderBy:\'rating\':true\">\n                    <a href=\"/shows/{{show._id}}\">\n                        <img class=\"img-rounded\" ng-src=\"{{show.poster}}\" width=\"100%\"/>\n                    </a>\n                    <div class=\"text-center\">\n                        <a href=\"/shows/{{show._id}}\">{{show.name}}</a>\n                        <p class=\"text-muted\">Episodes: {{show.episodes.length}}</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>");
$templateCache.put("views/views/login.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"center-form panel\">\n        <div class=\"panel-body\">\n          <h2 class=\"text-center\">Log in</h2>\n          <form method=\"post\" ng-submit=\"login()\" name=\"loginForm\">\n            <div class=\"form-group has-feedback\">\n              <input class=\"form-control input-lg\" type=\"text\" name=\"email\" ng-model=\"email\" placeholder=\"Email\" required autofocus>\n              <span class=\"ion-at form-control-feedback\"></span>\n            </div>\n\n            <div class=\"form-group has-feedback\">\n              <input class=\"form-control input-lg\" type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"Password\" required>\n              <span class=\"ion-key form-control-feedback\"></span>\n            </div>\n\n            <button type=\"submit\" ng-disabled=\"loginForm.$invalid\" class=\"btn btn-lg btn-block btn-success\">Log in</button>\n\n            <br/>\n\n            <p class=\"text-center\">\n              <a href=\"#\">Forgot your password?</a>\n            </p>\n\n            <p class=\"text-center text-muted\">\n              <small>Don\'t have an account yet? <a href=\"/signup\">Sign up</a></small>\n            </p>\n\n            <div class=\"signup-or-separator\">\n              <h6 class=\"text\">or</h6>\n              <hr>\n            </div>\n\n            <button class=\"btn btn-lg btn-block btn-facebook\" ng-click=\"facebookLogin()\"><span class=\"ion-social-facebook\"></span>Sign in with Facebook</button>\n            <button class=\"btn btn-lg btn-block btn-google-plus\" ng-click=\"googleLogin()\"><span class=\"ion-social-googleplus\"></span>Sign in with Google</button>\n          </form>\n        </div>\n    </div>\n  </div>\n</div>");
$templateCache.put("views/views/signup.html","<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"center-form panel\">\n      <div class=\"panel-body\">\n        <form method=\"post\" ng-submit=\"signup()\" name=\"signupForm\">\n          <h2 class=\"text-center\">Sign up</h2>\n\n          <div class=\"form-group has-feedback\" ng-class=\"{ \'has-error\' : signupForm.fullName.$invalid && signupForm.fullName.$dirty }\">\n            <input class=\"form-control input-lg\" type=\"text\" name=\"displayName\" ng-model=\"displayName\" placeholder=\"Name\" required>\n            <span class=\"ion-person form-control-feedback\"></span>\n            <div class=\"help-block text-danger\" ng-if=\"signupForm.fullName.$dirty\" ng-messages=\"signupForm.fullName.$error\">\n              <div ng-message=\"required\">You must enter your name.</div>\n            </div>\n          </div>\n\n          <div class=\"form-group has-feedback\" ng-class=\"{ \'has-error\' : signupForm.email.$invalid && signupForm.email.$dirty }\">\n            <input unique-email class=\"form-control input-lg\" type=\"email\" id=\"email\" name=\"email\" ng-model=\"email\" placeholder=\"Email\" required autofocus>\n            <span class=\"ion-at form-control-feedback\"></span>\n            <div class=\"help-block text-danger\" ng-if=\"signupForm.email.$dirty\" ng-messages=\"signupForm.email.$error\">\n              <div ng-message=\"required\">Your email address is required.</div>\n              <div ng-message=\"email\">Your email address is invalid.</div>\n              <div ng-message=\"unique\"><span class=\"ion-looping\"></span> Email is already taken.</div>\n            </div>\n          </div>\n\n          <div class=\"form-group has-feedback\" ng-class=\"{ \'has-error\' : signupForm.password.$invalid && signupForm.password.$dirty }\">\n            <input password-strength class=\"form-control input-lg\" type=\"password\" name=\"password\" ng-model=\"password\" placeholder=\"Password\" required>\n            <span class=\"ion-key form-control-feedback\"></span>\n            <div class=\"help-block text-danger\" ng-if=\"signupForm.password.$dirty\" ng-messages=\"signupForm.password.$error\">\n              <div ng-message=\"required\">Password is required.</div>\n            </div>\n          </div>\n\n          <p class=\"text-center text-muted\"><small>By clicking on Sign up, you agree to <a href=\"#\">terms & conditions</a> and <a href=\"#\">privacy policy</a></small></p>\n\n          <button type=\"submit\" ng-disabled=\"signupForm.$invalid\" class=\"btn btn-lg btn-block btn-primary\">Sign up</button>\n          <br/>\n\n          <p class=\"text-center text-muted\">Already have an account? <a href=\"/login\">Log in now</a></p>\n        </form>\n      </div>\n    </div>\n  </div>\n</div>");}]);