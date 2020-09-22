let dataAlert = document.querySelector ('.data-alert span');
let dataRole = document.querySelector ('.data-role span');
let dataData = document.querySelector ('.data-data');
let dInfo = document.querySelector ('.d-info');
let dContentImage = document.querySelector ('.d-content-image');
let dNumbers = document.querySelector('.data-numbers');

let currentStage = 0;
let number = '';
let whiteVote = false;
let votes = [];

function runStage() {
    let stage = stages[currentStage];
    number = '';
    whiteVote = false;

    let dNumbersHtml = '';
    for (let i=0;i<stage.numbers;i++) {
        if (i === 0) {
            dNumbersHtml += '<div class="data-number  selected"></div>';
        } else {
        dNumbersHtml += '<div class="data-number "></div>';
        }
    }

    dataAlert.style.display = 'none';
    dataRole.innerHTML = stage.title;
    dataData.innerHTML = '';
    dInfo.style.display = 'none';
    dContentImage.innerHTML = '';
    dNumbers.innerHTML = dNumbersHtml;
}

function interfaceUpdate() {
    let stage = stages[currentStage];
    let candidate = stage.candidates.filter((item)=>{
        if (item.number === number) {
            return true;
        } else {
            return false;
        }
    });
    if (candidate.length > 0) {
        candidate = candidate[0];
        dataAlert.style.display = 'initial';
        dInfo.style.display = 'initial';
        if (candidate.vice !== undefined) {
            dataData.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}<br/>Vice: ${candidate.vice}`;
        } else {
            dataData.innerHTML = `Nome: ${candidate.name}<br/>Partido: ${candidate.party}`;
        }
        
        let photosHtml = '';
        for (let i in candidate.photos ) {
            if (candidate.photos[i].small) {
                photosHtml += `<div class="d-content-image"><div class="image small"><img src="images/${candidate.photos[i].url}">${candidate.photos[i].subtitle}</div>`;
            } else {
                photosHtml += `<div class="d-content-image"><div class="image"><img src="images/${candidate.photos[i].url}">${candidate.photos[i].subtitle}</div>`;
            }
        }
        dContentImage.innerHTML = photosHtml;
    } else {
        dataAlert.style.display = 'initial';
        dInfo.style.display = 'initial';
        dataData.innerHTML = '<div class="big-alert selected">Voto Nulo</div>';
    }
}

function clicked(n) {
    let elNumber = document.querySelector('.data-number.selected');
    if(elNumber !== null){
        elNumber.innerHTML = n;
        number = `${number}${n}`;

        elNumber.classList.remove('selected');
        if (elNumber.nextElementSibling !== null) {
            elNumber.nextElementSibling.classList.add('selected');
        } else {
            interfaceUpdate();
        }
        
    }
}

function white() {
    number = '';
    whiteVote = true;
    dataAlert.style.display = 'initial';
    dInfo.style.display = 'initial';
    dNumbers.innerHTML = '';
    dataData.innerHTML = '<div class="big-alert selected">Voto em branco</div>';
    dContentImage.innerHTML = '';
}

function fix() {
    runStage();
}

function confirm() {
    let stage = stages[currentStage];
    let confirmedVote = false;

    if(whiteVote === true){
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: 'branco'
        });
    } else if (number.length === stage.numbers){
        confirmedVote = true;
        votes.push({
            stage: stages[currentStage].title,
            vote: number
        });
    }

    if (confirmedVote) {
        currentStage++;
        if (stages[currentStage] !== undefined) {
            runStage();
            playInterAudio()
        } else {
            document.querySelector('.display').innerHTML = '<div class="mega-alert selected">Fim</div><div class="voted">Votou</div>';
            playEndAudio()
            setTimeout(function() {
                location.reload();
            }, 8000);
        }
    }
}
runStage();

function playEndAudio() {
    let endAudio = new Audio('mp3/end.mp3');
    endAudio.play();
  }

  function playInterAudio() {
    let interAudio = new Audio('mp3/inter.mp3');
    interAudio.play();
  }

  function playOpsAudio() {
    let opsAudio = new Audio('mp3/ops.mp3');
    opsAudio.play();
  }