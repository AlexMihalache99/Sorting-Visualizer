//buttons variables
let random_array = $("#random_array");
let bubblesort = $("#bubblesort");
let heapsort = $("#heapsort");
let quicksort = $("#quicksort");
let insertionsort = $("#insertionsort");
let stopsorting = $("#stopsorting");
let bars_container = $("#bars_container");

//bar properties variables
let minRange = 1;
let maxRange = 100;
let numOfBars = 100;
let heightFactor = 7;
let unsorted_array = new Array(numOfBars);

//helper variables
let isSorting = true;
let sleepTime = 30;

//timer variables
var minutesLabel = $("#minutes");
var secondsLabel = $("#seconds");
var totalSeconds = 0;

/**
 * Helper function for timer.
 * Adds minutes, seconds to
 * their labels.
 */
function setTime() {

  ++totalSeconds;
  secondsLabel.html(pad(totalSeconds % 60));
  minutesLabel.html(pad(parseInt(totalSeconds / 60)));

}

 /**
  * Functio for displaying 
  * the timer correctly.
  * @param {*} val - current secs or mins.
  * @returns correct display of time
  */
function pad(val) {

  var valString = val + "";

  if (valString.length < 2) {

    return "0" + valString;

  } else {

    return valString;

  }

}

/**
 * Function to get a random nunber 
 * in an interval.
 * @param {*} min - left side of interval.
 * @param {*} max - right side of interval.
 * @returns random number between min and max.
 */
function random_num(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

/**
 * Creates a random array using
 * a random number generator.
 */
function createRandomArray(){

    for(let i = 0; i < numOfBars; i++){

        unsorted_array[i] = random_num(minRange, maxRange);

    }

}

/**
 * Renders the array numbers as bars.
 * @param {*} array - array to be rendered.
 */
function renderBars(array){

    for(let i = 0; i < array.length; i++){

        let bar = $("<div></div>");
        bar.addClass("bar");
        bar.css("height", array[i] * heightFactor + "px");
        bars_container.append(bar);

    }

}

/**
 * Is waiting for the webpage to be loaded
 * before randomizing and displaying bars.
 */
document.addEventListener("DOMContentLoaded", function(){

    createRandomArray();
    renderBars(unsorted_array);

});

/**
 * Event listener for random array button.
 */
random_array.click(function(){
    
    createRandomArray();
    bars_container.html("");
    renderBars(unsorted_array);

});

/**
 * Event listener for bubble sort algorithm. 
 */
bubblesort.click(function(){

    isSorting = true;
    bubbleSort(unsorted_array);

});

/**
 * Event listener for insertion sort algorithm.
 */
insertionsort.click(function(){

    isSorting = true;
    insertionSort(unsorted_array);

})

/**
 * Event listener for heap sort algorithm.
 */
heapsort.click(function(){

    isSorting = true;
    HeapSort(unsorted_array);

})

/**
 * Event listener for quick sort algorithm.
 */
quicksort.click(function(){

    isSorting = true;
    quickSort(unsorted_array, 0, unsorted_array.length - 1);

})

/**
 * Event listener for stopping the sort.
 */
stopsorting.click(function(){

    isSorting = false;

});

/**
 * Sleeping function for animation delay.
 * @param {*} ms - how many ms to sleep
 * @returns delaying an action for ms miliseconds
 */
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Bubble sort of an aray.
 * @param {*} array - array to be sorted.
 * @returns a sorted array.
 */
async function bubbleSort(array){
    
    var timer = setInterval(setTime, 1000);
    let bars = document.getElementsByClassName("bar");

    for(var i = 0; i < array.length; i++){
       
      for(var j = 0; j < array.length -1 ; j++){
         
        if(array[j] > array[j+1]){

            for(let k = 0; k < bars.length; k++){

                if(k!==j && k!==j + 1){

                    bars[k].style.backgroundColor = "aqua";

                }

            }
        
          var temp = array[j];
          array[j] = array[j + 1];
          array[j+1] = temp;

          bars[j].style.height = array[j] * heightFactor + "px";
          bars[j].style.backgroundColor = "magenta";

          bars[j+1].style.height = array[j+1] * heightFactor + "px";
          bars[j+1].style.backgroundColor = "magenta";

          await sleep(sleepTime);

          if(isSorting == false){

            break;

          }

        }
      }
      if(isSorting == false){

        break;

      }

      await sleep(sleepTime); 

    }

    clearInterval(timer);
    clearTimer();

    return array;

   }


/**
 * Heap sort of an array.
 * @param {*} array - array to be sorted.
 * @returns - sorted array.
 */
async function HeapSort(array) {
    var timer = setInterval(setTime, 1000);
    let bars = document.getElementsByClassName("bar");

    for (let i = Math.floor(array.length / 2); i >= 0; i--) {

        if(isSorting == false){
            break;
          }

        await heapify(array, array.length, i);

    }
    for (let i = array.length - 1; i >= 0; i--) {

        if(isSorting == false){
            break;
          }

        await swap(array, 0, i, bars);
        await heapify(array, i, 0);
        
    }
    for (let k = 0; k < bars.length; k++) {

        if(isSorting == false){
            break;
          }

        bars[k].style.backgroundColor = "aqua";
        await sleep(sleepTime);

    }

    clearInterval(timer);
    clearTimer();

    return array;

  }

/**
 * Process of creating a heap data.
 * @param {*} array - array to be sorted.
 * @param {*} n - array length
 * @param {*} i - position to heapify.
 */
async function heapify(array, n, i) {

    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {

        largest = left;

    }

    if (right < n && array[right] > array[largest]) {

        largest = right;

    }

    if (largest != i) {

        await swap(array, i, largest, bars);
        await heapify(array, n, largest);

    }

}

/**
 * Swapping two elements in an array.
 * @param {*} array - array 
 * @param {*} i - position to be swapped.
 * @param {*} j - position to be swapped.
 * @param {*} bars - rendered bars on the screen.
 * @returns 
 */
async function swap(array, i, j, bars) {

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    bars[i].style.height = array[i] * heightFactor + "px";
    bars[j].style.height = array[j] * heightFactor + "px";
    bars[i].style.backgroundColor = "magenta";
    bars[j].style.backgroundColor = "magenta";
    await sleep(sleepTime);

    for (let k = 0; k < bars.length; k++) {

        if (k != i && k != j) {

            bars[k].style.backgroundColor = "aqua";

        }
    }

    return array;

}

/**
 * Quick sort of an array.
 * @param {*} array - array to be sorted.
 * @param {*} left - starting position of the array.
 * @param {*} right - eneding position of the array.
 * @returns - sorted array.
 */
async function quickSort(array, left, right) {
    
    var index;
    let bars = document.getElementsByClassName("bar");

    if(isSorting == false){

        return;

    }

    if (array.length > 1) {

      index = await partition(array, left, right);

      if (left < index - 1) {

        await quickSort(array, left, index - 1);

      }
      if (index < right) {

        await quickSort(array, index, right);

      }

    }
  
    for (let i = 0; i < bars.length; i++) {

      bars[i].style.backgroundColor = "aqua";

    }

    return array;

}
/**
 * Partitioning of an array based on 
 * its boundaries.
 * @param {*} array - array to be partitioned.
 * @param {*} left - starting position of the array.
 * @param {*} right - ending position of the array.
 * @returns index for quick sort.
 */
async function partition(array, left, right) {

    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = array[pivotIndex];
    bars[pivotIndex].style.backgroundColor = "magenta";
  
    for (let i = 0; i < bars.length; i++) {

      if (i != pivotIndex) {

        bars[i].style.backgroundColor = "aqua";

      }

    }
  
    (i = left), (j = right);

    while (i <= j) {

      while (array[i] < pivot) {

        i++;

      }

      while (array[j] > pivot) {

        j--;

      }

      if (i <= j) {

        await swap(array, i, j, bars);
        i++;
        j--;

      }

    }

    return i;

}

/**
 * Insertion sort of an array.
 * @param {*} array - array to be sorted.
 * @returns sorted array
 */
async function insertionSort(array) {

    var timer = setInterval(setTime, 1000);
    let bars = document.getElementsByClassName("bar");

    for (let i = 1; i < array.length; i++) {

      if(isSorting == false){

        break;

      }
        
      let key = array[i];
      let j = i - 1;

      while (j >= 0 && array[j] > key) {

        array[j + 1] = array[j];
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "magenta";
        await sleep(sleepTime);
  
        for (let k = 0; k < bars.length; k++) {

          if (k != j + 1) {

            bars[k].style.backgroundColor = "aqua";

          }

        }

        j = j - 1;

      }

      array[j + 1] = key;
      bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
      bars[j + 1].style.backgroundColor = "magenta";
      await sleep(sleepTime);

    }
  
    for (let k = 0; k < bars.length; k++) {

      bars[k].style.backgroundColor = "aqua";

    }

    clearInterval(timer);
    clearTimer();
    return array;

  }

/**
 * After the stop button has been pressed,
 * clear the displayed timer.
 */
async function clearTimer(){

    await sleep(1500);
    minutesLabel.html("00");
    secondsLabel.html("00");
    totalSeconds = 0;

}