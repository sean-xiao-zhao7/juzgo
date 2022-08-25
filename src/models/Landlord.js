import User from "./User";

class Landlord extends User {
    properties = [];

    addProperty(property) {
        this.properties.push(property);
    }
}

export default Landlord;
