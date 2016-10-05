/**
 * Collection de presonas, para simplificar el ejemplo se utiliza un archivo como
 * fuente de datos para simular el GET para obtener los datos.
 */


var PersonaCollection = Backbone.Collection.extend({

    url: 'http://localhost:1337/163.172.218.124/pwf/rest/agenda',
    model: PersonaModel,

    parse : function( response ){
        this.trigger("collection:updated", { count : response.count, total : response.total, startAt : response.startAt } );
        return response.lista;
    },

});

/*var myCollection = new Backbone.Collection.extend({
  url: 'data/personas.json',
  model: PersonaModel
});*/
