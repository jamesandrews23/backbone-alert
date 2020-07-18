/**
 * Created by James on 7/16/2020.
 */
import Backbone from 'backbone';
import AlertElement from './AlertElement';
import Navbar from './Navbar';
import _ from 'underscore';

const appTemplate = require("../templates/app.handlebars");

export default class App extends Backbone.View {
    constructor(){
        super();
    }


    initialize(){
        _.bindAll(this, "addRecord");
        this.navBar = new Navbar();
        this.setElement("#root");
        this.listenTo(this.navBar, "addRecord", this.addRecord);
        this.render();
    }

    render(){
        this.$el.append(this.navBar.el);
        this.$el.append('<div class="container"></div>');
        return this;
    }

    addRecord(){
        this.$('.container').append(new AlertElement().el);
    }
}