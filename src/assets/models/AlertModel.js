/**
 * Created by James on 7/18/2020.
 */
import Backbone from 'backbone';

const AlertModel = Backbone.Model.extend({
    category:"default category",
    content: "default content",
    title: "default title",

    initialize: function(){

    }
});

export default AlertModel;