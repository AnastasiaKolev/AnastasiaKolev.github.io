var isShownContextMenu = false;

jQuery(document).on('contextmenu', function (event) {
  // event.preventDefault();
  
  var $menu = document.getElementById("rmenu");

  $menu.className = "show";
  $menu.style.top = mouseY(event) + 'px';
  $menu.style.left = mouseX(event) + 'px';

  event.returnValue = false;

  isShownContextMenu = true;
  
  return false;
});

jQuery(document).on('click', function (event) {
  if (isShownContextMenu) {
    document.getElementById("rmenu").className = 'hide';
  }
});


function mouseX(evt) {
  if (evt.pageX) {
    return evt.pageX;
  } else if (evt.clientX) {
    return evt.clientX + (document.documentElement.scrollLeft ?
      document.documentElement.scrollLeft :
      document.body.scrollLeft);
  } else {
    return null;
  }
}

function mouseY(evt) {
  if (evt.pageY) {
    return evt.pageY;
  } else if (evt.clientY) {
    return evt.clientY + (document.documentElement.scrollTop ?
      document.documentElement.scrollTop :
      document.body.scrollTop);
  } else {
    return null;
  }
}