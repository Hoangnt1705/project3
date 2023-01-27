var catClicker = (function() {
    'use strict';
  
    // --- HELPER --- //
    var helpers = {
      //
      // go through node list safely with this home-made function
      //
      // parameter:
      //   callback: "callback function to manipulate the node being passed"
      //
      //   thanks to Todd Motto (Developer Expert at Google) for his advice.
      //   I find his article compelling https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
      //
      forEach: function forEach(callback) {
        // if it's confusing, feel free to read:
        // https://github.com/getify/You-Dont-Know-JS
        for (var i = 0; i < this.length; i++) {
          // "this" must be an array like object (NodeList perhaps)
          // "this[i]" must be the value of Array[i]
          // i is obviously an index
          callback.call(this, this[i], i);
        }
      },
  
      // Object with same enumerable properties can share its values
      //
      // parameter:
      //    assignor: object that transfer the values
      //    assignee: object that get transfered values from assignor
      //
      iterateAssignment: function iterateAssignment(assignor, assignee) {
        Object.keys(assignee).forEach(function interateKey(key) {
          assignee[key] = assignor[key]
        });
      }
    };
  
    // --- MODEL --- //
    var models = {
      // it contains mapping between photo's attribute and its click count
      photos: [
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Kitty',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/6/69/June_odd-eyed-cat_cropped.jpg',
          alt: 'This is Kitty'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Jefferson',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Six_weeks_old_cat_(aka)_edit.jpg',
          alt: 'This is Jefferson'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Jonathan and Bond',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mackerel_tabby_cat_pair-Hisashi-01.jpg/1280px-Mackerel_tabby_cat_pair-Hisashi-01.jpg',
          alt: 'These are Jonathan and Bond'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Mely',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Longhaired_Calico_Cat.jpg',
          alt: 'This is Mely'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Franky',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Fishing_Cat_(Prionailurus_viverrinus)_3.jpg',
          alt: 'This is Franky'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Humbler',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Persian_sand_CAT.jpg',
          alt: 'This is Humbler'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Honester',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Tortoiseshell_she-cat.JPG',
          alt: 'This is Honester'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Goosball',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/CyprusShorthair.jpg',
          alt: 'This is Goosball'
        },
        {
          id: Math.round(Math.random() * 1000000),
          name: 'Gitta',
          clickCount: 0,
          src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Tabby-cat.jpg/1280px-Tabby-cat.jpg',
          alt: 'This is Gitta'
        }
      ],
  
      totalClicks: 0,
  
      admin: {
        show: false
      }
    };
  
    // --- CONTROLLER, MAPPER or WHATEVER --- //
    var octopus = {
      getFirstPhoto: function getFirstPhoto() {
        return models.photos[0];
      },
  
      getPhotoById: function getPhotoById(id) {
        var photo = models.photos.find(function (photo) {
          return photo.id === id;
        });
  
        return photo;
      },
  
      getPhotoIndexById: function getPhotoIndexById(id) {
        return models.photos.findIndex(function (photo) {
          return photo.id === id;
        });
      },
  
      getPhotos: function getPhotos() {
        return models.photos;
      },
  
      updateProperties: function updateProperties(properties) {
        var index = this.getPhotoIndexById(properties.id);
        helpers.iterateAssignment(properties, models.photos[index]);
      },
  
      incrementClick: function incrementClick(id) {
        var index = this.getPhotoIndexById(id);
        models.photos[index].clickCount++;
        models.totalClicks++;
      },
  
      toggleAdminState: function toggleAdminState(bool) {
        models.admin.show = !bool;
        return models.admin.show;
      },
  
      getAdminState: function getAdminState() {
        return models.admin.show;
      },
  
      init: function init() {
        views.init();
      }
    };
  
    var views = {
      menu: {
        //
        // generate links that will display the photo when clicked
        //
        // parameter:
        //   menuIdAttribute: "id attribute of element that will contain the generated links"
        //
        generateLinks: function generateLinks(menuIdAttribute) {
          var menu = document.getElementById(menuIdAttribute);
          var photos = octopus.getPhotos();
  
          photos.forEach(buildLink);
  
          function buildLink(photo) {
            var link = document.createElement('a');
            link.className = 'menu-item photo-menu__link';
            link.textContent = photo.name;
            link.setAttribute('data-id', photo.id);
            menu.appendChild(link);
          }
        },
  
        //
        // all generated links will trigger the display to show
        //
        // parameter:
        //   linkClassAttribute: "similar class attribute that's shared among all generated links"
        //
        setDisplayer: function setDisplayer(linkClassAttribute) {
          var links = document.getElementsByClassName(linkClassAttribute);
  
          helpers.forEach.call(links, trigger);
  
          function trigger(link) {
            link.addEventListener('click', display, false);
  
            function display(event) {
              var id = link.getAttribute('data-id');
  
              // coerce to integer because all attributes in DOM return string
              id = parseInt(id, 10);
  
              views.display.showDisplay(id);
            }
          }
        },
  
        getLink: function getLink(id) {
          var query = 'a[data-id=' + '"' + id + '"' + ']';
          var link = document.querySelector(query);
  
          return link;
        },
  
        init: function init() {
          this.generateLinks('photo-menu');
          this.setDisplayer('photo-menu__link');
        }
      },
  
      display: {
        //
        // all generated links are indexed, so every link will have reference to
        // photos via octopus
        //
        // parameter:
        //    id: "unique id of photo object"
        //
        showDisplay: function showDisplay(id) {
          var photo = octopus.getPhotoById(id);
          this.setTitle('[data-js="title"]', photo);
          this.setImage('[data-js="image"]', '[data-js="loader"]', photo);
          this.setClickCount('[data-js="click-count"]', photo);
          views.admin.setAdminForm(photo);
        },
  
        //
        // parameter:
        //    photo: "object that consist of image attribute and its click count"
        //    clickCountCSSSelector: "CSS selector of element that show click count"
        //
        setClickCount: function setClickCount(clickCountCSSSelector, photo) {
          var clickCount = document.querySelector(clickCountCSSSelector);
          clickCount.textContent = photo.clickCount;
        },
  
        //
        // parameter:
        //    loader: "DOM element that contains loader gif"
        //    image: "DOM element that contains image being involved"
        //    action: "string that represent action handling image and loader"
        //
        setLoader: function setLoader(loader, image, action) {
           switch (action) {
             case "show":
                   loader.style.display = "block";
                   image.style.display = "none";
                   break;
             case "hide":
                   loader.style.display = "none";
                   image.style.display = "block";
                   break;
             default:
                   throw new TypeError('action involving loader cannot proceed');
           }
        },
  
        //
        // parameter:
        //    photo: "object that consist of image attribute and its click count"
        //    imageCSSSelector: "CSS selector of element containing cat's photo or whatever"
        //    loaderCSSSelector: "CSS selector of element containing loader gif"
        //
        setImage: function setImage(imageCSSSelector, loaderCSSSelector, photo) {
          var loader = document.querySelector(loaderCSSSelector);
          var image = document.querySelector(imageCSSSelector);
  
          views.display.setLoader(loader, image, 'show');
  
          image.onload = function () {
            this.setAttribute('alt', photo.alt);
            this.setAttribute('data-id', photo.id);
            views.display.setLoader(loader, this, 'hide');
          };
  
          image.setAttribute('src', photo.src);
        },
  
        //
        // parameter:
        //    photo: "object that consist of image attribute and its click count"
        //    titleCSSSelector: "CSS selector of title"
        //
        setTitle: function setTitle(titleCSSSelector, photo) {
          var title = document.querySelector(titleCSSSelector);
          title.textContent = photo.name;
        },
  
        //
        // when photo clicked, it will count the click and display it.
        //
        // parameter:
        //    imageCSSSelector: "CSS selector of element containing cat's photo or whatever"
        //
        setClicker: function setClicker(imageCSSSelector) {
          var image = document.querySelector(imageCSSSelector);
  
          image.addEventListener('click', countClick, false);
  
          function countClick(event) {
            var id = image.getAttribute('data-id');
  
            // coerce to integer because all attribute in DOM return string
            id = parseInt(id, 10);
  
            octopus.incrementClick(id);
            views.display.showDisplay(id);
          }
        },
  
        init: function init() {
          // show the first cat when loaded
          var firstPhoto = octopus.getFirstPhoto();
          this.showDisplay(firstPhoto.id);
  
          this.setClicker('[data-js="image"]');
        }
      },
  
      admin: {
        setAdminButton: function setAdminButton(adminButtonIdAttribute) {
          var adminButton = document.getElementById(adminButtonIdAttribute);
          adminButton.addEventListener('click', this.toggle.bind(this), false);
        },
  
        toggle: function toggle(event) {
          var state = octopus.getAdminState();
          var newState = octopus.toggleAdminState(state);
          this.toggleAdminForm(newState, 'photo-admin-form');
        },
  
        toggleAdminForm: function toggleAdminForm(bool, adminFormIdAttribute) {
          var adminForm = document.getElementById(adminFormIdAttribute);
  
          if (bool) {
            adminForm.style.display = 'none';
          } else {
            adminForm.style.display = 'block';
          }
        },
  
        initializeInputs: function initializeInputs() {
          return {
            id: document.getElementById('photo_id'),
            name: document.getElementById('photo_name'),
            src: document.getElementById('photo_src'),
            alt: document.getElementById('photo_alt'),
            clickCount: document.getElementById('photo_click_count')
          };
        },
  
        setAdminForm: function setAdminForm(photo) {
          var form = this.initializeInputs();
  
          Object.keys(form).forEach(function iterateKey(key) {
            form[key].value = photo[key];
          });
        },
  
        setSubmitButton: function setSubmitButton(submitButtonCSSSelector) {
          var submit = document.querySelector(submitButtonCSSSelector);
          submit.addEventListener('click', this.updateProperties.bind(this), false);
        },
  
        updateProperties: function updateProperties(event) {
          var form = this.initializeInputs();
          var id = parseInt(form.id.value, 10);
          var photo = octopus.getPhotoById(id);
          var link = views.menu.getLink(id);
  
          Object.keys(photo).forEach(function iterateKey(key) {
            photo[key] = form[key].value
  
            // 'id' and 'clickCount' must be integer
            if (key === 'clickCount' || key === 'id') {
              photo[key] = parseInt(form[key].value, 10);
            }
          });
  
          octopus.updateProperties(photo);
  
          views.display.showDisplay(id);
          link.textContent = form.name.value;
          this.toggle();
        },
  
        setCancelButton: function setCancelButton(cancelButtonCSSSelector) {
          var cancel = document.querySelector(cancelButtonCSSSelector);
          cancel.addEventListener('click', this.hideForm.bind(this), false);
        },
  
        hideForm: function hideForm(event) {
          var form = this.initializeInputs();
          var id = parseInt(form.id.value, 10);
          var photo = octopus.getPhotoById(id);
  
          Object.keys(form).forEach(function interateKey(key) {
            form[key].value = photo[key];
          });
  
          this.toggle();
        },
  
        init: function init() {
          this.setAdminButton('photo-admin-button');
          this.toggle();
          this.setSubmitButton('[data-js="submit"]');
          this.setCancelButton('[data-js="cancel"]');
        }
      },
  
      init: function init() {
        this.menu.init();
        this.display.init();
        this.admin.init();
      }
    };
  
    // initialize objects that would go public
    var app = {
      helpers: helpers,
      models: models,
    };
  
    // initialize all
    octopus.init();
  
    // This will be used by users indirectly via closure!
    // We choose whatever object that would go public
    return function () {
      return app;
    };
  })();