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

export function quickSort(array, lowIndx, highIndx) {

    //find index and partition array
    var pIndx = partition(array, lowIndx, highIndx);

    //recursive call on lower half
    if (lowIndx < (pIndx - 1)) {
        quickSort(array, lowIndx, pIndx - 1);
    }

    //recursive call on upper half
    if (highIndx > pIndx) {
        quickSort(array, pIndx + 1, highIndx);
    }
    
    return array;
}

function partition(array, lowIndx, highIndx) {
    // array[highIndx] is the pivot.
    var pivotIndx = highIndx;
    var i = lowIndx;

    //start from the left element and keep track of index of smaller (or equal to) elements as j. 
    for (var j = lowIndx; j < highIndx; j++) {
        //If we find a smaller (or equal) element, we swap current element with arr[j].
        if (array[j] <= array[pivotIndx]) {
            swap(array, i, j);
            i++;
        }
    }
    
    swap(array, i, j);
    return i;
}

//Swap helper function
function swap(array, i, j) {
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

// export function quickSortAnimations(array) {
//     const animations = [];

//     return animations;
// }