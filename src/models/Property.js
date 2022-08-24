class Property {
    constructor(name, unit, street, city, province, address) {
        this.id = new Date().toDateString();
        this.name = name;
        this.unit = unit;
        this.street = street;
        this.city = city;
        this.province = province;
        this.address = address;
    }
}
