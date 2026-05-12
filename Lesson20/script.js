//event handling
document.getElementById('btn-intersection')
        .addEventListener('click', handleIntersection);

document.getElementById('btn-flatten')
        .addEventListener('click', handleFlatten);

document.getElementById('btn-group-by-type')
        .addEventListener('click', handleGroupByType);

function getInputValue(id){
    return document.getElementById(id)?.value ?? '';
}

function handleIntersection(){
    const array1 = getInputValue('intersection-a1');
    const array2 = getInputValue('intersection-a2');
    const result = setIntersection(array1, array2);
    displayResult(result, 'output-intersection');
}

function handleFlatten(){
    const input = getInputValue('flatten-input');
    const result = flattenArray(input);
    displayResult(result, 'output-flatten');
}

function handleGroupByType(){ 
    const array = getInputValue('group-by-type');
    const result = groupByType(array);
    displayResult(result, 'output-group-by-type');
}

//render
function displayResult(output, id){
        document.getElementById(id).textContent = `${output}`;
}

function parseArrayString(input){
    if(!input.trim()) return "Please enter data";
    let arr = input.split(","); 
    arr = arr.map(item => item.trim());
    arr = arr.map(item => Number(item)); 
    return arr;
}

function parseJSONInput(input){
    if(!input.trim()) return "Please enter data";
    try {
        return JSON.parse(input);
    } catch {
        return null;
    }
}
//logic
/* 
    Bài 1
    Lấy kết quả giao giữa 2 mảng
    var arrA = [1, 4, 3, 2];
    var arrB = [5, 2, 6, 7, 1];
    Kết quả [1,2]
*/
function setIntersection(array1, array2){
    const arr1 = parseArrayString(array1);
    const arr2 = parseArrayString(array2);
    let arr = arr1.filter(x => arr2.includes(x));   
    return arr;
}

/* 
Bài 2
Làm phẳng array sau (Chuyển về mảng 1 chiều) Không được sử dụng flat()
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Kết quả
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
*/
function deepFlatten(arr){
    let result = [];

    arr.forEach(item => {
        if(Array.isArray(item)){
            result = result.concat(deepFlatten(item));
        } else {
            result.push(item);
        }
    });

    return result;
}

function flattenArray(input){
    const arr = parseJSONInput(input); 
    
    if(Array.isArray(arr)){
            return deepFlatten(arr).join(', ');
        } else {
            return 'error: array cannot be parse';
        }
}

/* 
Bài 3
Tách phần tử trong mảng theo đúng kiểu dữ liệu
var arr = [["a", 1, true], ["b", 2, false]]
Kết quả
[["a", "b"], [1, 2], [true, false]]
 */
function groupByType(array){
    const arr = parseJSONInput(array);
    let result = [[], [], []];
    if(!Array.isArray(arr)) return 'Invalid input';
    arr.forEach(group =>{
        group.forEach(item =>{
             if(typeof item === "string"){
                result[0].push(item);
            }
            else if(typeof item === "number"){
                result[1].push(item);
            }
            else if(typeof item === "boolean"){
                result[2].push(item);
            }
        });
    });

    return result;
}
/* 
Bài 4
Dựa vào hình ảnh giao diện sau, 
hãy thiết kế 1 mảng phù hợp và thực hiện đổ dữ liệu lên giao diện 
*/
const posts = [
  {
    title: "Tiêu đề bài viết 1",
    image: "../imgs/ig-ben-lock.jpg",
    desc: "Lorem ipsum dolor sit amet..."
  },
  {
    title: "Tiêu đề bài viết 2",
    image: "../imgs/ig-ben-lock.jpg",
    desc: "Lorem ipsum dolor sit amet..."
  },
  {
    title: "Tiêu đề bài viết 3",
    image: "../imgs/ig-ben-lock.jpg",
    desc: "Lorem ipsum dolor sit amet..."
  }
];

function renderPosts() {
    const container = document.getElementById("post-list");

    let html = '';

    posts.forEach((post, index) => {
        html += `
            <div class="post ${index % 2 !== 0 ? 'reverse' : ''}">
                <img src="${post.image}" alt="${post.title}">
                
                <div class="content">
                    <h2>${post.title}</h2>
                    <p>${post.desc}</p>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

window.addEventListener('DOMContentLoaded', renderPosts);