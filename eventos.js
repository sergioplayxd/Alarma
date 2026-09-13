/* ==================================================
   EVENTOS
   ==================================================

   Puedes hacer alarmas de UN DÍA:

   {
       inicio: "06-12",
       fin: "06-12",
       titulo: "Día de la Constitución",
       descripcion: "Hoy es el Día de la Constitución."
   }


   O alarmas de VARIOS DÍAS:

   {
       inicio: "18-03",
       fin: "19-03",
       titulo: "Fallas",
       descripcion: "Hoy son Fallas."
   }

   Las fechas incluyen tanto el día de inicio
   como el día de finalización.

================================================== */


const eventos = [

    {
        inicio: "06-12",
        fin: "06-12",
        titulo: "Día de la Constitución Española",
        descripcion: "Hoy se celebra el Día de la Constitución Española."
    },

    {
        inicio: "09-10",
        fin: "09-10",
        titulo: "9 d'Octubre",
        descripcion: "Hui és el Dia de la Comunitat Valenciana."
    },

    {
        inicio: "12-10",
        fin: "12-10",
        titulo: "Día de la Hispanidad",
        descripcion: "Hoy es el Día de la Fiesta Nacional de España."
    },

    {
        inicio: "09-13",
        fin: "09-13",
        titulo: "Fecha de Creacion",
        descripcion: "Hoy fue el dia en el que la pagina fue disponible para todos."
    },

    {
        inicio: "18-03",
        fin: "19-03",
        titulo: "Fallas",
        descripcion: "Hoy son Fallas."
    },

    {
        inicio: "25-12",
        fin: "25-12",
        titulo: "Navidad",
        descripcion: "Hoy es Navidad."
    }

];


/* ==================================================
   NO ES NECESARIO EDITAR NADA DEBAJO
================================================== */


const alarma = document.getElementById("alarma");
const estado = document.getElementById("estado");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const proximo = document.getElementById("proximo");


/* --------------------------------------------------
   CONVERTIR DD-MM EN FECHA
-------------------------------------------------- */

function convertirFecha(texto, año) {

    const partes = texto.split("-");

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);

    return new Date(
        año,
        mes - 1,
        dia
    );
}


/* --------------------------------------------------
   OBTENER FECHA ACTUAL
-------------------------------------------------- */

function obtenerFechaActual() {

    const ahora = new Date();

    return {
        dia: ahora.getDate(),
        mes: ahora.getMonth() + 1,
        año: ahora.getFullYear()
    };
}


/* --------------------------------------------------
   COMPROBAR SI UNA ALARMA ESTÁ ACTIVA
-------------------------------------------------- */

function estaActiva(evento) {

    const ahora = new Date();

    const inicio =
        convertirFecha(
            evento.inicio,
            ahora.getFullYear()
        );

    const fin =
        convertirFecha(
            evento.fin,
            ahora.getFullYear()
        );

    /*
       Ponemos el final del día a las 23:59:59
       para que el último día también cuente.
    */

    fin.setHours(23, 59, 59, 999);

    return ahora >= inicio && ahora <= fin;
}


/* --------------------------------------------------
   BUSCAR EVENTO ACTUAL
-------------------------------------------------- */

function obtenerEventoActual() {

    for (const evento of eventos) {

        if (estaActiva(evento)) {
            return evento;
        }

    }

    return null;
}


/* --------------------------------------------------
   FECHA BONITA
-------------------------------------------------- */

function obtenerFechaBonita() {

    const ahora = new Date();

    let texto =
        ahora.toLocaleDateString(
            "es-ES",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    return texto.charAt(0).toUpperCase()
        + texto.slice(1);
}


/* ==================================================
   COMPROBAR ALARMA
================================================== */

function comprobarAlarma() {

    const evento =
        obtenerEventoActual();


    fecha.textContent =
        obtenerFechaBonita();


    /* ----------------------------------------------
       HAY ALARMA
    ---------------------------------------------- */

    if (evento) {

        document.body.classList.add(
            "alarma-activa"
        );

        alarma.src =
            "activo.gif";

        alarma.alt =
            "Alarma activa";

        estado.textContent =
            "ALARMA ACTIVA";

        titulo.textContent =
            evento.titulo;

        descripcion.textContent =
            evento.descripcion;

        proximo.innerHTML =
            "<strong>EVENTO ACTUAL:</strong> " +
            evento.titulo;

    }


    /* ----------------------------------------------
       NO HAY ALARMA
    ---------------------------------------------- */

    else {

        document.body.classList.remove(
            "alarma-activa"
        );

        alarma.src =
            "parado.png";

        alarma.alt =
            "Alarma parada";

        estado.textContent =
            "SIN ALARMA";

        titulo.textContent =
            "Hoy no hay nada especial";

        descripcion.textContent =
            "La alarma está parada.";

        mostrarProximoEvento();

    }

}


/* ==================================================
   BUSCAR PRÓXIMA ALARMA
================================================== */

function mostrarProximoEvento() {

    const ahora = new Date();

    let proximoEvento = null;

    let menorDiferencia =
        Infinity;


    for (const evento of eventos) {

        let fechaInicio =
            convertirFecha(
                evento.inicio,
                ahora.getFullYear()
            );


        /*
           Si el evento ya pasó este año,
           buscamos el del año siguiente.
        */

        if (fechaInicio < ahora) {

            fechaInicio =
                convertirFecha(
                    evento.inicio,
                    ahora.getFullYear() + 1
                );

        }


        const diferencia =
            fechaInicio - ahora;


        if (diferencia < menorDiferencia) {

            menorDiferencia =
                diferencia;

            proximoEvento = {
                fecha: fechaInicio,
                evento: evento
            };

        }

    }


    if (proximoEvento) {

        const fechaBonita =
            proximoEvento.fecha.toLocaleDateString(
                "es-ES",
                {
                    day: "numeric",
                    month: "long"
                }
            );


        proximo.innerHTML =
            "<strong>PRÓXIMA ALARMA:</strong> " +
            proximoEvento.evento.titulo +
            " (" +
            fechaBonita +
            ")";

    }

    else {

        proximo.textContent =
            "No hay próximas alarmas programadas.";

    }

}


/* ==================================================
   INICIAR
================================================== */

comprobarAlarma();


/*
   Comprobar cada minuto para detectar
   automáticamente el cambio de día.
*/

setInterval(
    comprobarAlarma,
    60000
);
