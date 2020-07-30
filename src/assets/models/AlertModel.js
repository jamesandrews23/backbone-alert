/**
 * Created by James on 7/18/2020.
 */
import Backbone from 'backbone';

//category object factory
function createCategory(name, value, selected, icon, type){
    return {
        name: name,
        value: value,
        selected: selected,
        icon: icon,
        type: type
    }
}

const AlertModel = Backbone.Model.extend({
    defaults: {
        category:"alert",
        content: "Click to begin",
        title: "Alert",
        icon: "fa-bell",
        type: "secondary",
        categories: {
            alert: createCategory("Alert", "alert", false, "fa-bell", "danger"),
            health: createCategory("Health", "health", false, "fa-walking", "info"),
            journal: createCategory("Journal", "journal", false, "fa-book", "primary")
        }
    },

    initialize: function(){
        console.log("model init");
    }
});

export default AlertModel;