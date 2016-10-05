/**
 * Clase que implementa el listado de personas.
 * @class
 */
var ListaPersonaView = Backbone.View.extend({
    /**
     * Url del template que corresponde al view
     * @field
     */


    templateURL: "templates/lista-persona-tmpl.html",


    events: {
        "click #limpiar": "render",
        "click #filtrar": "filtrar2",
        "click tr": "clicked",
        "click #eliminar": "eliminar",
        "click #editar": "editar",
        "click #guardar1": "guardar1"

    },

    clicked: function(e){
        console.log("primero en click");
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);
        console.log(id);
    },

    /**
     * @Constructor
     */
    initialize: function () {
        var thiz = this;
        //cuando el collection cambia, se carga la lista.
        this.collection.on("add", this.render, this);
        this.listenTo(this.collection, 'save', this.render);
        this.loadTemplate(function () {
            //una vez descargado el template se invoca al fetch para obtener los datos
            //del collection
            thiz.collection.fetch();
        });

    },


    /**
     * Se encarga de renderizar el html de la página.
     * @function
     */
    render: function () {
        var tmpl = _.template(this.template);
        //se procesa el collection a un json
        var coll = this.collection.toJSON();
        //se añade el html resultante al contenedor del view.
        this.$el.html(tmpl({
            collection: coll
        }));
        return this;
    },

    filtrar2: function () {
        var data = {};
        //por cada input del view
        this.$el.find("[name]").each(function () {
            data[this.name] = this.value;
        });

        //Aquí se realizan los principales calculos de busqueda
        var myModel;
        var coleccion = new PersonaCollection();
        for(var i=0; i<this.collection.length; i++) {
            myModel = this.collection.models[i];
            if (data["sel1"]=="Nombre"){
                if (myModel.attributes.nombre.toLowerCase().search(data["filtrado"].toLowerCase())!=-1){
                    coleccion.add(myModel);
                }
            }else if(data["sel1"]=="Apellido"){
                if (myModel.attributes.apellido.toLowerCase().search(data["filtrado"].toLowerCase())!=-1){
                    coleccion.add(myModel);
                }
            }else if(data["sel1"]=="Alias") {
                if (myModel.attributes.alias.toLowerCase().search(data["filtrado"].toLowerCase())!=-1){
                    coleccion.add(myModel);
                }
            }else if(data["sel1"]=="ID") {
                if (myModel.attributes.id.toString().search(data["filtrado"])!=-1){
                    coleccion.add(myModel);
                }
            }else if(data["sel1"]=="Dirección") {
                if (myModel.attributes.direccion.toLowerCase().search(data["filtrado"].toLowerCase())!=-1){
                    coleccion.add(myModel);
                }
            }else if(data["sel1"]=="Email") {
                if (myModel.attributes.email.toLowerCase().search(data["filtrado"].toLowerCase())!=-1){
                    coleccion.add(myModel);
                }
            }
        }

        //Para renderizar los resultados de la busqueda
        var tmpl = _.template(this.template);
        this.$el.html(tmpl({
            collection: coleccion.toJSON()
        }));
        return this;
    },

    eliminar: function (e) {

        console.log("primero en eliminar");
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        this.selectedPersona = this.collection.get(id);
        console.log(id);
        console.log("el id esta arriba");

        var selec = this.collection.get(this.selectedPersona);
        console.log(selec);
        selec.destroy({
            dataType : 'text',
            success: function(model, response, options) {
                alert("Se eliminó correctamente!");
                window.location.reload();
            },
            error: function(model, response, options) {
                alert("Ha ocurrido un error!");
                window.location.reload();
            }
        });


    },

    editar: function(e){
      e.preventDefault();
      var id = $(e.currentTarget).data("id");
      this.selectedPersona = this.collection.get(id);

      var a = document.getElementById(id+"nombre");
      a.type= "text";
      var aa = document.getElementById(id+"nombre1");
      aa.style='display:none;';

      var b = document.getElementById(id+"apellido");
      b.type= "text";
      var bb = document.getElementById(id+"apellido1");
      bb.style='display:none;';


      var c = document.getElementById(id+"alias");
      c.type= "text";
      var cc = document.getElementById(id+"alias1");
      cc.style='display:none;';

      var d = document.getElementById(id+"telefono");
      d.type= "text";
      var dd = document.getElementById(id+"telefono1");
      dd.style='display:none;';

      var e = document.getElementById(id+"direccion");
      e.type= "text";
      var ee = document.getElementById(id+"direccion1");
      ee.style='display:none;';

      var f = document.getElementById(id+"email");
      f.type= "text";
      var ff = document.getElementById(id+"email1");
      ff.style='display:none;';

      var g = document.getElementById("guardar1");
      g.style.display = "block";



    },

    guardar1: function(e){
        console.log("entra en guardar");
        e.preventDefault();
        var id = $(e.currentTarget).data("id");
        console.log("la id es:");
        console.log(id);
        this.selectedPersona = this.collection.get(id);
        console.log("esta es la persona");
        console.log(this.selectedPersona);


        nombre = document.getElementById(id+"nombre");
        apellido = document.getElementById(id+"apellido");
        alias = document.getElementById(id+"alias");
        telefono = document.getElementById(id+"telefono");
        direccion = document.getElementById(id+"direccion");
        email = document.getElementById(id+"email");

        var book1 = new PersonaModel({ id });
        book1.fetch({
        success: function (bookResponse) {
        console.log("Found the book: " + bookResponse.get("nombre"));
        // Let us update this retreived book now (doing it in the callback) [UPDATE]
        bookResponse.set("nombre", nombre.value);
        bookResponse.set("apellido", apellido.value);
        bookResponse.set("alias", alias.value);
        bookResponse.set("telefono", telefono.value);
        bookResponse.set("direccion", direccion.value);
        bookResponse.set("email", email.value);

        bookResponse.save({}, {
            success: function (model, respose, options) {
                alert("Se modifico el usuario correctamente");
                window.location.reload();
            },
            error: function (model, xhr, options) {
                alert("Ocurrio un error al modificar el usuario");
                window.location.reload();
            }
        });
    }
});



        }

});
