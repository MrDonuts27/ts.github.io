// ดึงข้อมูลจาก Local Storage (ถ้ามี)
let numbers = localStorage.getItem("numbers");
numbers = numbers ? JSON.parse(numbers) : [];

// ฟังก์ชันสำหรับบันทึกข้อมูลลงใน Local Storage
function saveData() {
    localStorage.setItem("numbers", JSON.stringify(numbers));
}

// ฟังก์ชันสำหรับโหลดข้อมูลจาก Local Storage
function loadData() {
    const savedNumbers = localStorage.getItem("numbers");
    numbers = savedNumbers ? JSON.parse(savedNumbers) : [];
}
loadData();


// ฟังก์ชันสำหรับเพิ่มเลข
function addNumbers() {
    const numberInput = document.getElementById("numberInput");
    const numberData = numberInput.value;
    const numberArray = numberData.split(/[,]+/); // แยกตัวเลขในชุดโดยใช้ตัวอักษรตัดแยกเป็นตัวคั่น เช่น จุด '.' หรือ จุดคอมม่า ',' หรือช่องว่าง
    const validNumbers = [];

    for (let i = 0; i < numberArray.length; i++) {
        const number = parseInt(numberArray[i]);
        if (!isNaN(number)) {
            validNumbers.push(number);
        }
    }

    if (validNumbers.length > 0) {
        numbers = numbers.concat(validNumbers);
        numberInput.value = "";
        displayNumbers();
        saveData(); // เพิ่มการเรียกใช้ฟังก์ชัน saveData() เพื่อบันทึกข้อมูลลงใน Local Storage
    }
}

function clearData() {
    numbers = [];
    displayNumbers();
    saveData(); // เพิ่มการเรียกใช้ฟังก์ชัน saveData() เพื่อบันทึกข้อมูลลงใน Local Storage
}


// ฟังก์ชันสำหรับแสดงเลขที่เพิ่มเข้ามา
function displayNumbers() {
    const numberList = document.getElementById("numberList");
    numberList.innerHTML = "";
    for (let i = 0; i < numbers.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = numbers[i];
        numberList.appendChild(listItem);
    }
}

// ฟังก์ชันสำหรับประมวลผลเลขทั้งหมด
function processNumbers() {
    const countMap = {};
    let maxCount = 0;
    let mostFrequentNumbers = [];

    // หาจำนวนครั้งที่เลขซ้ำกันและเลขที่ซ้ำกันมากที่สุด
    for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        if (countMap[number]) {
            countMap[number]++;
            if (countMap[number] > maxCount) {
                maxCount = countMap[number];
            }
        } else {
            countMap[number] = 1;
        }
    }

    // หาตัวเลขที่ซ้ำกันมากที่สุด
    for (const number in countMap) {
        if (countMap[number] === maxCount) {
            mostFrequentNumbers.push(number);
        }
    }

    alert(`ตัวเลขที่ซ้ำกันมากที่สุด: ${mostFrequentNumbers.join(", ")}
จำนวนที่ซ้ำ: ${maxCount}`);
}
