import Backbone from 'backbone';
import $ from 'jquery';
import alertModel from '../models/AlertModel';
import Modal from './Modal';
const logTemplate = require("../templates/log.handlebars");

export default class AlertElement extends Backbone.View {
    constructor(){
        super();
        this.model = new alertModel();
    }

    attributes(){
        return {
            "class":"alert alert-custom alert-secondary alert-dismissible fade show",
            "role":"alert",
            "data-toggle":"modal",
            "data-target": "#staticBackdrop"
        }
    }

    events(){
        return {
            "click" : "handleClick"
        }
    }

    initialize(){
        this.render();
    }

    render(){
        this.$el.html(logTemplate());
        return this;
    }

    handleClick(e){
        Modal.showModal();
    }
}