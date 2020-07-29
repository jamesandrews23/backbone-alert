/**
 * Created by James on 7/18/2020.
 */
import Backbone from 'backbone';

const AlertModel = Backbone.Model.extend({
    defaults: {
        category:"default category",
        content: "Click to begin",
        title: "Alert",
        icon: "fa-bell"
    }
});

export default AlertModel;