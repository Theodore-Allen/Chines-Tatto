const symbol = document.getElementsByClassName("symbol");
const meaning = document.getElementsByClassName("meaning");
const randomBtn = document.getElementById("random-btn")
const downloadBtn = document.getElementById("download-btn")
const shareName = document.getElementById("shareName");
const shareBtn = document.getElementById("shareBtn")
const params = Object.fromEntries(new URLSearchParams(window.location.search));
const baseUrl = window.location.origin + window.location.pathname;
let currentSymbols = [params.t1,params.t2,params.t3]





console.log(params.name ? params.name : "God")
shareName.innerText = params.name ? params.name : "God"


fetch("./words.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((words) => {
    words = words.words;
    console.log(params.t1)
    console.log(params.t2)
    console.log(params.t3)
    const symble = [words.find(e => e.english === params.t1),words.find(e => e.english === params.t2), words.find(e => e.english === params.t3)]
  
console.log(params)


   

    shareBtn.addEventListener('click', () =>
    {
      share();
    })
    randomBtn.addEventListener('click', ()=>
    {

      const _temp = []
      for(let i = 0; i <= 2; i++)
        {
          const symbolData =  words[randNum(words.length)]
            console.log(i)
            setSymbol(i,symbolData.english,symbolData.chinese)
          _temp.push(symbolData.english)
        }
        currentSymbols = _temp
        console.log(currentSymbols)
    })
    
    
    console.log();
    for(let i = 0; i <= 2; i++)
      {
        
        const symbolData =  symble[i]
        if(symbolData){

          console.log(i)
          setSymbol(i,symbolData.english,symbolData.chinese)
        }
         
      }


  })
  .catch((error) => console.error("Error fetching JSON:", error));

function setSymbol(count, name, _symbol) {

  if(!name) return


  const itemS = symbol[count];
  const itemM = meaning[count];

  itemS.style.animation = "none";
  itemS.style.animation = 'in 0.5s forwards';
  itemM.style.animation = "none";
  itemM.style.animation = 'in 0.5s forwards';





  itemS.addEventListener('animationend', function() {
    // This code runs after the animation finishes
  
    itemS.innerText = _symbol;
    itemM.innerText = name;

    itemS.style.animation = 'out 0.5s forwards';
    itemM.style.animation = 'out 0.5s forwards';
  });

}
downloadBtn.addEventListener("click", () =>
{
  download()
})
function download()
{
  const element = document.getElementById('txt-container');

  html2canvas(element).then(function(canvas) {
    // Create an image from the canvas
    const imgData = canvas.toDataURL('image/png');

    // Create an anchor element to download the image
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'ChinesTatto.png'; // Specify the filename
console.log("download")
    // Trigger the download
    link.click();

  })
}

function randNum(max) {
  const randomInteger = Math.floor(Math.random() * max);
  return randomInteger;
}
function share()
{
  console.log(currentSymbols)
  const shareURL = `${baseUrl}?name=jeff&t1=${currentSymbols[0]}&t2=${currentSymbols[1]}&t3=${currentSymbols[2]}`
  copyToClipboard(shareURL);
  alert(`Copied to clipboard!`)
}
function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => console.log("Copied to clipboard!"))
    .catch(err => console.error("Error copying text:", err));
}


