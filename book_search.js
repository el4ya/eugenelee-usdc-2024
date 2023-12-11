/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */

/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {

    // if scannedTextObj is a valid JSON object
    if(typeof scannedTextObj != 'object') {
        throw new Error('scannedTextObj must be a valid JSON object');
    }

    // if searchTerm is not a valid String or an empty String
    if(typeof searchTerm != 'string' || (searchTerm === "")) {
        throw new Error('searchTerm must be a valid and non-empty String');
    }

    // passes edge Cases

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    result.SearchTerm = searchTerm;

    let x = scannedTextObj[0].Content;
    for( let i = 0; i < x.length; i++ ) {
        if( x[i].Text.includes( searchTerm ) ) {
            var obj = {};
            obj["ISBN"] = scannedTextObj[0].ISBN;
            obj["Page"] = x[i].Page;
            obj["Line"] = x[i].Line;
            result.Results.push( obj );
        } else if( x[i].Text.includes( "-" ) && ( i + 1 != x.length ) ) {
            let textArr1 = x[i].Text.split(" ");
            let textArr2 = x[i+1].Text.split(" ");
            const textLast = textArr1.length - 1;

            if( textArr1[textLast].includes( "-" ) ){
                let withoutDash = textArr1[textLast].replace( "-", "" ); // dark
                let newString = withoutDash.concat( textArr2[0] ); // darkness
                if( newString === searchTerm ){
                    var obj = {};
                    obj["ISBN"] = scannedTextObj[0].ISBN;
                    obj["Page"] = x[i].Page;
                    obj["Line"] = x[i].Line;
                    result.Results.push( obj );
    
                    var obj1 = {};
                    obj1["ISBN"] = scannedTextObj[0].ISBN;
                    obj1["Page"] = x[i+1].Page;
                    obj1["Line"] = x[i+1].Line;
                    result.Results.push( obj1 );
                    
                    i++;
                }
            }
        }
    }

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/** More output objects */

const matchingOut = { 
    "SearchTerm": "matching",
    "Results": [
        {
            "ISBN": "123456789",
            "Page": 24,
            "Line": 9
        },
        {
            "ISBN": "123456789",
            "Page": 6,
            "Line": 4
        }
    ]
}

const nonMatchingOut = { 
    "SearchTerm": "matching",
    "Results": [
    ]
}

const caseOut = { 
    "SearchTerm": "Matching",
    "Results": [
        {
            "ISBN": "345678912",
            "Page": 15,
            "Line": 5
        }
    ]
}

const dashOut = {
    "SearchTerm": "darkness",
    "Results": [
        {
            "ISBN": "456789123",
            "Page": 55,
            "Line": 8
        }, 
        {
            "ISBN": "456789123",
            "Page": 56,
            "Line": 1
        }

    ]
}

const includedOut = {
        "SearchTerm": "in",
        "Results": [
            {
                "ISBN": "567891234",
                "Page": 24,
                "Line": 76
            },
            {
                "ISBN": "567891234",
                "Page": 25,
                "Line": 37
            }
        ]
}
/** More inputs */

const matchingIn = [
    {
        "Title": "Matching Test",
        "ISBN": "123456789",
        "Content": [
            {
                "Page": 24,
                "Line": 9,
                "Text": "This is a matching text"
            },
            {
                "Page": 6,
                "Line": 4,
                "Text": "This is a matching text"
            },
        ] 
    }
]

const nonMatchingIn = [
    {
        "Title": "Non-Matching Test",
        "ISBN": "234567891",
        "Content": [
            {
                "Page": 72,
                "Line": 8,
                "Text": "This is a matching text"
            },
            {
                "Page": 34,
                "Line": 9,
                "Text": "This is a matching text"
            },
        ] 
    }
]

const caseIn = [
    {
        "Title": "Case sensitive Test",
        "ISBN": "345678912",
        "Content": [
            {
                "Page": 24,
                "Line": 9,
                "Text": "This is a matching text"
            },
            {
                "Page": 15,
                "Line": 5, 
                "Text": "This is not a Matching text"
            }
        ] 
    }
]

const dashIn = [
    {
        "Title": "Dash Test",
        "ISBN": "456789123",
        "Content": [
            {
                "Page": 55,
                "Line": 8,
                "Text": "Embrace the dark-"
            },
            {
                "Page": 56,
                "Line": 1,
                "Text": "ness and you might actually see the light."
            },
            {
                "Page": 49,
                "Line": 4,
                "Text": "This is not a text dark-ness which should be included in the output."
            }, 
            {
                "Page": 51,
                "Line": 1,
                "Text": "Embrace the dark-"
            }
        ] 
    }
]

const includedIn = [
    {
        "Title": "Included Test",
        "ISBN": "567891234",
        "Content": [
            {
                "Page": 24,
                "Line": 76,
                "Text": "This should be in the output"
            },
            {
                "Page": 25,
                "Line": 37, 
                "Text": "This will also be within the output"
            }
        ] 
    }
]

const invalidIn = 24;
/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/* We have provided two unit tests. They're really just `if` statements that 
 * output to the console. We've provided two tests as examples, and 
 * they should pass with a correct implementation of `findSearchTermInBooks`. 
 * 
 * Please add your unit tests below.
 * */

/** We can check that, given a known input, we get a known output. */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}

/** Test that returns a match */
const matchingResult = findSearchTermInBooks("matching", matchingIn);
if (JSON.stringify(matchingOut) === JSON.stringify(matchingResult)) {
    console.log("PASS: Matching Test")
} else {
    console.log("FAIL: Matching Test");
    console.log("Expected:", matchingOut);
    console.log("Received:", matchingResult);
}

/** Test that does not return any matches */
const nonMatchingResult = findSearchTermInBooks("non-existent", nonMatchingIn);
if (JSON.stringify(nonMatchingResult.Results.length == 0)) {
    console.log("PASS: No Matching Test")
} else {
    console.log("FAIL: No Matching Test");
    console.log("Expected:", nonMatchingOut.Results.length);
    console.log("Received:", nonMatchingResult.Results.length);
}


/** Case sensitive test Uppercase */
const caseSensResult = findSearchTermInBooks("Matching", caseIn);
if (JSON.stringify(caseOut) === JSON.stringify(caseSensResult)) {
    console.log("PASS: Case Sensitive Test");
} else {
    console.log("FAIL: Case Sensitive Test");
    console.log("Expected:", caseOut);
    console.log("Received:", caseSensResult);
}

/** Hyphenated word test */
const dashResult = findSearchTermInBooks("darkness", dashIn);
if (JSON.stringify(dashOut) === JSON.stringify(dashResult)) {
    console.log("PASS: Dash Test");
} else {
    console.log("FAIL: Dash Test");
    console.log("Expected:", dashOut);
    console.log("Received:", dashResult);
}

/** Embedded word test */
const includedResult = findSearchTermInBooks("in", includedIn);
if (JSON.stringify(includedOut) === JSON.stringify(includedResult)) {
    console.log("PASS: Included Test");
} else {
    console.log("FAIL: Included Test");
    console.log("Expected:", includedOut);
    console.log("Received:", includedResult);
}

/** Edge case tests */
// const emptyString = findSearchTermInBooks("", twentyLeaguesIn);
// const invalidString = findSearchTermInBooks(123, twentyLeaguesIn);
// const invalidJSON = findSearchTermInBooks("test", invalidIn);
