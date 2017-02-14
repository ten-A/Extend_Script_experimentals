//heap sort test

function hpSort(){
	length = data.length - 1;
	while (length > 0) {
		mkHeap(0);
		swap(0, length);
		length--;
		}
	}

function mkHeap(i) {
	var node1 = i * 2 + 1;
 	var node2 = i * 2 + 2;
	if (node1 > length) {
		return
		}
	if (node1 == length) {
		if (data[node1] > data[i]) {
			swap(i, node1);
			}
			return
		}
	mkHeap (node1);
	mkHeap (node2);
	if (data[node1] >= data[node2]) {
		largeNode = node1;
		} else {
			largeNode = node2;
			}
  	if (data[i] < data[largeNode]) {
   		swap (i, largeNode);
   		mkHeap (largeNode);
  		}
	}

function swap(a, b){
	var num = data[a];
	data[a] = data[b];
	data[b] = num;
	}


data = new Array();
data =[2,5,8,4,21,15,16,11,10,6,9,7,17,1];
hpSort();
alert (data);
