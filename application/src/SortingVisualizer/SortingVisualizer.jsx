//script imports
import React from "react";
import './SortingVisualizer.css';
import {bubbleSortAnimations, heapSortAnimations, mergeSortAnimations, quickSortAnimations} from '../SortingAlgorithms/algorithms.js';

//material UI components
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";

//define variables
var arraySize = 100;
var arrayBarWidth = Math.max(Math.floor(window.innerWidth / (arraySize * 2)), 2);
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
        const animations = mergeSortAnimations(this.state.array, primaryBarColor, secondaryBarColor);
        animate(animations);
    }

    quickSort() {
        const animations = quickSortAnimations(this.state.array, primaryBarColor, secondaryBarColor);
        animate(animations);
    }

    heapSort() {
        const animations = heapSortAnimations(this.state.array, primaryBarColor, secondaryBarColor);
        animate(animations);
    }

    bubbleSort() {
        const animations = bubbleSortAnimations(this.state.array, primaryBarColor, secondaryBarColor);
        animate(animations);
    }

    render(){
        const {array} = this.state;
      
        //sets array size when the slider bar changes, this value is passed to reset array 
        //when button "generate random array is clicked"
        const handleChange = (event, newValue) => {
            arraySize = newValue;
            arrayBarWidth = Math.max(Math.floor(window.innerWidth / (arraySize * 2)), 2);
          };

        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <div>
                            <Button 
                                variant="contained"
                                sx={{ ml: 1, mr: 1 }} 
                                color="info" 
                                onClick = {() => this.mergeSort()}>
                                Merge Sort
                            </Button>
                        </div>
                        <div>
                            <Button 
                                variant="contained"
                                sx={{ ml: 1, mr: 1 }} 
                                color="info" 
                                onClick = {() => this.quickSort()}>
                                Quick Sort
                            </Button>
                        </div>
                        <div>
                            <Button 
                                variant="contained"
                                sx={{ ml: 1, mr: 1 }} 
                                color="info" 
                                onClick = {() => this.heapSort()}>
                                Heap Sort
                            </Button>
                        </div>
                        <div>
                            <Button 
                                variant="contained" 
                                sx={{ ml: 1, mr: 3 }} 
                                color="info" 
                                onClick = {() => this.bubbleSort()}>
                                Bubble Sort
                            </Button>
                        </div>
                        <Grid container spacting={2}>
                            <Grid item xs={11}>
                                <Typography variant="h6">
                                    Array Size
                                </Typography>
                            </Grid>
                            <Grid item xs={11}>
                                <Slider
                                    width={300}
                                    size="small"
                                    defaultValue={100}
                                    aria-label="Small"
                                    valueLabelDisplay="off"
                                    color="secondary"
                                    min={50}
                                    max={300}
                                    onChange = {handleChange}
                                    sx={{ ml: 2, mr: 5}}
                                    marks={[{value:50, label:"50",}, {value:100, label:"100",}, {value:150, label:"150",}, {value:200, label:"200",}, {value:250, label:"250",}, {value:300, label:"300",}]}
                                />
                            </Grid>
                        </Grid>
                        <div>
                            <Button 
                                variant="contained"
                                sx={{ mr: 1, mt: 2, mb: 2 }} 
                                color="info" 
                                onClick = {() => this.resetArray(arraySize)}>
                                Generate Random Array
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <div className = "spacer"></div>
                {array.map((value, idx) => (
                    <div 
                        className = "array-bar" 
                        key={idx}
                        style={{
                            backgroundColor: "blue",
                            height: `${value}px`,
                            width: `${arrayBarWidth}px`,
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

//Function to perform animations 
function animate(animations){
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