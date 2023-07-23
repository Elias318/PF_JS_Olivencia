class Producto {
    constructor(id , nombre , precio , cantidad , imagen){
        this.id = id,
        this.nombre= nombre,
        this.precio= precio,
        this.cantidad=cantidad,
        this.imagen= "/images/descarga.png"
          
    }
}





let listaProductos=[]
const cargarProductos = async ()=>{
    const res = await fetch("/js/productos.json")
    const data = await res.json()
    for(let producto of data){
        let productoNuevo = new Producto(producto.id , producto.nombre , producto.precio , producto.cantidad , producto.imagen)
        listaProductos.push(productoNuevo)
    }
    localStorage.setItem("listaProductos" , JSON.stringify(listaProductos))
}

if(localStorage.getItem("listaProductos")){
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))
}else{
    cargarProductos()
    
}






