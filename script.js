const musicSong = document.querySelector("#audio");
let play = document.querySelector('#play');
let next = document.querySelector('next');
let prev = document.querySelector('prev');
let canvas = document.querySelector('.canvasAnimate');
let ctx = canvas.getContext('2d');


function apiArtist(){
    fetch('https://kt2ul4cwza.execute-api.us-east-2.amazonaws.com/public/songs/gorillaz')
    .then((response) => response.json())
    .then((data) => {
      const currentSong = data[3].audio;
      ListSong(currentSong);
    });
  }

function ListSong(song) {
    musicSong.setAttribute('crossorigin', 'anonymous');
    musicSong.load();
    musicSong.src = song;

    play.addEventListener('click', () =>{
        canvasAnimate(musicSong);
        musicSong.play();
    });
}
function canvasAnimate(musicSong){
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var analyser = audioCtx.createAnalyser();

    var source = audioCtx.createMediaElementSource(musicSong);
    analyser.connect(audioCtx.destination);  
    analyser.fftSize = 256;
    source.connect(analyser);
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    function draw() {
    drawVisual = requestAnimationFrame(draw);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    for(var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
        canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

        x += barWidth + 1;
    }
    };

    draw();
}
apiArtist();