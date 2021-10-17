//------------------------------------------------------------------------------
// Merge Sort
//------------------------------------------------------------------------------
export function mergeSortAnimations(array){
    const animations = [];
    //edgecase, not needed as smallest array allowed is 50 bars.
    //if (array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper (array, 0, array.length - 1, auxArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, floorIndx, ceilIndx, auxArray, animations,
){
    if (floorIndx === ceilIndx) return;
    const middleIndx = Math.floor((floorIndx + ceilIndx) / 2);
    mergeSortHelper(auxArray, floorIndx, middleIndx, mainArray, animations);
    mergeSortHelper(auxArray, middleIndx +1, ceilIndx, mainArray, animations);
    doMerge(mainArray, floorIndx, middleIndx, ceilIndx, auxArray, animations);
}

function doMerge(mainArray, floorIndx, middleIndx, ceilIndx, auxArray, animations,
)   {
    let k = floorIndx;
    let i = floorIndx;
    let j = middleIndx + 1;

    while ( i <= middleIndx && j <= ceilIndx){
        animations.push([i, j]);
        animations.push([i, j]);

        if(auxArray[i] <= auxArray[j]){
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        } else {
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    while(i <= middleIndx){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    while (j <= ceilIndx){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}

//------------------------------------------------------------------------------
// Quick Sort (Lomuto Method)
//------------------------------------------------------------------------------
export function quickSortAnimations(array, primaryBarColor, SecondaryBarColor){
    //define array for animations that will be passed back
    const animations = [];

    quickSort(array, 0, array.length -1, animations, primaryBarColor, SecondaryBarColor);
    return animations;
}


function quickSort(array, lowIndx, highIndx, animations, primaryBarColor, SecondaryBarColor) {

    //find index and partition array
    var pIndx = partition(array, animations, lowIndx, highIndx, primaryBarColor, SecondaryBarColor);

    //recursive call on lower half
    if (lowIndx < (pIndx - 1)) {
        quickSort(array, lowIndx, pIndx - 1, animations, primaryBarColor, SecondaryBarColor);
    }

    //recursive call on upper half
    if (highIndx > pIndx) {
        quickSort(array, pIndx + 1, highIndx, animations, primaryBarColor, SecondaryBarColor);
    }
}

function partition(array, animations, lowIndx, highIndx, primaryBarColor, SecondaryBarColor) {
    // array[highIndx] is the pivot.
    var pivotIndx = highIndx;
    var i = lowIndx;

    //push the pivot index onto the animations array, this will set its color
    animations.push([pivotIndx, array[pivotIndx], "green"]);

    //start from the left element and keep track of index of smaller (or equal to) elements as j. 
    for (var j = lowIndx; j < highIndx; j++) {
        //push the index of the element being compared to change its color
        animations.push([j, array[j], SecondaryBarColor]);

        //If we find a smaller (or equal) element, we swap current element with arr[j].
        if (array[j] <= array[pivotIndx]) {
            // push the inxed of the element to be swapped to chnage its color
            animations.push([i, array[i], SecondaryBarColor]);
            //swap the array bars
            swap(array, i, j);
            //push the indexes of the swapped elements again to revert their colors
            animations.push([j, array[j], primaryBarColor]);
            animations.push([i, array[i], primaryBarColor]);
            i++;
        } else {
            // if we don't swap the low index being compared we still revert its color
            animations.push([j, array[j], primaryBarColor]);
        }
    }
    
    // push the index of the element to be swapped with the pivot
    animations.push([i, array[i], SecondaryBarColor]);

    swap(array, i, j); //At this point j = highIndx ie pivot index

    //push the index of the two swapped elements to revert their colors
    animations.push([j, array[j], primaryBarColor]);
    animations.push([i, array[i], primaryBarColor]);
    return i;
}

//Swap helper function
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

//------------------------------------------------------------------------------
// Heap Sort
//------------------------------------------------------------------------------
