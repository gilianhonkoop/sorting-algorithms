import React from 'react'

function swap(arr, index1, index2) {

  [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

  let index3 = index2 + 1
  let elem1 = document.querySelector('#block-' + index1);
  let elem2 = document.querySelector('#block-' + index2);
  let elem3 = document.querySelector('#block-' + index3);

  let parent = elem1.parentNode;

  parent.insertBefore(elem2, elem1);
  parent.insertBefore(elem1, elem3);

  elem2.setAttribute("id", "block-" + index1);
  elem1.setAttribute("id", "block-" + index2);
}


function timer(ms) { return new Promise(res => setTimeout(res, ms)); }

async function insertionSort(arr, type, n, m, pace, previ, prevj) 
{ 
  if (n == 7 && m == 6 && type != 'previous') {
    n = 1;
    m = 0;
  }

  let key, delay;
    let delay2, delay3 = 0;
    if (pace == 'slow') {
      delay = 600;
      delay2 = 500;
    }
    if (pace == 'normal') {
      delay = 500;
    }
    if (pace == 'fast') {
      delay = 300;
      delay3 = 100;
    }

  if (type == 'next') {

    let k = m+1
    let curr = document.querySelector('#block-' + k);
    curr.style.backgroundColor = "blue";

    let curr2 = document.querySelector('#block-' + m);

    if (arr[m] > arr[k])
        { 
          curr2.style.backgroundColor = "green";
          await timer(delay);

          swap(arr, m, k)
          
          if(m == 0) {
            previ = k;
            prevj = m;
            m = n;
            n += 1;
          }
          else {
            previ = k;
            prevj = m;
            m -= 1;
          }
        } 
    else {
      previ = k;
      prevj = m;
      m = n;
      n += 1;

      curr2.style.backgroundColor = "red";
      await timer(delay - 200);
    }

    await timer(delay);
    
    curr.style.backgroundColor = "inherit";
    curr2.style.backgroundColor = "inherit";
    
    return [n, m, previ, prevj]
  }

  if (type == 'play') {
    let i, j;
    let flag = true;

    for (i = n; i < arr.length; i++)
    { 
      let curr, curr2;
      key = arr[i];
      let time = 500;

      if (flag) {
        j = m;
        flag = false;
      }
      else {
        j = i - 1;
      }

      while (j >= 0)
      {
        let k = j + 1;
        curr = document.querySelector('#block-' + k);
        curr.style.backgroundColor = "blue";
        curr2 = document.querySelector('#block-' + j);
        
        if (delay2) {
          await timer(delay2);
        }

        if (arr[j] > arr[j+1]) {
          
          curr2.style.backgroundColor = "green";

          await timer(delay);

          swap(arr, j, j+1);
          j = j - 1;

          await timer(delay);

          curr.style.backgroundColor = "inherit";
          curr2.style.backgroundColor = "inherit";

          curr = null;
          curr2 = null;
          time = 0;
        }
        else {
          curr2.style.backgroundColor = "red";

          await timer(delay + delay3);

          curr.style.backgroundColor = "inherit";
          curr2.style.backgroundColor = "inherit";

          await timer(delay);

          break
        }
      } 
    }

    return [1, 0]
  }

  if (type == 'previous') {
    if (n == 1) {
      return [n, m]
    }

    console.log(previ, prevj)
    swap(arr, prevj, previ)
    
    return [previ, prevj]
  }
} 

export default insertionSort