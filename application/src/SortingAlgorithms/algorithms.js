//------------------------------------------------------------------------------
// Merge Sort
//------------------------------------------------------------------------------
export function mergeSortAnimations(array, primaryBarColor, secondaryBarColor) {
    const animations = [];
    //edgecase, not needed as smallest array allowed is 50 bars.
    //if (array.length <= 1) return array;

    mergeSort (array, 0, array.length - 1, animations, primaryBarColor, secondaryBarColor);
    return animations;
}

function mergeSort(array, left, right, animations, primaryBarColor, secondaryBarColor) {
    //return recursivly 
    if (left >= right) return;

    // calculate middle index
    const mid = Math.floor((left + right) / 2);

    //call merge sort on upper and lower halves
    mergeSort(array, left, mid, animations, primaryBarColor, secondaryBarColor);
    mergeSort(array, mid + 1, right, animations, primaryBarColor, secondaryBarColor);

    //merge sub-arrays
    merge(array, left, mid, right, animations, primaryBarColor, secondaryBarColor);
}

function merge(array, left, mid, right, animations, primaryBarColor, secondaryBarColor) {
    //calculate length of temporary arrays
    var n1 = mid - left + 1;
    var n2 = right - mid;
  
    // Create temporary arrays
    var leftArray = new Array(n1); 
    var rightArray = new Array(n2);
  
    // Copy elements to temporary arrays
    for (var i = 0; i < n1; i++) {
        leftArray[i] = array[left + i];
    }
    for (var j = 0; j < n2; j++) {
        rightArray[j] = array[mid + 1 + j];    
    }

    // Initial index of first subarray
    i = 0;
    // Initial index of second subarray
    j = 0;
    // Initial index of merged subarray
    let k = left;

    //compare values and overwrite correct value from the left/right array to the main array
    while(i < n1 && j < n2) {
        //push animation to hightlight bars being compared
        animations.push([left + i, array[left + i], secondaryBarColor]);
        animations.push([mid + 1 + j, array[mid + 1 + j], secondaryBarColor]);

        //push animation to revert bars to original color
        animations.push([left + i, array[left + i], primaryBarColor]);
        animations.push([mid + 1 + j, array[mid + 1 + j], primaryBarColor]);

        if(leftArray[i] <= rightArray[j]){
            //push animation to highlight bar that is being overwritten
            animations.push([k, array[k], secondaryBarColor]);
            //overwrite value
            array[k] = leftArray[i];
            //push animation to revert color with neew overwritten value
            animations.push([k, array[k], primaryBarColor]);           
            i++;
        } 
        else {
            //push animation to highlight bar that is being overwritten
            animations.push([k, array[k], secondaryBarColor]);
            //overwrite value
            array[k] = rightArray[j];
            //push animation to revert color with neew overwritten value
            animations.push([k, array[k], primaryBarColor]);            
            j++;
        }
        k++;
    }

    //copy remaining elements of the left array if there are any
    while(i < n1) {
        //push animation to highlight bar that is being overwritten
        animations.push([k, array[k], secondaryBarColor]);       
        //overwrite value
        array[k] = leftArray[i];
        //push animation to revert color with neew overwritten value
        animations.push([k, array[k], primaryBarColor]); 
        i++;
        k++;
    }

    //copy remaining elements of the right array if there are any
    while(j < n2) {
        //push animation to highlight bar that is being overwritten
        animations.push([k, array[k], secondaryBarColor]);
        //overwrite value
        array[k] = rightArray[j];
        //push animation to revert color with neew overwritten value
        animations.push([k, array[k], primaryBarColor]); 
        j++;
        k++;
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
            // push the index of the element to be swapped to change its color
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

//------------------------------------------------------------------------------
// Bubble Sort
//------------------------------------------------------------------------------
export function bubbleSortAnimations(array, primaryBarColor, secondaryBarColor) {
    //define array for the animations
    const animations = [];

    // call the sorting function and return the animations
    bubbleSort(array, animations, primaryBarColor, secondaryBarColor);
    return animations;
}

function bubbleSort(array, animations, primaryBarColor, secondaryBarColor) {
    //define constant for length of array
    var n = array.length;

    // loop through all the array elements 
    for (var i = 0; i < n - 1; i++)
    {
        // the i'th element is in place so loop throught the rest 
        for (var j = 0; j < n - i - 1; j++)
        {
            // the an element is greater then the next element we swap them
            if (array[j] > array[j + 1])
            {
            //highlight the bars we are comparing
            animations.push([j, array[j], secondaryBarColor]);
            animations.push([j + 1, array[j + 1], secondaryBarColor])
            
            // perform swap
            swap(array, j, j + 1);
            
            //revert bars to original color
            animations.push([j, array[j], primaryBarColor]);
            animations.push([j + 1, array[j + 1], primaryBarColor])
            }
        }
    }
}