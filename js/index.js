//PODRIA HACER UN "TIPO DE PRODUCTO"
//Buscador (Clase 12)

//DOM

let nombreProducto = document.getElementsByClassName("nombreProducto");

let precioProducto =document.getElementsByClassName("precioProducto");

let contenedorProductos = document.getElementById("Productos");

let textAreaNombreProducto = document.getElementById("textAreaNombreProducto")

let textAreaPrecioProducto = document.getElementById("textAreaPrecioProducto")

let btnAgregarProducto = document.getElementById("btnAgregarProducto")

let btnMostrarProductos = document.getElementById("btnMostrarProductos")

let btnOcultarProductos = document.getElementById("btnOcultarProductos")



let selecFiltrado = document.getElementById("selecFiltrado")

let precioTotal = document.getElementById("precioTotal")

let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")

let btnConEnvio = document.getElementById("btnEnvio")

let btnSinEnvio = document.getElementById("btnSinEnvio")

let contenidoBtnEnvio = document.getElementById("contenidoBtnEnvio")



  
let carrito = []
if(localStorage.getItem("carrito")){
    JSON.parse(localStorage.getItem("Carrito"))
}else{
    carrito=[]
    localStorage.setItem("carrito" , carrito)
}


//CONTADOR DE CARACTERES
function contadorDeCaracteres() {
    var input = document.getElementById("textAreaNombreProducto");
    var countSpan = document.getElementById("contadorCaracteres");
    var maxLength = parseInt(input.getAttribute("maxlength"));
    var currentLength = input.value.length;
    var remaining = maxLength - currentLength;
  
    countSpan.textContent = remaining;
}

//POR DEFECTO
let modoMostrar = localStorage.getItem("mostrarProductos")

if(modoMostrar == "true"){
    mostrarProductos(listaProductos)
}


//FUNCIONES PARA AGREGAR PRODUCTO
btnAgregarProducto.onclick= () => {
    agregarProducto(textAreaNombreProducto.value , textAreaPrecioProducto.value ) 

}
    
function agregarProducto(nombre , precio ){
    let nombreProd = nombre

  

 if(evaluarNombreProducto(nombreProd)== true){
    alert("Producto ya ingresado.")
}else{
    let precioProd = precio
    
    let productoNuevo=new Producto(listaProductos.length + 1 , nombreProd , precioProd);

    listaProductos.push(productoNuevo)

    localStorage.setItem("listaProductos" , JSON.stringify( listaProductos))
 
    mostrarProductos(listaProductos)
}
}
    
function evaluarNombreProducto(nombre){
    let resultado 
     resultado = listaProductos.some((producto) => producto.nombre == nombre)

    
   
    
    return resultado;
}

//FUNCIONES PARA ORDENAR 
selecFiltrado.addEventListener("change" , () =>{
    
    switch(selecFiltrado.value){
        case "1":
           ordenarMenorMayor(listaProductos)
        break
        case "2":
           ordenarMayorMenor(listaProductos)
        break
        case "3":
           ordenarAlfabeticamenteTitulo(listaProductos)
        break
        default:
           mostrarProductos(listaProductos)
        break   
  
     }
})

function ordenarMenorMayor(array){
    console.log("Entro")
    const menorMayor = [].concat(array)
    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarProductos(menorMayor)
}

function ordenarMayorMenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((elem1 ,elem2) => elem2.precio - elem1.precio)
    mostrarProductos(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array){
    // localStorage.setItem("mostrarProductos" , true)
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort( (a,b) =>{
       if (a.nombre > b.nombre) {
          return 1
        }
        if (a.nombre < b.nombre) {
          return -1
        }
        return 0
    })
 
    mostrarProductos(arrayAlfabetico)
}

//IMPRIMIR PRODUCTOS 
btnMostrarProductos.onclick =  () => {
    mostrarProductos(listaProductos)
    localStorage.setItem("mostrarProductos",true)
    
}

function mostrarProductos (array){
    contenedorProductos.innerHTML = ` `
    for(let producto of array){
        let {id , nombre , precio ,imagen } = producto
        let nuevoProducto = document.createElement("div")
        nuevoProducto.className = "col-12 col-md-6 col-lg-4 my-2"
        nuevoProducto.innerHTML=`<div id="${id}" class="card" style="width: 18rem;">
        <img src="${imagen}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio:$${precio}</p>
        <button id="btnAgregarAlCarrito${producto.id}" class="btn btn-primary">Agregar al carrito</a>
        </div>
        </div>`
        contenedorProductos.appendChild(nuevoProducto)

        let btnAgregarAlCarrito = document.getElementById(`btnAgregarAlCarrito${producto.id}`)
       
        btnAgregarAlCarrito.addEventListener("click" , () =>{
            agregarACarrito(producto)
        })
    }
}


//OCULTAR PRODUCTOS

btnOcultarProductos.addEventListener("click" , () =>{contenedorProductos.innerHTML = ` `})
btnOcultarProductos.addEventListener("click" , () =>{localStorage.setItem("mostrarProductos",false)})

//CARRITO


function costoEnvio(array){
    let valor = 100
   let costoDelEnvio = 0
    if(localStorage.getItem("BotonEnvio") == "true"){
        precioTotal.innerHTML=``
        contenidoBtnEnvio.innerHTML = `
        <div>
            <select id="selecUbicacion" class="form-select " aria-label="Default select example">
                <option selected>Seleccioe ubicacion</option>
                <option value="1">Zona norte</option>
                <option value="2">Zona sur</option>
                <option value="3">Zona este</option>
                <option value="4">Zona oeste</option>
            </select> 
        </div>`
        
        let opcion = document.getElementById("selecUbicacion")
        opcion.addEventListener("change" , ()=>{

            switch(opcion.value){
                case "1":
                    costoDelEnvio= valor * 2
                break
                case "2":
                    costoDelEnvio= valor * 4
                break
                case "3":
                    costoDelEnvio = valor *5
                break
                case "4" :
                    costoDelEnvio = valor * 6
                    break
            }
            
            calcularTotal(array , costoDelEnvio)
        })   
    }
}

function calcularTotal(array , costoDelEnvio){
    let total = array.reduce((acumulador , producto) => acumulador + producto.precio , 0)
    
    if (localStorage.getItem("BotonEnvio") == "true"){
        precioTotal.innerHTML = `<p>Envio : $${costoDelEnvio}.</p>
        <p>TOTAL : <strong>$${total + costoDelEnvio} </strong></p>`
    }else{
        contenidoBtnEnvio.innerHTML = ``
        precioTotal.innerHTML = ` <p>TOTAL : <strong>$${total + costoDelEnvio} </strong></p>`
    }
    


}

function borrarProducto(array,idABorrar){
    let indice  = array.findIndex(producto => producto.id === idABorrar )
    if( indice != -1){
        array.splice(indice , 1 );
    }
    cargarProductosCarrito(array)
}


function cargarProductosCarrito(array){
    
    modalBodyCarrito.innerHTML = ``
    precioTotal.innerHTML = ``
    array.forEach((productoDelCarrito)=>{
       modalBodyCarrito.innerHTML += `
    
         <div class="card border-primary mb-3" id ="productoCarrito${productoDelCarrito.id}" style="max-width: 540px;">
                  <img class="card-img-top" height="300px" src="${productoDelCarrito.imagen}" alt="">
                  <div class="card-body">
                         <h4 class="card-title">${productoDelCarrito.nombre}</h4>
                          <p class="card-text">$${productoDelCarrito.precio}</p> 
                          <button class= "btn btn-danger" id="botonEliminar${productoDelCarrito.id}"><i class="fas fa-trash-alt "></i></button>
                  </div>    
             </div>`


//NO SE COMO HACER PARA QUE ME TOME CADA ITEM PARA ELIMINARLO . SIEMPRE ME TOMA EL ULTIMO PORQUE SE SOBREESCRIBE EL "btnBorrar" PERO NO SE COMO CAMBIARLO 
        
        let btnBorrar= document.getElementById(`botonEliminar${productoDelCarrito.id}`)
        btnBorrar.addEventListener("click" , ()=>{
            let idABorrar = productoDelCarrito.id
            borrarProducto(carrito , idABorrar)
            })
        
                 
    })
    
     
}


botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(carrito)
    precioTotal,innerHTML = ``
    contenidoBtnEnvio.innerHTML=``
})

btnConEnvio.addEventListener("click" , ()=> {
      

    carrito != 0 ? (localStorage.setItem("BotonEnvio" , true) , costoEnvio(carrito)): alert("Debe ingresar algun producto al carrito")
    })

btnSinEnvio.addEventListener("click" , ()=>{
    carrito != 0 ? (localStorage.setItem("BotonEnvio" , false),calcularTotal(carrito , 0)) : alert("Debe ingresar algun producto al carrito")
})


function agregarACarrito(producto){
    let busquedaProducto = carrito.find((elemento) =>elemento.id == producto.id )
    if(busquedaProducto == undefined){
        carrito.push(producto)
        localStorage.setItem("carrito" , JSON.stringify(carrito))
        
    }else{
        alert(`El producto ${producto.nombre} ya existe`)
    }
    
}






