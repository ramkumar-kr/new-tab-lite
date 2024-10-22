chrome.runtime.setUninstallURL("https://goo.gl/KiRZhg");

chrome.bookmarks.getSubTree('0', function (bookmarks) {
  var output = "<ul class=''>" + display_tree(bookmarks) + "</ul>";
  document.body.innerHTML = output;
});

function display_tree(bookmarks) {
  var output = '';
  var subtrees = [];
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].children) {
      subtrees.push(bookmarks[i]);
    }
    else {
      output += bookmarkLeaf(bookmarks[i]);
    }
  }
  for (var i = 0; i < subtrees.length; i++) {
    output += bookmarkPanel(subtrees[i]);
  }
  return output;
}

function bookmarkPanel(subtree) {
  return `
    <div class = "panel">
      <h2 class = "panel-title"> ${subtree.title}</h2> 
      ${display_tree(subtree.children)}
    </div>`;
}

function faviconURL(u) {
  const url = new URL(chrome.runtime.getURL("/_favicon/"));
  url.searchParams.set("pageUrl", u);
  url.searchParams.set("size", "128");
  return url.toString();
}

function faviconImgTag(url) {
  return `<img class="favicon" width=16px height=16px src= "${faviconURL(url)}"/>`
}

function bookmarkLeaf(bookmark) {
  if (validate(bookmark.url)) {
    return `
    <li class='leaf'>
      <a class='button' href="${bookmark.url}">
        ${faviconImgTag(bookmark.url)}
        ${bookmark.title}
      </a>
    </li>`;
  }
  else {
    return '';
  }
}

function validate(url) {
  return /(^http)|(^ftp)/.test(url);
}
