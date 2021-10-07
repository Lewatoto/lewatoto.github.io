const observer = lozad(); // lazy loads elements with default selector as '.lozad'
observer.observe();

var idx = lunr(function () {
  this.use(lunr.multiLanguage('es', 'en'));
  this.ref('id');
  this.field('titulo', { boost: 10 });
  this.field('url');
  this.field('contenido');

  for (var key in busqueda_idx){
      this.add({
        "id": key,
        "titulo": busqueda_idx[key].titulo,
        "url": busqueda_idx[key].url,
        "contenido": busqueda_idx[key].contenido,
      });
  }
});

function slug (slug_t, espacio=false){
  var opciones = {
    remove: /[\/\\\[\]{}()*+~.'"!¡?¿:@]/g,
    lower: true,
    strict: true,
    locale:'es',
    trim: true};
  var opciones2 = {
    replacement: ' ',
    remove: /[\[\]{}()*+~.'"!¡?¿:@]/g,
    lower: true,
    locale:'es',
    trim: true};
  if (espacio) {
    return slugify(slug_t, opciones2);
  } else {
    return slugify(slug_t, opciones)
  }
}

function resaltar_palabras(palabras, texto){
  //console.log('palabras juntas');
  var pal_jun = palabras.join('|');
  //console.log('palabras modificadas');
  /*
  usar regex para los caracters latinos
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes
  hay que usar \P{Script_Extensions=Latin} reemplazando cada vocal en mayuscula o minuscula
  */
  var pal_jun_regx = pal_jun.replace(/[aeiou]/gi, "\\p{Script_Extensions=Latin}");
  //console.log(pal_jun_regx);
  //console.log(texto);
  var texto2 = '';
  /*
  reemplazar multiples valores en un solo replace con regex
  https://stackoverflow.com/a/67374697
  Herramienta para hacer pruebas de selectores regex
  https://regexr.com/
  */
  var regex = new RegExp(pal_jun_regx, "giu");
  //console.log(regex);
  /*
  Realizar el reemplazo pero conservar la palabra original
  como fue seleccionada
  https://stackoverflow.com/a/13721786
  */
  texto2 = texto.replace(regex,function (coincidencia){
    //console.log(coincidencia);
    //console.log("<mark>"+coincidencia+"</mark>");
    return "<mark>"+coincidencia+"</mark>";
  });
  //console.log(texto2);
  return texto2;
}

function buscar_sitio() {
  if ($('#resultados_b')) {
    $('#buscar_b').addClass('is-loading');
    var resultados = idx.search($("#buscar_t").val());
    console.log($("#buscar_t").val());
    console.log(resultados.length);
    console.log(resultados);
    if (resultados.length > 0) {
      var terminos_busqueda = slug($("#buscar_t").val()).split('-');
      //console.log(terminos_busqueda);
      //var regex = new RegExp($("#buscar_t").val(), "gi");
      //console.log(regex);
      //console.log($('#buscar_t').val());
      var paginas_resultados = resultados.map(function(match){
        return busqueda_idx[match.ref];
        });
      var resultados_html = '';
      paginas_resultados.forEach(function(r){
        resultados_html +='<article class="media is-borderless">';/*
        resultados_html +='<figure class="media-left">';
        resultados_html +='<p class="image is-64x64">';
        resultados_html +='<img src="'+r.imagen+'">';
        resultados_html +='</p>';
        resultados_html +='</figure>';*/
        resultados_html +='<div class="media-content">';
        resultados_html +='<div class="content">';
        resultados_html +='<h4 class="title is-4"><a class="has-text-dark" href="'+r.url+'">'+resaltar_palabras(terminos_busqueda,r.titulo)+'</a></h4>';
        resultados_html +='<p class="subtitle is-6">' + fechas_subtitulo(r.fecha_publicada) + '</p>';
        resultados_html +='<p class="content">';
        //resultados_html +='<br>';
        resultados_html +=resaltar_palabras(terminos_busqueda,r.excerpt);
        resultados_html +='</p>';
        resultados_html +='</div>';
        resultados_html +='<nav class="level is-mobile">';
        resultados_html +='<div class="level-left">';
        resultados_html +='<div class="level-item">';
        resultados_html +='<div class="tags">';
        r.etiquetas.forEach(function(e){
          resultados_html +='<span class="tag is-link is-normal"><a class="has-text-white "href="/etiqueta/'+slug(e)+'">'+e+'</a></span>';
        })
        resultados_html +='</div>';
        resultados_html +='</div>';
        resultados_html +='</div>';
        resultados_html +='</nav>';
        resultados_html +='</div>';/*
        resultados_html +='<div class="media-right">';
        resultados_html +='<button class="delete ocultar_resultado"></button>';
        resultados_html +='</div>';*/
        resultados_html +='</article>';

        /*DEBUG
        //console.log(r.url);
        r.etiquetas.forEach(function(e){
          //console.log(e);
        })*/
      });

      if ($('#resultados_c').hasClass('is-hidden')){
        //console.log('entrando en lo que hay que eliminar');
        $('#resultados_c').removeClass('is-hidden');
        $('#resultados_b').empty();
        $('#resultados_b').html(resultados_html);
      } else {
        $('#resultados_b').empty();
        $('#resultados_b').html(resultados_html);
      }
      $('#buscar_b').removeClass('is-loading');

    } else {
      if ($('#resultados_c').hasClass('is-hidden')){
        //console.log('entrando en lo que hay que eliminar');
        $('#resultados_b').empty();
        $('#resultados_c').removeClass('is-hidden');
        $('#resultados_b').html('<h4 class="title is-4">No se encontraron resultados.</h4>');
      } else {
        $('#resultados_b').empty();
        $('#resultados_b').html('<h4 class="title is-4">No se encontraron resultados.</h4>');
      }
      $('#buscar_b').removeClass('is-loading');
    }
  }
}

/*
Para encontrar los valores de los meses por separado y agregarles el locale
https://stackoverflow.com/questions/1643320/get-month-name-from-date/18648314#18648314
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
*/
function fechas_subtitulo(fecha_texto){
  var fecha = new Date(fecha_texto);
  var mes = fecha.toLocaleString('es', {month: 'long'});
  var dia = fecha.getDate();
  var anio = fecha.getFullYear();
  return dia + ' de ' + mes + ', ' + anio;
}


/*
Revisa si existe una cookie
https://developer.mozilla.org/en-US/docs/web/api/document/cookie#example_5_check_a_cookie_existence
*/
function revisar_klaro() {
  if (document.cookie.split(';').some((item) => item.trim().startsWith('klaro_lewatoto='))) {
    //console.log("Existe");
    return true;
  } else {
    //console.log('No existe');
    return false;
  }
}

/*
Si se decidión no activar los comentarios per despues se quieren ver
https://www.benjaminoakes.com/gdpr/2018/05/24/GDPR-Compliance-for-Disqus-Cookies/
*/
/*
function revisar_disqus() {
  console.log(klaro.getManager().confirmed);
  if (klaro.getManager().confirmed == true) {
    if ($('#disqus_thread').length) {
      console.log("configuracion de disqus");
      console.log(klaro.getManager().consents.disqus);
      if (klaro.getManager().consents.disqus == false) {
        if ($('.mostrar_comentarios').hasClass("is-hidden") == false) {
          $('.mostrar_comentarios').toggleClass("is-hidden");
        }
        if ($('.activar_disqus').hasClass("is-hidden") == true) {
          $('.activar_disqus').toggleClass("is-hidden");
        }
      } else {
        $('.mostrar_comentarios').toggleClass("is-hidden");
        $('.activar_disqus').toggleClass("is-hidden");
      }
    } else {
      console.log("No existe disqus_thread");
    }
  } else {
    console.log("todavia no se han aceptado las configuraciones");
  }
}
*/

function sticky (){
  //to check when element get's position sticky
  var observer = new IntersectionObserver(function(entries) {
    //console.log(entries);
    //console.log(entries[0].intersectionRatio);
    // no intersection
    if (entries[0].intersectionRatio === 0){
      //console.log('no interseccion');
      //console.log(window.scrollY);
      //console.log(document.querySelector('.abajo_imagen').offsetTop);
      if ($('.subir').is('.is-hidden')) {
        $(".subir").toggleClass("is-hidden");
      }/*
      if (document.querySelector(".indice details").hasAttribute('open')) {
        document.querySelector(".indice details").removeAttribute('open');
      }*/
    //document.querySelector("#nav-container").classList.add("nav-container-sticky");
    // fully intersects
  } else if (entries[0].intersectionRatio === 1){
    if (!$('.subir').is('.is-hidden')) {
      $(".subir").toggleClass("is-hidden");
    }/*
    if (!document.querySelector(".indice details").hasAttribute('open')) {
      document.querySelector(".indice details").setAttribute('open','');
    }*/
      //console.log('visible');
    //document.querySelector("#nav-container").classList.remove("nav-container-sticky");
  }
  }, {
    threshold: [0, 1]
  });


  observer.observe(document.querySelector(".abajo_imagen"));
}

function ir_a_inicio (){
  //to check when element get's position sticky
  var observer = new IntersectionObserver(function(entries) {
    console.log(entries);
    console.log(entries[0].intersectionRatio);
    // no intersection
    if (entries[0].intersectionRatio === 0){
      //console.log('no interseccion');
      //console.log(window.scrollY);
      //console.log(document.querySelector('.abajo_imagen').offsetTop);
      if ($('.subir').is('.is-hidden')) {
        $(".subir").toggleClass("is-hidden");
      }/*
      if (document.querySelector(".indice details").hasAttribute('open')) {
        document.querySelector(".indice details").removeAttribute('open');
      }*/
    //document.querySelector("#nav-container").classList.add("nav-container-sticky");
    // fully intersects
  } else if (entries[0].intersectionRatio === 1){
    if (!$('.subir').is('.is-hidden')) {
      $(".subir").toggleClass("is-hidden");
    }/*
    if (!document.querySelector(".indice details").hasAttribute('open')) {
      document.querySelector(".indice details").setAttribute('open','');
    }*/
      //console.log('visible');
    //document.querySelector("#nav-container").classList.remove("nav-container-sticky");
  }
  }, {
    threshold: [0, 1]
  });


  observer.observe(document.querySelector(".ir_a_inicio"));
}

function subir() {
  /*
  Ejecutar accion cuando termina animación
  https://stackoverflow.com/a/23560516
  */
  $('html').animate({scrollTop: '0'},200, function () {
    //$(".subir").toggleClass("is-hidden");
  });
}

$(document).ready(function() {

  $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });

  $(".buttons > a").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
  });

  $('#buscar_b').click(function(){
      buscar_sitio();
  });


  $('.delete').click(function(){
    //console.log('ocultado');
    //console.log($(".delete").parents(":eq(2)"));
    $('#resultados_b').empty();
    $(".delete").parents(":eq(2)").addClass('is-hidden');
  });
  /* version anterior para detectar clic en html generado dinamicamente
  $('#resultados_b').on('click', 'article.media > .media-right > .delete', function(){
    //console.log('ocultado');
    //console.log($(".delete").parents(":eq(1)"));
    $(".delete").parents(":eq(1)").addClass('is-hidden');
  });*/

  /*
  Leer eventos de teclas en las cajas de texto
  https://stackoverflow.com/a/6524335
  */
  $('#buscar_t').bind("enterKey",function(e){
   buscar_sitio();
  });
  $('#buscar_t').keyup(function(e){
      if(e.keyCode == 13)
      {
          $(this).trigger("enterKey");
      }
  });

  /*
  Agregar los comentarios de disqus solo si el usuario los pide
  https://stackoverflow.com/a/1369031
  */
  $('.mostrar_comentarios').click(function(){
    //$.getScript("https://lewatoto.github.io/assets/js/comentarios.js");
    $(this).toggleClass("is-hidden");
    $('#disqus_thread').toggleClass("is-hidden");
  });

  $('#activar_disqus').click(function(){
    klaro.show();
    $('.activar_disqus').toggleClass("is-hidden");
    $('#disqus_thread').toggleClass("is-hidden");
  });

  /*
  Mostrar el icono para subir cuando se desplace un total equivalente
  al 100% vh de la pantalla

  var tiempo_scroll=0;
  $(window).scroll(function(){
    //console.log('sin control');
    var now = +new Date;
    if (now - tiempo_scroll > 200 ) {
      //console.log('cada 300');
      if ($(window).scrollTop() > Math.round($(window).height()/2)) {
        //console.log('mas');
        if ($('.subir').is('.is-hidden') == true) {
          $('.subir').toggleClass('is-hidden');
        }
      } else {
        if ($('.subir').is('.is-hidden') == false) {
          $('.subir').toggleClass('is-hidden');
        }
      }
    }
    tiempo_scroll = now;
  });
*/

  $('.subir').click(function () {
    subir();
  })

  /*
  Si existe el div para el indice iniciar la caquerada
  */
  if ($('.indice').length) {
    /*const boton_s = lozad('#toc_menu', {
      loaded: function(el) {
        $(".subir").toggleClass("is-hidden");
      }
    });
    boton_s.observe();*/
    sticky();
    var spy = new Gumshoe('#toc_menu a', {
      // Active classes
      navClass: "is-active", // applied to the nav list item
      contentClass: "active", // applied to the content

      // Nested navigation
      nested: false, // if true, add classes to parents of active link
      nestedClass: "is-active", // applied to the parent items

      // Offset & reflow
      offset: 80, // how far from the top of the page to activate a content area
      reflow: true, // if true, listen for reflows

      // Event support
      events: true // if true, emit custom events
    });
  } else {
    ir_a_inicio()
    console.log('no hya indice');
  }

});
