/* JS Document */

/******************************

[Table of Contents]

1. Vars and Inits
2. Set Header
3. Init Home Slider
4. Init Header Search
5. Init Menu
6. Init Causes Slider
7. Init Timer


******************************/

$(document).ready(function () {
  "use strict";

  /* 

	1. Vars and Inits

	*/

  var header = $(".header");
  var hamb = $(".hamburger");
  var menuActive = false;
  var menu = $(".menu");

  setHeader();

  $(window).on("resize", function () {
    setHeader();
  });

  $(document).on("scroll", function () {
    setHeader();
  });

  initHeaderSearch();
  initMenu();

  /* 

	2. Set Header

	*/

  function setHeader() {
    if ($(window).scrollTop() > 100) {
      header.addClass("scrolled");
    } else {
      header.removeClass("scrolled");
    }
  }

  /* 

	4. Init Header Search

	*/

  function initHeaderSearch() {
    if ($(".search").length) {
      $(".search").on("click", function () {
        if ($(".header_search_container").length) {
          $(".header_search_container").toggleClass("active");
        }
      });
    }
  }

  /* 

	5. Init Menu

	*/

  function initMenu() {
    if (hamb.length) {
      if (menu.length) {
        hamb.on("click", function () {
          if (menuActive) {
            closeMenu();
          } else {
            openMenu();
          }
        });

        $(".menu_close").on("click", function () {
          if (menuActive) {
            closeMenu();
          } else {
            openMenu();
          }
        });
      }
    }
  }

  function closeMenu() {
    menu.removeClass("active");
    menuActive = false;
  }

  function openMenu() {
    menu.addClass("active");
    menuActive = true;
  }
});
