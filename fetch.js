const email ;
const url ;
let tokenQuery = url + email;

async function getEmailToken(tokenQuery) {
    const response = await fetch(tokenQuery);
    const data = await response.json();
    const token = data.token;
    return token;
}
async function getData(token) {
    const dataURl = "data?token=";
    let dataQuery = url + dataURl + token;
    let personArray = []
    let response = await fetch(dataQuery);
    let data = await response.json();

    while (response.status === 200) {
        personArray.push(data);
        response = await fetch(dataQuery);
        data = await response.json();
    }
    return personArray;
}
function largestSublist(arr) {
    let largestSublistArray = [];
    let maxLength = 1;
    let tempLength = 1;
    let startPoint;
    let endPoint;

    for (let i = 0; i < arr.length - 1; i++) {
        let currentValue = arr[i].age;
        let j = i + 1;
        let nextValue = arr[j].age;

        while (currentValue < nextValue) {
            currentValue = nextValue;
            j++;
            tempLength++;
            if (j <= arr.length - 1) {
                nextValue = arr[j].age;
            } else {
                break;
            }
        }
        if (maxLength < tempLength) {
            maxLength = tempLength;
            startPoint = i;
            endPoint = (j);
            i = (j - 1);
            tempLength = 1;
        } else {
            tempLength = 1;
        }
    }
    let largestSubListArr = arr.slice(startPoint, endPoint);
    console.log(largestSubListArr);
    return largestSubListArr;
}

function averageOfAge(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        total = total + arr[i].age
    }
    let averageAge = total / arr.length;
    return Math.trunc(averageAge);
}

function sortedList(arr) {
    let sortedArr = [];
    let payloadArr = [];

    for (let i = 0; i < arr.length; i++) {
        sortedArr.push(arr[i].name);
    }

    sortedArr = sortedArr.sort();
    console.log(sortedArr);
    for (let i = 0; i < arr.length; i++) {
        let searchTerm = " ";
        let firstLetterOfLastName = sortedArr[i].indexOf(searchTerm);
        payloadArr.push(sortedArr[i][firstLetterOfLastName + 1]);
    }

    let payload = payloadArr.join("");

    return payload;
}

async function postData(token, data = {}) {
    console.log(token);
    console.log(data);
    const resultURl = "result?token=";
    let postQuery = url + resultURl + token;
    return fetch(postQuery, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
              'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}


async function paystand() {
    let token = await getEmailToken(tokenQuery);
    let peopleData = await getData(token);
    let largestSubList = await largestSublist(peopleData);
    let averageAge = await averageOfAge(largestSubList)
    let wordPayload = await sortedList(largestSubList);


    let dataJSON = {
        "age": averageAge,
        "payload": wordPayload,
        "code" :"insert code here"
        }
    console.log(dataJSON);
    console.log("this is our token " + token);
    let result = await postData(token, dataJSON)
        .then(data => console.log(JSON.stringify(data)))
        .catch(error => console.log(error))
}
paystand();
