document.addEventListener('DOMContentLoaded', function(){
    IniciarApp();
});

function IniciarApp(){
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function(){
        //console.log(sobreFestival.getBoundingClientRect().top);  para saber cuando pasamos un elemento dando scroll

        if(sobreFestival.getBoundingClientRect().bottom < 0){
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        }
        else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}

function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: 'smooth'});
        });
    })
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif"> 
            <source srcset="build/img/thumb/${i}.webp" type="image/webp"> 
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(index) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <source srcset="build/img/grande/${index}.avif" type="image/avif"> 
        <source srcset="build/img/grande/${index}.webp" type="image/webp"> 
        <img loading="lazy" width="200" height="300" src="build/img/grande/${index}.jpg" alt="imagen galeria">
    `;

    //Crear el overlay con la imagen
    const overlay = document.createElement('DVI');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    
    overlay.onclick = function(){ //se cierra dando click en cualquier lado
        const body = document.querySelector('body'); //seleccionas al body
        body.classList.remove('fijar-body');   // le quitas la clase para que pueda dar scroll

        overlay.remove();
    }

    //Añadir al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    cerrarImagen.onclick = function() {

        const body = document.querySelector('body'); //seleccionas al body
        body.classList.remove('fijar-body');   // le quitas la clase para que pueda dar scroll

        overlay.remove();
    }
    overlay.appendChild(cerrarImagen);
}