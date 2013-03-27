function displayPic() {
  remoteStorage.ghost.getPicsListing().then(function (objects) {
    objects.forEach(function (item) {
      if (item.indexOf('test') == 0) {
        var url = remoteStorage.ghost.getPicURL(item);
        $('#album').append('<a class="fancybox" href="' + url + '" rel="gHost" title="<a href=' + url + ' download=' + item + ' title=\'Download this picture!\'>Download</a>"><img src="' + url + '" id="' + item + '" width="160" height="120" title="' + item + '"></img></a>');
      }
    });
    $(".fancybox").fancybox();
    $('#spinner').hide();
    $('#takePhoto').show();
  });
}

function showApp() {
  $('#splash').hide();
  $('#info').hide();
  $('#spinner').show();
  init();
  displayPic();
}

function hideApp() {
  stopVideo();
  $('#camerabox').fadeOut('slow', function () {
    $('#album').remove();
    $('#photo').remove();
    $('#splash').fadeIn('slow');
    $('#info').fadeIn('slow');
  });
}

/* HTML5 webcam stuff */

var myStream;

function init() {
  if (navigator.webkitGetUserMedia)
    navigator.webkitGetUserMedia({
      video: true
    }, onSuccess, onFail);
  else
    alert('WebRTC is not available on this browser, so you can\'t take pictures. But you can still browse the pictures already in your remoteStorage.');
}

function onSuccess(stream) {
  myStream = stream;
  $('#camFeed').attr('src', webkitURL.createObjectURL(stream));
  $('#camFeed').css({
    'margin-top': '10px',
    'margin-bottom': '20px',
    'box-shadow': '0 0 50px 10px #fff'
  });
  $('#camerabox').fadeIn('slow')
  $('#takePhoto').show();
}

function onFail() {
  alert('Could not connect to your webcam.');
}

function stopVideo() {
  var video = document.getElementById("camFeed");
  if (video) video.pause();
  if (myStream) myStream.stop();
}

function dataURItoArrayBuffer(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  //var bb = new BlobBuilder();
  //bb.append(ab);
  //return bb.getBlob(mimeString);
  return ab;
}
