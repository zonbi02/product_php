// Mapping tat ca tag html can thiet cho bai nay -> bien object js
var productTag = document.getElementById('product_id')
var manufacturerTag = document.getElementById('manufacturer_id')
var categoryTag = document.getElementById('category_id')
var priceTag = document.getElementById('price_id')
var quantityTag = document.getElementById('quanlity_id')
var totalPriceTag = document.getElementById('total_price_id')
var resultTag = document.getElementById('result')

// Mang quan ly danh sach san pham
var productList = []
var currentIndex = -1 //index: 0 -> length - 1

// Xu ly khi nguoi dung chon manufacturer name -> do du lieu tuong ung vao muc category name
// Dinh nghia duoc cau truc du lieu cua bai nay
var dataList = [
	{
		"manufacturer": "Apple",
		"categoryList": ["A1", "A2", "A3"]
	}, {
		"manufacturer": "Samsung",
		"categoryList": ["S1", "S2", "S3", "S4", "S5"]
	}, {
		"manufacturer": "LG",
		"categoryList": ["LG01", "LG02", "LG03"]
	},{
		"manufacturer": "Sony",
		"categoryList": ["SO01", "SO02", "S03", "S04"]
	}, {
		"manufacturer": "Google",
		"categoryList": ["G1", "G2", "G3"]
	}
]

// Duyet qua mang dataList -> lay ra dc tung manufacturer -> chen vao trong tag html id:manufacturer_id
for(var item of dataList) {
	// gan doi tuong vao bien item
	manufacturerTag.innerHTML += `<option value="${item.manufacturer}">${item.manufacturer}</option>`
}

function changeManufacturer() {
	var m = manufacturerTag.value
	console.log('manufacturer: ' + m)

	var categoryList = []
	for(var item of dataList) {
		if(item.manufacturer == m) {
			categoryList = item.categoryList
			break
		}
	}

	//Do du lieu vao categoryList
	categoryTag.innerHTML = '<option value="">-- Select --</option>'
	for(var v of categoryList) {
		categoryTag.innerHTML += `<option value="${v}">${v}</option>`
	}
}

function updateTotalPrice() {
	var p = priceTag.value
	var q = quantityTag.value

	totalPriceTag.value = p * q
}

function saveData() {
	//lay du lieu nguoi dung nhap vao
	var product = {
		"productName": productTag.value,
		"manufacturer": manufacturerTag.value,
		"category": categoryTag.value,
		"price": priceTag.value,
		"quantity": quantityTag.value,
		"totalPrice": totalPriceTag.value
	}
	if(currentIndex >= 0) {
		//update
		productList[currentIndex] = product
		currentIndex = -1
	} else {
		productList.push(product)
	}

	showProduct()
	return false
}

function removeProduct(index) {
	var option = confirm('Are you sure to remove this product?')
	if(!option) return

	productList.splice(index, 1)

	showProduct()
}

function selectProduct(index) {
	currentIndex = index

	var p = productList[index]

	productTag.value = p.productName
	manufacturerTag.value = p.manufacturer
	changeManufacturer()

	categoryTag.value = p.category
	priceTag.value = p.price
	quantityTag.value = p.quantity
	totalPriceTag.value = p.price * p.quantity
}

function showProduct() {
	result.innerHTML = ''

	index = 0
	for(var product of productList) {
		result.innerHTML += `<tr>
				<td>${index + 1}</td>
				<td>${product.productName}</td>
				<td>${product.manufacturer}</td>
				<td>${product.category}</td>
				<td>${product.price}</td>
				<td>${product.quantity}</td>
				<td><button class="btn-warning" onclick="selectProduct(${index})">Edit</button></td>
				<td><button class="btn-danger" onclick="removeProduct(${index})">Remove</button></td>
			</tr>`
		index++
	}
}