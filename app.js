import colors from 'colors'
import {
    borrarTarea,
    confirmar,
    inquirerMenu,
    leerInput,
    mostrarListadoTareas,
    pausa
} from './helpers/inquirer.js'
import Tareas from './models/tareas.js'
import { guardarDB, leerDB } from './helpers/saveFile.js'

console.clear()

const main = async () => {
    let opt = '';

    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.getTareas(tareasDB)
    }

    do {
        //Imprime el menu
        opt = await inquirerMenu()

        switch (opt) {
            case '1':
                const desc = await leerInput('Descipcion:')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listadoCompletosYPendientes(true)
                break;

            case '4':
                tareas.listadoCompletosYPendientes(false)
                break;
            case '5':
                const ids = await mostrarListadoTareas(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await borrarTarea(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Esta seguro?')
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('\nTarea borrada.'.yellow)
                    }
                }
                break;
            default:
                break;
        }

        guardarDB(tareas.listadoArr)

        await pausa()

    } while (opt !== '0');


}


main()