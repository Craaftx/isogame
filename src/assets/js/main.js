
function createGrid(parentId, size) {
  for (var i = 0; i < size; i++) {
    var newRowDiv = document.createElement("div");
    newRowDiv.setAttribute("id", "gamegrid__row-" + i);
    newRowDiv.setAttribute("class", "gamegrid__row");
    var currentDiv = document.getElementById(parentId);
    currentDiv.appendChild(newRowDiv);
    for (var x = 0; x < size; x++) {
        var newColDiv = document.createElement("div");
        newColDiv.setAttribute("id", "gamegrid__item-" + i + "-" + x);
        newColDiv.setAttribute("class", "gamegrid__item");
        var currentRowDiv = document.getElementById("gamegrid__row-" + i);
        currentRowDiv.appendChild(newColDiv);
    }
  }
}

function createVirtualGrid(size) {
  let virtualGrid = [];
  for (var i = 0; i < size; i++) {
    virtualGrid[i] = [];
    for (var x = 0; x < size; x++) {
      virtualGrid[i][x] = x;
    }
  }
  return virtualGrid;
}

/*
function randomBlocks(blocks, virtualGrid) {
  for (var i = 0; i < virtualGrid.length; i++) {
    for (var x = 0; x < virtualGrid.length; x++) {
      var currentItem = document.getElementById("gamegrid__item-" + i + "-" + x);
      var newBlock = document.createElement("img");
      newBlock.setAttribute("src", "../game_assets/ground-blocks/" + blocks[getRandomInt(blocks.length)] + ".png");
      newBlock.style.marginTop = '-' + x + '0px';
      currentItem.appendChild(newBlock);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
*/
let size = 10;
createGrid("gamegrid", size);
let virtualGrid = createVirtualGrid(size);

// Add monster for testing
var gridItem = document.getElementById("gamegrid__item-9-9");
var newBlock = document.createElement("img");
newBlock.setAttribute("src", "../game_assets/ground-blocks/grass-block-2.png");
newBlock.setAttribute("class", "gamegrid__item--block");
gridItem.appendChild(newBlock);

// let blocks = ['grass-block-4','grass-block-5','stone-block-3'];
// randomBlocks(blocks, virtualGrid);


var KEY = {
  W: 119,
  A: 97,
  S: 115,
  D: 100
}

var map = {};
map.height = 480;
map.width = 480;

var user = {};
user.deaths = 0;
user.moved = false;
user.element = $("*[data-name=joe]");
user.pos = {
  left: 0,
  top: 0,
};

setInterval(function() {
  if (user.deaths) $(".youdied").text("Suicides: " + user.deaths);
  $(user.element).css({
     "top": user.pos.top + "px",
     "left": user.pos.left + "px"
  });
  user.moved = false;
}, 100);

user.isDead = false;

user.die = function() {
  user.isDead = true;
  setTimeout(function() {
     $(user.element).addClass('die');
     setTimeout(function() {
        user.pos = {
           left: 48,
           top: 48
        };
        setTimeout(function() {
           user.deaths++;
           $(user.element).removeClass('die');
           user.isDead = false;
        }, 250);
     }, 350);
  }, 250);
};

/* Listeners */
document.body.addEventListener("keypress", function(e) {
  if (user.isDead) return;
  var c = e.keyCode;

  if (user.moved) return;

  if (c == KEY.W) {
     if (user.pos.top != 0) {
        user.pos.top -= 48;
        user.moved = true;
     } else {
        user.pos.top -= 48;
        user.die();
     }
  } else if (c == KEY.A) {
     if (user.pos.left != 0) {
        user.pos.left -= 48;
        user.moved = true;
     } else {
        user.pos.left -= 48;
        user.die();
     }
  } else if (c == KEY.S) {
     if (user.pos.top < map.height) {
        user.pos.top += 48;
        user.moved = true;
     } else {
        user.pos.top += 48;
        user.die();
     }
  } else if (c == KEY.D) {
     if (user.pos.left < map.width) {
        user.pos.left += 48;
        user.moved = true;
     } else {
        user.pos.left += 48;
        user.die();
     }
  }
});