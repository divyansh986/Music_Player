const music =document.querySelector('audio');
const play =document.getElementById('play');
const img=document.querySelector('img');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const next=document.getElementById('next');
const prev=document.getElementById('prev');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress_container');
const counter = document.getElementById('count');

const songs =[{
    name:"faded",
    artist:"Alan Walker"
},
{
    name:"let me love you",
    artist:"DJ snake ft.Justin Bieber"
},
{
    name:"unstoppable",
    artist:"Sia"
},
{
    name:"channa",
    artist:"Arjit Singh"
}
]

let isplaying=false

//To play
const playmusic=()=>{
    music.play();
    play.classList.replace('fa-play','fa-pause')
    img.classList.add("anime");
    isplaying=true
}

//To pause
const pausemusic=()=> {
    music.pause();
    play.classList.replace('fa-pause','fa-play')
    img.classList.remove("anime");
    isplaying=false
};


play.addEventListener('click',()=>{
if (isplaying){
    pausemusic();
}
else{
    playmusic();
}
})

img.addEventListener('click',()=>{
    if (isplaying){
        pausemusic();
    }
    else{
        playmusic();
    }
    })

const loadsong=(songs)=>{
    title.textContent=songs.name;
    artist.textContent=songs.artist;
    music.src="songs/"+songs.name+".mp3";
    img.src=`images/${songs.name}.jpg`;
};


songindex=0;
const nextSong=()=>{
    songindex=(songindex+1)%songs.length;
    loadsong(songs[songindex]);
    playmusic();
};


songindex=0;
const prevSong=()=>{
    songindex=(songindex-1+songs.length)%songs.length;
    loadsong(songs[songindex]);
    playmusic();
};

next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);
music.addEventListener('ended',nextSong)



function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = music.duration
    music.currentTime =(clickX / width) * duration
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = ( currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    
}


music.addEventListener('timeupdate', updateProgress)
progressContainer.addEventListener('click', setProgress)

    
updateVisitCount();
function updateVisitCount() {
    fetch('https://api.countapi.xyz/update/music/player/?amount=1')
    .then(res => res.json())
    .then(res => {
        counter.innerHTML = res.value;
    });
    
}