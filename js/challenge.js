const counter = document.getElementById('counter');
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const heartBtn = document.getElementById('heart');
const pauseBtn = document.getElementById('pause');
const likesUl = document.querySelector('.likes');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const commentsDiv = document.getElementById('list');

let count = 0;
let likes = {};
let intervalId;
let paused = false;

function updateCounter() {
    counter.textContent = count;
}

function renderLikes() {
    likesUl.innerHTML = '';
    for (let num in likes) {
        const li = document.createElement('li');
        li.textContent = `${num} has been liked ${likes[num]} time${likes[num] > 1 ? 's' : ''}`;
        likesUl.appendChild(li);
    }
}

function togglePause() {
    paused = !paused;
    if (paused) {
        clearInterval(intervalId);
        minusBtn.disabled = true;
        plusBtn.disabled = true;
        heartBtn.disabled = true;
        pauseBtn.textContent = 'resume';
    } else {
        intervalId = setInterval(() => {
            count++;
            updateCounter();
        }, 1000);
        minusBtn.disabled = false;
        plusBtn.disabled = false;
        heartBtn.disabled = false;
        pauseBtn.textContent = 'pause';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateCounter();
    intervalId = setInterval(() => {
        count++;
        updateCounter();
    }, 1000);

    minusBtn.addEventListener('click', () => {
        count--;
        updateCounter();
    });

    plusBtn.addEventListener('click', () => {
        count++;
        updateCounter();
    });

    heartBtn.addEventListener('click', () => {
        likes[count] = (likes[count] || 0) + 1;
        renderLikes();
    });

    pauseBtn.addEventListener('click', togglePause);

    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = commentInput.value.trim();
        if (comment) {
            const p = document.createElement('p');
            p.textContent = comment;
            commentsDiv.appendChild(p);
            commentInput.value = '';
        }
    });
});
