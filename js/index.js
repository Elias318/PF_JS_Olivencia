/*Este proyecto tiene el objetivo de ser una pagina web donde se vendan productos.
    FUNCIONALIDADES:
        -Agregar Productos.
        -Ordenarlos alfabeticamente y por precio 
        -Agregarlos a un carrito la cantidad que sean necesarios 
        -Texto de ultima actualizacion utilizando la hora.
Para la interaccion con el usuario use sweet alert , Toastify y boostrap 
Use un .json propio con productos predeterminados que agregue.*/

let nombreProducto = document.getElementsByClassName("nombreProducto");

let precioProducto =document.getElementsByClassName("precioProducto");

let contenedorProductos = document.getElementById("Productos");


let contenedorPrecioProducto = document.getElementById("contenedorPrecioProducto")

let textAreaNombreProducto = document.getElementById("textAreaNombreProducto")

let textAreaPrecioProducto = document.getElementById("textAreaPrecioProducto")

let btnAgregarProducto = document.getElementById("btnAgregarProducto")

let loaderCargaProductos = document.getElementById("contenedorLoaderProductos")

let btnFinalizarCompra = document.getElementById("botonFinalizarCompra")

let selecFiltrado = document.getElementById("selecFiltrado")

let precioTotal = document.getElementById("precioTotal")

let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")

let btnConEnvio = document.getElementById("btnEnvio")

let btnSinEnvio = document.getElementById("btnSinEnvio")

let contenidoBtnEnvio = document.getElementById("contenidoBtnEnvio")
let contenidoBotonCarrito = document.getElementById("contenedorBotoncarrito")


//POR DEFECTO
localStorage.setItem("avisoNombreInv", false )

  
let carrito =[]

if(localStorage.getItem("carrito")){
    
    carrito = JSON.parse(localStorage.getItem("carrito"))
}else{
    
    localStorage.setItem("carrito" , carrito)
}

//POR DEFECTO FECHA 


if(localStorage.getItem("fechaActualizacion")){
    let fechaActualizada = localStorage.getItem("fechaActualizacion")
    let fechaString = JSON.stringify(fechaActualizada)
    
    document.getElementById("containerFecha").textContent = `Fecha de última actualización:  ${fechaString}`
}else{
    document.getElementById("containerFecha").textContent = "No se han realizado actualizaciones "
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

//FUNCION DE ULTIMA ACTUALIZACION 
function actualizarFecha() {
    let fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth() + 1; 
    let anio = fecha.getFullYear();
  
    let hora = fecha.getHours();
    let minutos = fecha.getMinutes();
    let segundos = fecha.getSeconds();
  
    let fechaActualizada = `${dia}/${mes}/${anio} ${hora}:${minutos}:${segundos}`;
    
    localStorage.setItem("fechaActualizacion" , fechaActualizada)
   document.getElementById("containerFecha").textContent = "Fecha de última actualización: " + fechaActualizada;
  }



//FUNCIONES PARA AGREGAR PRODUCTO
let aviso
let avisoPrecio
btnAgregarProducto.onclick= () => {
    agregarProducto(textAreaNombreProducto.value , textAreaPrecioProducto.value ) 
    
}



function agregarProducto(nombre , precio ){
    
    
    let nombreProd = nombre
    if(evaluarNombreProducto(nombreProd)== true ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Producto Ya ingresadi',
            
          })
    }else if(nombreProd =="" || precio == ""){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Campos sin completar',
           
          })
    }else{
        let precioProd = precio
        let productoNuevo=new Producto(listaProductos.length + 1 , nombreProd , precioProd , 0);

        listaProductos.push(productoNuevo)

        localStorage.setItem("listaProductos" , JSON.stringify( listaProductos))

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado correctamente'
            
           
          })
 
        mostrarProductos(listaProductos)

       
    }
    actualizarFecha()

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
            //Notificacion de que se agrego al carrito 
            Toastify({

                text: "Producto agregado al carrito",
                gravity: 'bottom',
                position: 'right',
                duration: 3000
                
                }).showToast();
        })
    }
}

setTimeout(()=>{
    loaderCargaProductos.remove()
     mostrarProductos(listaProductos)
},2500)





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
    
    let total = array.reduce((acumulador , producto) => acumulador + (producto.precio*producto.cantidad) , 0)
    
    if (localStorage.getItem("BotonEnvio") == "true"){
        precioTotal.innerHTML = `<p>Envio : $${costoDelEnvio}.</p>
        <p>TOTAL : <strong>$${total + costoDelEnvio} </strong></p>`
    }else{
        contenidoBtnEnvio.innerHTML = ``
        precioTotal.innerHTML = ` <p>TOTAL : <strong>$${total + costoDelEnvio} </strong></p>`
    }
    
    localStorage.setItem("ConsultaEnvio" , true)
    

}

function borrarProducto(array,idABorrar){
    let indice  = array.findIndex(producto => producto.id == idABorrar )
    
    let busquedaProducto = carrito.find((elemento) =>elemento.id == idABorrar )
    
    if(busquedaProducto.cantidad >=1){
        busquedaProducto.cantidad--
       busquedaProducto.cantidad==0 && array.splice(indice , 1 ); 
    }else if( indice != -1){
        array.splice(indice , 1 );
    }
    localStorage.setItem("carrito" , JSON.stringify(carrito))
    
    
    cargarProductosCarrito(array)
}

//FUNCIONES PARA MOSTRAR U OCULTAR BOTONES 
/***************************************************************************************************************** */
function mostrarcontenidoBotonCarrito(){
    contenidoBotonCarrito.style.display="block"
    
}

function ocultarcontenidoBotonCarrito(){
    contenidoBotonCarrito.style.display="none"
    
}

function mostrBotonFinalizarCompra(){
    btnFinalizarCompra.style.display = "block"
}
function ocultBotonFinalizarCompra(){
    btnFinalizarCompra.style.display = "none"
}
/****************************************************************************************************************** */

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
                          <p>cantidad:${productoDelCarrito.cantidad}</p>
                          <button class= "btn btn-danger btn-delete" id="botonEliminar${productoDelCarrito.id}" data-id="${productoDelCarrito.id}"><i class="fas fa-trash-alt "></i></button>
                  </div>    
             </div>`})        
            let botonEliminar= document.querySelectorAll(".btn-delete")
            botonEliminar.forEach((boton) =>{
                boton.addEventListener("click" , ()=>{const id= boton.dataset.id
                borrarProducto(array,id)})

    })  

    if(array.length!= 0){
        mostrarcontenidoBotonCarrito();
    }else{
        ocultarcontenidoBotonCarrito();
    }

        
}


botonCarrito.addEventListener("click", () => {
    localStorage.setItem("ConsultaEnvio" , false)
    cargarProductosCarrito(carrito)

    precioTotal.innerHTML = ``
    contenidoBtnEnvio.innerHTML=``

    
})


btnConEnvio.addEventListener("click" , ()=> {
      

    carrito != 0 && (localStorage.setItem("BotonEnvio" , true) , costoEnvio(carrito))
    })

btnSinEnvio.addEventListener("click" , ()=>{
   
    carrito != 0 && (localStorage.setItem("BotonEnvio" , false),calcularTotal(carrito , 0)) 
})


function agregarACarrito(producto){
    let busquedaProducto = carrito.find((elemento) =>elemento.id == producto.id )

    if(busquedaProducto == undefined){
        
        producto.cantidad++
        
        carrito.push(producto) 
    }else{
        busquedaProducto.cantidad++
    }
    localStorage.setItem("carrito" , JSON.stringify(carrito))
    
}


btnFinalizarCompra.addEventListener("click" , ()=>{
    
    
    if(localStorage.getItem("ConsultaEnvio") == "true"){
        
        Swal.fire({
            title: 'Confirmacion de compra',
            text: "Esta seguro de confirmar la compra?",
            icon: 'question',
            showDenyButton:true,
            confirmButtonColor: '#3085d6',
            denyButtonText: `No,quiero seguir comprando`,
            confirmButtonText: 'Confirmo!'
          
          }).then((result) => {
            if (result.isConfirmed) {
                
                Swal.fire({
                    icon: 'success',
                    title: 'Compra realizada',
                    text: `Usted ha realizado la compra correctamente`
                    
                  })
                  carrito=[]
                  localStorage.setItem("carrito" , carrito)
            }else{
                Swal.fire({
                    icon: 'info',
                    title:'Compra cancelada',
                    text:`Recuerde que los productos siguen en el carrito`
                })
            }
          })

    }else{
      
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Falta seleccionar opcion de retiro',
            
          })
    }
    
})

