  


  // this portion of the code was taking from the following link
 //  https://www.youtube.com/watch?v=YeFzkC2awTM&ab_channel=WebDevSimplified
 

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready(){
   
    var addToBasket = document.getElementsByClassName('addToBasketButton')

    for (var  i = 0; i <addToBasket.length; i++){
        var button = addToBasket[i]
        button.addEventListener('click',addedToBasket)
    
    }
    
    
    
    function addedToBasket(event){
        var button = event.target
        var item = button.parentElement.parentElement
        var itemName = item.getElementsByClassName('item-name')[0].innerText
        var price = item.getElementsByClassName('item-price')[0].innerText
        addOrder(itemName,price,)
        updateCart()
        
    }

    var purchase = document.getElementsByClassName('purchase-button')
    button = purchase[0]
    button.addEventListener("click", finalinvoice)

   

    function finalinvoice(event){
        var purchaseDone = document.getElementsByClassName("thank-you-row")
        var validOrder = document.getElementsByClassName("invoice-row") 
        var validated = validation()
        if(validated == true && purchaseDone.length == 0 && validOrder.length > 2){

            addPersonalDetails()
            addTotalToInvoice()
            var cartItemContainer = document.getElementsByClassName('invoice-items')[0]
            var cartRows = cartItemContainer.getElementsByClassName('invoice-row')
            for(var i = 0; i < cartRows.length; i++){

                var button = event.target
                var item = button.parentElement.parentElement
                var itemName = item.getElementsByClassName("cart-item-name")[i].innerText
                var price = item.getElementsByClassName("cart-price-column")[i].innerText
                var quantity = item.getElementsByClassName("cart-quantity-input")[i].value
                var total = item.getElementsByClassName("invoice-total-price")[0].innerText
                generateInvoice(itemName,price,quantity,total)}
                }else if (validated == false){
                    alert('please fill your personal details correctly')
                }else if(purchaseDone.length != 0){
                    alert("You've already made your purchase")
                }else if(validOrder.length == 2){
                    alert("Please add an item to your cart!")
                }
        
        
    }
    




    


}

//responsive navbar 

const toggleButton = document.getElementsByClassName('list-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active')
})



function addOrder(itemName, price){
      // some portion of the code was taking from the following link
      //  https://www.youtube.com/watch?v=YeFzkC2awTM&ab_channel=WebDevSimplified
    var InvoiceRow = document.createElement('div')
    InvoiceRow.classList.add('invoice-row')
    var InvoiceItems = document.getElementsByClassName('invoice-items')[0]
    var InvoiceItemsNames = InvoiceItems.getElementsByClassName('cart-item-name')
    for (var i = 0; i< InvoiceItemsNames.length; i++){
        if (InvoiceItemsNames[i].innerText == itemName){
            alert("this item is already in your cart")
            return
            
            
        }
    }
    var newOrder = `   
         <div class="cart-item-column">
            <span class="cart-item-name">${itemName}</span>
        </div>
        <span class="cart-price-column">${price}</span>
        <div class="cart-quantity-column">
            <button class="Del" type="button"><i class="fas fa-minus"></i></button>
            <input class="cart-quantity-input" id="quantity" type="text" value="1">
            <button class="add" type="button"><i class="fas fa-plus"></i></button>
            <button class="rmv" type="button"><i class="far fa-trash-alt"></i></button>
        </div>`
    InvoiceRow.innerHTML = newOrder
    InvoiceItems.append(InvoiceRow)
    InvoiceRow.getElementsByClassName('rmv')[0].addEventListener('click', removeCartItem)
    InvoiceRow.getElementsByClassName('add')[0].addEventListener('click', addQuantity)
    InvoiceRow.getElementsByClassName('Del')[0].addEventListener('click', DeleteQuantity)

}



function removeCartItem() {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCart()
}

function addQuantity(event){
      // this portion of the code was used from the following link
    // https://www.youtube.com/watch?v=2purijiQrf4&ab_channel=Codewithcreativecoder
        var buttonClicked = event.target
        var input = buttonClicked.parentElement.children[1]
        console.log(input)

        var inputValue = input.value
        console.log(input.value)
        var newQuantity = parseInt(inputValue)+1
        if(isNaN(newQuantity)){
            alert("please enter a number only")
        }else{
            
            
            input.value = newQuantity
            updateCart()
        }

  
}

function DeleteQuantity(event){
      // this portion of the code was used from the following link
    // https://www.youtube.com/watch?v=2purijiQrf4&ab_channel=Codewithcreativecoder
    var buttonClicked = event.target
    var input = buttonClicked.parentElement.children[1]
    var inputValue = input.value
    var newQuantity = parseInt(inputValue)-1
    if(isNaN(newQuantity)|| newQuantity<1){
        alert("please enter a number above 1 only")

    }else{
        
        
        input.value = newQuantity
        updateCart()
    }
    }
    
    function updateCart() {

        // this portion of the code was taking from the following link
      //  https://www.youtube.com/watch?v=YeFzkC2awTM&ab_channel=WebDevSimplified
        var cartItemContainer = document.getElementsByClassName('invoice-items')[0]
        var cartRows = cartItemContainer.getElementsByClassName('invoice-row')
        var total = 0
        for (var i = 0; i < cartRows.length; i++) {
            var cartRow = cartRows[i]
            var priceElement = cartRow.getElementsByClassName('cart-price-column')[0]
            var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
            var price = parseFloat(priceElement.innerText.replace('£', ''))
            var quantity = quantityElement.value
            total = total + (price * quantity)
        }
        total = Math.round(total * 100) / 100
        document.getElementsByClassName('invoice-total-price')[0].innerText = '£' + total
    }


function generateInvoice(itemName,price,quantity,total){

            var finalInvoiceRow = document.createElement('div')
            finalInvoiceRow.classList.add('invoice-row')
            var InvoiceItems = document.getElementsByClassName('final-invoice')[0]
            var InvoiceItemsNames = InvoiceItems.getElementsByClassName('cart-item-column')
            for (var i = 0; i< InvoiceItemsNames.length; i++){
                if (InvoiceItemsNames[i].innerText == itemName){
                    return
                    
                    
                }
            }
            
            
            
            var NewInvoice = `
            
                <span class="cart-item-column">${itemName}</span>
                <span class="cart-price-column">${price}</span>
                <span class="cart-quantity-column">${quantity}</span>
            
            
                
            `

            finalInvoiceRow.innerHTML = NewInvoice
            InvoiceItems.append(finalInvoiceRow)
            
    }





    


    function validation(){
        const firstName = document.getElementById('firstname').value
        const lastName = document.getElementById('lastname').value
        const email = document.getElementById('email').value
        var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        
        if(firstName == ''|| firstName == null){
            alert('Please enter your first name')
            
        }else if(lastName == ''|| lastName == null){
            alert('Please enter your last name')
        }else if(!email.match(pattern)|| email == null || email == ''){
            alert('Please enter a valid email')
        }else{
            return true
        }
    
     
    }

function addPersonalDetails(){
    const firstName = document.getElementById('firstname').value
    const lastName = document.getElementById('lastname').value
    const email = document.getElementById('email').value
    var personalDetails = document.createElement('div')
    //personalDetails.classList.add('personal-details')

    var personalDetailsDiv = document.getElementsByClassName('personal-details')[0]    
    var Details = `           
    <h3 class="details">Full Name: ${firstName} ${lastName}</h3>
    <h3 class="details">Email: ${email}</h3>   
`

    personalDetails.innerHTML = Details
    personalDetailsDiv.append(personalDetails)


}


function addTotalToInvoice(){

    var total = document.getElementsByClassName("invoice-total-price")[0].innerText
    var totalPrice = document.createElement('div')
    var totalPriceDiv = document.getElementsByClassName("final-total")[0]
    totalPrice.classList.add('thank-you-row')

    newPrice = `
    
    <div class="final-invoice-total">TOTAL: ${total}</div>
    <div class="thank-you"> THANK YOU FOR SHOPPING WITH US </div>

    
    `

    totalPrice.innerHTML = newPrice
    totalPriceDiv.append(totalPrice)

}


