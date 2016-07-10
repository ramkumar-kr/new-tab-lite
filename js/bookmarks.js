chrome.bookmarks.getSubTree('0', function(bookmarks){
  var output = "<ul class=''>" + display_tree(bookmarks) + "</ul>";
  document.body.innerHTML = output;
});

function display_tree(bookmarks) {
  var output = '';
  var subtrees = [];
  for (var i=0; i < bookmarks.length; i++) {
    if (bookmarks[i].children) {
        subtrees.push(bookmarks[i]);
      }
      else {
        output += "<li class='leaf'><a class='button' href='" + bookmarks[i].url + "'>" + bookmarks[i].title + "</a></li>";
      }
  }
  for(var i = 0; i < subtrees.length; i++){
     output += "<div class = 'panel'><h2 class = 'panel-title'>" + subtrees[i].title + "</h2>" + 
     display_tree(subtrees[i].children) + "</div>";
  }
  return output;
}
