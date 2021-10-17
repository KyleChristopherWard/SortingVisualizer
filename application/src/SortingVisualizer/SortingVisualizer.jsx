//script imports
import React from "react";
import './SortingVisualizer.css';
import {mergeSortAnimations} from '../SortingAlgorithms/algorithms.js';
import {quickSortAnimations} from '../SortingAlgorithms/algorithms.js';

//material UI components
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

//define variables
var arraySize = 70;
const animationSpeed = 5;
const primaryBarColor = "blue";
const secondaryBarColor = "red";

export default class SortingVisualizer extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            array: [],
        };
    }
    componentDidMount(){
        this.resetArray(100);
    }

    resetArray(size){
        const array = [];
        
        for (let i = 0; i < size ; i++){
            array.push(randomIntFromInterval(10,500));
        }
        this.setState({array});
    }

    //merge sort method
    //the sorting algorithm call returns the animations. 
    mergeSort() {
        const animations = mergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
              const [barOneIndx, barTwoIndx] = animations[i];
              const barOneStyle = arrayBars[barOneIndx].style;
              const barTwoStyle = arrayBars[barTwoIndx].style;
              const color = i % 3 === 0 ? 'red' : 'blue';
              setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
              }, i * animationSpeed);
            } else {
              setTimeout(() => {
                const [barOneIndx, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIndx].style;
                barOneStyle.height = `${newHeight}px`;
              }, i * animationSpeed);
            }
          }
        }


    quickSort() {
        const animations = quickSortAnimations(this.state.array, primaryBarColor, secondaryBarColor);
        
        // do animations
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            
            setTimeout(() => {
            const [barIndx, barHeight, barColor] = animations[i]; 
            const barStyle = arrayBars[barIndx].style;
            barStyle.backgroundColor = barColor;
            barStyle.height = `${barHeight}px`;

            }, i * animationSpeed);
        }
    }

    heapSort() {}

    bubbleSort() {}

    render(){
        const {array} = this.state;
      
        //sets array size when the slider bar changes, this value is passed to reset array 
        //when button "generate random array is clicked"
        const handleChange = (event, newValue) => {
            arraySize = newValue;
          };

        return (
            <div className = "array-continer">
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick = {() => this.resetArray(arraySize)}>Generate Random Array</Button>
                        <Button color="inherit" onClick = {() => this.mergeSort()}>Merge Sort</Button>
                        <Button color="inherit" onClick = {() => this.quickSort()}>Quick Sort</Button>
                        <Button color="inherit" onClick = {() => this.heapSort()}>Heap Sort</Button>
                        <Button color="inherit" onClick = {() => this.bubbleSort()}>Bubble Sort</Button>
                        <Slider
                            size="small"
                            defaultValue={70}
                            aria-label="Small"
                            valueLabelDisplay="off"
                            color="secondary"
                            min={50}
                            max={300}
                            onChange = {handleChange}
                        />
                    </Toolbar>
                </AppBar>
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key={idx}
                        style={{
                            backgroundColor: "blue",
                            height: `${value}px`,
                            }}>
                    </div>
                ))}
            </div>
        );
    }
}


//Function to generate a random integer within the given range
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}