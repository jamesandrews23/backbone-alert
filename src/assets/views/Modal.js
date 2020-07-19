import Backbone from 'backbone';
import _ from 'underscore';
import 'bootstrap';
const modalTemplate = require('../templates/modal.handlebars');

class Modal extends Backbone.View {
    constructor(){
        super();
    }

    attributes(){
        return {
            class: "modal fade",
            id:"alertModal",
            "data-backdrop": "static",
            "data-keyboard": false,
            tabindex:"-1",
            role:"dialog",
            "aria-labelledby":"staticBackdropLabel",
            "aria-hidden":"true"
        }
    }

    initialize(){
        _.bindAll(this, "showModal");
        this.render();
    }

    render(){
        this.$el.html(modalTemplate());
        this.$el.modal({show: false});
        return this;
    }

    showModal(){
        this.$el.modal("show");
    }
}

export default new Modal();