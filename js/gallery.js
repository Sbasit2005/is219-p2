// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  

// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function swapPhoto() {
	//Add code here to access the #slideShow element.
	
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
if(mCurrentIndex >= mImages.length) {
		mCurrentIndex = 0;
}

if(mCurrentIndex < 0) {
		mCurrentIndex = mImages.length;
}

document.getElementById('photo').src = mImages[mCurrentIndex].img;

var loc = document.getElementsByClassName('number');
loc[0].innerHTML = 'number: ' + mImages[mCurrentIndex].number;

var des = document.getElementsByClassName('description');
des[0].innerHTML = "description: " + mImages[mCurrentIndex].description;

var dt = document.getElementsByClassName('date');
dt[0].innerHTML = "date: " + mImages[mCurrentIndex].date;

mLastFrameTime = 0
mCurrentIndex += 1
}

function prevPhoto() {
	//Add code here to access the #slideShow element.
	
	//Access the img element and replace its source
	//with a new image from your images array which is loaded 
	//from the JSON string
	
if(mCurrentIndex >= mImages.length) {
		mCurrentIndex = 0;
}

if(mCurrentIndex < 0) {
		mCurrentIndex = mImages.length;
}

document.getElementById('photo').src = mImages[mCurrentIndex].img;

var loc = document.getElementsByClassName('number');
loc[0].innerHTML = 'number: ' + mImages[mCurrentIndex].number;

var des = document.getElementsByClassName('description');
des[0].innerHTML = "description: " + mImages[mCurrentIndex].description;

var dt = document.getElementsByClassName('date');
dt[0].innerHTML = "date: " + mImages[mCurrentIndex].date;

mLastFrameTime = 0
mCurrentIndex -= 1
}

// Counter for the mImages array
var mCurrentIndex = 0;

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'https://api.npoint.io/6df0e6fb32474375e6fc';




// part 2 slideshow 1 & 2 convetrs data to readable txt
function fetchJSON () {
	mRequest.onreadystatechange = function() {
		console.log("on ready state change");
		if (this.readyState == 4 && this.status == 200) {
			mJson = JSON.parse(mRequest.responseText);
			console.log('erm');
			iterateJSON(mJson);
		}		
	}
	mRequest.open("GET", mUrl,true);
	mRequest.send();
}

function iterateJSON(mJson) {
	for (x = 0; x < mJson.images.length; x++) {
		mImages[x] = new GalleryImage();
		mImages[x].number = mJson.images[x].imgNumber;
		mImages[x].description = mJson.images[x].description;
		mImages[x].date = mJson.images[x].date;
		mImages[x].img = mJson.images[x].imgPath;
	}
}
//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

	$('#nextPhoto').position({
		my: 'right bottom',
		at: 'right bottom',
		of: '#nav'
	})

const urlParams = new URLSearchParams(window.location.search)

	for (const [key, value] of urlParams) {
		console.log(`${key}:${Value}`)
		mUrl = value
	}

	if (mUrl == undefined) {
		mUrl = 'https://api.npoint.io/6df0e6fb32474375e6fc';
	}

 fetchJSON();
	$("#nextPhoto").click(function () {
		swapPhoto()
	});

	$("#prevPhoto").click(function () {
		swapPhoto()
	});
	// This initially hides the photos' metadata information
	//$('.details').eq(0).hide();

});

window.addEventListener('load', function() {
	
	console.log('window loaded');

}, false);
// Assigning data from JSON list to variables that will be used in slideshow
function GalleryImage() {
	//implement me as an object to hold the following data about an image:
	//1. number where photo was taken 
	var number;
	//2. description of photo
	var description;
	//3. the date when the photo was taken
	var date;
	//4. either a String (src URL) or an an HTMLImageObject (bitmap of the photo. https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement)
	var img;
}

function Rswitch() {
	if ($(".moreIndicator").hasClass("rot90")){
		$(".moreIndicator").addClass("rot270")
		$(".moreIndicator").removeClass("rot90")
	}
	else{
		$(".moreIndicator").addClass("rot90")
		$(".moreIndicator").removeClass("rot270")
	}
	$(".details").slideToggle("slow");
}



$( "#clickme" ).click(function() {
  $( "#book" ).slideToggle( "slow", function() {
    // Animation complete.
  });
})