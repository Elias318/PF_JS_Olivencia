class Producto {
    constructor(id , nombre , precio , cantidad , imagen){
        this.id = id,
        this.nombre= nombre,
        this.precio= precio,
        this.cantidad=cantidad,
        this.imagen= "/images/descarga.png"
          
    }
}


let producto1 = new Producto (1 ,"Vital can" , 5000, 0 , "/images/descarga.png")
let producto2 = new Producto (2 ,"Cat Chow" , 4000 , 0 , "/images/descarga.png")
let producto3 = new Producto (3 ,"Doggy" , 7000 , 0 , "/images/descarga.png")
let producto4 = new Producto (4 ,"Eat Chow" , 2000 , 0 , "/images/descarga.png")
let producto5 = new Producto (5 ,"Pat Chow" , 9000 , 0 , "/images/descarga.png")


let listaProductos=[]


if(localStorage.getItem("listaProductos")){
    listaProductos=JSON.parse(localStorage.getItem("listaProductos"))
}else{
    listaProductos.push(producto1 , producto2 , producto3 , producto4 , producto5)
    localStorage.setItem("listaProductos" , JSON.stringify(listaProductos))
}