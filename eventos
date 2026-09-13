/* ==================================================
   EVENTOS
================================================== */

const eventos = {

    "06-12": {
        titulo: "Día de la Constitución Española",
        descripcion: "Hoy se celebra el Día de la Constitución Española."
    },

    "09-10": {
        titulo: "9 d'Octubre",
        descripcion: "Hui és el Dia de la Comunitat Valenciana."
    },

    "12-10": {
        titulo: "Día de la Hispanidad",
        descripcion: "Hoy es el Día de la Fiesta Nacional de España."
    },

    "25-12": {
        titulo: "Navidad",
        descripcion: "Hoy es Navidad."
    }

};


/* ==================================================
   FUNCIONES
================================================== */

const alarma = document.getElementById("alarma");
const estado = document.getElementById("estado");
const titulo = document.getElementById("titulo");
const descripcion = document.getElementById("descripcion");
const fecha = document.getElementById("fecha");
const proximo = document.getElementById("proximo");


function obtenerFechaActual() {

    const ahora = new Date();

    const dia =
        String(ahora.getDate()).padStart(2, "0");

    const mes =
        String(ahora.getMonth() + 1).padStart(2, "0");

    return `${dia}-${mes}`;
}


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

    const fechaActual =
        obtenerFechaActual();

    const evento =
        eventos[fechaActual];


    fecha.textContent =
        obtenerFechaBonita();


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
            "<strong>EVENTO DE HOY:</strong> " +
            evento.titulo;

    }

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
   PRÓXIMA ALARMA
================================================== */

function mostrarProximoEvento() {

    const ahora = new Date();

    let proximoEvento = null;

    let menorDiferencia =
        Infinity;


    for (const fechaEvento in eventos) {

        const partes =
            fechaEvento.split("-");

        const dia =
            Number(partes[0]);

        const mes =
            Number(partes[1]);


        let fechaObjetivo =
            new Date(
                ahora.getFullYear(),
                mes - 1,
                dia
            );


        if (fechaObjetivo < ahora) {

            fechaObjetivo =
                new Date(
                    ahora.getFullYear() + 1,
                    mes - 1,
                    dia
                );

        }


        const diferencia =
            fechaObjetivo - ahora;


        if (diferencia < menorDiferencia) {

            menorDiferencia =
                diferencia;

            proximoEvento = {
                fecha: fechaObjetivo,
                evento: eventos[fechaEvento]
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
   INICIO
================================================== */

comprobarAlarma();


/*
   Comprueba el día cada minuto.
*/

setInterval(
    comprobarAlarma,
    60000
);
