jQuery(document).ready(function () {
  initMenu();
});

function initMenu() {
  // Выпадающее меню
  jQuery("[data-trigger='dropdown']").on("mouseenter", function () {
    var submenu = $(this).parent().find(".submenu");
    //submenu.addClass("active");
    submenu.fadeIn(300);

    $(".profile-menu").on("mouseleave", function () {
      //submenu.removeClass("active");
      submenu.fadeOut(300);
    });
  });
}
