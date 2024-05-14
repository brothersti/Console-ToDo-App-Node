import inquirer from 'inquirer'
import colors from 'colors'
import { validate } from 'uuid';



const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas Competadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
]


const prompt = inquirer.createPromptModule();

export const inquirerMenu = async () => {
    console.clear()

    console.log('============================='.green)
    console.log('    Seleccione una opción    ')
    console.log('=============================\n'.green)

    const { opcion } = await prompt(preguntas)

    return opcion
}

export const pausa = async () => {
    const questions = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.green} para continuar`
        }]
    console.log('\n')
    await prompt(questions)
}

export const leerInput = async (message) => {
    const questions = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }]

    const { desc } = await prompt(questions)
    return desc
}


export const borrarTarea = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }]

    const { id } = await prompt(questions)
    return id

}

export const confirmar = async (message) => {
    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }]

    const { ok } = await prompt(questions)

    return ok;
}

export const mostrarListadoTareas = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    })

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }]

    const { ids } = await prompt(questions)
    return ids

}
