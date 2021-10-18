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
// Heap Sort (max heap)
//------------------------------------------------------------------------------

//function will call recursive function and return animations
export function heapSortAnimations(array, primaryBarColor, secondaryBarColor) {
    //define array for the animations
    const animations = [];

    // call the sorting function and return the animations
    heapSort(array, animations, primaryBarColor, secondaryBarColor);
    return animations;
    //return array; 
}

// function will sort the given array and create animations
function heapSort(array, animations, primaryBarColor, secondaryBarColor) {
    //define constant for length of array
    var n = array.length;

    //build the heap
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(array, n, i, animations, primaryBarColor, secondaryBarColor);
    }

    //extract element from heap
    for (var j = n - 1; j > 0; j--) {
        
        //highlight root and element at the end to be swapped
        animations.push([0, array[0], secondaryBarColor]);
        animations.push([j, array[j], secondaryBarColor]);

        //swap element at root and element at the end
        swap(array, 0, j);

        //revert root and element at the end to origional color
        animations.push([0, array[0], primaryBarColor]);
        animations.push([j, array[j], primaryBarColor]);

        // call (max) heapify on the reduced heap
        heapify(array, j, 0, animations, primaryBarColor, secondaryBarColor);
    }
}

//heapify a subtree given array, length of array (n), and the node (i)
function heapify(array, n, i, animations, primaryBarColor, secondaryBarColor) {
    //index of the largest element (initialized as root)
    var largest = i;

    //index of the left child node
    var leftChild = (2 * i) + 1;

    //index of the right child node
    var rightChild = (2 * i) + 2;

    //highlight largest as it is being compared 
    animations.push([largest, array[largest], secondaryBarColor]);

    //If the left child is larger that the root node, set it as the new largest
    if (leftChild < n && array[leftChild] > array[largest]) {
        
        //highlight leftchild
        animations.push([leftChild, array[leftChild], secondaryBarColor]);

        
        //revert largest to original color
        animations.push([largest, array[largest], primaryBarColor])
        
        //set the index of the largest element to be that of the left child node
        largest = leftChild;
        
        //revert leftchild to original color
        animations.push([leftChild, array[leftChild], primaryBarColor]);
    } else {
        // done comparing revert largest to origianl color if not already reverted
        animations.push([largest, array[largest], primaryBarColor]);
    }

    //highlight largest as it is being compared 
    animations.push([largest, array[largest], secondaryBarColor]);

    //If the right child is larger than the largest node so far, set it as the new largest
    if (rightChild < n && array[rightChild] > array[largest]) {
        //highlight rightchild as it is now being compared
        animations.push([rightChild, array[rightChild], secondaryBarColor]);

        //revert largest to origional color
        animations.push([largest, array[largest], primaryBarColor])

        //set the index of the largest element to be that of the right child node
        largest = rightChild;

        //revert rightchild to original color
        animations.push([rightChild, array[rightChild], primaryBarColor]);

    } else {
        // done comparing revert largest to origianl color if not already reverted
        animations.push([largest, array[largest], primaryBarColor]);
    }

    // if the largest node is not the root than we swap the root with the largest
    if (largest !== i) {
        //highlight root and largest value to be swapped
        animations.push([i, array[i], secondaryBarColor]);
        animations.push([largest, array[largest], secondaryBarColor]);

        //swap element at the root for the larest element 
        swap(array, i, largest)

        //revert root and largest to original color
        animations.push([i, array[i], primaryBarColor]);
        animations.push([largest, array[largest], primaryBarColor]);

        // call heapify recursivly on the rest of the sub-tree
        heapify(array, n, largest, animations);
    }
}