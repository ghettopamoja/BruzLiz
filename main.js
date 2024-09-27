document.addEventListener('DOMContentLoaded', () => {
    const today = new Date();
    const hours = today.getHours();
    const timeDisplay = document.getElementById('time-display');

    timeDisplay.textContent = 
        hours < 12 ? 'Good Morning!' : 
        hours < 18 ? 'Good Afternoon!' : 
        'Good Evening!';


    const secondNames = ["Bruz Liz", 'Bruz Lily', ' '];
    const sname = document.querySelector('#sname');
    let currentNameIndex = 0;
    let currentCharIndex = 0;

    function typewriter() {
        if(currentCharIndex < secondNames[currentNameIndex].length){
            sname.textContent += secondNames[currentNameIndex].charAt(currentCharIndex);
            currentCharIndex++;

            setTimeout(typewriter, 500);
        }
        else{
            setTimeout(() => {
                sname.textContent = '';
                currentCharIndex = 0;
                currentNameIndex = (currentNameIndex + 1) % secondNames.length;

                typewriter();
            },2000)
        }
    }

    typewriter();
});

//------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const proceedBtns = document.querySelector('.proceed-buttons');
    const pbuttons = proceedBtns.querySelectorAll('button');
    const ovelayAskMore = document.querySelector('.ask-more-overlay');
    const closeAskmore = document.querySelector('.close-overlay');
    const introDiv = document.querySelector('.intro-div');
    const counterBtn = document.createElement('h2');

    const contentBtn = document.querySelector('.content-buttons');
    const fAndMBtn = contentBtn.querySelectorAll('button');
    const fancierBtn = fAndMBtn[0];
    

       
    const moreContent = document.querySelector('.lily-content');

    //const PersonalBtn = pbuttons[0];
    const moreBtn = pbuttons[0];
    const loveBtn = pbuttons[1];

    let loveCounts = 0;
    let audioPlaying = false;

    
    let currentSongIndex = 0;
    let currentVideoIndex = -1;
    let currentTiktokSong = null;
    let currentDiv = null;
    let isPlay = false;
    let  anyVideoPlaying = false

    
    
    
    const shorts = ['short1.mp3', 'short4.mp3', 'short3.mp3', 'short5.mp3','short1.mp3','short1.mp3'];

    const imagesAndSong = [
        {
            img:'img1.jpg',
            songurl: 'tiktok1.mp3',
            start:56, duration:23, 
            lyrics:{
                at56: "Baby lets go far away , further",
                at60: "Baby far away, further",
                at62: "Oh far away, further away baby far, away",
                at68: "Baby lets go far away , further",
                at72: "Baby far away, further",
                at74: "Oh far away, further away baby far, away",
            }
        },
        {
            img:'img2.jpg',
            songurl: 'tiktok1.mp3',
            start:100,
            duration:24,
            lyrics: {
                at101: "Sambaratisha moyo wangu, we kila kitu my baby",
                at107: "Si unajua moyo wangu, ngumu kupenda, watu wengi",
                at114: "Ukinigusa i like it, ukinitomasa , i like it",
                at118: "Ukinipa HMM i like it",
                at121: "Eti ugali na  papa",
                at123: "I like it oh my love"
            }
        },
        {img:'img3.jpg', songurl: 'tiktok2.mp3', start:27, duration:30},
        {img:'img4.jpg', songurl: 'tiktok3.mp3', start:10, duration:50},
        {img:'img5.jpg', songurl: 'tiktok4.mp3', start:24, duration:70},
        {img:'img6.jpg', songurl: 'tiktok5.mp3', start:118, duration:30},
        {img:'img7.jpg', songurl: 'tiktok6.mp3', start:34, duration:20},
        {img:'img8.jpg', songurl: 'tiktok7.mp3', start:18, duration:50},
        {img:'img9.jpg', songurl: 'tiktok8.mp3', start:30, duration:38},
        {img:'img10.jpg', songurl: 'tiktok9.mp3', start:28, duration:30},
        { 
            img: 'img11.jpg', 
            songurl: 'tiktok10.mp3', 
            start: 32, 
            duration: 30, 
            lyrics: {
                at32: "But every time I fall, I fall to the ground",
                at36: "I am just getting one step closer",
                at40: "To you and in the end",
                at45: "I know we'll find each other there",
                at49: "And even though it seems so far",
                at52: "I'm geting close time i fall fall again",
                at59: "I'll meet you in the end"
            }
        },
        {img:'img12.jpg', songurl: 'tiktok11.mp3', start:0, duration:30},
        {img:'img13.jpg', songurl: 'tiktok11.mp3', start:64, duration:40},
        {img:'img14.jpg', songurl: 'tiktok12.mp3', start:47, duration:24},
        {img:'img15.jpg', songurl: 'tiktok13.mp3', start:11, duration:51},
        {img:'logo.jpg', songurl: 'tiktok14.mp3', start:44, duration:40},
    ];
    const quotes = [
        // Love Quotes
        "Love is the quiet warmth that wraps around your soul, even in the coldest moments.",
        "True love is not about perfection but finding beauty in the imperfections.",
        "In the embrace of love, hearts speak a language no words can define.",
        "Love doesn’t demand grand gestures; it’s in the small moments that we feel most complete.",
        "When love is genuine, even silence becomes the sweetest conversation.",
        // Life Quotes
        "Life is a journey of endless growth, where each moment is a chance to evolve.",
        "In the dance of life, every step, even the missteps, leads us toward who we are meant to be.",
        "Life’s beauty lies in its fleeting moments; hold them close, for they shape you.",
        "We find meaning in life not in what we achieve, but in who we become along the way.",
        "Life is the art of weaving hope through the fabric of uncertainty.",
        // Beauty Quotes
        "Beauty is not just in what we see, but in the way we feel when we encounter it.",
        "True beauty radiates from within and lights up the world around us.",
        "Beauty is found in the simplest things, when we choose to look through the eyes of wonder.",
        "The essence of beauty is in the way it touches the heart, leaving an impression long after it’s seen.",
        "In every moment, there is beauty waiting to be discovered, even in the ordinary.",

        "Love is the melody that brings harmony to the chaos of life.",
        "Life is a journey, and every step is a story waiting to be told.",
        "Beauty is not in the face; it is a light in the heart.",
        "Love is the bridge that connects two souls, no matter the distance.",
        "Life is a canvas, and you are the artist. Paint it with your dreams.",
        "Beauty is found in the simplest moments, the quiet whispers of nature.",
        "Love is the language that the heart speaks, even when words fail.",
        "Life is a dance, and every moment is a step towards your destiny.",
        "Beauty is the reflection of your soul, shining through your actions.",
        "Love is the spark that ignites the fire of passion and purpose.",
    ];
    
    const  allVideos = [
        { src: 'vid9.mp4', start: 0, end: 6 },
        { src: 'vid7.mp4', start: 7, end: 27 },
        { src: 'vid3.mp4', start: 27, end: 47 },
        { src: 'vid2.mp4', start: 48, end: 67 },
        { src: 'vid4.mp4', start: 68, end: 102 },
        { src: 'vid6.mp4', start: 102, end: 125 },
        { src: 'vid8.mp4', start: 126, end: 150 }
    ];
    const fancierAudio = ['y2mate.com - Willy Paul  JZyNo  KUU KUU Official Lyric Video.mp3', 'music2.mp3', 'music3.mp3'];

    let currentSong =  null;
    let isPlaying = false;
    let currentVideoElement = null;

    const postedQuotes = [];

    moreBtn.addEventListener('click', () => {
        ovelayAskMore.style.display = 'flex';
    });

    closeAskmore.addEventListener('click', () => {
        ovelayAskMore.style.display = 'none';
    });

    loveBtn.addEventListener('click', () => {
        if (loveCounts < 10 && !audioPlaying) {
            toggleLoved();
        } else if (loveCounts >= 10) {
            loveBtn.disabled = true; // Disable after 10 clicks
        }
    });

    fancierBtn.addEventListener('click', () => {
        ovelayAskMore.style.display = 'none';
        introDiv.style.display = 'none';
        moreContent.style.display = 'flex';
        displayAboutContent();
        
    });

    document.getElementById('homeBtn').addEventListener('click', () =>{
        introDiv.style.display = 'flex';
        document.querySelector('.lily-content').style.display = 'none';
        document.querySelector('.liz-content').style.display = 'none';

        if(currentTiktokSong) {
            currentTiktokSong.pause();
            
        }
    });

    document.getElementById('fancyvid').addEventListener('click', () => {
        document.querySelector('.fancier-overlay').style.display = 'flex';
        if (currentTiktokSong) {
            currentTiktokSong.pause();
            const playBtn = currentDiv.querySelector('.action-buttons span:first-child');
            updatePlayButton(playBtn, false);
        }
        //animateFancy();
    });

    document.querySelector('.close-fancier').addEventListener('click', () => {
        document.querySelector('.fancier-overlay').style.display = 'none';
    })
    function toggleLoved() {
        loveCounts++;

        for(var i = 0; i < loveCounts; i++) {
            displayLoveBubbles();
        }
        counterBtn.textContent = loveCounts;

        if (loveCounts <= 10) {
            playRandomShort();
        }

        proceedBtns.appendChild(counterBtn);
    }

    function displayLoveBubbles() {
        const loveDiv = document.createElement('div');
        loveDiv.classList.add('love-div');

        // Create a heart icon
        loveDiv.innerHTML = '<i class="fas fa-heart"></i>';
        
        // Append the new love div to the introDiv
        introDiv.appendChild(loveDiv);

        // Randomly position the love div on the screen
        loveDiv.style.top = `${Math.random() * 80}%`; // Random position within the viewport height
        loveDiv.style.left = `${Math.random() * 80}%`; // Random position within the viewport width

        // Remove the love div after the animation finishes (2 seconds in this case)
        setTimeout(() => {
            loveDiv.remove();
        }, 5000); // Match with the animation duration
    }

    function playRandomShort() {
        audioPlaying = true;
        pbuttons.forEach(b =>{ b.disabled = true;}) // Disable button while audio is playing
    
        const randomIndex = Math.floor(Math.random() * shorts.length); // Random song
        const song = new Audio(shorts[randomIndex]);
    
        // Wait until the metadata (like duration) is loaded
        song.addEventListener('loadedmetadata', () => {
            const threeQuarterDuration = (song.duration * 3) / 4; // Calculate 3/4 of the duration
    
            song.play();
    
            // Set a timeout to pause the audio after 3/4 of its duration
            setTimeout(() => {
                song.pause();
                song.currentTime = 0; // Reset audio to the start
                audioPlaying = false;
                pbuttons.forEach(b =>{ b.disabled = false;}) // Re-enable the button
            }, threeQuarterDuration * 1000); // Convert seconds to milliseconds
        });

        document.querySelector('.img-div').style.display = 'none';

        setTimeout(() => {
            document.querySelector('.img-div').style.display = 'flex';
        }, 100)
    }

    function displayAboutContent() {
        imagesAndSong.forEach((item, index) => {
            let message = getRandomQuote(); // Get a new quote for each image
    
            // Ensure the quote is not already posted
            while (postedQuotes.includes(message)) {
                message = getRandomQuote(); // Get a new quote if it was already used
            }
    
            postedQuotes.push(message); // Add the new quote to the list of posted quotes
            displayAbout(item, message, index);
        });
    }

    function getRandomQuote() {
        console.log(quotes.length);
        const  index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    }

    function displayAbout(item,message,index) {
        const  aboutContainer = document.querySelector('.lily-about');

        const newTitokDiv = document.createElement('div');
        newTitokDiv.classList.add('tik-tok-div');
        newTitokDiv.style.backgroundImage = `url(${item.img})`; // Background image for the div

        const timeTrak = document.createElement('div');
        timeTrak.classList.add('tiktok-time-track');
        newTitokDiv.appendChild(timeTrak);

        const timeBar  = document.createElement('div');
        timeBar.classList.add('tiktok-time-bar');
        timeTrak.appendChild(timeBar);

        const lyricContainer = document.createElement('div');
        lyricContainer.classList.add('lyrics-container');
        
        // Create lyricContainer and the song-lyrics placeholder
        const innerlyricContainer = document.createElement('div');
        innerlyricContainer.classList.add('song-lyrics');
        lyricContainer.appendChild(innerlyricContainer);

        // Display message below the song-lyrics container (without overwriting the placeholder)
        const messageSpan = document.createElement('span');
        messageSpan.textContent = `" ${message} "`;
        lyricContainer.appendChild(messageSpan); // Append message to the same container

        newTitokDiv.appendChild(lyricContainer);
       
        const actions = createActionButton(item, index, message);

        newTitokDiv.appendChild(actions);
        aboutContainer.appendChild(newTitokDiv);

    }

    function createActionButton(item, index, message) {
        const actionBtn = document.createElement('div');
        actionBtn.classList.add('action-buttons');
    
        const playBtn = document.createElement('span');
        playBtn.innerHTML = `<i class='fas fa-play'></i>`;
        playBtn.onclick = () =>{ 
            isPlay = !isPlay;
            playTikTokDiv(item.songurl, item.start, item.duration, index, playBtn,item);
            updatePlayButton(playBtn, isPlay)
        };
    
        const heartBtn = document.createElement('span');
        heartBtn.innerHTML = `<i class='fas fa-heart'></i>`;

        // Check if this TikTok div is already hearted (persisted in localStorage)
        let lovedItems = JSON.parse(localStorage.getItem('lovedItems')) || [];
        let isLoved = lovedItems.includes(index); // Check if this div is hearted
        heartBtn.style.backgroundColor = isLoved ? "#ee0a5e" : '#004494'; // Set heart button color
    
        heartBtn.onclick = () => {
            isLoved = !isLoved;
            heartBtn.style.backgroundColor = isLoved ? "#ee0a5e" : '#004494';
            if (isLoved) {
                lovedItems.push(index); // Add index to lovedItems array
                showLoveEmojis(); // Show the emojis animation
            } else {
                lovedItems = lovedItems.filter(i => i !== index); // Remove index from lovedItems array
            }
            localStorage.setItem('lovedItems', JSON.stringify(lovedItems)); // Save updated lovedItems array
        };
        
        const CopyBtn = document.createElement('span');
        CopyBtn.innerHTML = `<i class="fas fa-clipboard"></i>`;
        CopyBtn.onclick = () => copyMessage(message,CopyBtn);

    
        actionBtn.appendChild(playBtn);
        actionBtn.appendChild(heartBtn);
        actionBtn.appendChild(CopyBtn);
    
        return actionBtn;
    }

    // Function to play TikTok song and manage other functionalities
    function playTikTokDiv(songurl, start, duration, index, element,item) {
        
        const allTikTokDiv = document.querySelectorAll('.tik-tok-div');        

        // Check if currentSong is playing and if the current div is the same
        if (currentTiktokSong && !currentTiktokSong.paused && currentDiv === allTikTokDiv[index]) {
            currentTiktokSong.pause();
            updatePlayButton(element, false); 
            isPlay = false; // Update the state flag
            return;
        }

        
        // Pause the current song if another is playing
        if (currentTiktokSong) {
            currentTiktokSong.pause();
            isPlay = false;
            // Clear the previous time bar
            const previousTimeBar = currentDiv.querySelector('.tiktok-time-bar');
            if (previousTimeBar) {
                previousTimeBar.style.width = '0%';
            }
        }

        // Update play buttons for all TikTok Divs
        updateAllPlayButtons(index);
  
        
        currentTiktokSong = new Audio(songurl);
        currentTiktokSong.currentTime = start;
        currentTiktokSong.play();
        isPlay = true; // Update the state flag
        
        // Update the clicked button to 'pause' icon
        updatePlayButton(element, true);  

        currentDiv = allTikTokDiv[index];

        currentDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        const totalTime = start + duration;

        currentTiktokSong.addEventListener('timeupdate', function() {
            updateTimeBar(currentDiv,start, currentTiktokSong.currentTime, totalTime);

            if (currentTiktokSong.currentTime >= totalTime) {
                currentTiktokSong.pause();
                updatePlayButton(element, false); // Set to play icon after the song ends
                updateAllPlayButtons(index);
                getNextindexSong(index, element,item);

                 // Clear the time bar when the song finishes
                const timeBar = currentDiv.querySelector('.tiktok-time-bar');
                timeBar.style.width = '0%';
            }

            // Display lyrics at specific times
            displayLyricsAtTime(item.lyrics, currentTiktokSong.currentTime,currentDiv);
        });

        updateAllPlayButtons(index);
        
    }

    function updateTimeBar(currentDiv,start, currentTime, totalTime) {
        const timeBar = currentDiv.querySelector('.tiktok-time-bar');
        const progress = ((currentTime - start) / (totalTime - start)) * 100
        timeBar.style.width = `${progress}%`;
    }
    

    function updateAllPlayButtons(currentIndex) {
        const allPlayButtons = document.querySelectorAll('.action-buttons span:first-child');
        allPlayButtons.forEach((btn, index) => {

            btn.innerHTML = `<i class='fas fa-play'></i>`;
            btn.disabled = true;

            if (index === currentIndex && isPlay) {
                btn.innerHTML = `<i class='fas fa-pause'></i>`;
                btn.disabled = false;
            } 
        });
    }
    
    function displayLyricsAtTime(lyrics, currentTime, currentDiv) {
        const lyricContainer = currentDiv.querySelector('.lyrics-container');
    
        // Check each timestamp and update the lyricContainer when the current time matches
        Object.keys(lyrics).forEach(key => {
            const timeInSeconds = parseInt(key.replace('at', ''), 10); // Get the time value from key (e.g., 'at32' -> 32)
    
            if (currentTime >= timeInSeconds && currentTime < timeInSeconds + 5) { // Show lyric for 5 seconds
                lyricContainer.querySelector('.song-lyrics').innerHTML = `<span>" ${lyrics[key]} "</span>`;
            }
        });
    }
    

    function getNextindexSong(index, element,item) {
        const container = document.querySelector('.lily-about');
        const allTikTokDiv = [...container.querySelectorAll('.tik-tok-div')];
    
        // Calculate the next index
        let nextIndex = index + 1;
    
        // If we reached the end, loop back to the first div
        if (nextIndex >= allTikTokDiv.length) {
            nextIndex = 0;
        }
    
        // Retrieve the details of the next TikTok div (image, song, etc.)
        const nextItem = imagesAndSong[nextIndex];

        // Call playTikTokDiv for the next TikTok div
        playTikTokDiv(nextItem.songurl, nextItem.start, nextItem.duration, nextIndex, element,item);
    }

    function updatePlayButton(element, state) {
        element.innerHTML = state ?  "<i class='fas fa-pause'></i>" : "<i class='fas fa-play'></i>";
    }

    function copyMessage(message, element) {
        const text = message + " - Bruz Liz";
        
        // Copy text to the clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Show copied icon or feedback
            element.innerHTML = '<i class="fas fa-check"></i>';
    
            // Revert back to the clipboard icon after 1 second
            setTimeout(() => {
                element.innerHTML = '<i class="fas fa-clipboard"></i>';
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            // Optionally show an error message or icon
            element.innerHTML = '<i class="fas fa-xmark"></i>';
    
            // Revert back to the clipboard icon after 1 second
            setTimeout(() => {
                element.innerHTML = '<i class="fas fa-clipboard"></i>';
            }, 1000);
        });
    }

    function showLoveEmojis() {
        // Create a div element
        const loveEmojisDiv = document.createElement('div');
        loveEmojisDiv.style.fontSize = '6rem';
        loveEmojisDiv.style.position = 'fixed';
        loveEmojisDiv.style.top = '50%';
        loveEmojisDiv.style.left = '50%';
        loveEmojisDiv.style.transform = 'translate(-50%, -50%)';
        loveEmojisDiv.style.display = 'none';

        // Create a Font Awesome heart icon
        const heartIcon = document.createElement('i');
        heartIcon.className = 'fas fa-heart';
        loveEmojisDiv.className = 'love-emoji';

        // Append the heart icon to the div
        loveEmojisDiv.appendChild(heartIcon);

        // Append the div to the body
        document.body.appendChild(loveEmojisDiv);

        // Show the div
        loveEmojisDiv.style.display = 'block';

        // Hide the div after 2 seconds
        setTimeout(() => {
            loveEmojisDiv.style.display = 'none';
            // Remove the div from the DOM
            document.body.removeChild(loveEmojisDiv);
        }, 2000);
    }

    function displayVideoPlayerOverlay(videoContainer, state) {
        let overlay = videoContainer.querySelector('.video-overlay');
    
        if (state) {
            if (!overlay) { // Create overlay if it doesn't exist
                overlay = document.createElement('div');
                overlay.classList.add('video-overlay');
    
                const button = document.createElement('button');
                button.textContent = 'Subscribe';
                overlay.appendChild(button);

                button.addEventListener('click', () => {
                    button.innerHTML = '<span>Thanks <i class="fas fa-heart"></i></span';
                    setTimeout(() => {
                        button.textContent = 'Subscribe';
                        window.open('https://www.facebook.com/bruz.liz.1', '_blank');

                    },2000)
                })

                const backButton = document.createElement('button');
                backButton.textContent = 'Come back later';
                overlay.appendChild(backButton);

                backButton.addEventListener('click', () => {
                    introDiv.style.display = 'flex';
                    fancierOverlay.style.display = 'none';
                    document.querySelector('.lily-content').style.display = 'none';
                    document.querySelector('.liz-content').style.display = 'none';
                });

                const closeButton = document.createElement('button');
                closeButton.textContent = 'Close';
                overlay.appendChild(closeButton);

                closeButton.onclick = () => { 
                    fancierOverlay.style.display = 'none';
                    displayAboutContent();
                }
    
                videoContainer.appendChild(overlay);
            }
        } else {
            if (overlay) { // Remove overlay if it exists
                videoContainer.removeChild(overlay);
            }
        }
    }

    function createSong(audiosrc) {
        const song = new Audio(audiosrc);

        return song;
    }

    
    function animateFancy() {
        const playAudio = document.querySelector('.audio-control');
        currentSong = createSong(fancierAudio[currentSongIndex])
        currentSong.addEventListener('loadedmetadata', () => {
        
            playAudio.addEventListener('click', () => {
                isPlaying = !isPlaying;
            
                if (isPlaying) {
                    currentSong.play();
                    playAudio.innerHTML = '<span><i class="fas fa-pause"></i></span>';
                   playVideos(allVideos, currentSong);
                } else {
                    currentSong.pause();
                    if (currentVideoElement) {
                        currentVideoElement.pause();
                    }
                    playAudio.innerHTML = '<span><i class="fas fa-play"></i></span>';
                    playAudio.style.color = '#0056b3';
                }
            });
        });
    }

    function playVideos(videos, audioElement) {
        let currentVideoIndex = 0;
        let currentVideoElement = populateVideo(videos[currentVideoIndex]);
    
        audioElement.addEventListener('timeupdate', () => {
            const currentVideo = videos[currentVideoIndex];
    
            if (audioElement.currentTime >= currentVideo.start && audioElement.currentTime <= currentVideo.end) {
                if (currentVideoElement.paused) {
                    currentVideoElement.play();
                    currentVideoElement.scrollIntoView({behavior:"smooth", block:"center"});
                    isPlaying = true;
                }
            } else {
                if (!currentVideoElement.paused) {
                    currentVideoElement.pause();
                }
    
                if (audioElement.currentTime > currentVideo.end) {
                    currentVideoIndex++;
                    if (currentVideoIndex < videos.length) {
                        currentVideoElement = populateVideo(videos[currentVideoIndex]);
                    }
                    else {
                        audioElement.pause();
                        isPlaying = false;
                        loadNextSong();
                    }
                }
                
            }
        });


        audioElement.addEventListener('pause', () => {
            if (!currentVideoElement.paused) {
                currentVideoElement.pause();
            }
        });
    }
    
    
    function loadNextSong() {
        currentSongIndex = (currentSongIndex + 1) % fancierAudio.length;
        currentSong = createSong(fancierAudio[currentSongIndex]);
        animateFancy();
    }
    
    function populateVideo(videoInfo) {
        const listVideos = document.querySelector('.list-videos');
    
        const videoContainer = document.createElement('div');
        videoContainer.classList.add('this-side');
    
        const videoField = document.createElement('div');
        videoField.classList.add('video-field');
    
        const videoElement = document.createElement('video');
        videoElement.src = videoInfo.src;
        videoElement.muted = true;
    
        videoField.appendChild(videoElement);
        videoContainer.appendChild(videoField);
        listVideos.appendChild(videoContainer);
    
        return videoElement;
    }
    
})