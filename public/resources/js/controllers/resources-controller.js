/*
 * Resources Controller
 *
 * This controller is responsible for fetching all the data for the resources page,
 * from Firebase.
 */
angularIO.controller('ResourcesCtrl', ['$firebaseArray', '$firebaseObject', function ($firebaseArray, $firebaseObject) {
  var categoryRef = new Firebase("https://angularresources.firebaseio.com/");
  var vm = this;

  vm.fbObject = {
    "community": [{
      "groups": {
        "icon": "",
        "resources": [{
          "rev": true,
          "title": "Angular Beers",
          "url": "http://www.meetup.com/AngularJS-Beers/"
        }, {"rev": true, "title": "Angular Camp", "url": "http://angularcamp.org/"}],
        "title": "Groups"
      },
      "podcasts": {
        "icon": "",
        "resources": [{
          "desc": "Weekly video podcast hosted by Jeff Whelpley with all the latest and greatest happenings in the wild world of Angular.",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "AngularAir",
          "url": "https://angularair.com/"
        }, {
          "desc": "",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "Javascript Air",
          "url": "https://javascriptair.com/"
        }, {
          "desc": "",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "Adventures in Angular",
          "url": "https://devchat.tv/adventures-in-angular"
        }],
        "title": "Podcasts"
      }
    }],
    "development": [{
      "tooling": {
        "icon": "",
        "resources": [{
          "desc": "A Google Chrome Dev Tools extension for debugging Angular 2 applications.",
          "id": 0,
          "logo": "https://augury.angular.io/images/augury-logo.svg",
          "rev": true,
          "title": "Augury",
          "url": "http://augury.angular.io/"
        }, {
          "desc": "Server-side Rendering for Angular 2 apps.",
          "id": 1,
          "logo": "https://cloud.githubusercontent.com/assets/1016365/10639063/138338bc-7806-11e5-8057-d34c75f3cafc.png",
          "rev": true,
          "title": "Angular Universal",
          "url": "https://github.com/angular/universal"
        }, {
          "desc": "Lightweight development only node server",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "Lite-server",
          "url": "https://github.com/johnpapa/lite-server"
        }, {
          "desc": "A set of tslint rules for static code analysis of Angular 2 TypeScript projects.",
          "id": 3,
          "logo": "",
          "rev": true,
          "title": "Codelyzer",
          "url": "https://github.com/mgechev/codelyzer"
        }, {
          "desc": "This package provides facilities for developers building Angular 2 applications on ASP.NET.",
          "id": 4,
          "logo": "",
          "rev": true,
          "title": "Universal for ASP.NET",
          "url": "https://github.com/aspnet/nodeservices"
        }],
        "title": "Tooling"
      }
    }, {
      "ide": {
        "icon": "",
        "resources": [{
          "desc": "VS Code is a Free, Lightweight Tool for Editing and Debugging Web Apps. Platforms: Linux, Windows",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Visual Studio Code",
          "url": "http://code.visualstudio.com/"
        }, {
          "desc": "Lightweight yet powerful IDE, perfectly equipped for complex client-side development and server-side development with Node.js",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "Webstorm",
          "url": "https://www.jetbrains.com/webstorm/"
        }, {
          "desc": "Capable and Ergonomic  Java * IDE",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "IntelliJ IDEA",
          "url": "https://www.jetbrains.com/idea/"
        }],
        "title": "IDEs"
      }
    }, {
      "data": {
        "icon": "",
        "resources": [{
          "desc": "The official library for Firebase and Angular 2",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Angular Fire",
          "url": "https://github.com/angular/angularfire2"
        }, {
          "desc": "Use Angular 2 and Meteor to build full-stack JavaScript apps  for Mobile and Desktop.",
          "id": 1,
          "logo": "http://www.angular-meteor.com/images/logo.png",
          "rev": true,
          "title": "Meteor",
          "url": "http://www.angular-meteor.com/angular2"
        }, {
          "desc": "Apollo is a data stack for modern apps, built with GraphQL.",
          "id": 2,
          "logo": "http://docs.apollostack.com/logo/large.png",
          "rev": true,
          "title": "Apollo",
          "url": "http://docs.apollostack.com/apollo-client/angular2.html"
        }],
        "title": "Data Libraries"
      }
    }, {
      "ui": {
        "icon": "",
        "resources": [{
          "desc": "Material Design components for Angular 2",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Angular Material 2",
          "url": "https://github.com/angular/material2"
        }, {
          "desc": "PrimeNG is a collection of rich UI components for Angular 2",
          "id": 1,
          "logo": "http://www.primefaces.org/primeng/showcase/resources/images/primeng.svg",
          "rev": true,
          "title": "Prime Faces",
          "url": "http://www.primefaces.org/primeng/"
        }, {
          "desc": "",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "Kendo UI",
          "url": "http://www.telerik.com/blogs/what-to-expect-in-2016-for-kendo-ui-with-angular-2-and-more"
        }, {
          "desc": "Native Angular 2 components & directives for Lightning Design System",
          "id": 3,
          "logo": "http://ng-lightning.github.io/ng-lightning/img/shield.svg",
          "rev": true,
          "title": "ng-lightning",
          "url": "http://ng-lightning.github.io/ng-lightning/"
        }, {
          "desc": "Wijmo 5, a collection of true JavaScript controls that doesn't make compromises to support legacy browsers.",
          "id": 4,
          "logo": "http://wijmocdn.azureedge.net/wijmositeblob/wijmo-theme/logos/wijmo-55.png",
          "rev": true,
          "title": "Wijmo",
          "url": "http://wijmo.com/products/wijmo-5/"
        }, {
          "desc": "Material design inspired UI components for building great web apps. For mobile and desktop.",
          "id": 5,
          "logo": "",
          "rev": true,
          "title": "Vaadin",
          "url": "https://vaadin.com/elements"
        }, {
          "desc": "Native Angular2 directives for Bootstrap",
          "id": 6,
          "logo": "",
          "rev": true,
          "title": "ng2-bootstrap",
          "url": "http://valor-software.com/ng2-bootstrap/"
        }],
        "title": "UI Components"
      }
    }, {
      "platform": {
        "icon": "",
        "resources": [{
          "desc": "Integrating NativeScript with Angular 2.",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "NativeScript",
          "url": "https://github.com/NativeScript/nativescript-angular"
        }, {
          "desc": "Angular 2 and React Native to build applications for Android and iOS",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "ReactNative",
          "url": "http://angular.github.io/react-native-renderer/"
        }, {
          "desc": "Ionic offers a library of mobile-optimized HTML, CSS and JS components and tools for building highly interactive native and progressive web apps.",
          "id": 2,
          "logo": "http://ionicframework.com/img/ionic-logo-white.svg",
          "rev": true,
          "title": "Ionic",
          "url": "http://ionicframework.com/docs/v2/"
        }, {
          "desc": "Electron Platform for Angular 2.",
          "id": 3,
          "logo": "",
          "rev": true,
          "title": "Electron",
          "url": "http://github.com/angular/angular-electron"
        }, {
          "desc": "An Universal Windows App (uwp) powered by Angular 2",
          "id": 4,
          "logo": "",
          "rev": true,
          "title": "Windows (UWP)",
          "url": "http://github.com/preboot/angular2-universal-windows-app"
        }],
        "title": "Cross-Platform Development"
      }
    }],
    "education": [{
      "online": {
        "icon": "",
        "resources": [{
          "desc": "",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Rangle.io",
          "url": "https://rangle.io/services/javascript-training/training-angular1-angular2-with-ngupgrade/"
        }, {
          "desc": "",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "Pluralsight",
          "url": "https://www.pluralsight.com/search?q=angular+2&categories=all"
        }, {
          "desc": "",
          "id": 3,
          "logo": "",
          "rev": true,
          "title": "Udemy",
          "url": "https://www.udemy.com/courses/search/?ref=home&src=ukw&q=angular+2&lang=en"
        }, {
          "desc": "",
          "id": 4,
          "logo": "",
          "rev": true,
          "title": "Egghead.io",
          "url": "https://egghead.io/technologies/angular2"
        }, {
          "desc": "",
          "id": 5,
          "logo": "",
          "rev": true,
          "title": "Frontend Masters",
          "url": "https://frontendmasters.com/courses/angular-2/"
        }],
        "title": "Online Training"
      }
    }, {
      "workshops": {
        "icon": "",
        "resources": [{
          "desc": "",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Rangle.io",
          "url": "http://rangle.io/services/javascript-training/angular2-training/"
        }, {
          "desc": "",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "Angular Boot Camp",
          "url": "https://angularbootcamp.com"
        }, {
          "desc": "",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "Thoughtram",
          "url": "http://thoughtram.io/"
        }, {
          "desc": "",
          "id": 3,
          "logo": "",
          "rev": true,
          "title": "Frontend Masters",
          "url": "https://frontendmasters.com/workshops/angular-2/"
        }],
        "title": "Workshops & Onsite Training"
      }
    }, {
      "books": {
        "icon": "",
        "resources": [{
          "desc": "",
          "id": 0,
          "logo": "",
          "rev": true,
          "title": "Packt Publishing",
          "url": "https://www.packtpub.com/all/?search=angular%202#"
        }, {
          "desc": "",
          "id": 1,
          "logo": "",
          "rev": true,
          "title": "Manning Publications",
          "url": "https://www.manning.com/search?q=angular"
        }, {
          "desc": "",
          "id": 2,
          "logo": "",
          "rev": true,
          "title": "O'Reilly Media",
          "url": "https://ssearch.oreilly.com/?q=angular+2&x=0&y=0"
        }, {
          "desc": "",
          "id": 3,
          "logo": "",
          "rev": true,
          "title": "Rangle.io ngCourse 2",
          "url": "http://ngcourse.rangle.io/"
        }, {
          "desc": "",
          "id": 4,
          "logo": "",
          "rev": true,
          "title": "ng-book 2",
          "url": "https://www.ng-book.com/2/"
        }, {
          "desc": "",
          "id": 5,
          "logo": "",
          "rev": true,
          "title": "Angular 2 Book",
          "url": "https://leanpub.com/angular2-book"
        }, {
          "desc": "",
          "id": 6,
          "logo": "",
          "rev": true,
          "title": "Becoming a Ninja with Angular 2",
          "url": "https://books.ninja-squad.com/angular2"
        }, {
          "desc": "",
          "id": 7,
          "logo": "",
          "rev": true,
          "title": "Practical Angular 2",
          "url": "https://leanpub.com/practical-angular-2"
        }],
        "title": "Books"
      }
    }]
  };

}]);
