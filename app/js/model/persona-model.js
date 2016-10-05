/**
 * Model que corresponde al recurso persona.
 */
var PersonaModel = Backbone.Model.extend({
    /**
     * Atributos por defecto del model
     * @field
     */
    defaults: {
        "nombre": "",
        "apellido": "",
        "alias": "",
        "telefono": "",
        "email": "",
        "direccion": "",
        "fechacreacion": "",
        "fechamodificacion": null
    },
    urlRoot: 'http://localhost:1337/163.172.218.124/pwf/rest/agenda',


});
