/* 
Author: Vinay Kumar
github: https://github.com/tech-haxz
Description: A simple calculator application that performs basic arithmetic operations.
*/

// Selecting the display element
const display = document.getElementById("display");

// Function to add value to display
function appendToDisplay(value) {
  if (display.value === "0" && value !== ".") {
    display.value = "";
  }
  if (display.value === "Error") {
    display.value = "";
  }
  display.value += value;
}

// function to clear the display
function clearDisplay() {
  display.value = "0";
}

// function to remove last character
function remove() {
  if (display.value === "" || display.value === "Error") {
    display.value = "0";
    return;
  }
  let elmArr = display.value.split("");
  elmArr.pop();
  display.value = elmArr.join("");
}

// Function to calculate the result
function calculate() {
  if (display.value.includes("%")) {
    display.value = display.value.replace(/%/g, "/100*");
  }
  try {
    result = eval(display.value);
  } catch (error) {
    result = "Error";
  }
  display.value = result;
}
