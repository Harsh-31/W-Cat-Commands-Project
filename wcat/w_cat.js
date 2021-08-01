/*=====================================================================QUESTION=================================================================================
Build wcat commnad

It is used to display or make a copy content of one or more files in the terminal 


General Syntax:
node wcat.js [options] [filepaths]
option to remove big line break (-s)
option to add line number to non empty lines (-b)
option to add line numbers to all lines (-n) 

Commands:
1- node wcat.js filepath => displays content of the file in the terminal 
2- node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order.
3- node wcat.js -s filepath => convert big line breaks into a singular line break
4- node wcat.js -n filepath => give numbering to all the lines 
5- node wcat -b filepath => give numbering to non-empty lines
We can mix and match the options.

Edge cases:
1- If file entered is not found then it gives file does not exist error.
2- -n and -b are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.


=================================================================================================================================================================== */





let fs = require("fs");
let path = require("path");

// Task -1: node wcat.js filepath => displays content of the file in the terminal 
// Task -2: node wcat.js filepath1 filepath2 filepath3... => displays content of all files in the terminal in (contactinated form) in the given order.


// Take input from the user and extract content from 2nd index of the given input

let inputArr = process.argv.slice(2);
console.log(inputArr);

// Seggregating the inputArr in two arrays -> option array and file array
let optionsArr = [];
let filesArr = [];

for(let i = 0; i < inputArr.length; i++)
{
    let firstchar = inputArr[i].charAt(0);
    if(firstchar == "-")
    {
        optionsArr.push(inputArr[i]);
    }
    else
    {
        filesArr.push(inputArr[i]);
    }
}
console.log(optionsArr);
console.log(filesArr);

//===============================================================================================================================

//  EDGE CASE - 1: If file entered is not found then it gives file does not exist error.

for(let i = 0; i < filesArr.length; i++)
{
    if(fs.existsSync(filesArr[i]) == false)
    {
        console.log("File Doesnt Exist");
        return;
    }
}

//================================================================================================================================

// loop on the file array to extract the content of the files
let content = "";
for(let i = 0; i < filesArr.length; i++)
{
    let ans = fs.existsSync(filesArr[i]);
    if(ans == false)
    {
        console.log("File doesn't exist");
        return;
    }
    let fileName = filesArr[i];
    let fileContents = fs.readFileSync(fileName);
    let fc = fileContents.toString('utf8');
    content = content + fc + "\r\n";
}

let contentArr = content.split("\r\n");
//console.log(contentArr);


//=================================================================================================================================

// Task -3: node wcat.js -s filepath => convert big line breaks into a singular line breaks

let isSPresent = optionsArr.includes("-s");
if(isSPresent)
{
    for(let i = 0; i < contentArr.length; i++)
    {
        if(contentArr[i] == "" && contentArr[i - 1] == "")
        {
            contentArr[i] = null; 
        }
        else if(contentArr[i] == "" && contentArr[i - 1] == null){
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for(let i = 0; i < contentArr.length; i++)
    {
        if(contentArr[i] != null)
        {
            tempArr.push(contentArr[i]);
        }
    }
    contentArr = tempArr;
}

//console.log(contentArr.join("\n"));
contentArr.join("\n");

//==================================================================================================================================

// Task-4: node wcat.js -n filepath => give numbering to all the lines

function addNumberOriginal()
{
    let isNPresent = optionsArr.includes("-n");
    if(isNPresent)
    {
       let value = 1;
       let tempArr1 = [];
       for(let i = 0; i < contentArr.length; i++)
       {
          tempArr1.push(value + " " + contentArr[i]);
          value++;
       }
       contentArr = tempArr1;
    }
    console.log(contentArr.join("\n")); 
   
}

//===================================================================================================================================

// Task-5: node wcat -b filepath => give numbering to non-empty lines

function addNumberEmptyOriginal()
{
    let isBPresent = optionsArr.includes("-b");
    if(isBPresent)
    {
       let value = 1;
       let tempArr2 = [];
       for(let i = 0; i < contentArr.length; i++)
       {
          if(contentArr[i] != "")
          {
            tempArr2.push(value + " " + contentArr[i]);
            value++;
          }
          else 
          {
            tempArr2.push(contentArr[i]);
          }
       }
       contentArr = tempArr2;
    }
    console.log(contentArr.join("\n")); 
    
} 


//====================================================================================================================================

// EDGE CASE 2: -n and -b are 2 options which are mutually exclusive so if user types both of them together only the first enter option should work.

if(optionsArr.includes("-n") && optionsArr.includes("-b"))
{
    let idx1 = optionsArr.indexOf("-n");
    //console.log(idx1);
    let idx2 = optionsArr.indexOf("-b");
    //console.log(idx2);

    if(idx1 < idx2)
    {
        addNumberOriginal();
    }
    else
    {
        addNumberEmptyOriginal(); 
    }
}
else if(optionsArr.includes("-n"))
{
    addNumberOriginal();
}
else
{
    addNumberEmptyOriginal();
}


